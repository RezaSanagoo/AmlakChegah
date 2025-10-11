from django.db import models
from properties.models import Property
from django.utils.html import format_html


def property_media_path(instance, filename):
    return f"properties/{instance.property.id}/{filename}"


class PropertyMedia(models.Model):
    property = models.ForeignKey(
        Property,
        verbose_name="ملک",
        on_delete=models.CASCADE,
        related_name='media'
    )
    file = models.FileField("فایل", upload_to=property_media_path)
    is_image = models.BooleanField("تصویر است", default=True)
    uploaded_at = models.DateTimeField("تاریخ بارگذاری", auto_now_add=True)
    approved = models.BooleanField("تأیید شده", default=False)

    class Meta:
        verbose_name = "رسانه ملک"
        verbose_name_plural = "رسانه‌های ملک"

    def __str__(self):
        return f"رسانه برای {self.property.title}"

    def thumbnail(self):
        if self.file and self.file.url.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp')):
            return format_html(
                '<img src="{}" width="80" style="object-fit:contain; border-radius:4px;"/>',
                self.file.url
            )
        return "-"
    thumbnail.short_description = "پیش‌نمایش"
