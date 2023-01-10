from django.shortcuts import render
from .serializers import DetailSerializer
from .models import Detail
from rest_framework import viewsets
# Create your views here.


class DetailAPI(viewsets.ModelViewSet):
    queryset = Detail.objects.all()
    serializer_class = DetailSerializer