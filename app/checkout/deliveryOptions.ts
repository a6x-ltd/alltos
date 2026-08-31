// app/checkout/deliveryOptions.ts — plain data module, no 'use client'.
// Safe to import from both Server and Client Components. CheckoutContext.tsx
// re-exports DELIVERY_OPTIONS from here for backward compatibility with
// existing imports.

export interface DeliveryOption {
  id: string;
  label: string;
  description: string;
  price: number;
}

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  { id: 'standard', label: 'Standard', description: '3–5 business days', price: 3.5 },
  { id: 'express', label: 'Express', description: '1–2 business days', price: 6.9 },
  { id: 'nextday', label: 'Next day', description: 'Order before 2pm today', price: 9.9 },
];