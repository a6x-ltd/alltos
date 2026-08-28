// components/layout/Footer.tsx
import Link from 'next/link';


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#eae8e2] bg-white">
      {/* Main Footer */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-2xl font-semibold text-[#1f3b2c]">ALLTOS</h3>
            <p className="text-sm text-[#5f5d57] mt-2 max-w-xs">
              Premium supplements &amp; OTC essentials — crafted for the modern self.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-[#5f5d57] hover:text-[#1f3b2c] transition text-lg">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="text-[#5f5d57] hover:text-[#1f3b2c] transition text-lg">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="text-[#5f5d57] hover:text-[#1f3b2c] transition text-lg">
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a href="#" className="text-[#5f5d57] hover:text-[#1f3b2c] transition text-lg">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[#1f3b2c] mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-[#5f5d57] hover:text-[#1f3b2c] transition">All Products</Link></li>
              <li><Link href="/products?category=supplement" className="text-[#5f5d57] hover:text-[#1f3b2c] transition">Supplements</Link></li>
              <li><Link href="/products?category=otc" className="text-[#5f5d57] hover:text-[#1f3b2c] transition">OTC</Link></li>
              <li><Link href="/products?category=vitamin" className="text-[#5f5d57] hover:text-[#1f3b2c] transition">Vitamins</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-[#1f3b2c] mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="text-[#5f5d57] hover:text-[#1f3b2c] transition">Help Centre</Link></li>
              <li><Link href="/returns" className="text-[#5f5d57] hover:text-[#1f3b2c] transition">Returns Policy</Link></li>
              <li><Link href="/shipping" className="text-[#5f5d57] hover:text-[#1f3b2c] transition">Shipping Info</Link></li>
                            <li><Link href="/legal" className="text-[#5f5d57] hover:text-[#1f3b2c] transition">Legal</Link></li>

              <li><Link href="#" className="text-[#5f5d57] hover:text-[#1f3b2c] transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-[#1f3b2c] mb-4">Stay Updated</h4>
            <p className="text-sm text-[#5f5d57] mb-3">
              Subscribe for exclusive offers and wellness tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-full border border-[#d8d5ce] bg-white focus:outline-none focus:ring-2 focus:ring-[#1f3b2c]/30 text-sm"
                required
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1f3b2c] text-white rounded-full text-sm font-medium hover:bg-[#2a4f3a] transition whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#eae8e2] py-6">
        <div className="container-custom flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#5f5d57]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="font-medium text-[#1f3b2c]">ALLTOS © {currentYear} · UK</span>
            <span className="hidden sm:inline">|</span>
            <span>site design by  <a href='http://www.a6x.co'>A6X LTD</a></span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="#" className="hover:text-[#1f3b2c] transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#1f3b2c] transition">Terms of Service</Link>
            <Link href="#" className="hover:text-[#1f3b2c] transition">Cookie Policy</Link>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span>🇬🇧</span>
            <span>UK</span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1">
              <i className="fa-solid fa-lock text-[#1f3b2c]"></i>
              Secure
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}