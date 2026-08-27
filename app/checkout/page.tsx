// app/checkout/page.tsx — Nike.com-inspired theme
'use client';

import { useState } from 'react';
import { Anton, Inter } from 'next/font/google';
import { Lock, CreditCard, Wallet, CalendarClock } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';
import Button from '@/components/ui/Button';

// NOTE: instantiate fonts once in app/layout.tsx in a real project.
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
}

const PAYMENT_METHODS = [
  { value: 'card', label: 'Credit / debit card', icon: CreditCard },
  { value: 'paypal', label: 'PayPal', icon: Wallet },
  { value: 'klarna', label: 'Klarna — pay in 3', icon: CalendarClock },
];

const inputClass =
  'w-full px-4 py-3 rounded-none border-0 border-b-2 border-black/15 bg-transparent focus:outline-none focus:border-black transition';

export default function CheckoutPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postcode: '',
    country: 'United Kingdom',
  });
  const [payment, setPayment] = useState('card');

  // UK standard rate — HMRC treats vitamin/mineral supplements as standard-rated.
  // Prices are VAT-inclusive, so this extracts the VAT portion already baked in.
  const VAT_RATE = 0.2;
  const subtotal = 118.8;
  const shipping = 3.5;
  const vatAmount = (subtotal + shipping) * (VAT_RATE / (1 + VAT_RATE));
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order submitted:', { ...formData, payment });
    // Would redirect to order confirmation
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}>
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <h1 className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-4xl mb-10">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-10 md:gap-14">
          <div className="md:col-span-2 space-y-10">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50 mb-5">
                Shipping information
              </h2>

              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
                    Postcode
                  </label>
                  <input
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Ireland">Ireland</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-black/10">
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50 mb-5">
                Payment method
              </h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map(({ value, label, icon: Icon }) => (
                  <label
                    key={value}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-full border cursor-pointer transition ${
                      payment === value
                        ? 'border-black bg-black text-white'
                        : 'border-black/15 hover:border-black/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={value}
                      checked={payment === value}
                      onChange={() => setPayment(value)}
                      className="sr-only"
                    />
                    <Icon className="w-4 h-4" strokeWidth={2.25} />
                    <span className="text-sm font-medium">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-[#F5F5F5] rounded-2xl p-6 h-fit sticky top-24">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50">
              Order summary
            </h3>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-black/60">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60">Shipping</span>
                <span>{formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60">VAT (20%, included)</span>
                <span>{formatCurrency(vatAmount)}</span>
              </div>
              <div className="flex justify-between items-baseline border-t border-black/15 pt-4">
                <span className="text-sm font-semibold uppercase tracking-wide">Total</span>
                <span className="font-[family-name:var(--font-display)] text-2xl">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full mt-6 !bg-black !text-white !rounded-full hover:!bg-black/85"
              size="lg"
            >
              Place order
            </Button>
            <p className="flex items-center justify-center gap-1.5 text-xs text-black/50 mt-4">
              <Lock className="w-3.5 h-3.5" />
              Secure checkout
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}