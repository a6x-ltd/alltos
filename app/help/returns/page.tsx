// app/returns/page.tsx
import Link from 'next/link';
import { Anton, Inter } from 'next/font/google';
import { LogIn, PackageCheck, Truck, Banknote, ArrowRight } from 'lucide-react';

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

const STEPS = [
  {
    icon: LogIn,
    title: 'Start your return',
    description: 'Sign in and select the order you\u2019d like to return from your order history.',
  },
  {
    icon: PackageCheck,
    title: 'Pack the item',
    description: 'Repack it unopened in its original packaging, with any seals intact.',
  },
  {
    icon: Truck,
    title: 'Send it back',
    description: 'Use the prepaid returns label we email you and drop it at any post office.',
  },
  {
    icon: Banknote,
    title: 'Get refunded',
    description: 'We refund your original payment method within 3\u20135 business days of receiving it.',
  },
];

const ELIGIBLE = [
  'Item is unopened, unused, and in its original packaging',
  'Requested within 14 days of delivery',
  'Proof of purchase (order number or confirmation email)',
];

const NOT_ELIGIBLE = [
  'Opened or used supplements, for health and safety reasons',
  'Gift cards',
  'Items marked as final sale',
];

export default function ReturnsPolicyPage() {
  return (
    <div className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}>
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
          Support
        </span>
        <h1 className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-4xl mt-2">
          Returns &amp; refunds
        </h1>
        <p className="text-sm text-black/60 mt-3 max-w-lg">
          Not quite right? Here&apos;s how returns work. For the full legal
          terms, see our{' '}
          <Link href="/legal/terms" className="underline hover:no-underline">
            Terms of Service
          </Link>.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
          {STEPS.map(({ icon: Icon, title, description }, i) => (
            <div key={title} className="relative">
              <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" strokeWidth={2} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-black/40 mb-1">
                Step {i + 1}
              </p>
              <p className="text-sm font-semibold">{title}</p>
              <p className="text-xs text-black/50 mt-1.5 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Eligibility */}
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          <div className="border border-black/10 rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50 mb-4">
              Eligible for return
            </p>
            <ul className="space-y-2.5">
              {ELIGIBLE.map((item) => (
                <li key={item} className="text-sm text-black/70 flex gap-2">
                  <span className="text-black">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-black/10 rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50 mb-4">
              Not eligible
            </p>
            <ul className="space-y-2.5">
              {NOT_ELIGIBLE.map((item) => (
                <li key={item} className="text-sm text-black/70 flex gap-2">
                  <span className="text-red-600">&times;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-black/85 transition"
          >
            Start a return
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold text-black/60 hover:text-black transition"
          >
            Need help? Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}