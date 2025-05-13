# populate_db.py modificado
import os
import django
import json
from datetime import datetime

# Configurar el entorno Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backDjang.settings')
django.setup()

# Importar modelos
from movies.models import Movie, City, ShowDate, ShowTime
from django.db import transaction

def populate_cities():
    """Poblar la tabla de ciudades"""
    cities = ["Cancún", "Chetumal", "Playa del Carmen", "Mérida", "Campeche"]
    for city_name in cities:
        City.objects.get_or_create(name=city_name)
    print(f"Se han creado {len(cities)} ciudades")

def populate_movies(movies_data):
    """Poblar la tabla de películas y sus fechas/horarios"""
    with transaction.atomic():  # Usar transacción para evitar datos parciales
        for movie_data in movies_data:
            # Crear o actualizar la película
            movie, created = Movie.objects.update_or_create(
                id=movie_data['id'],
                defaults={
                    'title': movie_data['title'],
                    'imageUrl': movie_data['imageUrl'],
                    'release_date': movie_data['release_date'],
                    'runtime': movie_data['runtime'],
                    'category': movie_data['category'],
                    'genre': movie_data['genre'],
                    'rating': movie_data['rating'],
                    'overview': movie_data['overview'],
                    'secondaryImage': movie_data['secondaryImage'],
                    'trailerLink': movie_data['trailerLink'],
                    'director': movie_data['director'],
                    'actors': movie_data['actors'],
                    'awards': movie_data['awards']
                }
            )
            
            status = "creada" if created else "actualizada"
            print(f"Película '{movie.title}' {status}")
            
            # Eliminar fechas existentes para evitar conflictos
            ShowDate.objects.filter(movie=movie).delete()
            
            # Crear fechas y horarios para esta película
            if 'showTimes' in movie_data:
                date_counter = 1  # Contador para generar IDs incrementales
                for date_data in movie_data['showTimes']:
                    # Convertir la fecha si es necesario
                    date_obj = datetime.strptime(date_data['date'], '%Y-%m-%d').date()
                    
                    # Crear nueva fecha con ID generado automáticamente
                    show_date = ShowDate.objects.create(
                        movie=movie,
                        date=date_obj
                    )
                    
                    print(f"  Fecha '{date_obj}' creada con ID {show_date.id}")
                    
                    # Crear horarios para esta fecha
                    if 'times' in date_data:
                        time_counter = 1  # Contador para generar IDs incrementales
                        for time_data in date_data['times']:
                            # Crear nuevo horario con ID generado automáticamente
                            show_time = ShowTime.objects.create(
                                show_date=show_date,
                                time=time_data['time'],
                                room=time_data['room'],
                                format=time_data['format'],
                                language=time_data.get('language', 'Español'),
                                availableSeats=time_data.get('availableSeats', 100)
                            )
                            
                            print(f"    Horario '{time_data['time']}' creado con ID {show_time.id}")
                            time_counter += 1

if __name__ == "__main__":
    # Crear las ciudades
    populate_cities()
    
    # Cargar datos de películas desde un archivo JSON
    with open('movies_data.json', 'r', encoding='utf-8') as f:
        movies_data = json.load(f)
    
    # Poblar películas y horarios
    populate_movies(movies_data)
    
    print("¡Base de datos poblada con éxito!")