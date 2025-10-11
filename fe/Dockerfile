# مرحله اول: نصب و build پروژه
FROM node:20 AS builder

# دایرکتوری کاری
WORKDIR /app

# نصب پکیج‌ها
COPY package*.json ./
RUN npm install --legacy-peer-deps

# کپی سایر فایل‌ها و build
COPY . .
RUN npm run build

# مرحله دوم: اجرای پروژه با Next.js
FROM node:20-alpine AS runner

# برای استفاده از production mode
ENV NODE_ENV=production
ENV PORT=3010

# دایرکتوری کاری
WORKDIR /app

# فقط فایل‌های لازم برای اجرا رو کپی کن
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# پورت دیفالت Next.js
EXPOSE 3010

# دستور اجرا
CMD ["npm", "start"]
