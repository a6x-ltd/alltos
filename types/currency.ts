// utils/currency.ts
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const calculateShipping = (subtotal: number): number => {
  const FREE_SHIPPING_THRESHOLD = 30;
  const SHIPPING_RATE = 3.50;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;
};