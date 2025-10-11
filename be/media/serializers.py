from rest_framework import serializers
from .models import MediaFile

class MediaFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaFile
        fields = [
            'id', 'file', 'uploaded_by', 'upload_date', 'is_verified', 'file_type', 'unique_code'
        ]
        read_only_fields = ['unique_code', 'upload_date']

class MediaFileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaFile
        fields = ['file', 'uploaded_by', 'file_type']
