import Image from "next/image";
import Link from "next/link";
import { IoBed, IoCarSport, IoBusiness, IoLocation } from "react-icons/io5";

// ابزار ساده برای تبدیل اعداد به فارسی (اختیاری)
const toPersianDigits = (n: number | string) =>
  n
    .toString()
    .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);

// فرمت قیمت
const formatPrice = (price: number) =>
  price ? `${price.toLocaleString()} میلیون تومان` : "قیمت توافقی";

// چون داده‌ها ساده‌اند، پراپرتی را مستقیم می‌گیریم
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

interface PropertyCardProps {
  item: Property;
}

const PropertyCard = ({ item }: PropertyCardProps) => {
  return (
    <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary/60 hover:scale-105">
      
      <Link href={`/properties/${item.code}`} className="flex flex-col justify-between h-full">
        <div>
          <div className="relative overflow-hidden">
          {item.image ? (
            <img
              src={"https://api.amlakfallah.com" + item.image}
              alt={item.title}
              width={500}
              height={220}
              className="object-cover w-full h-56 transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-56 flex items-center justify-center bg-gray-100 text-gray-400">
              بدون تصویر
            </div>
          )}
          <span className="absolute top-4 right-4 bg-primary text-white rounded-xl px-3 py-1 text-xs font-bold shadow">
            {item.category}
          </span>
        </div>
        <div className="p-6 pb-0">
          
          {item.monthly_rent == null && (
          <h5 className="text-primary font-extrabold text-lg mb-4 tracking-tight">
            قیمت: {toPersianDigits(formatPrice(item.price))}
          </h5>
          )}
                    {item.monthly_rent != null && (
          <h5 className="text-primary font-extrabold text-lg mb-2 tracking-tight">
            ودیعه: {toPersianDigits(formatPrice(item.price))}
          </h5>
          )}
          
                    {item.monthly_rent != null && (
          <h5 className="text-primary font-extrabold mb-4 tracking-tight">
            اجاره ماهیانه: {toPersianDigits(item.monthly_rent)} میلیون تومان
          </h5>
          
          )}

          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-600">کد ملک:</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg font-medium text-sm">
              {item.code}
            </span>
          </div>
          <div className="font-bold text-gray-800 text-base mb-3 leading-relaxed">
            {item.title}
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
            <IoLocation className="text-primary" />
            <span>{item.district}</span>
          </div>
        </div>
        </div>
        <div className="flex border-t mt-4">
          <div className="flex-1 flex flex-col items-center py-3 border-l">
            <IoBusiness className="text-primary mb-1" />
            <span className="text-xs">{toPersianDigits(item.area)} متر</span>
          </div>
          <div className="flex-1 flex flex-col items-center py-3 border-l">
            <IoBed className="text-primary mb-1" />
            <span className="text-xs">{toPersianDigits(item.bedrooms)} خواب</span>
          </div>
          <div className="flex-1 flex flex-col items-center py-3">
            <IoCarSport
              className={`mb-1 ${
                item.has_parking ? "text-primary" : "text-gray-300"
              }`}
            />
            <span className="text-xs">
              {item.has_parking ? "پارکینگ" : "بدون پارکینگ"}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;