from rest_framework import serializers
from .models import Property, InterestedCustomer, RegisteredProperty

class PropertyMiniSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    category = serializers.StringRelatedField()
    district = serializers.StringRelatedField()

    class Meta:
        model = Property
        fields = [
            'code', 'title', 'price', 'monthly_rent', 'category', 'district',
            'area', 'bedrooms', 'has_parking', 'image'
        ]

    def get_image(self, obj):
        media = obj.media.first()  # فرض بر این است که related_name='medias' است
        if media and hasattr(media, 'file'):
            return media.file.url
        return None
    
class PropertyDetailSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    category = serializers.StringRelatedField()
    district = serializers.StringRelatedField()
    features = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field="name"
    )
    class Meta:
        model = Property
        fields = [
            'title',
            'category',
            'district',
            'features',
            'code',
            'price',
            'monthly_rent',
            'area',
            'has_parking',
            'bedrooms',
            'year_built',
            'floors',
            'is_exchange',
            'has_key',
            'is_advertised',
            'is_video_recorded',
            'consultant',
            'notes_public',
            'approved',
            'created_at',
            'images'
        ]

    def get_images(self, obj):
        return [media.file.url for media in getattr(obj, 'media', []).all()]


class InterestedCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterestedCustomer
        fields = '__all__'

class RegisteredPropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisteredProperty
        fields = '__all__'