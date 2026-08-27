// components/cart/CartItem.tsx
'use client';

import { formatCurrency } from '@/utils/currency';
import QuantitySelector from '@/components/ui/QuantitySelector';

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItem({
  id,
  name,
  price,
  image,
  quantity,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
      <img 
        src={image} 
        className="w-20 h-20 rounded-xl object-cover" 
        alt={name} 
      />
      <div className="flex-1">
        <h4 className="font-medium text-[#1f3b2c]">{name}</h4>
        <span className="text-sm text-[#5f5d57]">{formatCurrency(price)}</span>
      </div>
      <div className="flex items-center gap-3">
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={(q) => onUpdateQuantity(id, q)}
        />
        <button
          onClick={() => onRemove(id)}
          className="text-[#9b978e] hover:text-red-500 transition"
          aria-label="Remove item"
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
}