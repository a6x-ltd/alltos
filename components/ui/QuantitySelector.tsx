// components/ui/QuantitySelector.tsx
'use client';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  const decrement = () => {
    if (quantity > min) onQuantityChange(quantity - 1);
  };

  const increment = () => {
    if (quantity < max) onQuantityChange(quantity + 1);
  };

  return (
    <div className="flex border border-[#d8d5ce] rounded-full overflow-hidden">
      <button
        onClick={decrement}
        className="px-4 py-2 bg-[#f2f0eb] hover:bg-[#e5e2da] transition text-[#1f3b2c] font-medium"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="px-5 py-2 bg-white text-[#1f3b2c] text-sm font-medium min-w-[48px] text-center">
        {quantity}
      </span>
      <button
        onClick={increment}
        className="px-4 py-2 bg-[#f2f0eb] hover:bg-[#e5e2da] transition text-[#1f3b2c] font-medium"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}