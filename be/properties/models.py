from django.db import models
from core.models import Category, Feature, District
from users.models import User


class PropertyManager(models.Manager):
    def recent_rentals(self):
        return self.filter(category__code_prefix='A').order_by('-created_at')[:10]


class Property(models.Model):
    title = models.CharField("عنوان ملک", max_length=255)
    category = models.ForeignKey(Category, verbose_name="دسته‌بندی", on_delete=models.SET_NULL, null=True)
    district = models.ForeignKey(District, verbose_name="محله", on_delete=models.SET_NULL, null=True)
    features = models.ManyToManyField(Feature, verbose_name="ویژگی‌ها", blank=True)
    code = models.CharField("کد ملک", max_length=10, unique=True, blank=True, editable=False)

    price = models.PositiveIntegerField("قیمت")
    monthly_rent = models.PositiveIntegerField("اجاره ماهانه", null=True, blank=True)
    area = models.PositiveIntegerField("متراژ", help_text="متراژ به متر مربع")
    has_parking = models.BooleanField("پارکینگ دارد", default=False)
    bedrooms = models.PositiveIntegerField("تعداد خواب")
    year_built = models.PositiveIntegerField("سال ساخت")
    floors = models.PositiveIntegerField("تعداد طبقات")
    is_exchange = models.BooleanField("معاوضه دارد", default=False)
    has_key = models.BooleanField("کلید تحویل دارد", default=False)
    is_advertised = models.BooleanField("آگهی شده", default=False)
    is_video_recorded = models.BooleanField("فیلمبرداری شده", default=False)

    consultant = models.ForeignKey(User, verbose_name="مشاور", on_delete=models.SET_NULL, null=True)
    notes_internal = models.TextField("یادداشت داخلی", blank=True, help_text="فقط برای دفتر")
    notes_public = models.TextField("توضیحات عمومی", blank=True)

    approved = models.BooleanField("تأیید مدیر", default=False)
    created_at = models.DateTimeField("تاریخ ثبت", auto_now_add=True)

    objects = PropertyManager()

    class Meta:
        verbose_name = "ملک"
        verbose_name_plural = "املاک"

    def __str__(self):
        return self.title

    def generate_code(self):
        prefix = self.category.code_prefix if self.category else "X"
        return f"{prefix}{self.pk:05}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not self.code:
            self.code = self.generate_code()
            super().save(update_fields=['code'])


class InterestedCustomer(models.Model):
    property = models.ForeignKey(Property, verbose_name="ملک مورد نظر", on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField("نام مشتری", max_length=100)
    phone = models.CharField("شماره تماس", max_length=20)
    price_min = models.PositiveIntegerField("حداقل قیمت", null=True, blank=True)
    price_max = models.PositiveIntegerField("حداکثر قیمت", null=True, blank=True)
    area_min = models.PositiveIntegerField("حداقل متراژ", null=True, blank=True)
    area_max = models.PositiveIntegerField("حداکثر متراژ", null=True, blank=True)
    category = models.ForeignKey(Category, verbose_name="دسته‌بندی", on_delete=models.SET_NULL, null=True)
    district = models.ForeignKey(District, verbose_name="محله", on_delete=models.SET_NULL, null=True)
    registered_by = models.ForeignKey(User, verbose_name="ثبت‌شده توسط", on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        verbose_name = "مشتری علاقه‌مند"
        verbose_name_plural = "مشتریان علاقه‌مند"

    def __str__(self):
        return self.name


class RegisteredProperty(models.Model):
    name = models.CharField("نام مالک", max_length=100)
    phone = models.CharField("شماره تماس", max_length=20)
    price = models.PositiveIntegerField("قیمت")
    category = models.ForeignKey(Category, verbose_name="دسته‌بندی", on_delete=models.SET_NULL, null=True)
    district = models.ForeignKey(District, verbose_name="محله", on_delete=models.SET_NULL, null=True)
    area = models.PositiveIntegerField("متراژ", help_text="متراژ به متر مربع")

    class Meta:
        verbose_name = "ملک ثبت‌شده"
        verbose_name_plural = "املاک ثبت‌شده"

    def __str__(self):
        return self.name


class Reminder(models.Model):
    user = models.ForeignKey(User, verbose_name="کاربر", on_delete=models.CASCADE)
    title = models.CharField("عنوان یادآور", max_length=100)
    due_date = models.DateField("تاریخ سررسید")
    notes = models.TextField("یادداشت", blank=True)
    created_at = models.DateTimeField("تاریخ ایجاد", auto_now_add=True)

    class Meta:
        verbose_name = "یادآور"
        verbose_name_plural = "یادآورها"

    def __str__(self):
        return self.title
