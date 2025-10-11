from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    is_consultant = models.BooleanField("مشاور است", default=False)
    phone_number = models.CharField("شماره تلفن", max_length=20)
    telegram_id = models.CharField("آیدی تلگرام", max_length=64, blank=True, null=True)

    # برای کنترل دسترسی فایل‌ها
    can_edit = models.BooleanField("اجازه ویرایش دارد", default=False)
    can_delete = models.BooleanField("اجازه حذف دارد", default=False)

    class Meta:
        verbose_name = "کاربر"
        verbose_name_plural = "کاربران"

    def __str__(self):
        return f"{self.username} - {self.phone_number}" if self.phone_number else self.username


class LoginLog(models.Model):
    user = models.ForeignKey(User, verbose_name="کاربر", on_delete=models.CASCADE)
    login_time = models.DateTimeField("زمان ورود", auto_now_add=True)
    ip_address = models.GenericIPAddressField("آدرس IP", blank=True, null=True)

    class Meta:
        ordering = ['-login_time']
        verbose_name = "گزارش ورود"
        verbose_name_plural = "گزارش‌های ورود"

    def __str__(self):
        return f"{self.user.username} در {self.login_time.strftime('%Y-%m-%d %H:%M')}"
