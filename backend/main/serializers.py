from .models import Detail
from rest_framework import serializers


class DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detail
        fields = "__all__"