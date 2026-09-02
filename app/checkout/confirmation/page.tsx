// app/checkout/confirmation/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useCheckout } from '../CheckoutContext';

export default function CheckoutConfirmationPage() {
  const router = useRouter();
  const { orderNumber, address } = useCheckout();

  // If someone lands here without having placed an order, send them back.
  useEffect(() => {
    if (!orderNumber) router.replace('/checkout/address');
  }, [orderNumber, router]);

  if (!orderNumber) return null;

  return (
    <div className="flex flex-col items-center text-center py-10">
      <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mb-6">
        <CheckCircle2 className="w-8 h-8" strokeWidth={1.75} />
      </div>

      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
        Order confirmed
      </span>
      <h2 className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-4xl mt-2">
        {orderNumber}
      </h2>
      <p className="text-sm text-black/60 mt-3 max-w-sm">
        {address ? `Thanks, ${address.firstName}. ` : 'Thanks. '}
        A confirmation email is on its way, and you can track your order from your account.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-9">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-black/85 transition"
        >
          View order
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center px-8 py-3.5 rounded-full text-sm font-semibold border border-black/25 hover:border-black transition"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}