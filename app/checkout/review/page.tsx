// app/checkout/review/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Pencil } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useCheckout, DELIVERY_OPTIONS } from '../CheckoutContext';

const PAYMENT_LABELS: Record<string, string> = {
  card: 'Credit / debit card',
  paypal: 'PayPal',
  klarna: 'Klarna — pay in 3',
};

export default function CheckoutReviewPage() {
  const router = useRouter();
  const { address, deliveryId, paymentMethod, placeOrder } = useCheckout();

  useEffect(() => {
    if (!address) router.replace('/checkout/address');
  }, [address, router]);

  const delivery = DELIVERY_OPTIONS.find((d) => d.id === deliveryId);

  const handlePlaceOrder = () => {
    placeOrder();
    router.push('/checkout/confirmation');
  };

  if (!address) return null;

  return (
    <div className="space-y-6">
      <Link
        href="/checkout/payment"
        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-black/50 hover:text-black transition"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Back to payment
      </Link>

      <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50">
        Review your order
      </h2>

      <div className="divide-y divide-black/10 border-t border-b border-black/10">
        <div className="flex items-start justify-between gap-4 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-black/50 mb-1">
              Shipping address
            </p>
            <p className="text-sm font-medium">
              {address.firstName} {address.lastName}
            </p>
            <p className="text-sm text-black/60">
              {address.address}, {address.city} {address.postcode}
            </p>
            <p className="text-sm text-black/60">{address.country}</p>
          </div>
          <Link href="/checkout/address" aria-label="Edit address" className="text-black/40 hover:text-black transition">
            <Pencil className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex items-start justify-between gap-4 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-black/50 mb-1">
              Delivery
            </p>
            <p className="text-sm font-medium">{delivery?.label}</p>
            <p className="text-sm text-black/60">{delivery?.description}</p>
          </div>
          <Link href="/checkout/delivery" aria-label="Edit delivery" className="text-black/40 hover:text-black transition">
            <Pencil className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex items-start justify-between gap-4 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-black/50 mb-1">
              Payment
            </p>
            <p className="text-sm font-medium">{PAYMENT_LABELS[paymentMethod]}</p>
          </div>
          <Link href="/checkout/payment" aria-label="Edit payment" className="text-black/40 hover:text-black transition">
            <Pencil className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <Button
        onClick={handlePlaceOrder}
        className="w-full !bg-black !text-white !rounded-full hover:!bg-black/85"
        size="lg"
      >
        Place order
      </Button>
    </div>
  );
}