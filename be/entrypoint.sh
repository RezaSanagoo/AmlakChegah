#!/bin/bash
# اجرای مایگریشن‌ها
python manage.py migrate --noinput

# ساخت سوپر یوزر در صورت نیاز (اختیاری - می‌تونی حذفش کنی یا شرطی کنی)
# echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', 'admin@example.com', 'adminpass')" | python manage.py shell
python manage.py collectstatic --noinput

# اجرای گانیکورن
exec gunicorn ChegahBack.wsgi:application --bind 0.0.0.0:8010
