"use client";

import React, { useCallback, useMemo } from "react";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaHandshake,
  FaInstagram,
  FaClock,
  FaArrowLeft,
} from "react-icons/fa";

const PHONE_NUMBERS = {
  landlines: ["03136287184"],
  mobiles: ["09914448019"],
};

const DEFAULT_WHATSAPP = "09914448019";

const toIntl = (mobile: string) => {
  return mobile.replace(/^0/, "98");
};

const ContactSection = () => {
  const whatsappHref = useMemo(
    () => `https://wa.me/${toIntl(DEFAULT_WHATSAPP)}`,
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const name = (fd.get("name") as string) || "بدون نام";
      const phone = (fd.get("phone") as string) || "—";
      const message = (fd.get("message") as string) || "—";

      const text = `سلام، من ${name} هستم.%0Aشماره تماس: ${phone}%0Aپیام: ${message}`;
      const url = `${whatsappHref}?text=${text}`;
      window.open(url, "_blank");
    },
    [whatsappHref]
  );

  return (
    <section className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8 py-24">
      <div className="relative overflow-hidden sm:rounded-4xl bg-gradient-to-tr from-primary/20 to-transparent p-6 sm:p-10 lg:p-14 shadow-2xl">
        {/* پس‌زمینه‌های تزئینی */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* ستون اطلاعات تماس */}
          <div className="space-y-8">
            <header className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-primary drop-shadow-lg tracking-tight">
                با ما در ارتباط باشید
              </h2>
              <p className="text-base sm:text-lg leading-8 max-w-prose text-secendery">
                تیم ما آماده پاسخگویی سریع و حرفه‌ای است. اگر سوالی دارید،
                مشاوره می‌خواهید یا قصد شروع پروژه دارید، فرم را پر کنید یا از
                راه‌های زیر مستقیم تماس بگیرید.
              </p>
            </header>

            {/* دکمه‌های سریع */}
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:09914448019"
                className="group inline-flex items-center justify-center rounded-3xl px-6 py-3 bg-white text-primary font-bold shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
              >
                تمــاس مستقیــم
                <FaArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-3xl border border-white px-6 py-3 font-bold bg-white text-primary transition-all hover:scale-105"
              >
                واتساپ
                <FaWhatsapp className="ms-2" />
              </a>

              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-3xl border border-white px-6 py-3 font-bold bg-white text-primary transition-all hover:scale-105"
                aria-label="Instagram amlak_fallah4500"
              >
                اینستاگرام
                <FaInstagram className="ms-2" />
              </a>
            </div>

            {/* کارت اطلاعات دفتر */}
            <div className="rounded-3xl border bg-white/90 backdrop-blur p-6 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <FaHandshake className="h-5 w-5 text-[var(--color-secendery)]" />
                <h3 className="text-xl font-extrabold">دفتر مشاورین املاک چگاه</h3>
              </div>

              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 h-5 w-5 text-[var(--color-secendery)]" />
                  <span>آدرس: اصفهان، توحید میانی ، کوچه ۳۱ ، املاک چگاه—</span>
                </li>

                {/* تلفن‌های ثابت */}
                {PHONE_NUMBERS.landlines.map((n) => (
                  <li
                    key={n}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <FaPhoneAlt className="mt-1 h-5 w-5 text-[var(--color-secendery)]" />
                      <span>
                        تلفن:{" "}
                        <span dir="ltr" className="font-semibold">
                          {n}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${n}`}
                        className="text-primary text-sm font-bold hover:underline"
                      >
                        بــرای تــماس کلیــک کنید
                      </a>
                    </div>
                  </li>
                ))}

                {/* موبایل‌ها + واتساپ */}
                {PHONE_NUMBERS.mobiles.map((m) => (
                  <li
                    key={m}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <FaWhatsapp className="mt-1 h-5 w-5 text-[var(--color-secendery)]" />
                      <span>
                        موبایل/واتساپ:{" "}
                        <span dir="ltr" className="font-semibold">
                          {m}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${m}`}
                        className="text-primary text-sm font-bold hover:underline"
                      >
                        تماس
                      </a>
                      <span> / </span>
                      <a
                        href={`https://wa.me/${toIntl(m)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm font-bold hover:underline"
                      >
                        چت واتساپ
                      </a>
                    </div>
                  </li>
                ))}

                <li className="flex items-start gap-3">
                  <FaClock className="mt-1 h-5 w-5 text-[var(--color-secendery)]" />
                  <span>ساعات کاری: ۹ الی ۱۴ ، ۱۶ الی ۲۲</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ستون فرم تماس */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-4xl p-6 sm:p-8 lg:p-10 shadow-2xl flex-1 flex flex-col gap-5 transform transition-transform hover:scale-[1.01]"
            >
              <label className="text-sm font-bold text-gray-700" htmlFor="name">
                نام شما
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="مثلاً علی رضایی"
                className="border border-gray-300 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary focus:outline-none text-base"
                required
              />

              <label
                className="text-sm font-bold text-gray-700"
                htmlFor="phone"
              >
                تلفن شما
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                dir="rtl"
                inputMode="tel"
                placeholder="0912xxxxxxx"
                className="border border-gray-300 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary focus:outline-none text-base"
                pattern="^(\+?98|0)?9\d{9}$|^\d{7,11}$"
                title="شماره موبایل ایرانی یا تلفن ثابت"
                required
              />

              <label
                className="text-sm font-bold text-gray-700"
                htmlFor="message"
              >
                پیام شما
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="موضوع همکاری یا پرسش خود را بنویسید..."
                rows={5}
                className="border border-gray-300 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary focus:outline-none text-base"
                required
              />

              <button
                type="submit"
                className="bg-primary text-white font-bold py-4 rounded-2xl text-lg hover:bg-secendery transition-all shadow-xl hover:shadow-2xl"
              >
                ارسال پیام در واتساپ
              </button>

              <p className="text-xs text-gray-500">
                با ارسال فرم، پیام شما در واتساپ به صورت خودکار ساخته و باز
                می‌شود. اگر واتساپ وب باز نشد، دکمه «واتساپ» بالا را بزنید.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
