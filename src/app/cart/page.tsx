"use client";

import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/lib/data";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const total = getTotalPrice();
  const shipping = total >= 300 ? 0 : 25;
  const tax = total * 0.08;
  const orderTotal = total + shipping + tax;

  const suggestedProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#0d0d0d] border-b border-[#1a1a1a] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title text-4xl">Shopping Cart</h1>
          <p className="text-[#888888] mt-2 text-sm">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag size={64} className="text-[#3a3a3a] mx-auto mb-6" />
            <h2 className="font-serif text-3xl mb-3">Your cart is empty</h2>
            <p className="text-[#888888] mb-8">
              Discover our curated collections and find your next statement piece.
            </p>
            <Link href="/shop" className="btn-primary">
              Explore Shop
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}-${index}`}
                  className="card-dark p-6 flex gap-6"
                >
                  {/* Image */}
                  <Link href={`/shop/${item.product.id}`} className="w-24 h-32 bg-[#1a1a1a] flex-shrink-0 overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-[#888888] uppercase tracking-wider mb-1">
                          {item.product.category}
                        </p>
                        <Link
                          href={`/shop/${item.product.id}`}
                          className="font-semibold hover:text-[#c9a84c] transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-[#888888]">Size: {item.size}</span>
                          <span className="text-[#3a3a3a]">·</span>
                          <span className="text-xs text-[#888888]">Color: {item.color}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size, item.color)}
                        className="text-[#888888] hover:text-red-400 transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center border border-[#2a2a2a]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#888888] hover:text-white transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#888888] hover:text-white transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-bold text-[#c9a84c]">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-[#888888]">
                            ${item.product.price.toLocaleString()} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#111111] border border-[#2a2a2a] p-6 sticky top-24">
                <h2 className="font-serif text-xl font-semibold mb-6">Order Summary</h2>

                {/* Discount Code */}
                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    placeholder="Discount code"
                    className="input-dark flex-1 text-sm"
                  />
                  <button className="btn-secondary px-4 py-2 text-xs">Apply</button>
                </div>

                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#888888]">Subtotal</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#888888]">Shipping</span>
                    <span className={shipping === 0 ? "text-[#c9a84c]" : ""}>
                      {shipping === 0 ? "Free" : `$${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#888888]">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-[#2a2a2a] pt-3">
                    <span>Total</span>
                    <span className="text-[#c9a84c]">${orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Free shipping progress */}
                {total < 300 && (
                  <div className="mb-6">
                    <p className="text-xs text-[#888888] mb-2">
                      Add ${(300 - total).toLocaleString()} more for free shipping
                    </p>
                    <div className="h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#c9a84c] rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((total / 300) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                <Link href="/checkout" className="btn-primary w-full justify-center mb-3">
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </Link>
                <Link href="/shop" className="btn-ghost w-full justify-center text-xs">
                  Continue Shopping
                </Link>

                {/* Payment Methods */}
                <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-[#2a2a2a]">
                  {["Visa", "MC", "Amex", "PayPal", "Apple Pay"].map((method) => (
                    <span
                      key={method}
                      className="text-[8px] text-[#888888] bg-[#1a1a1a] border border-[#2a2a2a] px-1.5 py-0.5 rounded"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* You May Also Like */}
        <div className="mt-20">
          <div className="mb-8">
            <p className="section-subtitle">Recommendations</p>
            <h2 className="section-title text-3xl">You May Also Like</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {suggestedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
