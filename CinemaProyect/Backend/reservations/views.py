from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Booking, Payment
from .serializers import BookingSerializer, BookingCreateSerializer, PaymentSerializer
from movies.models import Movie, ShowDate, ShowTime
from django.db import transaction

class BookingViewSet(viewsets.ModelViewSet):
    """
    API endpoint para reservas.
    POST /api/reservations/ - Crear una nueva reserva
    GET /api/reservations/<uuid>/ - Ver detalles de una reserva
    """
    queryset = Booking.objects.all()
    lookup_field = 'booking_id'
    
    def get_serializer_class(self):
        if self.action == 'create':
            return BookingCreateSerializer
        return BookingSerializer
    
    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Validamos que existan la película, fecha y horario
            movie_id = serializer.validated_data.get('movie').id
            show_date_id = serializer.validated_data.get('show_date_id')
            show_time_id = serializer.validated_data.get('show_time_id')
            
            try:
                # Verificar que exista la fecha para esa película
                show_date = ShowDate.objects.get(movie_id=movie_id, id=show_date_id)
                # Verificar que exista el horario para esa fecha
                show_time = ShowTime.objects.get(show_date=show_date, id=show_time_id)
                
                # Si hay suficientes asientos disponibles
                selected_seats = serializer.validated_data.get('selected_seats')
                if len(selected_seats) > show_time.availableSeats:
                    return Response(
                        {"error": "No hay suficientes asientos disponibles"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                    
                # Crear la reserva
                booking = serializer.save(status='PENDING')
                
                # Aquí podrías actualizar los asientos disponibles
                # show_time.availableSeats -= len(selected_seats)
                # show_time.save()
                
                return Response(
                    BookingSerializer(booking).data,
                    status=status.HTTP_201_CREATED
                )
                
            except (ShowDate.DoesNotExist, ShowTime.DoesNotExist):
                return Response(
                    {"error": "Fecha u horario no válidos para esta película"},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def complete_payment(self, request, booking_id=None):
        """
        POST /api/reservations/<uuid>/complete_payment/ - Completa el pago de una reserva
        """
        booking = self.get_object()
        
        if booking.status != 'PENDING':
            return Response(
                {"error": "Solo se pueden pagar reservas pendientes"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        payment_data = {
            'booking': booking.booking_id,
            'amount': booking.total_amount,
            'payment_method': request.data.get('payment_method', 'CREDIT_CARD'),
            'transaction_id': request.data.get('transaction_id', f'txn-{booking.booking_id}'),
            'status': 'COMPLETED'
        }
        
        serializer = PaymentSerializer(data=payment_data)
        if serializer.is_valid():
            with transaction.atomic():
                payment = serializer.save()
                booking.status = 'CONFIRMED'
                booking.save()
                
                # Actualizar asientos disponibles
                # Esta parte es opcional, dependiendo de si quieres actualizar en la creación
                # de la reserva o al confirmar el pago
                
                return Response(
                    {"message": "Pago completado con éxito", "booking": BookingSerializer(booking).data},
                    status=status.HTTP_200_OK
                )
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)