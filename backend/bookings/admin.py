from django.contrib import admin
from .models import Booking
# Register your models here.
class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'trainer', 'status', 'scheduled_date', 'start_time')
    list_filter = ('status', 'scheduled_date')
    search_fields = ('user__username', 'course__name', 'trainer__name')
    
admin.site.register(Booking, BookingAdmin)