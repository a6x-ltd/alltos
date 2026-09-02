// types/index.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'supplement' | 'otc' | 'vitamin';
  badge?: 'NEW' | 'Bestseller' | 'Sale';
  stock: number;
  rating: number;
  reviews: number;
  slug: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  total: number;
}