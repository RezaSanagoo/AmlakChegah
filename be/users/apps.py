from django.apps import AppConfig

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'

    def ready(self):
        from django.contrib.auth.signals import user_logged_in
        from django.dispatch import receiver
        from .models import LoginLog, User

        @receiver(user_logged_in)
        def log_admin_login(sender, request, user, **kwargs):
            # فقط اگر وارد پنل ادمین شد
            if request.path.startswith('/admin'):
                LoginLog.objects.create(
                    user=user,
                    ip_address=request.META.get('REMOTE_ADDR')
                )