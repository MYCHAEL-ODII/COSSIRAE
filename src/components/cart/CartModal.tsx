"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function CartModal() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const total = getTotalPrice();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#111111] border-l border-[#2a2a2a] z-50 flex flex-col shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-[#c9a84c]" />
            <h2 className="font-serif text-lg font-semibold">
              Your Cart
              {items.length > 0 && (
                <span className="ml-2 text-sm font-normal text-[#888888]">
                  ({items.length} {items.length === 1 ? "item" : "items"})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="text-[#888888] hover:text-white transition-colors p-1"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag size={48} className="text-[#3a3a3a] mb-4" />
              <h3 className="font-serif text-xl mb-2">Your cart is empty</h3>
              <p className="text-[#888888] text-sm mb-8">
                Discover our curated collections and find your next statement piece.
              </p>
              <Link href="/shop" onClick={closeCart} className="btn-primary">
                Explore Shop
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}-${index}`}
                  className="flex gap-4 py-4 border-b border-[#2a2a2a] last:border-0"
                >
                  {/* Product Image */}
                  <div className="w-20 h-24 bg-[#1a1a1a] flex-shrink-0 overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-semibold text-[#f5f5f5] leading-tight mb-1">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-[#888888]">
                          Size: {item.size} · Color: {item.color}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size, item.color)}
                        className="text-[#888888] hover:text-red-400 transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#2a2a2a]">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-[#888888] hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-[#888888] hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="text-sm font-semibold text-[#c9a84c]">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#2a2a2a] px-6 py-6 space-y-4">
            {/* Subtotal */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#888888]">Subtotal</span>
                <span className="font-medium">${total.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#888888]">Shipping</span>
                <span className="text-[#c9a84c] font-medium">
                  {total >= 300 ? "Free" : "Calculated at checkout"}
                </span>
              </div>
              <div className="border-t border-[#2a2a2a] pt-2 flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg text-[#c9a84c]">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Free shipping progress */}
            {total < 300 && (
              <div>
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

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn-primary w-full justify-center"
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="btn-secondary w-full justify-center"
              >
                View Full Cart
              </Link>
            </div>

            {/* Payment Icons */}
            <div className="flex items-center justify-center gap-2 pt-2">
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
        )}
      </div>
    </>
  );
}
