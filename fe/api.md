برای اتصال فرانت‌اند (Next.js) به بک‌اند با توجه به APIهای ارائه‌شده، باید در بخش‌های مختلف پروژه src/app از این APIها استفاده کنید. در ادامه، برای هر بخش مهم فرانت‌اند، API مورد نیاز را معرفی می‌کنم:

1. صفحه خانه (Home)
نمایش لیست املاک جدید/ویژه:
API: GET /api/prop/property/filter/
توضیح: برای گرفتن لیست املاک (با فیلتر یا بدون فیلتر) استفاده می‌شود.
2. صفحه لیست املاک (properties)
نمایش لیست املاک با فیلتر:

API: GET /api/prop/property/filter/
پارامترها: category، district، price_min، price_max، area_min، area_max و ...
توضیح: برای نمایش لیست املاک با فیلترهای مختلف.
جستجوی ملک:

API: GET /api/prop/property/search/
توضیح: برای جستجوی سریع ملک بر اساس عبارت جستجو.
3. صفحه جزئیات ملک (properties/[code])
نمایش اطلاعات کامل یک ملک:
API: GET /api/prop/property/{code}/
توضیح: برای گرفتن اطلاعات کامل یک ملک با کد خاص.
4. صفحه ثبت درخواست خرید/اجاره (request)
ثبت درخواست مشتری:
API: POST /api/prop/interested-customer/create/
توضیح: برای ثبت درخواست خرید یا اجاره توسط کاربر.
5. صفحه ثبت ملک توسط کاربر (submit)
ثبت ملک جدید:
API: POST /api/prop/registered-property/create/
توضیح: برای ثبت ملک توسط کاربر (در صورت وجود این قابلیت).
6. فیلترها و فرم‌ها (در همه صفحات مرتبط)
دریافت دسته‌بندی‌ها:
API: GET /api/core/categories/
دریافت محله‌ها:
API: GET /api/core/districts/
دریافت امکانات:
API: GET /api/core/features/
7. صفحه درباره ما (About)، تماس با ما (Contact) و صفحات استاتیک
معمولاً نیاز به API ندارند مگر برای ارسال فرم تماس یا دریافت اطلاعات پویا.
خلاصه اتصال
Home: لیست املاک (/prop/property/filter/)
properties: لیست و جستجو (/prop/property/filter/, /prop/property/search/)
properties/[code]: جزئیات ملک (/prop/property/{code}/)
request: ثبت درخواست (/prop/interested-customer/create/)
submit: ثبت ملک (/prop/registered-property/create/)
فیلترها: دسته‌بندی، محله، امکانات (/core/categories/, /core/districts/, /core/features/)
اگر بخشی از فرانت‌اند را اضافه یا تغییر دهید که نیاز به API جدید دارد، باید endpoint مناسب را اضافه کنید.
در صورت نیاز به نمونه کد fetch یا اتصال هر بخش، اطلاع دهید تا کد آماده کنم.