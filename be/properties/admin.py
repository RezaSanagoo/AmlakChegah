from django.contrib import admin
from .models import Property, InterestedCustomer, Reminder, RegisteredProperty
from media.models import PropertyMedia

class MediaInline(admin.TabularInline):
    model = PropertyMedia
    extra = 1
    readonly_fields = ('thumbnail', 'approved')
    fields = ('file', 'thumbnail', 'is_image', 'approved')

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'code', 'category', 'district', 'price', 'area', 'consultant', 'approved', 'created_at')
    list_filter = ('category', 'district', 'approved', 'has_key', 'is_exchange')
    search_fields = ('title', 'notes_public', 'notes_internal')
    list_editable = ('approved',)
    readonly_fields = ('created_at', 'code')
    inlines = [MediaInline]

    fieldsets = (
        ('اطلاعات پایه', {
            'fields': ('title', 'category', 'district', 'price', 'monthly_rent', 'area', 'features')
        }),
        ('جزئیات ملک', {
            'fields': ('has_key', 'is_advertised', 'is_video_recorded', 'is_exchange', 'has_parking', 'bedrooms', 'floors', 'year_built')
        }),
        ('مشاور و یادداشت‌ها', {
            'fields': ('consultant', 'notes_public', 'notes_internal')
        }),
        ('کنترل تایید', {
            'fields': ('approved',)
        }),
    )

@admin.register(InterestedCustomer)
class InterestedCustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'category', 'district', 'price_min', 'price_max', 'area_min', 'area_max', 'registered_by')
    search_fields = ('name', 'phone')
    list_filter = ('registered_by',)

@admin.register(RegisteredProperty)
class RegisteredPropertyAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'category', 'district', 'price', 'area')
    search_fields = ('name', 'phone', 'category', 'district')
    list_filter = ('category', 'district')

@admin.register(Reminder)
class ReminderAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'due_date', 'created_at')
    list_filter = ('user',)
    search_fields = ('title', 'notes')
