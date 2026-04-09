import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project_name.settings')
django.setup()

import json
from django.core import serializers
from academy.models import Academy, Trainer, Location  # add all your models here

data = {}

with open('academy_backup.json', 'w', encoding='utf-8') as f:
    f.write(serializers.serialize('json', Academy.objects.all()))

print("Done!")