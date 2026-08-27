// components/admin/ProductTable.tsx
'use client';

import { Product } from '@/types';
import { formatCurrency } from '@/utils/currency';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-[#5f5d57] border-b border-[#eae8e2]">
          <tr>
            <th className="py-3 font-medium">Product</th>
            <th className="py-3 font-medium">Category</th>
            <th className="py-3 font-medium">Price</th>
            <th className="py-3 font-medium">Stock</th>
            <th className="py-3 font-medium">Status</th>
            <th className="py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-[#f0eee9] hover:bg-[#fafaf8] transition">
              <td className="py-3 font-medium text-[#1f3b2c]">{product.name}</td>
              <td className="py-3 capitalize">{product.category}</td>
              <td className="py-3">{formatCurrency(product.price)}</td>
              <td className="py-3">{product.stock}</td>
              <td className="py-3">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  product.stock > 20 ? 'bg-[#d4e2d4] text-[#1f3b2c]' :
                  product.stock > 5 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {product.stock > 20 ? 'In stock' :
                   product.stock > 5 ? 'Low stock' : 'Critical'}
                </span>
              </td>
              <td className="py-3">
                <div className="flex gap-2">
                  <button 
                    onClick={() => onEdit(product)}
                    className="text-[#5f5d57] hover:text-[#1f3b2c] transition"
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button 
                    onClick={() => onDelete(product.id)}
                    className="text-[#5f5d57] hover:text-red-500 transition"
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}