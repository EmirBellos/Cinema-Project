from django.contrib import admin
from .models import Movie, ShowDate, ShowTime, City

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'release_date', 'category', 'rating']
    search_fields = ['title', 'director', 'actors']

@admin.register(ShowDate)
class ShowDateAdmin(admin.ModelAdmin):
    list_display = ['id', 'movie', 'date']
    list_filter = ['date']

@admin.register(ShowTime)
class ShowTimeAdmin(admin.ModelAdmin):
    list_display = ['id', 'show_date', 'time', 'room', 'format', 'language', 'availableSeats']
    list_filter = ['room', 'format', 'language']

@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']