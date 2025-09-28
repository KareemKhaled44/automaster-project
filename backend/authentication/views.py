from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import make_password

# Create your views here.
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        try:
            if User.objects.filter(username=data['username']).exists():
                return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

            if User.objects.filter(email=data['email']).exists():
                return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

            if data['password'] != data['confirmPassword']:
                return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

            User.objects.create(
                username=data['username'],
                email=data['email'],
                password=make_password(data['password'])
            )
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)