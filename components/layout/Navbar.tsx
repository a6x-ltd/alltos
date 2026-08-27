// components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [cartCount] = useState(3);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProductsDropdownOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const productCategories = [
    { href: '/products', label: 'All Products' },
    { href: '/products?category=supplement', label: 'Supplements' },
    { href: '/products?category=otc', label: 'OTC' },
    { href: '/products?category=vitamin', label: 'Vitamins' },
  ];

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
  ];

  // Check if current path matches products or any product category
  const isProductsActive = pathname === '/products' || pathname?.startsWith('/products?');

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/80 backdrop-blur-sm'
      } `}>
        <div className="container-custom flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-semibold tracking-tight text-[#1f3b2c] group flex-shrink-0">
            ALLTHOS
            <span className="text-xs md:text-sm font-normal text-[#5f5d57] ml-1 group-hover:text-[#1f3b2c] transition">.uk</span>
          </Link>

          {/* Desktop Navigation - Using Domaine font */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#2c2b28]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`domaine hover:text-[#1f3b2c] transition ${
                  pathname === link.href ? 'text-[#1f3b2c] font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Products Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                className={`domaine flex items-center cursor-pointer gap-1 hover:text-[#1f3b2c] transition ${
                  isProductsActive ? 'text-[#1f3b2c] font-semibold' : ''
                }`}
                aria-expanded={isProductsDropdownOpen}
              >
                Shop
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu - Also using Domaine */}
              {isProductsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#eae8e2] py-2 animate-fadeIn">
                  {productCategories.map((category) => {
                    const isActive = pathname === category.href || 
                      (category.href.includes('category') && pathname?.includes(category.href.split('?')[1] || ''));
                    return (
                      <Link
                        key={category.href}
                        href={category.href}
                        onClick={() => setIsProductsDropdownOpen(false)}
                        className={`domaine block px-6 py-2.5 text-sm transition ${
                          isActive 
                            ? 'bg-[#f2f0eb] text-[#1f3b2c] font-semibold' 
                            : 'text-[#2c2b28] hover:bg-[#f2f0eb] hover:text-[#1f3b2c]'
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

          {/* Right side icons - unchanged */}
          <div className="flex items-center gap-3 md:gap-5 text-[#2c2b28]">
            <button className="hover:text-[#1f3b2c] transition hidden sm:block" aria-label="Search">
              <i className="fa-solid fa-search text-lg"></i>
            </button>
            <button className="hover:text-[#1f3b2c] transition hidden sm:block" aria-label="Wishlist">
              <i className="fa-regular fa-heart text-lg"></i>
            </button>
            <button className="hover:text-[#1f3b2c] transition hidden sm:block" aria-label="Account">
              <i className="fa-regular fa-user text-lg"></i>
            </button>
            <Link href="/cart" className="relative hover:text-[#1f3b2c] transition" aria-label="Cart">
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
                <span className={`absolute block w-6 h-0.5 bg-[#1f3b2c] rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 top-2' : 'top-0'
                }`}></span>
                <span className={`absolute block w-6 h-0.5 bg-[#1f3b2c] rounded-full transition-all duration-300 top-2 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute block w-6 h-0.5 bg-[#1f3b2c] rounded-full transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 top-2' : 'top-4'
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Rest of the mobile menu - same as before */}
      {/* ... mobile menu code ... */}

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