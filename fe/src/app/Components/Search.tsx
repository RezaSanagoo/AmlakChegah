"use client";
import { useState } from "react";
import Link from "next/link";

type SearchResult = {
  code: string;
  title: string;
  price: number;
  monthly_rent: number | null;
  category: string;
  district: string;
  area: number;
  bedrooms: number;
  has_parking: boolean;
  image: string | null;
};

const toPersianDigits = (n: number | string) =>
  n.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);

const formatPrice = (price: number) =>
  price ? `${price.toLocaleString()} میلیون تومان` : "قیمت توافقی";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(false);
    setResults([]);
    try {
      const res = await fetch(
        `http://194.60.231.96:8020/api/prop/property/search/?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResults(data);
      setSearched(true);
    } catch {
      setResults([]);
      setSearched(true);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto my-10 z-20 w-9/10 backdrop-blur-lg bg-zinc-700/50 flex flex-col gap-6 p-2 rounded-2xl">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="جستجو (مثلاً: اصفهان، آپارتمان...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 text-white border border-white/70 rounded-xl px-4 py-3 min-w-0 focus:ring-1 focus:ring-white"
        />
        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-secendery transition"
        >
          جستجو
        </button>
      </form>
        {loading && <div className="text-center text-white mb-4">در حال جستجو...</div>}
        {!loading && searched && results.length === 0 && (
          <div className="text-center text-white mb-4">موردی یافت نشد.</div>
        )}
        {!loading && results.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {results.map((item) => (
              <Link
                key={item.code}
                href={`/properties/${item.code}`}
                className="flex items-center gap-4 bg-white/60 rounded-xl shadow p-4 hover:bg-white/30 transition"
              >
                <div className="w-22 h-22 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  {item.image ? (
                    <img
                      src={"http://194.60.231.96:8020/" + item.image}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">بدون تصویر</span>
                  )}
                </div>
                <div className="flex-1 py-1">
                  <div className="font-bold text-lg text-primary">{item.title}</div>
                  <div className="text-gray-600 text-sm mt-1">
                    {item.district} | {item.area} متر | {item.bedrooms} خواب
                  </div>
                  <div className="text-gray-700 text-sm mt-1">
                    {formatPrice(item.price)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
    </div>
  );
}