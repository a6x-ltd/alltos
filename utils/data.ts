import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Vitamin D Complex',
    description: 'High-potency vitamin C with zinc and citrus bioflavonoids for immune support',
    price: 24.90,
    image: '/images/vitd.webp',
    category: 'vitamin',
    badge: 'NEW',
    stock: 43,
    rating: 4.8,
    reviews: 214,
    slug: 'vitamin-d-complex'
  },
  {
    id: 2,
    name: 'Omega-3 + EPA',
    description: 'Algal oil supplement with 1200mg EPA/DHA for heart and brain health',
    price: 32.50,
    image: 'images/omega3.jpg',
    category: 'supplement',
    stock: 12,
    rating: 4.9,
    reviews: 187,
    slug: 'omega-3-epa'
  },
  {
    id: 3,
    name: 'Daily Probiotic',
    description: '10 clinically studied strains with 50 billion CFU for gut health',
    price: 28.90,
    image: 'images/probiotic.jpg',
    category: 'supplement',
    badge: 'Bestseller',
    stock: 27,
    rating: 4.7,
    reviews: 302,
    slug: 'daily-probiotic'
  },
  {
    id: 4,
    name: 'Magnesium Glycinate',
    description: '400mg highly bioavailable magnesium for sleep and muscle recovery',
    price: 19.20,
    image: 'images/magnesium.webp',
    category: 'supplement',
    stock: 56,
    rating: 4.6,
    reviews: 156,
    slug: 'magnesium-glycinate'
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getRelatedProducts = (productId: number, limit: number = 4): Product[] => {
  return products.filter(p => p.id !== productId).slice(0, limit);
};
