import Image from 'next/image';
import Link from 'next/link';
import { FaPhoneAlt, FaCalendarAlt } from 'react-icons/fa';

const CallToAction = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div
          className="bg-white rounded-lg p-6 border-2 border-dashed"
          style={{ borderColor: 'rgba(150, 122, 161, 0.3)' }} // معادل --color-secendery با opacity 0.3
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
              <Image
                src="/call-to-action.jpg"
                alt="Call to Action"
                width={600}
                height={400}
                className="rounded-lg w-full h-auto object-cover"
              />
            
            <div className="">
              <div className="mb-6 space-y-4">
                <h1 className="text-3xl font-extrabold text-primary tracking-tight">
                  ارتباط با مشاوران ما
                </h1>
                <p className="text-gray-600 leading-relaxed text-base">
                  گروه مشاورین املاک چگاه در منطقه اصفهان دنج‌ترین و خاص‌ترین
                  خانه‌ها را به شما معرفی خواهند کرد. اعتماد خود را به دست ما
                  بسپارید و مطمئن باشید که آن را به خوبی حفظ خواهیم کرد.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="tel:09196767600"
                  className="inline-flex items-center justify-center bg-hover text-primary font-semibold py-3 px-6 rounded-lg hover:bg-primary hover:text-white transition-colors duration-200"
                >
                  <FaPhoneAlt className="ml-2 w-5 h-5" />
                  تماس با دفتر
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-hover hover:text-primary transition-colors duration-200"
                >
                  <FaCalendarAlt className="ml-2 w-5 h-5" />
                  رضایت مشتری
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;