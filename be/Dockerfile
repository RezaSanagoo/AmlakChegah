FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*


RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

COPY . .

ENV DJANGO_SETTINGS_MODULE=ChegahBack.settings
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# فایل entrypoint را قابل اجرا کن
RUN chmod +x ./entrypoint.sh

# جمع‌آوری فایل‌های استاتیک
RUN python manage.py collectstatic --noinput

ENTRYPOINT ["./entrypoint.sh"]
