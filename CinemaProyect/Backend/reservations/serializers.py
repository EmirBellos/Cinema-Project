from rest_framework import serializers
from .models import Booking, Payment
from movies.models import Movie, ShowDate, ShowTime

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'booking', 'amount', 'payment_method', 'transaction_id', 'status']

class BookingSerializer(serializers.ModelSerializer):
    # Puedes incluir campos anidados si es necesario
    class Meta:
        model = Booking
        fields = ['booking_id', 'movie', 'show_date_id', 'show_time_id', 'customer_name', 
                  'customer_email', 'selected_seats', 'total_amount', 'status']

class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['movie', 'show_date_id', 'show_time_id', 'customer_name', 
                 'customer_email', 'selected_seats', 'total_amount']