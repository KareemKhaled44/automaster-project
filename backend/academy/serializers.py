from rest_framework import serializers
from .models import *
from django.db.models import Avg, Count, Min

class AcademySerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()
    location = serializers.StringRelatedField(many=True) # get only the location name
    courses_count = serializers.IntegerField(source='courses.count', read_only=True)
    trainers_count = serializers.IntegerField(source='trainers.count', read_only=True)
    avg_rating = serializers.FloatField(read_only=True)
    reviews_count = reviews_count = serializers.IntegerField(read_only=True)
    contactInfo = serializers.SerializerMethodField()
    has_female_trainer = serializers.SerializerMethodField()
    minimum_price = serializers.SerializerMethodField()

    class Meta:
        model = Academy
        fields = '__all__'

    def get_logo(self, obj):
        request = self.context.get('request')
        if request and obj.logo:
            return request.build_absolute_uri(obj.logo.url)
        return None
    
    def get_contactInfo(self, obj):

        contacts = obj.contacts.all()

        return {
            "phones": [c.value for c in contacts if c.type == "phone"],
            "emails": [c.value for c in contacts if c.type == "email"],
            "websites": [c.value for c in contacts if c.type == "website"],
        }

    def get_has_female_trainer(self, obj):
        return obj.trainers.filter(gender='female').exists()
    
    def get_minimum_price(self, obj):
        min_price = obj.courses.aggregate(Min('price'))['price__min']
        return min_price if min_price is not None else 0
    
class TrainerSerializer(serializers.ModelSerializer):
    location = serializers.StringRelatedField() # get only the location name

    class Meta:
        model = Trainer
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    trainers = TrainerSerializer(many=True, read_only=True)
    academy = AcademySerializer(read_only=True)
    avg_rating = serializers.FloatField(read_only=True)
    reviews_count = serializers.IntegerField(read_only=True)
    has_female_trainer = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        if request and obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None
    
    def get_has_female_trainer(self, obj):
        return obj.trainers.filter(gender='female').exists()

class TrainerHomeSerializer(serializers.ModelSerializer):
    location = serializers.StringRelatedField() # get only the location name

    class Meta:
        model = Trainer
        fields = '__all__'

class TrainerProfileSerializer(serializers.ModelSerializer):
    location = serializers.StringRelatedField()

    class Meta:
        model = Trainer
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'