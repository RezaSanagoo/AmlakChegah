FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    python3-dev \
    build-essential \
    && apt-get clean

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
