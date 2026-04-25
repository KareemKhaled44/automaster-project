from rest_framework import serializers
from academy.models import Academy, ContactInfo, Location


class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = ['id', 'type', 'value']


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'city', 'area']


class AcademyProfileSerializer(serializers.ModelSerializer):
    contacts = ContactInfoSerializer(many=True, read_only=True)
    location = LocationSerializer(many=True, read_only=True)
    avg_rating = serializers.FloatField(read_only=True)
    reviews_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Academy
        fields = [
            'id',
            'name',
            'description',
            'logo',
            'address_text',
            'google_maps_url',
            'location',
            'contacts',
            'status',
            'created_at',
            'avg_rating',
            'reviews_count',
        ]
        read_only_fields = ['status', 'created_at']


class AcademyProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Academy
        fields = [
            'name',
            'description',
            'logo',
            'address_text',
            'google_maps_url',
        ]