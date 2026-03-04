"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, Grid3X3, LayoutList, X, ChevronDown } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { products, categories } from "@/lib/data";
import { Product } from "@/lib/types";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = result.filter((p) => p.badge === "new").concat(result.filter((p) => p.badge !== "new"));
        break;
    }

    return result;
  }, [selectedCategory, selectedSizes, priceRange, sortBy]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedSizes([]);
    setPriceRange([0, 1000]);
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategory !== "All" || selectedSizes.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000;

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-[#0d0d0d] border-b border-[#1a1a1a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-subtitle">Discover</p>
          <h1 className="section-title text-4xl">Shop All</h1>
          <p className="text-[#888888] mt-3 text-sm">
            {filteredProducts.length} pieces
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-[#2a2a2a]">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all border ${
                  selectedCategory === cat
                    ? "bg-[#c9a84c] text-[#0a0a0a] border-[#c9a84c]"
                    : "bg-transparent text-[#888888] border-[#2a2a2a] hover:border-[#c9a84c] hover:text-[#c9a84c]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-[#1a1a1a] border border-[#2a2a2a] text-[#cccccc] text-xs font-medium px-4 py-2 pr-8 focus:outline-none focus:border-[#c9a84c] cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#888888] pointer-events-none"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-widest uppercase border transition-all ${
                isFilterOpen || hasActiveFilters
                  ? "border-[#c9a84c] text-[#c9a84c]"
                  : "border-[#2a2a2a] text-[#888888] hover:border-[#c9a84c] hover:text-[#c9a84c]"
              }`}
            >
              <SlidersHorizontal size={14} />
              Filters
              {hasActiveFilters && (
                <span className="w-4 h-4 bg-[#c9a84c] text-[#0a0a0a] text-[10px] font-bold rounded-full flex items-center justify-center">
                  !
                </span>
              )}
            </button>

            {/* View Mode */}
            <div className="hidden sm:flex border border-[#2a2a2a]">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${
                  viewMode === "grid" ? "bg-[#c9a84c] text-[#0a0a0a]" : "text-[#888888] hover:text-white"
                }`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${
                  viewMode === "list" ? "bg-[#c9a84c] text-[#0a0a0a]" : "text-[#888888] hover:text-white"
                }`}
              >
                <LayoutList size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="bg-[#111111] border border-[#2a2a2a] p-6 mb-8 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Size Filter */}
              <div>
                <h3 className="label-dark mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`w-10 h-10 text-xs font-semibold border transition-all ${
                        selectedSizes.includes(size)
                          ? "border-[#c9a84c] text-[#c9a84c] bg-[#c9a84c]/10"
                          : "border-[#2a2a2a] text-[#888888] hover:border-[#c9a84c] hover:text-[#c9a84c]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="label-dark mb-3">
                  Price Range: ${priceRange[0]} — ${priceRange[1]}
                </h3>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  step={50}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-[#c9a84c]"
                />
                <div className="flex justify-between text-xs text-[#888888] mt-1">
                  <span>$0</span>
                  <span>$1000+</span>
                </div>
              </div>

              {/* Collection Filter */}
              <div>
                <h3 className="label-dark mb-3">Collection</h3>
                <div className="space-y-2">
                  {["Noir Essentials", "Avant-Garde", "Urban Luxe", "Evening Ritual"].map((col) => (
                    <label key={col} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="accent-[#c9a84c]" />
                      <span className="text-sm text-[#888888] group-hover:text-[#cccccc] transition-colors">
                        {col}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-sm text-[#888888] hover:text-red-400 transition-colors"
                  >
                    <X size={14} />
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategory !== "All" && (
              <span className="tag-gold flex items-center gap-1">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("All")}>
                  <X size={10} />
                </button>
              </span>
            )}
            {selectedSizes.map((size) => (
              <span key={size} className="tag-gold flex items-center gap-1">
                Size: {size}
                <button onClick={() => toggleSize(size)}>
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#888888] text-lg mb-4">No products found</p>
            <button onClick={clearFilters} className="btn-secondary">
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
                : "grid grid-cols-1 gap-4"
            }
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-16">
            <button className="btn-secondary">
              Load More
              <ChevronDown size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
