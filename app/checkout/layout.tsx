// app/checkout/layout.tsx — shell shared by all /checkout/* steps
'use client';

import { usePathname } from 'next/navigation';
import { Anton, Inter } from 'next/font/google';
import { Check, Lock } from 'lucide-react';
import { CheckoutProvider, useCheckout, DELIVERY_OPTIONS } from './CheckoutContext';
import { formatCurrency } from '@/utils/currency';

// NOTE: consider hoisting these to the root app/layout.tsx if the rest of the
// site also uses Anton/Inter, so the font is only loaded once.
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

const STEPS = [
  { id: 'address', label: 'Address' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' },
];

// Replace with the real cart subtotal (from cart context/state).
const SUBTOTAL = 118.8;
const VAT_RATE = 0.2; // UK standard rate — HMRC treats vitamin/mineral supplements as standard-rated

function CheckoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { deliveryId } = useCheckout();

  const isConfirmation = pathname?.includes('/confirmation');
  const currentStepIndex = STEPS.findIndex((step) => pathname?.includes(step.id));

  const shipping = DELIVERY_OPTIONS.find((d) => d.id === deliveryId)?.price ?? DELIVERY_OPTIONS[0].price;
  const total = SUBTOTAL + shipping;
  const vatAmount = total * (VAT_RATE / (1 + VAT_RATE));

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
      <h1 className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-4xl mb-10">
        Checkout
      </h1>

      {!isConfirmation && (
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-1">
          {STEPS.map((step, i) => {
            const completed = i < currentStepIndex;
            const active = i === currentStepIndex;
            return (
              <div key={step.id} className="flex items-center gap-2 shrink-0">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition ${
                    completed
                      ? 'bg-black text-white'
                      : active
                      ? 'border-2 border-black text-black'
                      : 'border border-black/15 text-black/30'
                  }`}
                >
                  {completed ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span
                  className={`text-xs font-semibold uppercase tracking-wide ${
                    active ? 'text-black' : 'text-black/40'
                  }`}
                >
                  {step.label}
                </span>
                {i < STEPS.length - 1 && <span className="w-8 h-px bg-black/15 mx-1" />}
              </div>
            );
          })}
        </div>
      )}

      {isConfirmation ? (
        children
      ) : (
        <div className="grid md:grid-cols-3 gap-10 md:gap-14">
          <div className="md:col-span-2">{children}</div>

          <div className="bg-[#F5F5F5] rounded-2xl p-6 h-fit sticky top-24">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50">
              Order summary
            </h3>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-black/60">Subtotal</span>
                <span>{formatCurrency(SUBTOTAL)}</span>
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
            <p className="flex items-center justify-center gap-1.5 text-xs text-black/50 mt-4">
              <Lock className="w-3.5 h-3.5" />
              Secure checkout
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}
    >
      <CheckoutProvider>
        <CheckoutShell>{children}</CheckoutShell>
      </CheckoutProvider>
    </div>
  );
}