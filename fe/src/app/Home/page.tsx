"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Category from "../Components/Category";
import AboutSection from "../Components/AboutSection";
import PropertyListSection from "../Components/PropertyListSection";
import CallToAction from "../Components/CallToAction";
import { fetchProperties } from "../utils/api";
import Search from "../Components/Search";


const carouselImages = [
  { src: "/carsoul.jpg", alt: "ملک اکازیون ۱" },
  { src: "/carsoul2.jpg", alt: "ملک اکازیون ۲" },
  { src: "/carsoul3.jpg", alt: "ملک اکازیون ۳" },
  { src: "/carsoul4.jpg", alt: "ملک اکازیون ۴" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current]);

    const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % carouselImages.length);
    if (timerRef.current) clearTimeout(timerRef.current);
  };
  const prevSlide = () => {
    setCurrent(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // ...existing code...
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // ...existing code...
  useEffect(() => {
    fetchProperties()
      .then((data) => setProperties(data.results || [])) // فقط results را پاس بده
      .catch(() => setProperties([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="flex mt-20 justify-center items-center pt-8 px-4">
      </div>
      <div className="flex flex-col-reverse md:flex-row items-center max-w-7xl mx-auto pt-4">
        <div className="md:w-1/2 w-full p-8 md:mt-10 flex flex-col items-center md:items-start">
          <h1
            className="text-2xl lg:text-5xl font-extrabold mb-6 leading-relaxed"
            style={{ fontFamily: "var(--font-dana-black)" }}
          >
            ملک‌های اکازیون و دنج در منطقه
            <span className="text-primary"> اصفهان </span>
            با نازل‌ترین قیمت را از ما بخواهید
          </h1>
          <p
            className="text-base md:text-xl text-gray-600 mb-8"
            style={{ fontFamily: "var(--font-dana-medium)" }}
          >
            به پاس اعتماد مشتریان محترم، هم‌اکنون امکان خرید و فروش املاک و زمین
            با بهترین قیمت فراهم شده است. از شما خریدار یا فروشنده گرامی تقاضا
            داریم خدمات خود را از ما دریافت نمایید.
          </p>
          <Link
            href="/properties"
            className="inline-block bg-primary hover:bg-secendery text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-md text-lg"
            style={{ fontFamily: "var(--font-dana-bold)" }}
          >
            شروع کنید
          </Link>
        </div>
        <div className="p-4 md:w-1/2 w-full flex flex-col items-center relative">
          <div className="max-w-2xl aspect-[4/3.7] rounded-3xl overflow-hidden shadow-2xl bg-hover-min flex items-center justify-center">
            <img
              src={carouselImages[current].src}
              alt={carouselImages[current].alt}
              width={600}
              height={600}
              className="object-cover w-full h-full transition-all duration-500"
            />
          </div>
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="bg-white border border-hover text-primary p-3 rounded-full shadow hover:bg-hover-min transition"
              aria-label="بعدی"
            >
              <IoChevronForward className="w-7 h-7" />
            </button>

            <div className="flex gap-2">
              {carouselImages.map((_, idx) => (
                <span
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`inline-block w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${idx === current ? "bg-primary scale-110" : "bg-hover"
                    }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="bg-white border border-hover text-primary p-3 rounded-full shadow hover:bg-hover-min transition"
              aria-label="قبلی"
            >
              <IoChevronBack className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <Search />
      </div>
      <Category />
      <AboutSection />
      <PropertyListSection properties={properties} loading={loading} />
      <CallToAction />
    </>
  );
}
