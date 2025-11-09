"use client";
import React, { useState, useEffect } from "react";

const RequestPage = () => {
  const [formData, setFormData] = useState({
    category: "", // category id
    district: "", // district id
    price_min: "",
    price_max: "",
    area_min: "",
    area_max: "",
    description: "",
    name: "",
    phone: "",
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [districts, setDistricts] = useState<{ id: number; name: string }[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://194.60.231.96:8020//api/core/categories/")
      .then((r) => r.json())
      .then(setCategories);
    fetch("http://194.60.231.96:8020//api/core/districts/")
      .then((r) => r.json())
      .then(setDistricts);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // اضافه شده: توابع کمکی برای نرمال‌سازی ارقام فارسی/عربی، پاک‌سازی و فرمت سه‌رقمی
  const normalizeDigits = (s: string) =>
    s
      // ارقام فارسی ۰-۹
      .replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06F0))
      // ارقام عربی-هندی ٠-٩
      .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660));

  const stripNonDigits = (s: string) => {
    const normalized = normalizeDigits(s || "");
    return normalized.replace(/\D/g, "");
  };

  const formatNumber = (s: string) => {
    const digits = stripNonDigits(s);
    if (!digits) return "";
    // از Intl.NumberFormat برای جداکننده‌های سه‌رقمی استفاده می‌کنیم (ویرایش بصری)
    return new Intl.NumberFormat("en-US").format(Number(digits));
  };
  

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.category) newErrors.category = "لطفاً نوع ملک را انتخاب کنید";
    if (!formData.district) newErrors.district = "محدوده موردنظر الزامی است";
    if (!formData.name) newErrors.name = "نام و نام خانوادگی الزامی است";
    if (!formData.phone) newErrors.phone = "شماره تماس الزامی است";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // آماده‌سازی payload برای بک‌اند
    const payload: any = {
      name: formData.name,
      phone: formData.phone,
      category: formData.category ? Number(formData.category) : null,
      district: formData.district ? Number(formData.district) : null,
      price_min: formData.price_min ? Number(formData.price_min) : null,
      price_max: formData.price_max ? Number(formData.price_max) : null,
      area_min: formData.area_min ? Number(formData.area_min) : null,
      area_max: formData.area_max ? Number(formData.area_max) : null,
      notes_public: formData.description,
    };

    try {
      const res = await fetch("http://194.60.231.96:8020//api/prop/interested-customer/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
        setNotice("✅ درخواست شما با موفقیت ثبت شد. همکاران ما به زودی با شما تماس خواهند گرفت.");
      } else {
        const data = await res.json();
        setNotice("خطا در ثبت: " + JSON.stringify(data));
      }
    } catch {
      setNotice("خطا در ارتباط با سرور.");
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-23 text-center">
        <div className="py-12">
          <h1 className="text-2xl font-bold text-green-600 mb-4">
            {notice}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-23">
      <div className="py-12 bg-gradient-to-tr from-primary/10 to-secendery/20 rounded-3xl shadow-2xl p-8 border border-primary/20">
        <h1 className="text-4xl font-extrabold text-primary text-center mb-8">
          فرم درخواست ملک
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 ">
          {/* نوع ملک */}
          <div>
            <label className="block mb-2 font-bold text-primary">نوع ملک</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full border rounded-lg p-3 focus:outline-none ${
                errors.category
                  ? "border-red-500"
                  : "border-gray-300 focus:ring focus:ring-blue-400"
              }`}
            >
              <option value="">انتخاب کنید...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* محدوده */}
          <div>
            <label className="block mb-2 font-bold text-primary">
              محدوده موردنظر
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className={`w-full border rounded-lg p-3 focus:outline-none ${
                errors.district
                  ? "border-red-500"
                  : "border-gray-300 focus:ring focus:ring-blue-400"
              }`}
            >
              <option value="">انتخاب کنید...</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-500 text-sm mt-1">{errors.district}</p>
            )}
          </div>

          {/* بودجه */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block mb-2 font-bold text-primary">
                حداقل بودجه (تومان)
              </label>
              <input
                type="text"
                name="price_min"
                value={formData.price_min ? formatNumber(formData.price_min) : ""}
                onChange={(e) => {
                  const digits = stripNonDigits(e.target.value);
                  setFormData({ ...formData, price_min: digits });
                  setErrors({ ...errors, price_min: "" });
                }}
                placeholder="مثلاً: ۵۰۰۰۰۰۰۰۰"
                className="w-full border rounded-lg p-3 focus:outline-none border-gray-300 focus:ring focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-primary">
                حداکثر بودجه (تومان)
              </label>
              <input
                type="text"
                name="price_max"
                value={formData.price_max ? formatNumber(formData.price_max) : ""}
                onChange={(e) => {
                  const digits = stripNonDigits(e.target.value);
                  setFormData({ ...formData, price_max: digits });
                  setErrors({ ...errors, price_max: "" });
                }}
                placeholder="مثلاً: ۳۰۰۰۰۰۰۰۰۰"
                className="w-full border rounded-lg p-3 focus:outline-none border-gray-300 focus:ring focus:ring-blue-400"
              />
            </div>
          </div>

          {/* متراژ */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block mb-2 font-bold text-primary">
                حداقل متراژ (متر)
              </label>
              <input
                type="number"
                name="area_min"
                value={formData.area_min}
                onChange={handleChange}
                placeholder="مثلاً: ۸۰"
                className="w-full border rounded-lg p-3 focus:outline-none border-gray-300 focus:ring focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-primary">
                حداکثر متراژ (متر)
              </label>
              <input
                type="number"
                name="area_max"
                value={formData.area_max}
                onChange={handleChange}
                placeholder="مثلاً: ۲۰۰"
                className="w-full border rounded-lg p-3 focus:outline-none border-gray-300 focus:ring focus:ring-blue-400"
              />
            </div>
          </div>

          {/* توضیحات */}
          <div>
            <label className="block mb-2 font-bold text-primary">
              توضیحات تکمیلی
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="ویژگی‌های موردنظرتان را بنویسید..."
              rows={4}
              className="w-full border rounded-lg p-3 focus:outline-none border-gray-300 focus:ring focus:ring-blue-400"
            />
          </div>

          <hr />

          {/* اطلاعات تماس */}
          <h2 className="text-xl font-semibold mb-4">اطلاعات تماس</h2>

          <div>
            <label className="block mb-2 font-bold text-primary">
              نام و نام خانوادگی
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border rounded-lg p-3 focus:outline-none ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-300 focus:ring focus:ring-blue-400"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-bold text-primary">
              شماره تماس
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full border rounded-lg p-3 focus:outline-none ${
                errors.phone
                  ? "border-red-500"
                  : "border-gray-300 focus:ring focus:ring-blue-400"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* دکمه ارسال */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            ارسال درخواست
          </button>
        </form>
        {notice && <div className="text-red-600 mt-4">{notice}</div>}
      </div>
    </div>
  );
};

export default RequestPage;