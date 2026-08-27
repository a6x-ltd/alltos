// components/cart/CartSummary.tsx
'use client';

import Link from 'next/link';
import { formatCurrency, calculateShipping } from '@/utils/currency';
import Button from '@/components/ui/Button';

interface CartSummaryProps {
  subtotal: number;
  itemsCount: number;
}

export default function CartSummary({ subtotal, itemsCount }: CartSummaryProps) {
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  return (
    <div className="bg-[#f8f7f4] rounded-3xl p-6 shadow-sm border border-[#eae8e2] h-fit sticky top-24">
      <h3 className="text-xl font-light text-[#1f3b2c]">Order summary</h3>
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal ({itemsCount} items)</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-[#5f5d57]">
            Add £{(30 - subtotal).toFixed(2)} more for free shipping
          </p>
        )}
        <div className="flex justify-between font-medium border-t border-[#d8d5ce] pt-2 text-lg">
          <span>Total</span>
          <span className="text-[#1f3b2c]">{formatCurrency(total)}</span>
        </div>
      </div>
      
      <Link href="/checkout">
        <Button className="w-full mt-6" size="lg">
          Proceed to checkout
        </Button>
      </Link>
      
      <div className="mt-4 text-xs text-[#5f5d57] flex justify-center gap-4">
        <span><i className="fa-brands fa-cc-visa mr-1"></i> Visa</span>
        <span><i className="fa-brands fa-cc-mastercard mr-1"></i> Mastercard</span>
        <span><i className="fa-brands fa-apple-pay mr-1"></i> Apple Pay</span>
        <span className="font-medium text-[#1f3b2c]">| Klarna</span>
      </div>
    </div>
  );
}