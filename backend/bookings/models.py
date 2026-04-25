from django.db import models
from django.db import models
from django.conf import settings


class Booking(models.Model):
    STATUS_CHOICES = [
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='bookings'
    )
    course = models.ForeignKey(
        'academy.Course',
        on_delete=models.CASCADE,
        related_name='bookings'
    )
    trainer = models.ForeignKey(
        'academy.Trainer',
        on_delete=models.CASCADE,
        related_name='bookings'
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='confirmed'
    )

    booked_at = models.DateTimeField(auto_now_add=True)
    scheduled_date = models.DateField()
    start_time = models.TimeField()
    cancelled_at = models.DateTimeField(null=True, blank=True)

    total_price = models.DecimalField(max_digits=8, decimal_places=2)
    notes = models.TextField(blank=True, null=True)

    class Meta:
        # prevent double booking same trainer at same date and time
        unique_together = ['trainer', 'scheduled_date', 'start_time']
        ordering = ['-booked_at']

    def __str__(self):
        return f"{self.user} booked {self.course} with {self.trainer} on {self.scheduled_date}"