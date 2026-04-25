from rest_framework import serializers
from django.utils import timezone
from .models import Booking
from academy.models import Course, Trainer


class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            'course',
            'trainer',
            'scheduled_date',
            'start_time',
            'notes',
        ]

    def validate(self, data):
        course = data['course']
        trainer = data['trainer']
        scheduled_date = data['scheduled_date']
        start_time = data['start_time']

        # 1 - check trainer belongs to the course
        if not course.trainers.filter(pk=trainer.pk).exists():
            raise serializers.ValidationError(
                {"trainer": "This trainer is not assigned to this course."}
            )

        # 2 - check scheduled date is not in the past
        if scheduled_date < timezone.now().date():
            raise serializers.ValidationError(
                {"scheduled_date": "Scheduled date cannot be in the past."}
            )

        # 3 - check trainer is not already booked at this date and time
        if Booking.objects.filter(
            trainer=trainer,
            scheduled_date=scheduled_date,
            start_time=start_time,
            status='confirmed'
        ).exists():
            raise serializers.ValidationError(
                {"start_time": "This trainer is already booked at this date and time."}
            )

        # 4 - check course has available spots
        if course.quantity - course.quantity_sold <= 0:
            raise serializers.ValidationError(
                {"course": "This course is fully booked."}
            )

        return data

    def create(self, validated_data):
        course = validated_data['course']

        # set total price from course price
        validated_data['total_price'] = course.price

        # set the user from request
        validated_data['user'] = self.context['request'].user

        # increment quantity sold
        course.quantity_sold += 1
        course.save()

        return Booking.objects.create(**validated_data)


class BookingListSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    trainer_name = serializers.CharField(source='trainer.name', read_only=True)
    academy_name = serializers.CharField(source='course.academy.name', read_only=True)

    class Meta:
        model = Booking
        fields = [
            'id',
            'course_title',
            'trainer_name',
            'academy_name',
            'status',
            'scheduled_date',
            'start_time',
            'total_price',
            'booked_at',
        ]


class BookingDetailSerializer(serializers.ModelSerializer):
    course = serializers.SerializerMethodField()
    trainer = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = [
            'id',
            'course',
            'trainer',
            'status',
            'scheduled_date',
            'start_time',
            'total_price',
            'notes',
            'booked_at',
            'cancelled_at',
        ]

    def get_course(self, obj):
        return {
            'id': obj.course.id,
            'title': obj.course.title,
            'image': self.context['request'].build_absolute_uri(obj.course.image.url) if obj.course.image else None,
            'academy_name': obj.course.academy.name,
            'academy_id': obj.course.academy.id,
        }

    def get_trainer(self, obj):
        return {
            'id': obj.trainer.id,
            'name': obj.trainer.name,
            'image': self.context['request'].build_absolute_uri(obj.trainer.image.url) if obj.trainer.image else None,
            'car_model': obj.trainer.car_model,
            'phone': obj.trainer.contacts.filter(type='phone').first().value if obj.trainer.contacts.filter(type='phone').exists() else None,
        }