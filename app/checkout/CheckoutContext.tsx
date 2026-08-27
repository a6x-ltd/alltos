// app/checkout/CheckoutContext.tsx — shared state across all checkout steps
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Address {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
}

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

export type PaymentMethod = 'card' | 'paypal' | 'klarna';

interface CheckoutState {
  address: Address | null;
  setAddress: (a: Address) => void;
  deliveryId: string;
  setDeliveryId: (id: string) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (m: PaymentMethod) => void;
  orderNumber: string | null;
  placeOrder: () => void;
}

const CheckoutContext = createContext<CheckoutState | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<Address | null>(null);
  const [deliveryId, setDeliveryId] = useState<string>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  // Would call a real order-creation API here.
  const placeOrder = () => {
    const generated = `#WB-${Math.floor(10000 + Math.random() * 89999)}`;
    setOrderNumber(generated);
  };

  return (
    <CheckoutContext.Provider
      value={{
        address,
        setAddress,
        deliveryId,
        setDeliveryId,
        paymentMethod,
        setPaymentMethod,
        orderNumber,
        placeOrder,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be used within a CheckoutProvider');
  return ctx;
}