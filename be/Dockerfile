FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt ./

# ✅ mirror اصلاح‌شده و نصب پکیج‌ها
RUN if [ -f /etc/apt/sources.list ]; then \
        sed -i 's|deb.debian.org|mirror.yandex.ru|g' /etc/apt/sources.list; \
    elif [ -f /etc/apt/sources.list.d/debian.sources ]; then \
        sed -i 's|deb.debian.org|mirror.yandex.ru|g' /etc/apt/sources.list.d/debian.sources; \
    else \
        echo "⚠️ No sources.list found — using default Debian mirrors."; \
    fi \
 && apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
 && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

COPY . .

ENV DJANGO_SETTINGS_MODULE=ChegahBack.settings
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
