from rest_framework import serializers
from .models import Movie, ShowDate, ShowTime, City

class ShowTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShowTime
        fields = ['id', 'time', 'room', 'format', 'language', 'availableSeats']

class ShowDateWithTimesSerializer(serializers.ModelSerializer):
    times = ShowTimeSerializer(many=True, read_only=True)
    
    class Meta:
        model = ShowDate
        fields = ['id', 'date', 'times']

class MovieDetailSerializer(serializers.ModelSerializer):
    showTimes = ShowDateWithTimesSerializer(many=True, read_only=True)
    
    class Meta:
        model = Movie
        fields = [
            'id', 'title', 'imageUrl', 'secondaryImage', 'release_date', 
            'runtime', 'category', 'genre', 'rating', 'overview', 
            'trailerLink', 'director', 'actors', 'awards', 'showTimes'
        ]

class MovieListSerializer(serializers.ModelSerializer):
    """Serializador para listar películas en la cartelera"""
    class Meta:
        model = Movie
        fields = ['id', 'title', 'imageUrl', 'release_date', 'genre', 'rating', 'category']

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['id', 'name']