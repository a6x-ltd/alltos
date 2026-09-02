// app/checkout/payment/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, CreditCard, Wallet, CalendarClock } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useCheckout, PaymentMethod } from '../CheckoutContext';

const inputClass =
  'w-full px-4 py-3 rounded-none border-0 border-b-2 border-black/15 bg-transparent focus:outline-none focus:border-black transition';

const PAYMENT_METHODS: { value: PaymentMethod; label: string; icon: typeof CreditCard }[] = [
  { value: 'card', label: 'Credit / debit card', icon: CreditCard },
  { value: 'paypal', label: 'PayPal', icon: Wallet },
  { value: 'klarna', label: 'Klarna — pay in 3', icon: CalendarClock },
];

export default function CheckoutPaymentPage() {
  const router = useRouter();
  const { address, paymentMethod, setPaymentMethod } = useCheckout();

  useEffect(() => {
    if (!address) router.replace('/checkout/address');
  }, [address, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/checkout/review');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Link
        href="/checkout/delivery"
        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-black/50 hover:text-black transition"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Back to delivery
      </Link>

      <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50">
        Payment method
      </h2>

      <div className="space-y-3">
        {PAYMENT_METHODS.map(({ value, label, icon: Icon }) => (
          <label
            key={value}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-full border cursor-pointer transition ${
              paymentMethod === value
                ? 'border-black bg-black text-white'
                : 'border-black/15 hover:border-black/40'
            }`}
          >
            <input
              type="radio"
              name="payment"
              value={value}
              checked={paymentMethod === value}
              onChange={() => setPaymentMethod(value)}
              className="sr-only"
            />
            <Icon className="w-4 h-4" strokeWidth={2.25} />
            <span className="text-sm font-medium">{label}</span>
          </label>
        ))}
      </div>

      {/* Card fields — mock only, no real payment processing wired up */}
      {paymentMethod === 'card' && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 pt-2">
          <div className="col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
              Card number
            </label>
            <input type="text" inputMode="numeric" placeholder="0000 0000 0000 0000" className={inputClass} required />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
              Expiry
            </label>
            <input type="text" placeholder="MM/YY" className={inputClass} required />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
              CVC
            </label>
            <input type="text" inputMode="numeric" placeholder="123" className={inputClass} required />
          </div>
        </div>
      )}

      <Button
        type="submit"
        className="w-full !bg-black !text-white !rounded-full hover:!bg-black/85"
        size="lg"
      >
        Continue to review
      </Button>
    </form>
  );
}