// ...existing code...
"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

const MAX_IMAGES = 5;

const PropertyFormPage = () => {
  // stateهای اصلی
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState(""); // district id
  const [category, setCategory] = useState(""); // category id
  const [area, setArea] = useState("");
  const [images, setImages] = useState<Array<{ file: File; url: string }>>([]);
  const [notice, setNotice] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // لیست دسته‌بندی و محله برای انتخاب
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [districts, setDistricts] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
    fetch("http://194.60.231.96:8020//api/core/categories/")
      .then((r) => r.json())
      .then(setCategories);
    fetch("http://194.60.231.96:8020//api/core/districts/")
      .then((r) => r.json())
      .then(setDistricts);
    return () => {
      images.forEach((i) => URL.revokeObjectURL(i.url));
    };
  }, []);


const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setNotice({ type: "error", message: "لطفاً خطاهای فرم را اصلاح کنید." });
      setTimeout(() => setNotice(null), 4000);
      return;
    }

    // ارسال فقط فیلدهای مورد نیاز مدل بک‌اند
    const payload = {
      name: title,
      phone,
      price: Number(price),
      category: category ? Number(category) : null,
      district: district ? Number(district) : null,
      area: area ? Number(area) : null,
    };

    try {
      const res = await fetch("http://194.60.231.96:8020//api/prop/registered-property/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setNotice({
          type: "success",
          message: "✅ درخواست شما با موفقیت ثبت شد. نتیجه ظرف ۲۴ ساعت اطلاع‌رسانی خواهد شد.",
        });
        setSubmitted(true);
        resetForm();
      } else {
        const data = await res.json();
        setNotice({ type: "error", message: "خطا در ثبت: " + JSON.stringify(data) });
      }
    } catch (err) {
      setNotice({ type: "error", message: "خطا در ارتباط با سرور." });
    }
  };

  
  useEffect(() => {
    return () => {
      // cleanup object URLs on unmount
      images.forEach((i) => URL.revokeObjectURL(i.url));
    };
  }, [images]);

  const onFilesSelected = (filesList: FileList | null) => {
    if (!filesList) return;
    const picked = Array.from(filesList);
    const remaining = MAX_IMAGES - images.length;
    const toAdd = picked.slice(0, remaining);
    const newItems = toAdd.map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
    }));
    setImages((prev) => [...prev, ...newItems]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const item = prev[index];
      if (item) URL.revokeObjectURL(item.url);
      const next = prev.filter((_, i) => i !== index);
      return next;
    });
  };

  const handleChooseClick = () => {
    fileInputRef.current?.click();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setType("");
    setPrice("");
    setAddress("");
    setPhone("");
    images.forEach((i) => URL.revokeObjectURL(i.url));
    setImages([]);
    setErrors({});
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "عنوان الزامی است.";
    if (!price || Number(price) <= 0) newErrors.price = "قیمت معتبر وارد کنید.";
    if (!category) newErrors.category = "دسته‌بندی را انتخاب کنید.";
    if (!district) newErrors.district = "محله را انتخاب کنید.";
    if (!area || Number(area) <= 0) newErrors.area = "متراژ معتبر وارد کنید.";
    if (!phone || phone.replace(/[^\d]/g, "").length < 8) newErrors.phone = "شماره تلفن معتبر وارد کنید.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const baseInputClass =
    "border rounded-xl px-4 py-3 focus:outline-none transition-all duration-200 bg-white/70 shadow-sm";

  const inputErrorClass = "border-red-400 ring-2 ring-red-100";

  return (
    <>
      {submitted ? (
        <div className="py-23">
          <div className="mx-auto max-w-xl rounded-lg px-6 py-12 shadow-xl text-center bg-green-50 border border-green-200 text-green-700 animate-fade-in">
            {notice?.message}
          </div>
        </div>
      ) : (
        <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="bg-gradient-to-tr from-primary/10 to-secendery/20 rounded-3xl shadow-2xl p-8 border border-primary/20">
            <h1 className="text-4xl font-extrabold text-primary text-center mb-4 !font-Ravi-black drop-shadow-lg">
              ثبت ملک جدید
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 animate-fade-in">
              {/* عنوان */}
              <div className="flex flex-col">
                <label htmlFor="title" className="mb-2 font-bold text-primary">
                  عنوان ملک <span className="text-xs text-gray-400">(*)</span>
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: آپارتمان دو خوابه در تهران"
                  className={`border rounded-xl px-4 py-3 ${errors.title ? "border-red-400 ring-2 ring-red-100" : "border-primary/30"} focus:ring-2 focus:ring-primary/50`}
                  aria-invalid={!!errors.title}
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>
              {/* دسته‌بندی */}
              <div className="flex flex-col">
                <label htmlFor="category" className="mb-2 font-bold text-primary">
                  دسته‌بندی <span className="text-xs text-gray-400">(*)</span>
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`border rounded-xl px-4 py-3 ${errors.category ? "border-red-400 ring-2 ring-red-100" : "border-primary/30"} focus:ring-2 focus:ring-primary/50`}
                  aria-invalid={!!errors.category}
                >
                  <option value="">انتخاب دسته‌بندی</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>
              {/* محله */}
              <div className="flex flex-col">
                <label htmlFor="district" className="mb-2 font-bold text-primary">
                  محله <span className="text-xs text-gray-400">(*)</span>
                </label>
                <select
                  id="district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className={`border rounded-xl px-4 py-3 ${errors.district ? "border-red-400 ring-2 ring-red-100" : "border-primary/30"} focus:ring-2 focus:ring-primary/50`}
                  aria-invalid={!!errors.district}
                >
                  <option value="">انتخاب محله</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
                {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
              </div>
              {/* متراژ */}
              <div className="flex flex-col">
                <label htmlFor="area" className="mb-2 font-bold text-primary">
                  متراژ (متر مربع) <span className="text-xs text-gray-400">(*)</span>
                </label>
                <input
                  id="area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  type="number"
                  min={1}
                  placeholder="مثال: 120"
                  className={`border rounded-xl px-4 py-3 ${errors.area ? "border-red-400 ring-2 ring-red-100" : "border-primary/30"} focus:ring-2 focus:ring-primary/50`}
                  aria-invalid={!!errors.area}
                />
                {errors.area && <p className="mt-1 text-sm text-red-600">{errors.area}</p>}
              </div>
              {/* قیمت و تلفن کنار هم */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="price" className="mb-2 font-bold text-primary">
                    قیمت (تومان) <span className="text-xs text-gray-400">(*)</span>
                  </label>
                  <input
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    min={0}
                    placeholder="مثال: 3500000000"
                    className={`border rounded-xl px-4 py-3 ${errors.price ? "border-red-400 ring-2 ring-red-100" : "border-primary/30"} focus:ring-2 focus:ring-secendery/50`}
                    aria-invalid={!!errors.price}
                  />
                  {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="phone" className="mb-2 font-bold text-primary">
                    شماره تلفن <span className="text-xs text-gray-400">(*)</span>
                  </label>
                  <input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    inputMode="tel"
                    placeholder="مثال: 09121234567"
                    pattern="[0-9+()\- ]*"
                    className={`border rounded-xl px-4 py-3 ${errors.phone ? "border-red-400 ring-2 ring-red-100" : "border-primary/30"} focus:ring-2 focus:ring-primary/50`}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
              </div>
              {/* ... سایر فیلدها و آپلود عکس ... */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-tr from-primary to-secendery text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-90 transition-all duration-200 text-lg"
                >
                  ثبت ملک
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default PropertyFormPage;