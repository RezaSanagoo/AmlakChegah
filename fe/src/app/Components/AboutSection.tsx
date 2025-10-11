import Image from 'next/image';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';

const AboutSection = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 font-vazir">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="relative overflow-hidden p-6 lg:pe-0 ">
          <Image
            src="/carsoul3.jpg"
            alt="درباره ما"
            width={600}
            height={400}
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>
        <div className="mx-5 leading-10">
          <h1 className="text-2xl lg:text-3xl font-extrabold text-primary mb-4 -tracking-normal">
            پــیـدا کردن بهـترین‌ها برای زنــدگی
          </h1>
          <p className="text-gray-600 mb-6 px-2 leading-relaxed text-base">
            با خرید و فروش به کمک مشاوران ما معامله‌ای کم‌ریسک و پر‌سود را تجربه کنید
          </p>
          <div className="space-y-3 mb-4">
            <p className="flex items-center text-primary">
              <FaCheck className="text-hover me-3 w-5 h-5" />
              دسترسی آسان
            </p>
            <p className="flex items-center text-primary">
              <FaCheck className="text-hover me-3 w-5 h-5" />
              خریدی پر‌سود و مطمئن
            </p>
            <p className="flex items-center text-primary">
              <FaCheck className="text-hover me-3 w-5 h-5" />
              سابقه‌ای درخشان
            </p>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center justify-center w-full lg:mt-8 bg-primary text-white font-semibold py-3 rounded-lg hover:bg-hover hover:text-primary transition-colors duration-200"
          >
            اطلاعات بیشتر
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;