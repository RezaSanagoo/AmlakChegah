"use client";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/navigation";
import {
  IoBed,
  IoCarSport,
  IoBusiness,
  IoLocation,
  IoCalendar,
  IoArrowBack,
  IoCall,
  IoLogoWhatsapp,
  IoShareSocial,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";
import NotFound from "@/app/Components/NotFound";

const toPersianDigits = (n: number | string) =>
  n.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);

const formatPrice = (price: number) =>
  price ? `${price.toLocaleString()} میلیون تومان` : "قیمت توافقی";

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return "لحظاتی پیش";
  if (diff < 3600) return `${toPersianDigits(Math.floor(diff / 60))} دقیقه پیش`;
  if (diff < 86400) return `${toPersianDigits(Math.floor(diff / 3600))} ساعت پیش`;
  return `${toPersianDigits(Math.floor(diff / 86400))} روز پیش`;
}

type PropertyType = {
  title: string;
  category: string;
  district: string;
  features: string[];
  code: string;
  price: number;
  monthly_rent: number;
  area: number;
  has_parking: boolean;
  bedrooms: number;
  year_built: number;
  floors: number;
  is_exchange: boolean;
  has_key: boolean;
  is_advertised: boolean;
  is_video_recorded?: boolean;
  consultant: number;
  notes_public: string;
  approved: boolean;
  created_at: string;
  images: string[];
};

type ConsultantType = {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
};

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [property, setProperty] = useState<PropertyType | null>(null);
  const [consultant, setConsultant] = useState<ConsultantType | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [shareMessage, setShareMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // گرفتن اطلاعات ملک
  useEffect(() => {
    setLoading(true);
    fetch(`http://194.60.231.96:8020//api/prop/property/${id}/`)
      .then(async (r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then((data) => {
        setProperty(data);
        setLoading(false);
        if (data.consultant) {
          fetch(`http://194.60.231.96:8020//api/users/consultant/${data.consultant}/`)
            .then((r) => r.json())
            .then(setConsultant)
            .catch(() => setConsultant(null));
        }
      })
      .catch(() => {
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [id]);

  // منطق اشتراک‌گذاری
  const handleShare = async () => {
    const shareData = {
      title: property?.title || "ملک در سایت چکاه",
      text: property?.notes_public || "مشاهده جزئیات این ملک در سایت چکاه",
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareMessage("لینک با موفقیت به اشتراک گذاشته شد!");
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setShareMessage("لینک در کلیپ‌بورد کپی شد!");
      }
      setTimeout(() => setShareMessage(""), 3000);
    } catch (error) {
      setShareMessage("خطا در اشتراک‌گذاری. دوباره امتحان کنید.");
      setTimeout(() => setShareMessage(""), 3000);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setActiveImageIndex((prev) =>
        prev < (property?.images.length || 1) - 1 ? prev + 1 : 0
      );
    },
    onSwipedRight: () => {
      setActiveImageIndex((prev) =>
        prev > 0 ? prev - 1 : (property?.images.length || 1) - 1
      );
    },
    trackMouse: true,
  });

  const nextImage = () => {
    setActiveImageIndex((prev) =>
      prev < (property?.images.length || 1) - 1 ? prev + 1 : 0
    );
  };

  const prevImage = () => {
    setActiveImageIndex((prev) =>
      prev > 0 ? prev - 1 : (property?.images.length || 1) - 1
    );
  };

  // SKELETON LOADING
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/10 rounded-2xl shadow-lg h-96 w-full" />
            <div className="bg-white/10 rounded-2xl shadow-lg h-64 w-full" />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/10 rounded-2xl shadow-lg h-56 w-full" />
            <div className="bg-white/10 rounded-2xl shadow-lg h-56 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!property) return (
    <NotFound />
  ); // چون اگر پیدا نشه ریدایرکت میشه

  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      {/* Share Message Toast */}
      {shareMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-3 rounded-xl shadow-lg z-50 transition-all duration-300">
          {shareMessage}
        </div>
      )}

      {/* Header */}
      <div className="pt-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between pt-4">
            <Link
              href="/properties?tab=suggested"
              className="flex items-center gap-2 text-primary hover:text-secendery transition-colors"
              style={{ fontFamily: "var(--font-Ravi-bold)" }}
            >
              <IoArrowBack />
              <span>بازگشت</span>
            </Link>
            <div className="flex items-center gap-3">
              <button
                className="p-2 text-gray-600 hover:text-primary transition-colors"
                onClick={handleShare}
              >
                <IoShareSocial size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="relative" {...handlers}>
                <img
                  src={"http://194.60.231.96:8020/" + property.images[activeImageIndex]}
                  alt={property.title}
                  width={800}
                  height={500}
                  className="w-full h-96 object-cover"
                />

                {/* Navigation Arrows */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={nextImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <IoChevronBack size={20} />
                    </button>
                    <button
                      onClick={prevImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <IoChevronForward size={20} />
                    </button>
                  </>
                )}

                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="bg-primary text-white rounded-xl px-3 py-1 text-sm font-bold shadow">
                    {property.category}
                  </span>
                </div>

                {/* Image Counter */}
                {property.images.length > 1 && (
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                    {toPersianDigits(activeImageIndex + 1)} از{" "}
                    {toPersianDigits(property.images.length)}
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {property.images.length > 1 && (
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-3">
                    {property.images.map((img, index) => (
                      <div
                        key={index}
                        className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                          index === activeImageIndex
                            ? "ring-2 ring-primary scale-105"
                            : "hover:scale-105"
                        }`}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <img
                          src={"http://194.60.231.96:8020/" + img}
                          alt={`تصویر ${index + 1}`}
                          className="object-cover h-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h1
                className="text-2xl font-bold text-gray-800 mb-4"
                style={{ fontFamily: "var(--font-Ravi-bold)" }}
              >
                {property.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <IoLocation className="text-primary" />
                  <span>{property.district}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <IoCalendar className="text-primary" />
                  <span>ثبت شده: {timeAgo(property.created_at)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm text-gray-600">کد ملک:</span>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium">
                  {property.code}
                </span>
              </div>

              {property.monthly_rent == null && (
                <div className="mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    قیمت: {toPersianDigits(formatPrice(property.price))}
                  </div>
                </div>
              )}
              {property.monthly_rent != null && (
                <div className="mb-6">
                  <div className="text-3xl font-bold text-primary ">
                    ودیعه: {toPersianDigits(formatPrice(property.price))}
                  </div>
                </div>
              )}
              {property.monthly_rent != null && (
                <div className="mb-6">
                  <div className="text-2xl font-bold text-primary mb-2">
                    اجاره ماهیانه: {toPersianDigits(property.monthly_rent)} میلیون تومان
                  </div>
                </div>
              )}

              <div className="prose max-w-none text-gray-700 mb-6">
                <p className="leading-relaxed">{property.notes_public}</p>
              </div>

              {/* Property Features */}
              <div>
                <h3
                  className="text-xl font-bold text-gray-800 mb-4"
                  style={{ fontFamily: "var(--font-Ravi-bold)" }}
                >
                  امکانات
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features && property.features.length > 0 ? (
                    property.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-gray-700 bg-gray-50 px-3 py-2 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400">امکانی ثبت نشده است.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Property Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3
                className="text-lg font-bold text-gray-800 mb-4"
                style={{ fontFamily: "var(--font-Ravi-bold)" }}
              >
                مشخصات ملک
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <IoBusiness className="text-primary" />
                    <span className="text-gray-600">متراژ</span>
                  </div>
                  <span className="font-bold">{property.area}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <IoBed className="text-primary" />
                    <span className="text-gray-600">تعداد خواب</span>
                  </div>
                  <span className="font-bold">
                    {toPersianDigits(property.bedrooms)} خواب
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2">
                    <IoCarSport
                      className={property.has_parking ? "text-primary" : "text-gray-300"}
                    />
                    <span className="text-gray-600">پارکینگ</span>
                  </div>
                  <span
                    className={`font-bold ${
                      property.has_parking ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {property.has_parking ? "دارد" : "ندارد"}
                  </span>
                </div>
              </div>
            </div>

            {/* Agent Contact */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3
                className="text-lg font-bold text-gray-800 mb-4"
                style={{ fontFamily: "var(--font-Ravi-bold)" }}
              >
                تماس با مشاور
              </h3>
              {consultant ? (
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-xl font-bold">
                      {consultant.first_name.charAt(0)}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-800">
                    {consultant.first_name} {consultant.last_name}
                  </h4>
                  <p className="text-gray-600 text-sm">مشاور املاک</p>
                </div>
              ) : (
                <div className="text-center text-gray-400 mb-4">بدون مشاور</div>
              )}

              <div className="space-y-3">
                {consultant && (
                  <>
                    <a
                      href={`tel:${consultant.phone_number}`}
                      className="flex items-center justify-center gap-2 bg-primary text-white py-3 px-4 rounded-xl hover:bg-secendery transition-colors"
                    >
                      <IoCall />
                      <span>تماس تلفنی</span>
                    </a>

                    <a
                      href={`https://wa.me/${consultant.phone_number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-hover text-primary py-3 px-4 rounded-xl hover:bg-hover-min transition-colors border border-primary/20"
                    >
                      <IoLogoWhatsapp />
                      <span>تماس واتساپ</span>
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}