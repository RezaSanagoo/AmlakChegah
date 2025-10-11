from django.urls import path
from . import views
from .views import ConsultantDetailAPIView

urlpatterns = [
    path('consultant/<int:pk>/', ConsultantDetailAPIView.as_view(), name='consultant-detail'),
]
