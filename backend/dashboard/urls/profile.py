from django.urls import path
from dashboard.views.profile import (
    AcademyProfileView,
    AcademyContactCreateView,
    AcademyContactDeleteView,
)

urlpatterns = [
    path('', AcademyProfileView.as_view(), name='dashboard-profile'),
    path('contacts/', AcademyContactCreateView.as_view(), name='dashboard-contact-create'),
    path('contacts/<int:pk>/', AcademyContactDeleteView.as_view(), name='dashboard-contact-delete'),
]