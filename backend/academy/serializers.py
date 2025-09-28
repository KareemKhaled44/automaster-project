from rest_framework import serializers
from .models import *

class CourseSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    class Meta:
        model = Course
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        return None

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