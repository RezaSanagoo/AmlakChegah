"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaTelegram } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import Image from "next/image";

import { Button } from "@mui/material";

// لینک ساده
const FooterLink = ({ href, children }) => (
  <Link
    href={href}
    className="text-gray-600 hover:text-[var(--color-primary)] transition-colors"
  >
    {children}
  </Link>
);

// ستون لینک‌ها
const FooterColumn = ({ title, links }) => (
  <div className="text-center md:text-right">
    <h3 className="text-[var(--color-primary)] font-bold mb-4">{title}</h3>
    <ul className="space-y-3">
      {links.map((link, index) => (
        <li key={index}>
          <FooterLink href={link.href}>{link.label}</FooterLink>
        </li>
      ))}
    </ul>
  </div>
);

// آیکون شبکه اجتماعی
const SocialIcon = ({ href, icon: Icon }) => (
  <Link
    href={href}
    className="bg-[var(--color-hover-min)] hover:bg-[var(--color-hover)] text-[var(--color-primary)] p-3.5 rounded-full transition-all duration-200"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon className="h-6 w-6" />
  </Link>
);

// نماد اعتماد
// const TrustBadge = ({ href, alt }) => (
//   <a
//     href={href}
//     target="_blank"
//     rel="noopener noreferrer"
//     className="bg-white p-2 rounded-md border border-gray-200"
//   >
//     <Image src={} alt={alt} width={60} height={60} />
//   </a>
// );

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const footerColumns = [
    {
      title: "چگاه",
      links: [
        { href: "/About", label: "درباره ما" },
        { href: "/Contact", label: "تماس با ما" },
      ],
    },
    {
      title: "خدمات",
      links: [
        { href: "/properties", label: "فهرست املاک" },
        { href: "/request", label: "درخواست ملک" },
        { href: "/submit", label: "ثبت ملک" },
      ],
    },
  ];

  const socialLinks = [
    { href: "https://instagram.com/", icon: FaInstagram },
    { href: "https://twitter.com/", icon: FaTwitter },
    { href: "https://linkedin.com/", icon: FaLinkedin },
    { href: "https://t.me/", icon: FaTelegram },
  ];

  const trustBadges = [
    { href: "#", alt: "نماد اعتماد الکترونیکی" },
    { href: "#", alt: "نماد ساماندهی" },
    { href: "#", alt: "نشان شاپرک" },
  ];

  // تابع برای تبدیل اعداد لاتین به فارسی
  const toPersianDigits = (str) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return str.replace(/[0-9]/g, (digit) => persianDigits[parseInt(digit)]);
  };


  return (
    <footer
      className="w-full pt-10 px-4"
      style={{ background: "var(--color-hover-min)" }}
    >
      <div className="max-w-[1168px] mx-auto mb-12 rounded-[20px] border border-[#C3C6CD] relative overflow-hidden h-60 bg-white">
        {/* محتوای متنی */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h2 className="text-3xl md:text-3xl font-extrabold text-primary mb-4">
            به خانواده چگاه بپیوندید!
          </h2>
          <p className="text-2xl font-bold text-secendery mb-6">
            خرید، فروش و اجاره ملک با اطمینان و آسودگی خاطر
          </p>
          <Button
            variant="contained"
            sx={{
              background: "var(--color-primary)",
              fontFamily: "var(--font-dana-bold)",
              borderRadius: "0.75rem",
              py: 1.5,
              color: "#fff",
              boxShadow: "none",
              "&:hover": { background: "var(--color-secendery" },
            }}
            href="/properties"
          >
            مشاهده املاک
          </Button>
        </div>
      </div>
      {/* نوار پشتیبانی */}
      <div
        className={`max-w-[1170px] mx-auto mb-12 ${
          !isMobile ? "rounded-[35px] bg-white" : ""
        } px-4 sm:px-8 ${
          !isMobile ? "h-[70px]" : ""
        } flex flex-col md:flex-row items-start md:items-center justify-between`}
        style={{ padding: isMobile ? "15px" : "0 30px" }}
      >
        {isMobile ? (
        <div className="w-full">
          <div className="flex items-center justify-center mb-3">
            <span className="text-primary font-medium tracking-wide text-center">
             اصفهان، توحید میانی ، کوچه  {toPersianDigits('31')} ، املاک چگاه </span>
          </div>
          <div className="flex flex-row flex-wrap justify-center">
            <div className="flex items-center mx-2 my-2">
              <span className="text-primary font-medium tracking-wide whitespace-nowrap">
                ارتباط با ما: {" "}
                <a
                  href="tel:09133778019"
                  className="text-secendery font-bold mx-1 tracking-wider"
                >
                  {toPersianDigits('09133778019')}
                </a>
              </span>
            </div>
            <div className="flex items-center mx-2 my-2">
              <span className="text-primary font-medium mx-2 tracking-wide">
                ارتباط با ما: {" "}
                <a
                  href="tel:09914448019"
                  className="text-secendery font-bold mx-2 tracking-wider"
                >
                  {toPersianDigits('09914448019')}
                </a>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row md:items-center md:space-x-4 md:space-x-reverse">
          <span className="text-primary font-medium tracking-wide">
             اصفهان، توحید میانی ، کوچه  {toPersianDigits('31')} ، املاک چگاه </span>
          
          <span className="text-primary font-medium tracking-wide">
            تماس با دفتر: {" "}
            <a
              href="tel:03136287184"
              className="text-secendery font-bold mx-2 tracking-wider"
            >
              {toPersianDigits('03136287184')}
            </a>{" "}
            |{" "}
          </span>
          <span className="text-primary font-medium mx-2 tracking-wide">
            ارتباط با ما: {" "}
            <a
              href="tel:09914448019"
              className="text-secendery font-bold mx-2 tracking-wider"
            >
              {toPersianDigits('09914448019')}
            </a>
          </span>
        </div>
      )}
      <div
        className={`flex items-center ${
          isMobile ? "justify-center w-full mt-4" : ""
        }`}
      >
        <Link
          href="/Contact"
          className="text-secendery text-lg md:text-[22px] font-bold flex items-center"
        >
          درخواست مشاوره
        </Link>
        </div>
      </div>

      {/*خوده  فوتر */}
      <div className="max-w-[1170px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 mb-8 md:mb-0 w-full md:w-2/3">
            {footerColumns.map((column, index) => (
              <FooterColumn
                key={index}
                title={column.title}
                links={column.links}
              />
            ))}
          </div>

          <div className="w-full md:w-1/3 mt-8 md:mt-0 text-center md:text-right">
            <h3 className="text-[var(--color-primary)] font-bold mb-6">
              ما را دنبال کنید
            </h3>
            <div className="flex justify-center md:justify-start space-x-4 mb-8">
              {socialLinks.map((social, index) => (
                <SocialIcon key={index} href={social.href} icon={social.icon} />
              ))}
            </div>

            <div className="mb-6">
              <h3 className="text-[var(--color-primary)] font-bold mb-4">
                نمادهای اعتماد
              </h3>
              {/* <div className="flex items-center justify-center md:justify-start space-x-4">
                {trustBadges.map((badge, index) => (
                  <trustBadges key={index} href={badge.href} alt={badge.alt} />
                ))}
              </div> */}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 py-6 text-center text-gray-500">
          <p>
            © {currentYear} تمامی حقوق برای{" "}
            <span className="text-[var(--color-primary)] font-bold">
              مشاورین املاک چگاه
            </span>{" "}
            محفوظ است.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-1">
            <span className="text-[var(--color-secendery)] text-sm font-medium flex items-center gap-1">
              <svg
                width="18"
                height="18"
                fill="none"
                className="inline-block mr-1"
              >
                <circle
                  cx="9"
                  cy="9"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-[var(--color-secendery)]"
                />
                <path
                  d="M6 9l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--color-primary)]"
                />
              </svg>
              طراحی و توسعه توسط
              <a
                href="https://clickbartar.info"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1 font-bold text-[var(--color-primary)] underline hover:text-[var(--color-secendery)] transition-colors"
              >
                گروه کلیــــک بــرتــر
              </a>
            </span>
            <span className="text-xs text-gray-400 mt-1">
              <span className="font-bold text-[var(--color-primary)]">
                ClickBartaar
              </span>{" "}
              | Creative Web Studio
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
