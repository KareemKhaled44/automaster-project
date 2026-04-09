from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, UserProfile
from academy.models import Academy

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if not created:
        return
    if instance.role == 'user':
        UserProfile.objects.create(user=instance)
    elif instance.role == 'academy':
        Academy.objects.create(user=instance, name=instance.username)