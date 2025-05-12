from django.db import models

class Movie(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    imageUrl = models.URLField()
    release_date = models.CharField(max_length=4)
    runtime = models.CharField(max_length=20)
    category = models.CharField(max_length=10)
    genre = models.CharField(max_length=100)
    rating = models.FloatField()
    overview = models.TextField()
    secondaryImage = models.URLField(blank=True, null=True)
    trailerLink = models.URLField(blank=True, null=True)
    director = models.CharField(max_length=100, blank=True, null=True)
    actors = models.CharField(max_length=255, blank=True, null=True)
    awards = models.URLField(blank=True, null=True)
    
    def __str__(self):
        return self.title

class City(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class ShowDate(models.Model):
    id = models.AutoField(primary_key=True)
    movie = models.ForeignKey(Movie, related_name='show_dates', on_delete=models.CASCADE)
    date = models.DateField()
    
    def __str__(self):
        return f"{self.movie.title} - {self.date}"

class ShowTime(models.Model):
    id = models.AutoField(primary_key=True)
    show_date = models.ForeignKey(ShowDate, related_name='show_times', on_delete=models.CASCADE)
    time = models.CharField(max_length=10)
    room = models.CharField(max_length=50)
    format = models.CharField(max_length=10)
    language = models.CharField(max_length=20, default='Español')  # Añade el campo language
    availableSeats = models.IntegerField(default=100)
    
    def __str__(self):
        return f"{self.show_date} - {self.time}"