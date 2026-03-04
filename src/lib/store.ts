"use client";

import { create } from "zustand";
import { CartItem, Product } from "./types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product, size, color) => {
    const items = get().items;
    const existingIndex = items.findIndex(
      (item) => item.product.id === product.id && item.size === size && item.color === color
    );

    if (existingIndex >= 0) {
      const newItems = [...items];
      newItems[existingIndex] = {
        ...newItems[existingIndex],
        quantity: newItems[existingIndex].quantity + 1,
      };
      set({ items: newItems, isOpen: true });
    } else {
      set({ items: [...items, { product, quantity: 1, size, color }], isOpen: true });
    }
  },

  removeItem: (productId, size, color) => {
    set({
      items: get().items.filter(
        (item) => !(item.product.id === productId && item.size === size && item.color === color)
      ),
    });
  },

  updateQuantity: (productId, size, color, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, size, color);
      return;
    }
    set({
      items: get().items.map((item) =>
        item.product.id === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      ),
    });
  },

  clearCart: () => set({ items: [] }),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set({ isOpen: !get().isOpen }),

  getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
  getTotalPrice: () =>
    get().items.reduce((total, item) => total + item.product.price * item.quantity, 0),
}));

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  toggleItem: (product: Product) => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],

  addItem: (product) => {
    if (!get().isWishlisted(product.id)) {
      set({ items: [...get().items, product] });
    }
  },

  removeItem: (productId) => {
    set({ items: get().items.filter((item) => item.id !== productId) });
  },

  isWishlisted: (productId) => get().items.some((item) => item.id === productId),

  toggleItem: (product) => {
    if (get().isWishlisted(product.id)) {
      get().removeItem(product.id);
    } else {
      get().addItem(product);
    }
  },
}));
