FROM python:3.11-slim

WORKDIR /app

# فقط در صورت تغییر در requirements.txt نصب پکیج‌ها دوباره انجام می‌شود
COPY requirements.txt ./

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
 && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

# از اینجا به بعد کد پروژه کپی می‌شود
COPY . .

# تنظیمات محیط
ENV DJANGO_SETTINGS_MODULE=ChegahBack.settings
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN chmod +x ./entrypoint.sh

# ⚠️ collectstatic را حذف کن از مرحله build
# چون ممکن است هنوز DB و static volume آماده نباشد
# RUN python manage.py collectstatic --noinput

ENTRYPOINT ["./entrypoint.sh"]
