#!/bin/bash

set -e  # اگه خطا پیش اومد، اسکریپت متوقف شه

cd /home/ch/chegah

echo "🧲 Pulling latest code..."
git reset --hard
git pull origin main 

echo "🐳 Rebuilding Docker containers..."
docker compose down
docker compose up --build -d

echo "✅ Deployment done."
