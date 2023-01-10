
from django.urls import path
from .views import DetailAPI

urlpatterns = [
    path("", DetailAPI.as_view({'get': 'list',
    'post': 'create'})),
    path("<int:pk>",DetailAPI.as_view({
        'get': 'retrieve',
        'patch': 'partial_update',
        'delete': 'destroy',
    })),
]