// components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);
  const [currentUser, setCurrentUser] = useState<{ firstName: string } | null>(
    null,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch real cart item count, refreshed on route change
  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => {
        const count = (data.items ?? []).reduce(
          (sum: number, item: { quantity: number }) => sum + item.quantity,
          0,
        );
        setCartCount(count);
      })
      .catch(() => {});
  }, [pathname]);

  // Fetch current login state, refreshed on route change
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setCurrentUser(data.user))
      .catch(() => setCurrentUser(null));
  }, [pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: reset transient UI state on navigation
    setIsMenuOpen(false);
    setIsProductsDropdownOpen(false);
    setIsMobileShopOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProductsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const productCategories = [
    { href: "/products", label: "All Products" },
    { href: "/products?category=supplement", label: "Supplements" },
    { href: "/products?category=otc", label: "OTC" },
    { href: "/products?category=vitamin", label: "Vitamins" },
  ];

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ];

  // Check if current path matches products or any product category
  const isProductsActive =
    pathname === "/products" || pathname?.startsWith("/products?");

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 uppercase ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-white/80 backdrop-blur-sm"
        } `}
      >
        <div className="container-custom flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-semibold tracking-tight text-[#1f3b2c] group flex-shrink-0"
          >
            ALLTOS
            <span className="text-xs md:text-sm font-normal text-[#5f5d57] ml-1 group-hover:text-[#1f3b2c] transition">
              .uk
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#2c2b28]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`domaine  hover:text-[#1f3b2c] transition ${
                  pathname === link.href ? "text-[#1f3b2c] font-semibold" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Products Dropdown - Desktop */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() =>
                  setIsProductsDropdownOpen(!isProductsDropdownOpen)
                }
                className={`domaine uppercase flex items-center cursor-pointer gap-1 hover:text-[#1f3b2c] transition ${
                  isProductsActive ? "text-[#1f3b2c] font-semibold" : ""
                }`}
                aria-expanded={isProductsDropdownOpen}
              >
                Shop
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isProductsDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu - Desktop */}
              {isProductsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#eae8e2] py-2 animate-fadeIn">
                  {productCategories.map((category) => {
                    const isActive =
                      pathname === category.href ||
                      (category.href.includes("category") &&
                        pathname?.includes(category.href.split("?")[1] || ""));
                    return (
                      <Link
                        key={category.href}
                        href={category.href}
                        onClick={() => setIsProductsDropdownOpen(false)}
                        className={`domaine block px-6 py-2.5 text-sm transition ${
                          isActive
                            ? "bg-[#f2f0eb] text-[#1f3b2c] font-semibold"
                            : "text-[#2c2b28] hover:bg-[#f2f0eb] hover:text-[#1f3b2c]"
                        }`}
                      >
                        {category.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-3 md:gap-5 text-[#2c2b28]">
            <button
              className="hover:text-[#1f3b2c] transition hidden sm:block"
              aria-label="Search"
            >
              <i className="fa-solid fa-search text-lg"></i>
            </button>
            <button
              className="hover:text-[#1f3b2c] transition hidden sm:block"
              aria-label="Wishlist"
            >
              <i className="fa-regular fa-heart text-lg"></i>
            </button>
            <Link
              href="/account"
              className="hover:text-[#1f3b2c] transition hidden sm:flex items-center gap-1.5"
              aria-label={
                currentUser ? `Account (${currentUser.firstName})` : "Account"
              }
            >
              <i className="fa-regular fa-user text-lg"></i>
              {currentUser && (
                <span className="text-xs font-medium hidden lg:inline">
                  {currentUser.firstName}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative hover:text-[#1f3b2c] transition"
              aria-label="Cart"
            >
              <i className="fa-solid fa-bag-shopping text-lg"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#1f3b2c] text-white text-[10px] font-medium w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-[#f2f0eb] transition group"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-6 h-5">
                <span
                  className={`absolute block w-6 h-0.5 bg-[#1f3b2c] rounded-full transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 top-2" : "top-0"
                  }`}
                ></span>
                <span
                  className={`absolute block w-6 h-0.5 bg-[#1f3b2c] rounded-full transition-all duration-300 top-2 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`absolute block w-6 h-0.5 bg-[#1f3b2c] rounded-full transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 top-2" : "top-4"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transition-transform duration-300 ease-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#eae8e2]">
            <span className="text-xl font-semibold text-[#1f3b2c]">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#f2f0eb] transition"
              aria-label="Close menu"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-4">
              {/* Home */}
              <li>
                <Link
                  href="/"
                  className={`block text-lg font-medium py-2 px-4 rounded-lg transition ${
                    pathname === "/"
                      ? "bg-[#f2f0eb] text-[#1f3b2c] font-semibold"
                      : "text-[#2c2b28] hover:bg-[#f2f0eb]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>

              {/* About */}
              <li>
                <Link
                  href="/about"
                  className={`block text-lg font-medium py-2 px-4 rounded-lg transition ${
                    pathname === "/about"
                      ? "bg-[#f2f0eb] text-[#1f3b2c] font-semibold"
                      : "text-[#2c2b28] hover:bg-[#f2f0eb]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </li>

              {/* Mobile Shop Dropdown */}
              <li>
                <button
                  onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
                  className={`flex items-center justify-between w-full text-lg font-medium py-2 px-4 rounded-lg transition ${
                    isProductsActive
                      ? "bg-[#f2f0eb] text-[#1f3b2c] font-semibold"
                      : "text-[#2c2b28] hover:bg-[#f2f0eb]"
                  }`}
                >
                  <span>Shop</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${isMobileShopOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Mobile Sub-menu */}
                {isMobileShopOpen && (
                  <div className="mt-2 ml-4 space-y-1 border-l-2 border-[#ead6c8] pl-4">
                    {productCategories.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsMobileShopOpen(false);
                        }}
                        className={`block py-2 px-3 rounded-lg text-sm transition ${
                          pathname === category.href ||
                          (category.href.includes("category") &&
                            pathname?.includes(
                              category.href.split("?")[1] || "",
                            ))
                            ? "bg-[#f2f0eb] text-[#1f3b2c] font-semibold"
                            : "text-[#5f5d57] hover:bg-[#f2f0eb] hover:text-[#1f3b2c]"
                        }`}
                      >
                        {category.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            </ul>

            {/* Mobile Menu Divider */}
            <hr className="my-6 border-[#eae8e2]" />

            {/* Mobile Menu Actions */}
            <div className="space-y-3">
              <Link
                href="/search"
                className="flex items-center gap-3 text-[#2c2b28] hover:text-[#1f3b2c] transition py-2 px-4 rounded-lg hover:bg-[#f2f0eb]"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fa-solid fa-search text-lg w-6"></i>
                <span>Search</span>
              </Link>
              <Link
                href="/wishlist"
                className="flex items-center gap-3 text-[#2c2b28] hover:text-[#1f3b2c] transition py-2 px-4 rounded-lg hover:bg-[#f2f0eb]"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fa-regular fa-heart text-lg w-6"></i>
                <span>Wishlist</span>
              </Link>
              <Link
                href="/account"
                className="flex items-center gap-3 text-[#2c2b28] hover:text-[#1f3b2c] transition py-2 px-4 rounded-lg hover:bg-[#f2f0eb]"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fa-regular fa-user text-lg w-6"></i>
                <span>Account</span>
              </Link>
              <Link
                href="/admin"
                className="flex items-center gap-3 text-[#2c2b28] hover:text-[#1f3b2c] transition py-2 px-4 rounded-lg hover:bg-[#f2f0eb]"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fa-solid fa-sliders text-lg w-6"></i>
                <span>Admin Panel</span>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-[#eae8e2]">
            <p className="text-sm text-[#9b978e]">
              🇬🇧 UK · Free shipping over £30
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
