from django.db import models

class Category(models.Model):
    name = models.CharField("نام دسته‌بندی", max_length=100)
    code_prefix = models.CharField("پیشوند کد", max_length=5)  # مثلا A برای اجاره

    class Meta:
        verbose_name = "دسته‌بندی"
        verbose_name_plural = "دسته‌بندی‌ها"

    def __str__(self):
        return self.name


class Feature(models.Model):
    name = models.CharField("نام ویژگی", max_length=100)

    class Meta:
        verbose_name = "ویژگی"
        verbose_name_plural = "ویژگی‌ها"

    def __str__(self):
        return self.name


class District(models.Model):  # محله‌ها
    name = models.CharField("نام محله", max_length=100)
    city = models.CharField("شهر", max_length=100)

    class Meta:
        verbose_name = "محله"
        verbose_name_plural = "محله‌ها"

    def __str__(self):
        return self.name
