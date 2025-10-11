from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, LoginLog
from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from admin_interface.models import Theme

class UserCreationForm(forms.ModelForm):
    password = forms.CharField(label='رمز عبور', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'phone_number', 'is_consultant', 'can_edit', 'can_delete')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user

class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField(label="رمز عبور (هش شده فقط خواندنی)")

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'phone_number', 'is_consultant', 'can_edit', 'can_delete', 'password', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')

    def clean_password(self):
        return self.initial["password"]

@admin.register(User)
class UserAdmin(BaseUserAdmin):  # نکته مهم: ارث‌بری از BaseUserAdmin
    add_form = UserCreationForm
    form = UserChangeForm
    list_display = ('username', 'first_name', 'last_name', 'phone_number', 'is_consultant')
    list_filter = ('is_consultant',)
    search_fields = ('username', 'first_name', 'last_name', 'phone_number')
    fieldsets = (
        ('مشخصات کاربر', {
            'fields': ('username', 'password', 'first_name', 'last_name', 'email', 'phone_number', 'telegram_id')
        }),
        ('دسترسی‌ها', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'is_consultant')
        }),
        ('گروه‌ها و مجوزها', {
            'fields': ('groups', 'user_permissions')
        }),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password', 'first_name', 'last_name', 'phone_number', 'telegram_id', 'is_active', 'is_staff', 'is_consultant', 'groups'),
        }),
    )

    def has_change_permission(self, request, obj=None):
        if request.user.is_consultant and not request.user.can_edit:
            return False
        return super().has_change_permission(request, obj)

    def has_delete_permission(self, request, obj=None):
        if request.user.is_consultant and not request.user.can_delete:
            return False
        return super().has_delete_permission(request, obj)

    def has_add_permission(self, request):
        if request.user.is_consultant:
            return False
        return super().has_add_permission(request)
    
@admin.register(LoginLog)
class LoginLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'login_time', 'ip_address')
    list_filter = ('user',)
    search_fields = ('user__username', 'ip_address')

    def has_delete_permission(self, request, obj=None):
        return False  # حذف غیرمجاز

    def has_add_permission(self, request):
        return False  # افزودن دستی غیرمجاز


class ThemeAdmin(admin.ModelAdmin):
    def has_module_permission(self, request):
        return request.user.is_superuser  # فقط سوپریوزرها بخش Theme را ببینند

admin.site.unregister(Theme)  # اگر قبلاً ثبت شده
admin.site.register(Theme, ThemeAdmin)