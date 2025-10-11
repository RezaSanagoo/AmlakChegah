from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Property, InterestedCustomer, RegisteredProperty
from .serializers import (
    PropertyMiniSerializer,
    InterestedCustomerSerializer,
    RegisteredPropertySerializer,
    PropertyDetailSerializer,
)
from django.db.models import Q
from drf_yasg.utils import swagger_auto_schema
from rest_framework.pagination import PageNumberPagination

# 1. سرچ ساده (۱۰ نتیجه مرتبط)
class PropertySearchAPIView(APIView): # Done
    @swagger_auto_schema(tags=["Property"])
    def get(self, request):
        q = request.GET.get('q', '')
        qs = Property.objects.filter(
            Q(title__icontains=q) |
            Q(category__name__icontains=q) |
            Q(district__name__icontains=q) |
            Q(code__icontains=q)
        ).order_by('-created_at')[:10]
        data = PropertyMiniSerializer(qs, many=True).data
        return Response(data)

# 2. فیلتر پیشرفته
class PropertyPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

class PropertyFilterAPIView(APIView): # Done
    @swagger_auto_schema(tags=["Property"])
    def get(self, request):
        filters = {}
        for field in ['title', 'code', 'bedrooms', 'year_built']:
            value = request.GET.get(field)
            if value:
                filters[f"{field}__icontains"] = value

        category_value = request.GET.get('category')
        if category_value:
            filters["category__name__icontains"] = category_value

        district_value = request.GET.get('district')
        if district_value:
            filters["district__name__icontains"] = district_value

        # فیلترهای عددی
        price_min = request.GET.get('price_min')
        if price_min:
            filters['price__gte'] = price_min

        price_max = request.GET.get('price_max')
        if price_max:
            filters['price__lte'] = price_max

        area_min = request.GET.get('area_min')
        if area_min:
            filters['area__gte'] = area_min

        area_max = request.GET.get('area_max')
        if area_max:
            filters['area__lte'] = area_max

        qs = Property.objects.filter(**filters).order_by('-created_at')

        # pagination
        paginator = PropertyPagination()
        paginated_qs = paginator.paginate_queryset(qs, request)
        data = PropertyMiniSerializer(paginated_qs, many=True).data
        return paginator.get_paginated_response(data)

# 3. ثبت InterestedCustomer
class InterestedCustomerCreateAPIView(APIView): # Done
    @swagger_auto_schema(tags=["Property"])
    def post(self, request):
        serializer = InterestedCustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'success'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 4. ثبت RegisteredProperty
class RegisteredPropertyCreateAPIView(APIView): # Done
    @swagger_auto_schema(tags=["Property"])
    def post(self, request):
        serializer = RegisteredPropertySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'success'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 5. دریافت Property با code
class PropertyByCodeAPIView(APIView): # Done
    @swagger_auto_schema(tags=["Property"])
    def get(self, request, code):
        try:
            prop = Property.objects.get(code=code)
        except Property.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=404)
        data = PropertyDetailSerializer(prop).data
        return Response(data)
