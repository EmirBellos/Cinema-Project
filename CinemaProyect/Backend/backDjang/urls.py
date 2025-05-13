from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from movies.views import MovieViewSet, MovieShowDatesView, ShowTimeByDateView, CityViewSet
from reservations.views import BookingViewSet

router = DefaultRouter()
router.register(r'movies', MovieViewSet)
router.register(r'cities', CityViewSet)
router.register(r'reservations', BookingViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/movies/<int:movie_id>/dates/', MovieShowDatesView.as_view(), name='movie-dates'),
    path('api/movies/<int:movie_id>/dates/<int:date_id>/times/', ShowTimeByDateView.as_view(), name='date-times'),
]