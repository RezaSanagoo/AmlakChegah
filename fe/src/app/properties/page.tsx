"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PropertyCard from "../Components/PropertyCard";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
// import PropertyListSection from "../Components/PropertyListSection";

import {
  IoChevronDown,
  IoSearch,
  IoFilter,
} from "react-icons/io5";

const tabs = [
  { label: "پیشنهاد‌ها", key: "suggested" },
  { label: "فروش", key: "sell" },
  { label: "اجاره", key: "rahn_rent" },
];

const bedOptions = ["همه", "بدون خواب", "۱", "۲", "۳", "۴ و بیشتر"];
const parkingOptions = ["همه", "دارد", "ندارد"];
const sortOptions = [
  { label: "جدیدترین", value: "date-desc" },
  { label: "قدیمی‌ترین", value: "date-asc" },
  { label: "قیمت (کم به زیاد)", value: "price-asc" },
  { label: "قیمت (زیاد به کم)", value: "price-desc" },
  { label: "متراژ (کم به زیاد)", value: "area-asc" },
  { label: "متراژ (زیاد به کم)", value: "area-desc" },
];

function PropertyListSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

    const getInitialFilters = () => ({
    category: searchParams.get("category") || "",
    district: searchParams.get("district") || "",
    beds: searchParams.get("beds") || "همه",
    parking: searchParams.get("parking") || "همه",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    minArea: searchParams.get("minArea") || "",
    maxArea: searchParams.get("maxArea") || "",
    sort: searchParams.get("sort") || "date-desc",
    features: searchParams.get("features")
      ? searchParams.get("features")!.split(",").map(Number)
      : [],
  });

  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "suggested"
  );
  const [filters, setFilters] = useState(getInitialFilters);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);


  // فیلدهای داینامیک از API
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [districts, setDistricts] = useState<{ id: number; name: string }[]>([]);
  const [features, setFeatures] = useState<{ id: number; name: string }[]>([]);

  // گرفتن دسته‌بندی‌ها، محله‌ها و امکانات
  useEffect(() => {
    fetch("http://194.60.231.96:8020/api/core/categories/")
      .then((r) => r.json())
      .then(setCategories);
    fetch("http://194.60.231.96:8020/api/core/districts/")
      .then((r) => r.json())
      .then(setDistricts);
    fetch("http://194.60.231.96:8020/api/core/features/")
      .then((r) => r.json())
      .then(setFeatures);
  }, []);

    useEffect(() => {
    const params = new URLSearchParams();
    if (activeTab !== "suggested") params.set("tab", activeTab);
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) params.set(key, value.join(","));
      } else if (value && value !== "همه") {
        params.set(key, value);
      }
    });
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [filters, activeTab]);

  // اگر URL تغییر کرد (مثلاً با بک/فوروارد مرورگر)، state را آپدیت کن
  useEffect(() => {
    setFilters(getInitialFilters());
    setActiveTab(searchParams.get("tab") || "suggested");
    // eslint-disable-next-line
  }, [searchParams.toString()]);

  // ساخت query string
  function buildQuery() {
    const params: Record<string, string> = {};
    if (activeTab === "sell") params.category = "فروش";
    if (activeTab === "rahn_rent") params.category = "اجاره";
    if (filters.category) params.category = filters.category;
    if (filters.district) params.district = filters.district;
    if (filters.beds && filters.beds !== "همه") {
      if (filters.beds === "بدون خواب") params.bedrooms = "0";
      else if (filters.beds === "۴ و بیشتر") params.bedrooms__gte = "4";
      else params.bedrooms = filters.beds;
    }
    if (filters.parking === "دارد") params.has_parking = "true";
    if (filters.parking === "ندارد") params.has_parking = "false";
    if (filters.minArea) params.area_min = filters.minArea;
    if (filters.maxArea) params.area_max = filters.maxArea;
    if (filters.minPrice) params.price_min = filters.minPrice;
    if (filters.maxPrice) params.price_max = filters.maxPrice;
    if (filters.features.length > 0) params.features = filters.features.join(",");
    // if (filters.sort) params.ordering = ...
    const query = new URLSearchParams(params).toString();
    return query ? `?${query}` : "";
  }

  // گرفتن داده‌ها از API
  const fetchProperties = async () => {
    setLoading(true);
    const query = buildQuery();
    const res = await fetch(
      `http://194.60.231.96:8020/api/prop/property/filter/${query}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    setProperties(data.results || []);
    setLoading(false);
  };

  // هر بار که فیلترها یا تب تغییر کرد، fetch کن
  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line
  }, [filters, activeTab]);

  const applyFilters = () => {
    fetchProperties();
    setIsFilterOpen(false);
  };

  // تابع فرمت هزارگان با ارقام انگلیسی
  const formatNumber = (value: string | number) => {
    if (!value) return "";
    const num = typeof value === "string" ? Number(value.replace(/,/g, "")) : value;
    if (isNaN(num)) return "";
    return num.toLocaleString("en-US");
  };

  // فقط عدد را ذخیره کن و ارقام فارسی را به انگلیسی تبدیل کن
  const toEnglishDigits = (str: string) => {
    // تبدیل ارقام فارسی و عربی به انگلیسی
    return str.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
              .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
  };

  const handleFilterChange = (key: string, value: any) => {
    if (key === "minPrice" || key === "maxPrice") {
      // حذف کاما و فقط عدد انگلیسی ذخیره شود
      const raw = toEnglishDigits(value).replace(/[^\d]/g, "");
      setFilters((prev) => ({ ...prev, [key]: raw }));
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleFeatureToggle = (id: number) => {
    setFilters((prev) => ({
      ...prev,
      features: prev.features.includes(id)
        ? prev.features.filter((fid) => fid !== id)
        : [...prev.features, id],
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      district: "",
      beds: "همه",
      parking: "همه",
      minPrice: "",
      maxPrice: "",
      minArea: "",
      maxArea: "",
      sort: "date-desc",
      features: [],
    });
    setIsFilterOpen(false);
    setTimeout(fetchProperties, 0);
  };

  return (
    <section className="container-xxl my-10">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* فیلترها */}
          <div className="lg:w-1/4">
            <div className="lg:hidden mt-6">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full bg-primary text-white py-3 px-4 rounded-xl hover:bg-secendery transition-colors flex items-center justify-center"
                style={{ fontFamily: "var(--font-Ravi-bold)" }}
              >
                <IoFilter className="inline-block ml-2" />
                {isFilterOpen ? "بستن فیلترها" : "نمایش فیلترها"}
              </button>
            </div>
            <div className={`${isFilterOpen ? "block" : "hidden"} lg:block bg-white rounded-2xl shadow-lg p-6 sticky top-20 h-fit`}>
              <h3 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: "var(--font-Ravi-bold)" }}>
                فیلتر املاک
              </h3>
              <div className="space-y-3">
                {/* دسته‌بندی */}
                <div>
                  <label className="block text-gray-600 mb-2" style={{ fontFamily: "var(--font-Ravi-bold)" }}>
                    دسته‌بندی
                  </label>
                  <div className="relative">
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange("category", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary appearance-none bg-white"
                      style={{ fontFamily: "var(--font-Ravi-bold)" }}
                    >
                      <option value="">همه دسته‌بندی‌ها</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <IoChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                  </div>
                </div>
                {/* محله */}
                <div>
                  <label className="block text-gray-600 mb-2" style={{ fontFamily: "var(--font-Ravi-bold)" }}>
                    محله
                  </label>
                  <div className="relative">
                    <select
                      value={filters.district}
                      onChange={(e) => handleFilterChange("district", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary appearance-none bg-white"
                      style={{ fontFamily: "var(--font-Ravi-bold)" }}
                    >
                      <option value="">همه محله‌ها</option>
                      {districts.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                    <IoChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                  </div>
                </div>
                {/* امکانات */}
                <div>
                  <label className="block text-gray-600 mb-2" style={{ fontFamily: "var(--font-Ravi-bold)" }}>
                    امکانات
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {features.map((f) => (
                      <label key={f.id} className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-1 rounded-lg cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.features.includes(f.id)}
                          onChange={() => handleFeatureToggle(f.id)}
                        />
                        {f.name}
                      </label>
                    ))}
                  </div>
                </div>
                {/* تعداد خواب */}
                <div>
                  <label className="block text-gray-600 mb-2" style={{ fontFamily: "var(--font-Ravi-bold)" }}>
                    تعداد خواب
                  </label>
                  <div className="relative">
                    <select
                      value={filters.beds}
                      onChange={(e) => handleFilterChange("beds", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary appearance-none bg-white"
                      style={{ fontFamily: "var(--font-Ravi-bold)" }}
                    >
                      {bedOptions.map((bed) => (
                        <option key={bed} value={bed}>
                          {bed}
                        </option>
                      ))}
                    </select>
                    <IoChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                  </div>
                </div>
                {/* پارکینگ */}
                <div>
                  <label className="block text-gray-600 mb-2" style={{ fontFamily: "var(--font-Ravi-bold)" }}>
                    پارکینگ
                  </label>
                  <div className="relative">
                    <select
                      value={filters.parking}
                      onChange={(e) => handleFilterChange("parking", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary appearance-none bg-white"
                      style={{ fontFamily: "var(--font-Ravi-bold)" }}
                    >
                      {parkingOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <IoChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                  </div>
                </div>
                {/* متراژ */}
                <div>
                  <label className="block text-gray-600 mb-2" style={{ fontFamily: "var(--font-Ravi-bold)" }}>
                    متراژ (متر)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="حداقل"
                      value={filters.minArea}
                      onChange={(e) => handleFilterChange("minArea", e.target.value)}
                      className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      style={{ fontFamily: "var(--font-Ravi-bold)" }}
                    />
                    <input
                      type="number"
                      placeholder="حداکثر"
                      value={filters.maxArea}
                      onChange={(e) => handleFilterChange("maxArea", e.target.value)}
                      className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      style={{ fontFamily: "var(--font-Ravi-bold)" }}
                    />
                  </div>
                </div>
                {/* بودجه */}
                <div>
                  <label className="block text-gray-600 mb-2" style={{ fontFamily: "var(--font-Ravi-bold)" }}>
                    بودجه (تومان)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9,]*"
                      placeholder="حداقل"
                      value={formatNumber(filters.minPrice)}
                      onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                      className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      style={{ fontFamily: "var(--font-Ravi-bold)" }}
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9,]*"
                      placeholder="حداکثر"
                      value={formatNumber(filters.maxPrice)}
                      onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                      className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      style={{ fontFamily: "var(--font-Ravi-bold)" }}
                    />
                  </div>
                </div>
                {/* مرتب‌سازی */}
                <div>
                  <label className="block text-gray-600 mb-2" style={{ fontFamily: "var(--font-Ravi-bold)" }}>
                    مرتب‌سازی
                  </label>
                  <div className="relative">
                    <select
                      value={filters.sort}
                      onChange={(e) => handleFilterChange("sort", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary appearance-none bg-white"
                      style={{ fontFamily: "var(--font-Ravi-bold)" }}
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <IoChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                  </div>
                </div>
                {/* دکمه جستجو */}
                <button
                  onClick={applyFilters}
                  className="w-full bg-primary text-white py-3 px-4 rounded-xl hover:bg-secendery transition-colors"
                  style={{ fontFamily: "var(--font-Ravi-bold)" }}
                >
                  <IoSearch className="inline-block mr-2" />
                  جستجو
                </button>
                {/* دکمه ریست */}
                <button
                  onClick={resetFilters}
                  className="w-full bg-hover text-primary py-3 px-4 rounded-xl hover:bg-hover-min transition-colors border border-primary/20"
                  style={{ fontFamily: "var(--font-Ravi-bold)" }}
                >
                  پاک کردن فیلترها
                </button>
              </div>
            </div>
          </div>
          {/* لیست املاک */}
          <div className="lg:w-3/4 mt-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-primary" style={{ fontFamily: "var(--font-Ravi-bold)" }}>
                  لیست املاک
                </h2>
                <p className="text-gray-600 text-base md:text-lg">
                  لیست و خانه مورد علاقه خود را پیدا کنید و جهت دریافت اطلاعات بیشتر روی آن کلیک کنید.
                </p>
              </div>
              <div>
                <div className="flex gap-3">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      className={`px-5 py-2 rounded-xl border font-bold transition-all duration-200 ${
                        activeTab === tab.key
                          ? "bg-primary text-white border-primary shadow"
                          : "bg-white text-primary border-primary/40 hover:bg-hover-min"
                      }`}
                      style={{ fontFamily: "var(--font-Ravi-bold)" }}
                      onClick={() => {
                        setActiveTab(tab.key);
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="text-gray-600 mb-4">
                {loading
                  ? "در حال دریافت اطلاعات..."
                  : `تعداد املاک یافت‌شده: ${properties.length}`}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                {loading ? (
                  <div className="col-span-3 text-center text-gray-600">
                    در حال بارگذاری...
                  </div>
                ) : properties.length > 0 ? (
                  properties.map((item) => (
                    <PropertyCard key={item.code} item={item} />
                  ))
                ) : (
                  <div className="col-span-3 text-center text-gray-600">
                    هیچ ملکی با فیلترهای انتخاب‌شده یافت نشد.
                  </div>
                )}
              </div>
              <div className="text-center mt-10">
                <Link
                  href="/properties?tab=suggested"
                  className="inline-block bg-primary hover:bg-secendery text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-md text-lg"
                  style={{ fontFamily: "var(--font-Ravi-bold)" }}
                >
                  جستجو برای فایل‌های بیشتر
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">در حال بارگذاری ...</div>}>
      <PropertyListSection />
    </Suspense>
  );
}