from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, FeatureViewSet, DistrictViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'features', FeatureViewSet, basename='feature')
router.register(r'districts', DistrictViewSet, basename='district')

urlpatterns = [
    path('', include(router.urls)),
]