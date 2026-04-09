import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.core import serializers
from academy.models import Academy, Trainer, Location, Course, ContactInfo

with open('academy_backup.json', 'w', encoding='utf-8') as f:
    all_data = []
    all_data += list(Location.objects.all())       # first, no dependencies
    all_data += list(Academy.objects.all())         # depends on Location
    all_data += list(Trainer.objects.all())         # depends on Academy, Location
    all_data += list(ContactInfo.objects.all())     # depends on Academy, Trainer
    all_data += list(Course.objects.all())          # depends on Academy
    f.write(serializers.serialize('json', all_data))

print("Done!")