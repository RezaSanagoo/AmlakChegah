#!/bin/bash
set -e

python manage.py migrate --noinput
python manage.py collectstatic --noinput
exec gunicorn ChegahBack.wsgi:application --bind 0.0.0.0:8010
