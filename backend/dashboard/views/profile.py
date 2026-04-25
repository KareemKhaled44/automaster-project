from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.db.models import Avg, Count
from authentication.permissions import IsAcademy
from dashboard.serializers.profile import (
    AcademyProfileSerializer,
    AcademyProfileUpdateSerializer,
    ContactInfoSerializer,
)
from academy.models import ContactInfo


class AcademyProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAcademy]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    http_method_names = ['get', 'patch']

    def get_serializer_class(self):
        if self.request.method == 'PATCH':
            return AcademyProfileUpdateSerializer
        return AcademyProfileSerializer

    def get_object(self):
        return (
            self.request.user.academy_profile
            .__class__.objects
            .annotate(
                avg_rating=Avg('ratings__rating'),
                reviews_count=Count('ratings'),
            )
            .get(pk=self.request.user.academy_profile.pk)
        )


class AcademyContactCreateView(generics.CreateAPIView):
    permission_classes = [IsAcademy]
    serializer_class = ContactInfoSerializer

    def perform_create(self, serializer):
        serializer.save(academy=self.request.user.academy_profile)


class AcademyContactDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAcademy]

    def get_queryset(self):
        return ContactInfo.objects.filter(
            academy=self.request.user.academy_profile
        )