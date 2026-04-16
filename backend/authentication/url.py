from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView

)
from .views import AcademyRegisterView, UserRegisterView, CustomTokenObtainPairView

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('register/', UserRegisterView.as_view(), name='user-register'),
    path('register/academy/', AcademyRegisterView.as_view(), name='academy-register'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', TokenBlacklistView.as_view(), name='token_logout'),
]