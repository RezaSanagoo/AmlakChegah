from rest_framework import viewsets, permissions, filters
from .models import MediaFile
from .serializers import MediaFileSerializer, MediaFileCreateSerializer

class MediaFileViewSet(viewsets.ModelViewSet):
    queryset = MediaFile.objects.all().order_by('-upload_date')
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ['create', 'update']:
            return MediaFileCreateSerializer
        return MediaFileSerializer

    def perform_create(self, serializer):
        serializer.save()
