from django.urls import path
from dashboard.views.trainers import (
    TrainerListCreateView,
    TrainerRetrieveUpdateDeleteView,
)

urlpatterns = [
    path('', TrainerListCreateView.as_view(), name='dashboard-trainer-list'),
    path('<int:pk>/', TrainerRetrieveUpdateDeleteView.as_view(), name='dashboard-trainer-detail'),
]
