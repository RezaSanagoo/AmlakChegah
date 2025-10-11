from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Category, Feature, District
from .serializers import CategorySerializer, FeatureSerializer, DistrictSerializer
from drf_yasg.utils import swagger_auto_schema

class CategoryViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    @swagger_auto_schema(tags=["Core"])

    def list(self, request):
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)

class FeatureViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    @swagger_auto_schema(tags=["Core"])

    def list(self, request):
        queryset = Feature.objects.all()
        serializer = FeatureSerializer(queryset, many=True)
        return Response(serializer.data)

class DistrictViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    @swagger_auto_schema(tags=["Core"])

    def list(self, request):
        queryset = District.objects.all()
        serializer = DistrictSerializer(queryset, many=True)
        return Response(serializer.data)