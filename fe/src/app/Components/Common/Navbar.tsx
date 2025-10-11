"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IoChevronDown, IoMenu, IoClose } from "react-icons/io5";
import logo from "@/../public/black.png";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 5);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "صفحه اصلی", href: "/" },
    {
      name: "صفحات",
      dropdown: [
        { name: "ثبت ملک", href: "/submit" },
        { name: "درخواست ملک", href: "/request" },
      ],
    },
    { name: "ارتباط با ما", href: "/Contact" },
    { name: "درباره ما", href: "/About" },
  ];

  const handleDropdown = useCallback(
    (name: string) => setActiveDropdown(name),
    []
  );
  const closeDropdown = useCallback(() => setActiveDropdown(null), []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/65 backdrop-blur-sm shadow-lg border-b border-gray-100"
          : "bg-white/85 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-[1320px] px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src={logo}
              alt="Icon"
              width={70}
              height={70}
              className="hover:scale-105 transition-all duration-300"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-primary">
              مشاورین املاک چگاه
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item, index) => (
              <div key={index} className="relative">
                {item.dropdown ? (
                  <>
                    <button
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                        activeDropdown === item.name
                          ? "text-primary bg-hover-min"
                          : "text-gray-700 hover:text-primary hover:bg-hover"
                      }`}
                      style={{ fontFamily: "var(--font-Ravi-bold)" }}
                      onMouseEnter={() => handleDropdown(item.name)}
                      onMouseLeave={closeDropdown}
                    >
                      <span>{item.name}</span>
                      <IoChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                        activeDropdown === item.name
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                      onMouseEnter={() => handleDropdown(item.name)}
                      onMouseLeave={closeDropdown}
                    >
                      {item.dropdown.map((dropItem, dropIndex) => (
                        <Link
                          key={dropIndex}
                          href={dropItem.href}
                          className={`block px-6 py-3 rounded-lg transition-colors duration-200 ${
                            pathname === dropItem.href
                              ? "text-primary bg-hover"
                              : "text-gray-700 hover:text-primary hover:bg-hover-min"
                          }`}
                          style={{ fontFamily: "var(--font-Ravi-medium)" }}
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      pathname === item.href
                        ? "text-primary bg-hover"
                        : "text-gray-700 hover:text-primary hover:bg-hover-min"
                    }`}
                    style={{ fontFamily: "var(--font-Ravi-bold)" }}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/properties"
              className="hidden lg:flex items-center px-6 py-3 rounded-xl text-white hover:scale-105 transition-all duration-300"
              style={{
                background: "var(--color-gradient)",
                fontFamily: "var(--font-Ravi-bold)",
              }}
            >
              <span>لیست املاک</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-primary hover:bg-hover-min transition-colors duration-200"
            >
              {isMobileMenuOpen ? <IoClose className="w-6 h-6" /> : <IoMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden transition-all duration-300 max-h-screen opacity-100">
            <div className="space-y-3 bg-white/95 backdrop-blur-md mt-4 rounded-2xl">
              {menuItems.map((item, index) => (
                <div key={index}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() =>
                          setActiveDropdown(activeDropdown === item.name ? null : item.name)
                        }
                        className="flex items-center justify-between w-full px-6 py-4 rounded-2xl text-gray-700 hover:text-primary hover:bg-hover-min transition-colors duration-200"
                        style={{ fontFamily: "var(--font-Ravi-bold)" }}
                      >
                        <span>{item.name}</span>
                        <IoChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          activeDropdown === item.name ? "max-h-48" : "max-h-0"
                        }`}
                      >
                        {item.dropdown.map((dropItem, dropIndex) => (
                          <Link
                            key={dropIndex}
                            href={dropItem.href}
                            className={`block px-10 py-2 rounded-2xl transition-colors duration-200 ${
                              pathname === dropItem.href
                                ? "text-primary bg-hover"
                                : "text-gray-700 hover:text-primary hover:bg-hover-min"
                            }`}
                            style={{ fontFamily: "var(--font-Ravi-medium)" }}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {dropItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block px-6 py-3 font-medium rounded-2xl transition-colors duration-200 ${
                        pathname === item.href
                          ? "text-primary bg-hover"
                          : "text-gray-700 hover:text-primary hover:bg-hover-min"
                      }`}
                      style={{ fontFamily: "var(--font-Ravi-bold)" }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
