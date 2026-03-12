from django.contrib import admin
from django import forms
from .models import *
from django.contrib.contenttypes.admin import GenericTabularInline
# Register your models here.
class RatingInline(GenericTabularInline):
    model = Rating
    extra = 1

class ContactInfoInline(admin.StackedInline):
    model = ContactInfo
    extra = 1

class ReviewInline(GenericTabularInline):
    model = Review
    extra = 1

class AcademyAdmin(admin.ModelAdmin):
    inlines = [RatingInline, ContactInfoInline, ReviewInline]
    search_fields = ['name', 'location__city', 'location__area']

class CourseAdmin(admin.ModelAdmin):
    class CourseAdminForm(forms.ModelForm):
        class Meta:
            model = Course
            fields = "__all__"

        def clean(self):
            cleaned_data = super().clean()
            academy = cleaned_data.get("academy")
            trainers = cleaned_data.get("trainers")

            if academy and trainers is not None:
                invalid_trainers = trainers.exclude(academy=academy)
                if invalid_trainers.exists():
                    names = ", ".join(invalid_trainers.values_list("name", flat=True))
                    raise forms.ValidationError(
                        f"These trainers don't belong to {academy.name}: {names}"
                    )

            return cleaned_data

    form = CourseAdminForm
    
admin.site.register(Rating)
admin.site.register(Academy, AcademyAdmin)
admin.site.register(ContactInfo)
admin.site.register(Course, CourseAdmin)
admin.site.register(Location)
admin.site.register(Trainer)
admin.site.register(Review)