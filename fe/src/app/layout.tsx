import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Components/Common/Navbar";
import Footer from "./Components/Common/Footer";


export const metadata: Metadata = {
  title: "مشاورین املاک چگاه",
  description:
    "وب‌سایت مشاورین املاک چگاه؛ خرید، فروش و اجاره ملک در اصفهان با بهترین مشاوره و خدمات تخصصی.",
  icons: {
    icon: "/golden.png",
  },
  keywords: [
    "املاک",
    "مشاورین املاک چگاه",
    "مشاور املاک",
    "خرید خانه",
    "فروش خانه",
    "اجاره",
    "اصفهان",
    "مسکن",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
