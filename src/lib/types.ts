export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  collection: string;
  images: string[];
  description: string;
  details: string[];
  sizes: string[];
  colors: ProductColor[];
  badge?: "new" | "sale" | "bestseller";
  rating: number;
  reviewCount: number;
  inStock: boolean;
  sku: string;
  tags: string[];
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  itemCount: number;
}

export interface Order {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  items: CartItem[];
  total: number;
  trackingNumber?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  orders: Order[];
}

export interface FilterState {
  category: string[];
  collection: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  sortBy: "featured" | "price-asc" | "price-desc" | "newest" | "rating";
}
