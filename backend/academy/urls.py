from django.urls import path
from .views import *

urlpatterns = [
    path("home-courses/", HomeCourseListView.as_view(), name="home-courses"),
    path('courses/', CourseListCreateView.as_view(), name='course-list'),
    path("home-trainers/", HomeTrainerListCreateView.as_view(), name="home-trainers"),
    path('trainers/', TrainerListCreateView.as_view(), name='trainer-list'),
    path('trainer-profile/<int:pk>/', TrainerProfileView.as_view(), name='trainer-profile'),
    path('locations/', LocationListCreateView.as_view(), name='location-list'),
]