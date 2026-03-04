"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X, Heart } from "lucide-react";
import { useCartStore } from "@/lib/store";
import CartModal from "@/components/cart/CartModal";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Our Story", href: "/about" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Press", href: "/press" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getTotalItems, openCart, isOpen } = useCartStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#c9a84c] text-[#0a0a0a] text-center py-2 px-4 text-xs font-semibold tracking-widest uppercase">
        Free worldwide shipping on orders over $300 · New collection available now
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#2a2a2a]"
            : "bg-[#0a0a0a] border-b border-[#1a1a1a]"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-[#cccccc] hover:text-white transition-colors p-1"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Desktop Nav Links - Left */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.slice(0, 3).map((link) => (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Logo - Center */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 font-serif text-xl lg:text-2xl font-bold tracking-[0.2em] text-white hover:text-[#c9a84c] transition-colors uppercase"
            >
              KILENTAR
            </Link>

            {/* Desktop Nav Links - Right */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.slice(3).map((link) => (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-3 lg:gap-4">
              <button
                className="text-[#cccccc] hover:text-white transition-colors p-1"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link
                href="/account/wishlist"
                className="hidden sm:block text-[#cccccc] hover:text-white transition-colors p-1"
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </Link>
              <Link
                href="/account"
                className="hidden sm:block text-[#cccccc] hover:text-white transition-colors p-1"
                aria-label="Account"
              >
                <User size={20} />
              </Link>
              <button
                className="relative text-[#cccccc] hover:text-white transition-colors p-1"
                onClick={openCart}
                aria-label="Shopping cart"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#c9a84c] text-[#0a0a0a] text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="border-t border-[#2a2a2a] py-4 animate-fade-in">
              <div className="relative max-w-2xl mx-auto">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]"
                />
                <input
                  type="text"
                  placeholder="Search for products, collections..."
                  className="input-dark pl-12 pr-4"
                  autoFocus
                />
              </div>
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="lg:hidden bg-[#111111] border-t border-[#2a2a2a] animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-semibold tracking-widest uppercase text-[#cccccc] hover:text-[#c9a84c] transition-colors py-2 border-b border-[#2a2a2a]"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-4 pt-2">
                <Link
                  href="/account"
                  className="flex items-center gap-2 text-sm text-[#888888] hover:text-white transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <User size={16} />
                  Account
                </Link>
                <Link
                  href="/account/wishlist"
                  className="flex items-center gap-2 text-sm text-[#888888] hover:text-white transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Heart size={16} />
                  Wishlist
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Cart Modal */}
      <CartModal />
    </>
  );
}
