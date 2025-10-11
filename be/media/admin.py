from django.contrib import admin
from .models import PropertyMedia

@admin.register(PropertyMedia)
class PropertyMediaAdmin(admin.ModelAdmin):
    list_display = ('property', 'file', 'is_image', 'approved', 'uploaded_at')
    list_filter = ('is_image', 'approved')
    search_fields = ('property__title',)
    list_editable = ('approved',)
