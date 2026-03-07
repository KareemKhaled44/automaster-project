from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.fields import GenericRelation
from django.core.exceptions import ValidationError
from django.db.models.signals import m2m_changed
from django.dispatch import receiver

# Create your models here.

class Rating(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="ratings"
    )

    rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        db_index=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    # Generic relation
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE
    )

    object_id = models.PositiveIntegerField()

    content_object = GenericForeignKey(
        'content_type',
        'object_id'
    )

    class Meta:
        # Index for efficient lookups when filtering by content type and object ID
        indexes = [
            models.Index(fields=["content_type", "object_id"]),
        ]

        # Ensure a user can only rate a specific object once
        unique_together = [
            "user",
            "content_type",
            "object_id"
        ]

    def __str__(self):
        return f"{self.user} rated {self.rating}"
    
class Academy(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    logo = models.ImageField(upload_to='academies/', blank=True, null=True)
    location = models.ManyToManyField('Location', blank=True)
    address_text = models.CharField(max_length=255, null=True, blank=True)
    google_maps_url = models.URLField(blank=True, null=True)
    ratings = GenericRelation(Rating)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True, null=True, blank=True)

    def __str__(self):
        return self.name
    
class Location(models.Model):
    city = models.CharField(max_length=100)
    area = models.CharField(max_length=100, blank=True, null=True) 

    # Ensure that the combination of city and area is unique
    class Meta:
        unique_together = ['city', 'area']

    def __str__(self):
        return f'{self.city} - {self.area}' if self.area else self.city
    
class Trainer(models.Model):
    name = models.CharField(max_length=100)
    GENDER_CHOICES = [
        ("male", "Male"),
        ("female", "Female"),
    ]
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, null=True)
    bio = models.TextField(blank=True)
    car_model = models.CharField(max_length=100)
    image = models.ImageField(upload_to='trainers/', null=True, blank=True)

    location = models.ForeignKey(Location, on_delete=models.CASCADE, null=True, blank=True)
    academy = models.ForeignKey(Academy, on_delete=models.CASCADE, related_name='trainers', null=True, blank=True)

    experience_years = models.IntegerField(default=0)
    availability = models.CharField(max_length=100, blank=True)  # e.g., "Weekdays, Weekends"

    ratings = GenericRelation(Rating)

    def __str__(self):
        return self.name

class ContactInfo(models.Model):

    CONTACT_TYPE_CHOICES = [
        ("phone", "Phone"),
        ("email", "Email"),
        ("website", "Website"),
    ]

    academy = models.ForeignKey(Academy, on_delete=models.CASCADE, related_name="contacts", null=True, blank=True)
    trainer = models.ForeignKey(Trainer, on_delete=models.CASCADE, related_name="contacts", null=True,blank=True)

    type = models.CharField(max_length=10, choices=CONTACT_TYPE_CHOICES, default="phone")

    value = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.type}: {self.value}"

class Course(models.Model):
    title = models.CharField(max_length=200, db_index=True)        
    description = models.TextField()     
    image = models.ImageField(upload_to='courses/', null=True, blank=True)           
    price = models.DecimalField(max_digits=6, decimal_places=2, db_index=True)
    ratings = GenericRelation(Rating)  
    sessions = models.IntegerField()  
    duration = models.IntegerField()  
    quantity = models.IntegerField(default=0)       
    quantity_sold = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)
    TRANSMISSION_CHOICES = [
        ("manual", "Manual"),
        ("auto", "Automatic"),
    ]

    transmission = models.CharField(max_length=10, choices=TRANSMISSION_CHOICES, blank=True, null=True)

    academy = models.ForeignKey(Academy, on_delete=models.CASCADE, related_name='courses', null=True, blank=True)


    trainers = models.ManyToManyField(Trainer, related_name="courses")

    ratings = GenericRelation(Rating)

    def clean(self):
        # Validate trainer/academy consistency when full_clean() is called.
        if self.academy and self.pk:
            invalid = self.trainers.exclude(academy=self.academy)
            if invalid.exists():
                names = ', '.join(invalid.values_list('name', flat=True))
                raise ValidationError(
                    f"These trainers don't belong to {self.academy.name}: {names}"
                )

    def __str__(self):
        return self.title


@receiver(m2m_changed, sender=Course.trainers.through)
def validate_course_trainers_belong_to_academy(sender, instance, action, pk_set, **kwargs):
    """Prevent attaching trainers from another academy to a course."""
    if action != "pre_add" or not pk_set or not instance.academy_id:
        return

    invalid_trainers = Trainer.objects.filter(pk__in=pk_set).exclude(academy_id=instance.academy_id)
    if invalid_trainers.exists():
        names = ", ".join(invalid_trainers.values_list("name", flat=True))
        raise ValidationError(
            f"These trainers don't belong to {instance.academy.name}: {names}"
        )
    
