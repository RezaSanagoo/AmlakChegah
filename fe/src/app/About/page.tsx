"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaShieldAlt,
  FaHandshake,
  FaPhoneAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

// داده‌ها
const stats = [
  { label: "فایل‌های فعال", value: "50 +" },
  { label: "سال سابقه", value: "12 +" },
  { label: "مشتریان راضی", value: "95% +" },
  { label: "پوشش منطقه", value: "اصفهان" },
];

const values = [
  {
    title: "صداقت و شفافیت",
    desc: "ارائه اطلاعات دقیق، بازدیدهای واقعی و قیمت‌گذاری شفاف برای تصمیم‌گیری مطمئن.",
    icon: <FaShieldAlt className="h-7 w-7" aria-hidden />,
  },
  {
    title: "کارشناسی حقوقی",
    desc: "همراهی در بررسی اسناد، قولنامه امن و کاهش ریسک‌های حقوقی معامله.",
    icon: <FaCheckCircle className="h-7 w-7" aria-hidden />,
  },
  {
    title: "تخصص محلی اصفهان",
    desc: "شناخت ریزمحله‌ها، دسترسی‌ها و پتانسیل رشد برای خرید و سرمایه‌گذاری بهتر.",
    icon: <FaMapMarkerAlt className="h-7 w-7" aria-hidden />,
  },
  {
    title: "همراه تا کلید",
    desc: "از اولین تماس تا انتقال سند و تحویل کلید کنار شما هستیم.",
    icon: <FaHandshake className="h-7 w-7" aria-hidden />,
  },
];

export default function AboutAmlakFallah() {
  return (
    <main
      
     
      className="min-h-screen bg-white text-gray-900"
     
    >
      {/* بخش هرو */}
      <section className="relative overflow-hidden pt-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 my-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-1"
            style={{
              background:
                "linear-gradient(135deg, var(--color-hover-min), var(--color-hover))",
            }}
          >
            <div className="rounded-2xl bg-white p-8 sm:p-12">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                {/* متن */}
                <div className="max-w-2xl">
                  <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
                    مشاورین املاک چگاه — همراه امن معاملات در{" "}
                    <span className="text-[var(--color-secendery)]">
                      اصفهان
                    </span>
                  </h1>
                  <p className="mt-4 text-gray-600 text-lg leading-8">
                    ما یک دفتر مشاور املاک محلی در اصفهان هستیم که با تکیه بر
                    صداقت، شناخت دقیق محله و تیم کارآزموده، تجربه‌ای مطمئن از
                    خرید، فروش و رهن و اجاره را برای شما می‌سازیم.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      href="/listings"
                      className="group inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-bold text-white shadow-sm transition-all hover:shadow-md"
                      style={{ background: "var(--color-gradient)" }}
                    >
                      <FaArrowRight className="mx-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                      مشاهده فایل‌ها
                    </Link>
                    <Link
                      href="/Contact"
                      className="inline-flex items-center justify-center rounded-2xl border px-5 py-3 text-base font-bold text-[var(--color-secendery)] hover:bg--hover-min"
                    >
                      تماس با ما
                      <FaPhoneAlt className="ms-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>

                {/* کارت کناری */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mt-8 w-full lg:mt-0 lg:w-[28rem]"
                >
                  <div className="relative rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl bg--hover-min p-3">
                        <FaShieldAlt className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold">
                          تعهد به نتیجه
                        </h3>
                        <p className="mt-1 text-gray-600 leading-7">
                          هر فایل قبل از ارائه، از نظر اصالت و قیمت بررسی می‌شود
                          تا انتخاب شما دقیق‌تر و مطمئن‌تر باشد.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 px-12 flex items-center gap-2 text-sm text-gray-500">
                      <FaMapMarkerAlt className="h-4 w-4" />
                     اصفهان
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* آمار */}
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="rounded-2xl border bg-white p-5 text-center transition-shadow hover:shadow-sm"
                  >
                    <div className="text-2xl sm:text-3xl font-black tracking-tight text-primary">
                      {s.value}
                    </div>
                    <div className="py-1 text-sm text-gray-600">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* چرا مشاورین املاک چگاه */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 lg:py-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold">چرا مشاورین املاک چگاه؟</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative">
                <div className="inline-flex items-center justify-center rounded-2xl bg--hover-min p-3 text-primary">
                  {v.icon}
                </div>
                <h3 className="mt-4 text-xl font-extrabold">{v.title}</h3>
                <p className="mt-2 text-gray-600 leading-7">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA پایانی */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-3xl p-[1px]"
          style={{
            background:
              "linear-gradient(135deg, var(--color-hover-min), var(--color-hover))",
          }}
        >
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-white p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold">
                برای معامله‌ای امن و سریع آماده‌اید؟
              </h3>
              <p className="mt-2 text-gray-600">
                با ما تماس بگیرید تا در کوتاه‌ترین زمان، فایل مناسب شما را معرفی
                کنیم.
              </p>
            </div>
            <Link
              href="/Contact"
              className="group inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-bold text-white shadow-sm transition-all hover:shadow-md"
              style={{ background: "var(--color-gradient)" }}
            >
              <FaArrowRight className="mx-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              شروع گفتگو{" "}
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
