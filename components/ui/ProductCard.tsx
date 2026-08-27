// components/ui/ProductCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatCurrency } from '@/utils/currency';
import Button from './Button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="card-hover bg-white rounded-3xl p-5 shadow-sm border border-[#eae8e2] flex flex-col">
      <Link href={`/products/${product.slug}`} className="relative block">
        <div className="relative rounded-2xl overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {product.badge && (
            <span className={`absolute top-3 left-3 text-[10px] font-semibold px-3 py-1 rounded-full ${
              product.badge === 'NEW' ? 'bg-white/80 backdrop-blur text-[#1f3b2c]' :
              product.badge === 'Bestseller' ? 'bg-[#d4e2d4] text-[#1f3b2c]' :
              'bg-red-100 text-red-700'
            }`}>
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      <div className="mt-4 flex flex-col flex-grow">
        <Link href={`/products/${product.slug}`} className="hover:opacity-80 transition">
          <h3 className="font-semibold text-[#1f3b2c] text-lg">{product.name}</h3>
        </Link>
        <p className="text-sm text-[#5f5d57] mt-0.5 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-1 mt-2 text-sm">
          <span className="text-yellow-500">⭐</span>
          <span className="font-medium text-[#1f3b2c]">{product.rating}</span>
          <span className="text-[#9b978e]">({product.reviews} reviews)</span>
        </div>

        <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#f0eee9]">
          <span className="text-xl font-semibold text-[#1f3b2c]">{formatCurrency(product.price)}</span>
          <Button
            size="sm"
            onClick={() => onAddToCart?.(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            <i className="fa-solid fa-plus mr-1.5"></i> Add
          </Button>
        </div>
      </div>
    </div>
  );
}