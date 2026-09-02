// app/checkout/delivery/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useCheckout, DELIVERY_OPTIONS } from '../CheckoutContext';
import { formatCurrency } from '@/utils/currency';

export default function CheckoutDeliveryPage() {
  const router = useRouter();
  const { address, deliveryId, setDeliveryId } = useCheckout();

  // Guard against landing here without an address (e.g. direct URL entry).
  useEffect(() => {
    if (!address) router.replace('/checkout/address');
  }, [address, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/checkout/payment');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Link
        href="/checkout/address"
        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-black/50 hover:text-black transition"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Back to address
      </Link>

      <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50">
        Delivery method
      </h2>

      <div className="space-y-3">
        {DELIVERY_OPTIONS.map((option) => (
          <label
            key={option.id}
            className={`flex items-center justify-between gap-4 px-4 py-3.5 rounded-full border cursor-pointer transition ${
              deliveryId === option.id
                ? 'border-black bg-black text-white'
                : 'border-black/15 hover:border-black/40'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="delivery"
                value={option.id}
                checked={deliveryId === option.id}
                onChange={() => setDeliveryId(option.id)}
                className="sr-only"
              />
              <div>
                <p className="text-sm font-semibold">{option.label}</p>
                <p
                  className={`text-xs mt-0.5 ${
                    deliveryId === option.id ? 'text-white/70' : 'text-black/50'
                  }`}
                >
                  {option.description}
                </p>
              </div>
            </div>
            <span className="text-sm font-semibold">{formatCurrency(option.price)}</span>
          </label>
        ))}
      </div>

      <Button
        type="submit"
        className="w-full !bg-black !text-white !rounded-full hover:!bg-black/85"
        size="lg"
      >
        Continue to payment
      </Button>
    </form>
  );
}