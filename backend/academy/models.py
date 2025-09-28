from django.db import models

# Create your models here.
    
class Academy(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    logo = models.ImageField(upload_to='academies/', blank=True, null=True)
    location = models.ForeignKey('Location', on_delete=models.CASCADE)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.name
    
class Location(models.Model):
    city = models.CharField(max_length=100)
    area = models.CharField(max_length=100) 
    address = models.CharField(max_length=255)
    image = models.ImageField(upload_to='locations/', null=True, blank=True)

    def __str__(self):
        return f'{self.city} - {self.area}' if self.area else self.city

class Trainer(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    car_model = models.CharField(max_length=100)
    image = models.ImageField(upload_to='trainers/', null=True, blank=True)

    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    academy = models.ForeignKey(Academy, on_delete=models.CASCADE, related_name='trainers', null=True, blank=True)

    phone = models.CharField(max_length=20, blank=True, null=True)
    experience_years = models.IntegerField(default=0)
    availability = models.CharField(max_length=100, blank=True)  # e.g., "Weekdays, Weekends"

    def __str__(self):
        return self.name

class Course(models.Model):
    title = models.CharField(max_length=200)        
    description = models.TextField()     
    image = models.ImageField(upload_to='courses/', null=True, blank=True)           
    price = models.DecimalField(max_digits=6, decimal_places=2)  
    sessions = models.IntegerField()  
    duration = models.IntegerField()  
    quantity = models.IntegerField(default=0)       
    quantity_sold = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    academy = models.ForeignKey(Academy, on_delete=models.CASCADE, related_name='courses', null=True, blank=True)


    trainers = models.ManyToManyField(Trainer, related_name="courses")


    def __str__(self):
        return self.title