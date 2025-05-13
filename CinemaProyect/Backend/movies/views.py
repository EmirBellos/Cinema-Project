from rest_framework import viewsets, generics, filters
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser  # Añadido esta importación
from .models import Movie, ShowDate, ShowTime, City
from .serializers import (
    MovieDetailSerializer, MovieListSerializer,
    ShowDateWithTimesSerializer, ShowTimeSerializer, CitySerializer
)

class MovieViewSet(viewsets.ModelViewSet):
    """
    API endpoint para películas.
    GET /api/movies/ - Lista todas las películas
    GET /api/movies/1/ - Detalle de una película con sus horarios
    POST /api/movies/ - Crear una nueva película
    PUT /api/movies/1/ - Actualizar una película existente
    DELETE /api/movies/1/ - Eliminar una película
    """
    queryset = Movie.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'genre', 'director', 'actors']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return MovieDetailSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            # Puedes usar MovieDetailSerializer o crear un MovieCreateUpdateSerializer específico
            return MovieDetailSerializer  
        return MovieListSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]  # Solo administradores pueden modificar
        return []  # Cualquiera puede leer

class MovieShowDatesView(generics.ListAPIView):
    """
    GET /api/movies/1/dates/ - Lista fechas disponibles para una película
    """
    serializer_class = ShowDateWithTimesSerializer
    
    def get_queryset(self):
        movie_id = self.kwargs['movie_id']
        return ShowDate.objects.filter(movie_id=movie_id)

class ShowTimeByDateView(generics.ListAPIView):
    """
    GET /api/movies/1/dates/2/times/ - Lista horarios para una fecha específica
    """
    serializer_class = ShowTimeSerializer
    
    def get_queryset(self):
        movie_id = self.kwargs['movie_id']
        date_id = self.kwargs['date_id']
        show_date = ShowDate.objects.filter(movie_id=movie_id, id=date_id).first()
        if show_date:
            return ShowTime.objects.filter(show_date=show_date)
        return ShowTime.objects.none()

class CityViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint para ciudades.
    GET /api/cities/ - Lista todas las ciudades
    """
    queryset = City.objects.all()
    serializer_class = CitySerializer