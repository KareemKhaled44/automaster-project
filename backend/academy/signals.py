# academy/signals.py
from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Academy
from authentication.emails import send_approval_email, send_rejection_email

@receiver(pre_save, sender=Academy)
def academy_status_changed(sender, instance, **kwargs):
    # get the old status from the database
    try:
        old = Academy.objects.get(pk=instance.pk)
    except Academy.DoesNotExist:
        return  # new object, not an update

    # only send email if status actually changed
    if old.status == instance.status:
        return

    if instance.status == 'approved':
        send_approval_email(instance)

    elif instance.status == 'rejected':
        send_rejection_email(instance)