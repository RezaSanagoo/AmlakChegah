#!/bin/bash

set -e  # اگه خطا پیش اومد، اسکریپت متوقف شه

cd ~/Chegah/AmlakChegah

echo "🧲 Pulling latest code..."
git reset --hard
git pull origin main 

echo "🐳 Rebuilding Docker containers..."
docker compose down
docker compose build --progress=plain --no-cache -d


echo "✅ Deployment done."
