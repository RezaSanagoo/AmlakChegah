import { IoHome, IoBusiness, IoStorefront, IoBed, IoConstruct, IoLocation, IoCube, IoLayers } from "react-icons/io5";

const propertyTypes = [
  {
    title: "آپارتمان",
    count: 123,
    icon: <IoHome className="w-12 h-12 text-primary mx-auto drop-shadow" />,
    href: "/properties?type=apartment",
    priority: 1,
  },
  {
    title: "ویلایی",
    count: 123,
    icon: <IoBed className="w-12 h-12 text-primary mx-auto drop-shadow" />,
    href: "/properties?type=villa",
    priority: 2,
  },
  {
    title: "تجاری",
    count: 12,
    icon: <IoStorefront className="w-12 h-12 text-primary mx-auto drop-shadow" />,
    href: "/properties?type=commercial",
    priority: 3,
  },

  {
    title: "زمین",
    count: 12,
    icon: <IoLocation className="w-12 h-12 text-primary mx-auto drop-shadow" />,
    href: "/properties?type=land",
    priority: 4,
  },
  {
    title: "مغازه",
    count: 12,
    icon: <IoCube className="w-12 h-12 text-primary mx-auto drop-shadow" />,
    href: "/properties?type=shop",
    priority: 5,
  },
  {
    title: "انبار",
    count: 12,
    icon: <IoLayers className="w-12 h-12 text-primary mx-auto drop-shadow" />,
    href: "/properties?type=warehouse",
    priority: 6,
  },
];

export default function Category() {
  return (
    <section className="container-xxl py-14">
      <div className="container mx-auto px-4">
        <div className="text-center mx-auto mb-12 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-primary drop-shadow">
            نوع ملک
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            امروزه خرید یا فروش ملک و املاک یا زمین کمی سخت شده و باید در این راه از مشاورانی درست و کاربلد کمک بگیرید که در ادامه ذکر میکنیم، با ما ارتباط بگیرید تا توضیحات لازم را خدمتتان ارائه دهیم
          .</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {propertyTypes
            .sort((a, b) => a.priority - b.priority)
            .map((type, idx) => (
              <a
                key={type.title}
                href={type.href}
                className="group block bg-white text-center rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-primary/60 hover:-translate-y-2"
              >
                <div className="rounded-2xl p-6 bg-hover-min group-hover:bg-primary/10 transition-all duration-300 flex flex-col items-center">
                  <div className="mb-5 flex justify-center items-center">
                    <span className="inline-flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 rounded-full w-20 h-20 transition-all duration-300 shadow">
                      {type.icon}
                    </span>
                  </div>
                  <h6 className="font-extrabold text-xl mb-2 text-gray-800 group-hover:text-primary transition-all duration-300">
                    {type.title}
                  </h6>
                  <span className="text-gray-500 text-base font-medium group-hover:text-primary/80 transition">
                    {type.count} مورد
                  </span>
                </div>
              </a>
            ))}
        </div>
      </div>
    </section>
  );
}