
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from .models import Booking
from .serializers import (
    BookingCreateSerializer,
    BookingListSerializer,
    BookingDetailSerializer
)
from authentication.permissions import IsRegularUser
from .availability import get_available_slots
from datetime import date as date_type, datetime
from academy.models import Trainer, Course



class BookingCreateView(generics.CreateAPIView):
    serializer_class = BookingCreateSerializer
    permission_classes = [IsRegularUser]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BookingListView(generics.ListAPIView):
    serializer_class = BookingListSerializer
    permission_classes = [IsRegularUser]

    def get_queryset(self):
        return (
            Booking.objects
            .filter(user=self.request.user)
            .select_related('course', 'trainer', 'course__academy')
            .order_by('-booked_at')
        )


class BookingDetailView(generics.RetrieveAPIView):
    serializer_class = BookingDetailSerializer
    permission_classes = [IsRegularUser]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)


class BookingCancelView(APIView):
    permission_classes = [IsRegularUser]

    def patch(self, request, pk):
        try:
            booking = Booking.objects.get(pk=pk, user=request.user)
        except Booking.DoesNotExist:
            return Response(
                {"error": "Booking not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        if booking.status == 'cancelled':
            return Response(
                {"error": "Booking is already cancelled."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if booking.status == 'completed':
            return Response(
                {"error": "Cannot cancel a completed booking."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # check if scheduled date has passed
        if booking.scheduled_date < timezone.now().date():
            return Response(
                {"error": "Cannot cancel a booking that has already passed."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # cancel the booking
        booking.status = 'cancelled'
        booking.cancelled_at = timezone.now()
        booking.save()

        # give back the spot
        booking.course.quantity_sold -= 1
        booking.course.save()

        return Response(
            {"message": "Booking cancelled successfully."},
            status=status.HTTP_200_OK
        )
    
class TrainerAvailabilityView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        trainer_id = request.query_params.get('trainer')
        course_id = request.query_params.get('course')
        date_str = request.query_params.get('date')

        # validate required params
        if not trainer_id or not course_id or not date_str:
            return Response(
                {"error": "trainer, course and date are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # validate date format
        try:
            selected_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            return Response(
                {"error": "Invalid date format. Use YYYY-MM-DD."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # validate date is not in the past
        if selected_date < date_type.today():
            return Response(
                {"error": "Date cannot be in the past."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # get trainer and course
        try:
            trainer = Trainer.objects.get(pk=trainer_id)
        except Trainer.DoesNotExist:
            return Response(
                {"error": "Trainer not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            course = Course.objects.get(pk=course_id)
        except Course.DoesNotExist:
            return Response(
                {"error": "Course not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        # check trainer belongs to course
        if not course.trainers.filter(pk=trainer.pk).exists():
            return Response(
                {"error": "This trainer is not assigned to this course."},
                status=status.HTTP_400_BAD_REQUEST
            )

        slots = get_available_slots(trainer, selected_date, course)

        return Response({
            "trainer": trainer.name,
            "course": course.title,
            "date": date_str,
            "day": selected_date.strftime('%A'),
            "slots": slots
        })