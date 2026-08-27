// components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [cartCount] = useState(3);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'All Products' },
    { href: '/products?category=supplement', label: 'Supplements' },
    { href: '/products?category=otc', label: 'OTC' },
  ];

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/80 backdrop-blur-sm'
      } `}>
        <div className="container-custom flex items-center justify-between h-16 md:h-20 ">
          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-semibold tracking-tight text-[#1f3b2c] group flex-shrink-0 nouvelle-vague">
            ALLTOS
            <span className="text-xs md:text-sm font-normal text-[#5f5d57] ml-1 group-hover:text-[#1f3b2c] transition">.uk</span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-[#2c2b28]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-[#1f3b2c] transition relative ${
                  pathname === link.href ? 'text-[#1f3b2c]' : ''
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#1f3b2c] rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-3 md:gap-5 text-[#2c2b28]">
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

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transition-transform duration-300 ease-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
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
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block text-lg font-medium py-2 px-4 rounded-lg transition ${
                      pathname === link.href
                        ? 'bg-[#1f3b2c] text-white'
                        : 'text-[#2c2b28] hover:bg-[#f2f0eb]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Divider */}
            <hr className="my-6 border-[#eae8e2]" />

            {/* Mobile Menu Actions */}
            <div className="space-y-3">
              <Link
                href="/wishlist"
                className="flex items-center gap-3 text-[#2c2b28] hover:text-[#1f3b2c] transition py-2 px-4 rounded-lg hover:bg-[#f2f0eb]"
              >
                <i className="fa-regular fa-heart text-lg w-6"></i>
                <span>Wishlist</span>
              </Link>
              <Link
                href="/account"
                className="flex items-center gap-3 text-[#2c2b28] hover:text-[#1f3b2c] transition py-2 px-4 rounded-lg hover:bg-[#f2f0eb]"
              >
                <i className="fa-regular fa-user text-lg w-6"></i>
                <span>Account</span>
              </Link>
              <Link
                href="/admin"
                className="flex items-center gap-3 text-[#2c2b28] hover:text-[#1f3b2c] transition py-2 px-4 rounded-lg hover:bg-[#f2f0eb]"
              >
                <i className="fa-solid fa-sliders text-lg w-6"></i>
                <span>Admin Panel</span>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-[#eae8e2]">
            <p className="text-sm text-[#9b978e]">🇬🇧 UK · Free shipping over £30</p>
          </div>
        </div>
      </div>
    </>
  );
}