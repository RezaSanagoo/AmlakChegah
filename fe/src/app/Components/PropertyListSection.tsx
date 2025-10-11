"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import PropertyCard from "./PropertyCard";

const tabs = [
  { label: "پیشنهاد‌ها", key: "suggested" },
  { label: "فروش", key: "sell" },
  { label: "اجاره", key: "rahn_rent" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

type Property = {
  code: string;
  title: string;
  price: number;
  monthly_rent: number;
  category: string;
  district: string;
  area: number;
  bedrooms: number;
  has_parking: boolean;
  image: string | null;
};

type PropertyListSectionProps = {
  properties: Property[] | { results: Property[] };
  loading: boolean;
};

export default function PropertyListSection({ properties, loading }: PropertyListSectionProps) {
  const propertyList: Property[] = Array.isArray(properties)
    ? properties
    : (properties && Array.isArray((properties as any).results))
      ? (properties as any).results
      : [];

  const [activeTab, setActiveTab] = useState<TabKey>("suggested");

  const filteredProperties: Record<TabKey, Property[]> = useMemo(() => {
    if (!propertyList) return { suggested: [], sell: [], rahn_rent: [] };
    return {
      suggested: propertyList,
      sell: propertyList.filter(
        (item: Property) =>
          item.category === "فروش" ||
          item.category === "sell"
      ),
      rahn_rent: propertyList.filter(
        (item: Property) =>
          item.category === "اجاره" ||
          item.category === "رهن" ||
          item.category === "rahn" ||
          item.category === "rent"
      ),
    };
  }, [propertyList]);

  if (loading) return <div>در حال بارگذاری...</div>;
  if (!filteredProperties[activeTab] || filteredProperties[activeTab].length === 0)
    return <div>ملکی یافت نشد.</div>;

  return (
    <section className="container-xxl py-16">
      <div className="container mx-auto px-4">
        {/* هدر */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-3 text-gray-900 relative inline-block"
              style={{ fontFamily: "var(--font-Ravi-bold)" }}
            >
              لیست املاک
              <span className="absolute -bottom-2 right-0 w-2/3 h-1 bg-gradient-to-l from-primary to-secendery rounded-full"></span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              لیست و خانه مورد علاقه خود را پیدا کنید و جهت دریافت اطلاعات بیشتر
              روی آن کلیک کنید.
            </p>
          </div>

          {/* تب‌ها */}
          <div className="bg-gray-100 rounded-full p-2 flex gap-2 shadow-inner">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                  activeTab === tab.key
                    ? "bg-gradient-to-tr from-primary to-secendery text-white shadow-md scale-105"
                    : "text-primary hover:bg-white"
                }`}
                style={{ fontFamily: "var(--font-Ravi-bold)" }}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* کارت‌ها */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties[activeTab].map((item: Property, idx: number) => (
            <PropertyCard item={item} key={item.code} />
          ))}
        </div>

        {/* دکمه CTA */}
        <div className="text-center mt-14">
          <Link
            href="/properties?tab=suggested"
            className="inline-block px-10 py-4 rounded-2xl text-lg font-bold text-white bg-gradient-to-tr from-primary to-secendery shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            style={{ fontFamily: "var(--font-Ravi-bold)" }}
          >
            جستجو برای فایل‌های بیشتر
          </Link>
        </div>
      </div>
    </section>
  );
}
