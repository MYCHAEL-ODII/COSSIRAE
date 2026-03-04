"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/lib/types";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact";
}

export default function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const [hoveredImage, setHoveredImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedSize, product.colors[0]?.name || "Default");
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link href={`/shop/${product.id}`} className="group block">
      <div className="relative">
        {/* Product Image */}
        <div className="product-card-image">
          <img
            src={product.images[hoveredImage] || product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onMouseEnter={() => product.images[1] && setHoveredImage(1)}
            onMouseLeave={() => setHoveredImage(0)}
          />

          {/* Badge */}
          {product.badge === "new" && <span className="badge-new">New</span>}
          {product.badge === "sale" && discountPercent && (
            <span className="badge-sale">-{discountPercent}%</span>
          )}
          {product.badge === "bestseller" && (
            <span className="badge-new" style={{ backgroundColor: "#888888" }}>
              Best
            </span>
          )}

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
            {/* Quick Add */}
            {variant === "default" && (
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                <div className="bg-[#0a0a0a]/90 backdrop-blur-sm border border-[#2a2a2a] px-3 py-2">
                  <p className="text-xs text-[#888888] mb-2 text-center">Quick Add</p>
                  <div className="flex gap-1">
                    {product.sizes.slice(0, 5).map((size) => (
                      <button
                        key={size}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedSize(size);
                          addItem(product, size, product.colors[0]?.name || "Default");
                        }}
                        className={`w-8 h-8 text-xs font-medium border transition-all ${
                          selectedSize === size
                            ? "border-[#c9a84c] text-[#c9a84c] bg-[#c9a84c]/10"
                            : "border-[#3a3a3a] text-[#888888] hover:border-[#c9a84c] hover:text-[#c9a84c]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleWishlist}
              className={`w-8 h-8 flex items-center justify-center border transition-all duration-200 ${
                wishlisted
                  ? "bg-[#c9a84c] border-[#c9a84c] text-[#0a0a0a]"
                  : "bg-[#0a0a0a]/80 border-[#2a2a2a] text-[#cccccc] hover:border-[#c9a84c] hover:text-[#c9a84c]"
              }`}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
            </button>
            <button
              onClick={handleAddToCart}
              className="w-8 h-8 flex items-center justify-center bg-[#0a0a0a]/80 border border-[#2a2a2a] text-[#cccccc] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-200"
              aria-label="Add to cart"
            >
              <ShoppingBag size={14} />
            </button>
            <Link
              href={`/shop/${product.id}`}
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 flex items-center justify-center bg-[#0a0a0a]/80 border border-[#2a2a2a] text-[#cccccc] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-200"
              aria-label="Quick view"
            >
              <Eye size={14} />
            </Link>
          </div>
        </div>

        {/* Product Info */}
        <div className="pt-4 pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#888888] mb-1 tracking-wider uppercase">
                {product.category}
              </p>
              <h3 className="text-sm font-semibold text-[#f5f5f5] leading-tight group-hover:text-[#c9a84c] transition-colors truncate">
                {product.name}
              </h3>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold text-[#f5f5f5]">
                ${product.price.toLocaleString()}
              </p>
              {product.originalPrice && (
                <p className="text-xs text-[#888888] line-through">
                  ${product.originalPrice.toLocaleString()}
                </p>
              )}
            </div>
          </div>

          {/* Color Swatches */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              {product.colors.map((color) => (
                <div
                  key={color.name}
                  className="w-3 h-3 rounded-full border border-[#3a3a3a] cursor-pointer hover:scale-125 transition-transform"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          )}

          {/* Rating */}
          {variant === "default" && (
            <div className="flex items-center gap-1 mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-xs ${
                      star <= Math.round(product.rating)
                        ? "text-[#c9a84c]"
                        : "text-[#3a3a3a]"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-[#888888]">({product.reviewCount})</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
