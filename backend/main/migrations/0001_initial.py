# Generated by Django 4.1.5 on 2023-01-10 01:59

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Detail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('mobile_number', models.CharField(max_length=20)),
                ('status', models.CharField(choices=[('pending', 'pending'), ('open', 'open'), ('complete', 'complete')], max_length=15)),
                ('address', models.CharField(blank=True, max_length=256, null=True)),
                ('industry', models.CharField(blank=True, max_length=256, null=True)),
                ('website', models.CharField(blank=True, max_length=256, null=True)),
                ('contacts', models.CharField(blank=True, max_length=256, null=True)),
                ('pipelines', models.CharField(blank=True, max_length=256, null=True)),
                ('notes', models.CharField(blank=True, max_length=256, null=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]