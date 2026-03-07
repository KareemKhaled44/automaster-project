from django.urls import path
from .views import *

urlpatterns = [
    path("home-academies/", HomeAcademyListView.as_view(), name="home-academies"),
    path('academies/', AcademyListCreateView.as_view(), name='academy-list'),
    path("home-courses/", HomeCourseListView.as_view(), name="home-courses"),
    path('courses/', CourseListCreateView.as_view(), name='course-list'),
    path("home-trainers/", HomeTrainerListCreateView.as_view(), name="home-trainers"),
    path('trainers/', TrainerListCreateView.as_view(), name='trainer-list'),
    path('trainer-profile/<int:pk>/', TrainerProfileView.as_view(), name='trainer-profile'),
    path("locations/", LocationListView.as_view()),
]