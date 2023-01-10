from django.db import models

# Create your models here.
class Detail(models.Model):
    name = models.CharField(max_length=256)
    mobile_number = models.CharField(max_length=20)
    status = models.CharField(max_length=15, choices=(('pending', 'pending'), ('open', 'open'), ('complete', 'complete')))
    address = models.CharField(max_length=256, null=True, blank=True)
    industry = models.CharField(max_length=256, null=True, blank=True)
    website = models.CharField(max_length=256, null=True, blank=True)
    contacts = models.CharField(max_length=256, null=True, blank=True)
    pipelines = models.CharField(max_length=256, null=True, blank=True)
    notes = models.CharField(max_length=256, null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)

