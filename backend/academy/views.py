from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *

# GET (list all courses) + POST (create new course)
class HomeCourseListView(generics.ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        return Course.objects.all()[:3]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
    
class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

      # Add request context to serializer
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

class HomeTrainerListCreateView(generics.ListCreateAPIView):
    def get_queryset(self):
        return Trainer.objects.all()[:4]
    
    serializer_class = TrainerHomeSerializer


class TrainerListCreateView(generics.ListCreateAPIView):
    queryset = Trainer.objects.all()
    serializer_class = TrainerHomeSerializer

    # Add request context to serializer
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

class TrainerProfileView(generics.RetrieveAPIView):
    queryset = Trainer.objects.all()
    serializer_class = TrainerProfileSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

class LocationListCreateView(generics.ListCreateAPIView):
    def get_queryset(self):
        return Location.objects.all()[:3]
    serializer_class = LocationSerializer

    # Add request context to serializer
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context