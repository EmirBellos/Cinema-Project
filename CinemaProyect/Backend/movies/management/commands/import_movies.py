from django.core.management.base import BaseCommand
import json
from movies.models import Movie, ShowDate, ShowTime, City

class Command(BaseCommand):
    help = 'Importa películas desde un archivo JSON'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str, help='Ruta al archivo JSON con las películas')

    def handle(self, *args, **options):
        file_path = options['json_file']
        
        self.stdout.write(f"Importando películas desde {file_path}...")
        
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                movies_data = json.load(file)
                
                # Crear algunas ciudades
                cities = ["Ciudad de México", "Guadalajara", "Monterrey"]
                for city_name in cities:
                    City.objects.get_or_create(name=city_name)
                
                # Procesar cada película
                for movie_data in movies_data:
                    # Crear o actualizar la película
                    movie, created = Movie.objects.update_or_create(
                        id=movie_data['id'],
                        defaults={
                            'title': movie_data['title'],
                            'imageUrl': movie_data['imageUrl'],
                            'secondaryImage': movie_data['secondaryImage'],
                            'release_date': movie_data['release_date'],
                            'runtime': movie_data['runtime'],
                            'category': movie_data['category'],
                            'genre': movie_data['genre'],
                            'rating': movie_data['rating'],
                            'overview': movie_data['overview'],
                            'trailerLink': movie_data['trailerLink'],
                            'director': movie_data['director'],
                            'actors': movie_data['actors'],
                            'awards': movie_data.get('awards', ''),
                        }
                    )
                    
                    action = "Creada" if created else "Actualizada"
                    self.stdout.write(f"{action} película: {movie.title}")
                    
                    # Procesar las fechas de exhibición
                    for showdate_data in movie_data['showTimes']:
                        show_date, created = ShowDate.objects.update_or_create(
                            movie=movie,
                            id=showdate_data['id'],
                            defaults={
                                'date': showdate_data['date'],
                            }
                        )
                        
                        # Procesar los horarios para esta fecha
                        for showtime_data in showdate_data['times']:
                            ShowTime.objects.update_or_create(
                                show_date=show_date,
                                id=showtime_data['id'],
                                defaults={
                                    'time': showtime_data['time'],
                                    'room': showtime_data['room'],
                                    'format': showtime_data['format'],
                                    'language': showtime_data['language'],
                                    'availableSeats': showtime_data['availableSeats'],
                                }
                            )
                
                self.stdout.write(self.style.SUCCESS(f"Importación completada: {len(movies_data)} películas procesadas"))
        
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error durante la importación: {str(e)}"))