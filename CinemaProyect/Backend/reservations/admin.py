from django.contrib import admin
from .models import Booking, Payment

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['booking_id', 'movie', 'customer_name', 'booking_date', 'total_amount', 'status']
    list_filter = ['status', 'booking_date']
    search_fields = ['customer_name', 'customer_email']

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['booking', 'amount', 'payment_method', 'payment_date', 'status']
    list_filter = ['status', 'payment_method', 'payment_date']