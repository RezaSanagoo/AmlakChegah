from django.urls import path
from .views import (
    PropertySearchAPIView,
    PropertyFilterAPIView,
    InterestedCustomerCreateAPIView,
    RegisteredPropertyCreateAPIView,
    PropertyByCodeAPIView,
)

urlpatterns = [
    path('property/search/', PropertySearchAPIView.as_view(), name='property-search'),
    path('property/filter/', PropertyFilterAPIView.as_view(), name='property-filter'),
    path('interested-customer/create/', InterestedCustomerCreateAPIView.as_view(), name='interested-customer-create'),
    path('registered-property/create/', RegisteredPropertyCreateAPIView.as_view(), name='registered-property-create'),
    path('property/<str:code>/', PropertyByCodeAPIView.as_view(), name='property-by-code'),
]