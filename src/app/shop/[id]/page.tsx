"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Share2,
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  RefreshCw,
  Shield,
  Plus,
  Minus,
  Check,
} from "lucide-react";
import { products } from "@/lib/data";
import { useCartStore, useWishlistStore } from "@/lib/store";
import ProductCard from "@/components/ui/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const product = products.find((p) => p.id === params.id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || "");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "details" | "reviews">("description");

  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl mb-4">Product Not Found</h1>
          <Link href="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const relatedProducts = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-[#1a1a1a] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[#888888]">
            <Link href="/" className="hover:text-[#c9a84c] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#c9a84c] transition-colors">Shop</Link>
            <span>/</span>
            <Link href={`/shop?category=${product.category}`} className="hover:text-[#c9a84c] transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-[#cccccc]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* ─── IMAGE GALLERY ─── */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-[#1a1a1a] overflow-hidden group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Badge */}
              {product.badge === "new" && <span className="badge-new">New</span>}
              {product.badge === "sale" && discountPercent && (
                <span className="badge-sale">-{discountPercent}%</span>
              )}

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0a0a0a]/80 border border-[#2a2a2a] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:border-[#c9a84c]"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0a0a0a]/80 border border-[#2a2a2a] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:border-[#c9a84c]"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-24 overflow-hidden border-2 transition-all ${
                      selectedImage === i ? "border-[#c9a84c]" : "border-[#2a2a2a] hover:border-[#3a3a3a]"
                    }`}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── PRODUCT INFO ─── */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="tag">{product.category}</span>
                <span className="tag">{product.collection}</span>
              </div>
              <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={star <= Math.round(product.rating) ? "text-[#c9a84c]" : "text-[#3a3a3a]"}
                      fill={star <= Math.round(product.rating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-sm text-[#888888]">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[#c9a84c]">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-[#888888] line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span className="tag-gold text-xs">Save {discountPercent}%</span>
                </>
              )}
            </div>

            <div className="divider" />

            {/* Color Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="label-dark">Color</label>
                <span className="text-sm text-[#cccccc]">{selectedColor}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? "border-[#c9a84c] scale-110"
                        : "border-[#3a3a3a] hover:border-[#888888]"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="label-dark">Size</label>
                <Link href="/size-guide" className="text-xs text-[#c9a84c] hover:underline">
                  Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[3rem] h-10 px-3 text-sm font-semibold border transition-all ${
                      selectedSize === size
                        ? "border-[#c9a84c] text-[#c9a84c] bg-[#c9a84c]/10"
                        : "border-[#2a2a2a] text-[#888888] hover:border-[#c9a84c] hover:text-[#c9a84c]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-xs text-[#888888] mt-2">Please select a size</p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="label-dark mb-3">Quantity</label>
              <div className="flex items-center border border-[#2a2a2a] w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#888888] hover:text-white transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-[#888888] hover:text-white transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`flex-1 btn-primary justify-center ${
                  !selectedSize ? "opacity-50 cursor-not-allowed" : ""
                } ${addedToCart ? "bg-green-600 border-green-600" : ""}`}
              >
                {addedToCart ? (
                  <>
                    <Check size={18} />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={() => toggleItem(product)}
                className={`w-12 h-12 border flex items-center justify-center transition-all ${
                  wishlisted
                    ? "border-[#c9a84c] text-[#c9a84c] bg-[#c9a84c]/10"
                    : "border-[#2a2a2a] text-[#888888] hover:border-[#c9a84c] hover:text-[#c9a84c]"
                }`}
                aria-label="Add to wishlist"
              >
                <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
              </button>
              <button
                className="w-12 h-12 border border-[#2a2a2a] flex items-center justify-center text-[#888888] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
                aria-label="Share"
              >
                <Share2 size={18} />
              </button>
            </div>

            {/* SKU */}
            <p className="text-xs text-[#888888]">SKU: {product.sku}</p>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#2a2a2a]">
              {[
                { icon: Truck, text: "Free shipping over $300" },
                { icon: RefreshCw, text: "30-day returns" },
                { icon: Shield, text: "Secure checkout" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center text-center gap-2">
                  <Icon size={18} className="text-[#c9a84c]" />
                  <span className="text-xs text-[#888888]">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── PRODUCT TABS ─── */}
        <div className="mt-20 border-t border-[#2a2a2a] pt-12">
          <div className="flex gap-8 border-b border-[#2a2a2a] mb-8">
            {(["description", "details", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-semibold tracking-widest uppercase transition-all border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-[#c9a84c] text-[#c9a84c]"
                    : "border-transparent text-[#888888] hover:text-[#cccccc]"
                }`}
              >
                {tab}
                {tab === "reviews" && (
                  <span className="ml-2 text-xs">({product.reviewCount})</span>
                )}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div className="max-w-2xl">
              <p className="text-[#cccccc] leading-relaxed">{product.description}</p>
            </div>
          )}

          {activeTab === "details" && (
            <div className="max-w-2xl">
              <ul className="space-y-3">
                {product.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#cccccc]">
                    <span className="text-[#c9a84c] mt-0.5">—</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="max-w-2xl space-y-6">
              {[
                { name: "Alexandra M.", rating: 5, text: "Absolutely stunning piece. The quality is exceptional and the fit is perfect.", date: "2 weeks ago" },
                { name: "James K.", rating: 5, text: "Worth every penny. The craftsmanship is extraordinary.", date: "1 month ago" },
              ].map((review, i) => (
                <div key={i} className="border-b border-[#2a2a2a] pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-sm">{review.name}</p>
                      <p className="text-xs text-[#888888]">{review.date}</p>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={12}
                          className={star <= review.rating ? "text-[#c9a84c]" : "text-[#3a3a3a]"}
                          fill={star <= review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[#cccccc]">{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ─── RELATED PRODUCTS ─── */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="mb-8">
              <p className="section-subtitle">You May Also Like</p>
              <h2 className="section-title text-3xl">Related Products</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
