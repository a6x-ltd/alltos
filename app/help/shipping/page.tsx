// app/help/shipping/page.tsx
import Link from 'next/link';
import { Anton, Inter } from 'next/font/google';
import { Truck, Globe, MapPin, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';
// Pulled from a plain (non-'use client') data module so it can be safely
// imported into this Server Component. Do not import from CheckoutContext.tsx
// here — that file is 'use client', and non-component exports from it become
// opaque client references when imported into a Server Component.
import { DELIVERY_OPTIONS } from '../../checkout/deliveryOptions';

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

export default function ShippingInfoPage() {
  return (
    <div className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}>
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
          Support
        </span>
        <h1 className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-4xl mt-2 mb-10">
          Shipping info
        </h1>

        {/* Delivery options */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Truck className="w-4 h-4 text-black/40" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50">
              Delivery options
            </h2>
          </div>
          <div className="divide-y divide-black/10 border-t border-b border-black/10">
            {DELIVERY_OPTIONS.map((option) => (
              <div key={option.id} className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-semibold">{option.label}</p>
                  <p className="text-xs text-black/50 mt-0.5">{option.description}</p>
                </div>
                <span className="text-sm font-semibold">{formatCurrency(option.price)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-semibold">Free standard delivery</p>
                <p className="text-xs text-black/50 mt-0.5">On all orders over £30</p>
              </div>
              <span className="text-sm font-semibold">Free</span>
            </div>
          </div>
        </div>

        {/* International */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-black/40" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50">
              International shipping
            </h2>
          </div>
          <p className="text-sm text-black/60 leading-relaxed max-w-lg">
            We currently ship to the UK and Ireland. Orders to Ireland typically
            take 4\u20136 business days and may be subject to local import
            duties, which are the recipient&apos;s responsibility. We&apos;re
            working on expanding to more destinations.
          </p>
        </div>

        {/* Tracking */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-black/40" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50">
              Tracking your order
            </h2>
          </div>
          <p className="text-sm text-black/60 leading-relaxed max-w-lg">
            Once your order ships, you&apos;ll get a confirmation email with a
            tracking link. You can also check the status anytime from your
            account.
          </p>
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-2 mt-5 text-sm font-semibold uppercase tracking-wide border-b border-black pb-0.5 hover:opacity-60 transition"
          >
            Track an order
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="mt-16 border border-black/10 rounded-2xl p-8 text-center">
          <p className="font-[family-name:var(--font-display)] uppercase text-xl mb-2">
            Delivery running late?
          </p>
          <p className="text-sm text-black/60 mb-6">
            Get in touch and we&apos;ll look into it for you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-black/85 transition"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}