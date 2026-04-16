from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings


def send_approval_email(academy):
    subject = "🎉 Your Academy Has Been Approved — AutoMaster"
    
    html_content = render_to_string('emails/academy_approved.html', {
        'academy_name': academy.name,
        'login_url': f"{settings.FRONTEND_URL}/signin",
    })

    email = EmailMultiAlternatives(
        subject=subject,
        body=f"Congratulations {academy.name}! Your academy has been approved. Login at {settings.FRONTEND_URL}/signin",
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[academy.user.email],
    )
    email.attach_alternative(html_content, "text/html")
    email.send()


def send_rejection_email(academy):
    subject = "AutoMaster — Academy Registration Update"

    html_content = render_to_string('emails/academy_rejected.html', {
        'academy_name': academy.name,
        'rejected_reason': academy.rejected_reason or 'No reason provided.',
    })

    email = EmailMultiAlternatives(
        subject=subject,
        body=f"Dear {academy.name}, your academy registration was not approved. Reason: {academy.rejected_reason or 'No reason provided.'}",
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[academy.user.email],
    )
    email.attach_alternative(html_content, "text/html")
    email.send()