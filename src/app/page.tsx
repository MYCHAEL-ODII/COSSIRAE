import Link from "next/link";
import { ArrowRight, Play, Star, Truck, Shield, RefreshCw, Globe } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { products, collections } from "@/lib/data";

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);
  const bestsellers = products.filter((p) => p.badge === "bestseller" || p.rating >= 4.7).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=90"
            alt="Hero"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <p className="section-subtitle animate-fade-in">New Collection 2024</p>
            <h1 className="section-title text-5xl sm:text-6xl lg:text-7xl mb-6 animate-slide-up">
              Dressed in
              <br />
              <span className="text-gradient-gold italic">Darkness</span>
            </h1>
            <p className="text-[#cccccc] text-lg leading-relaxed mb-10 max-w-lg animate-slide-up">
              Luxury fashion for those who understand that true style is a philosophy, 
              not a trend. Crafted with intention. Worn with purpose.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up">
              <Link href="/collections" className="btn-primary">
                Explore Collections
                <ArrowRight size={18} />
              </Link>
              <Link href="/about" className="btn-secondary flex items-center gap-2">
                <Play size={16} />
                Our Story
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in">
          <span className="text-xs tracking-widest uppercase text-[#888888]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#888888] to-transparent" />
        </div>
      </section>

      {/* ─── MARQUEE STRIP ─── */}
      <div className="bg-[#c9a84c] py-3 overflow-hidden">
        <div className="flex gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="text-[#0a0a0a] text-xs font-bold tracking-widest uppercase flex items-center gap-12">
              New Collection Available
              <span className="text-[#0a0a0a]/50">✦</span>
              Free Shipping Over $300
              <span className="text-[#0a0a0a]/50">✦</span>
              Sustainable Luxury
              <span className="text-[#0a0a0a]/50">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── FEATURED COLLECTIONS ─── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-subtitle">Curated for You</p>
            <h2 className="section-title text-4xl">Featured Collections</h2>
          </div>
          <Link href="/collections" className="hidden sm:flex items-center gap-2 text-sm text-[#888888] hover:text-[#c9a84c] transition-colors">
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className={`group relative overflow-hidden ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className={`relative overflow-hidden ${index === 0 ? "aspect-[4/5]" : "aspect-square"}`}>
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 overlay-gradient" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs text-[#c9a84c] font-semibold tracking-widest uppercase mb-1">
                    {collection.itemCount} pieces
                  </p>
                  <h3 className={`font-serif font-bold text-white ${index === 0 ? "text-2xl" : "text-lg"}`}>
                    {collection.name}
                  </h3>
                  <p className="text-sm text-[#cccccc] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {collection.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span className="text-xs font-semibold tracking-widest uppercase text-[#c9a84c]">
                      Shop Now
                    </span>
                    <ArrowRight size={14} className="text-[#c9a84c]" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── BESTSELLERS ─── */}
      <section className="py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-subtitle">Most Loved</p>
              <h2 className="section-title text-4xl">Bestsellers</h2>
            </div>
            <Link href="/shop?filter=bestsellers" className="hidden sm:flex items-center gap-2 text-sm text-[#888888] hover:text-[#c9a84c] transition-colors">
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRAND STORY BANNER ─── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80"
            alt="Brand Story"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-subtitle">Our Philosophy</p>
          <h2 className="section-title text-4xl sm:text-5xl mb-6">
            Fashion as a Form of
            <br />
            <span className="text-gradient-gold italic">Self-Expression</span>
          </h2>
          <p className="text-[#cccccc] text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            COSSIRAE was born from a belief that clothing should be more than fabric — 
            it should be a statement, a shield, a second skin. We create pieces for those 
            who dress with intention and live without compromise.
          </p>
          <Link href="/about" className="btn-primary">
            Discover Our Story
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ─── NEW ARRIVALS ─── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-subtitle">Just Arrived</p>
            <h2 className="section-title text-4xl">New Arrivals</h2>
          </div>
          <Link href="/shop?filter=new" className="hidden sm:flex items-center gap-2 text-sm text-[#888888] hover:text-[#c9a84c] transition-colors">
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ─── SUSTAINABILITY TEASER ─── */}
      <section className="py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
                  alt="Sustainability"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#c9a84c] p-6 hidden lg:block">
                <p className="text-[#0a0a0a] font-bold text-3xl">100%</p>
                <p className="text-[#0a0a0a] text-sm font-semibold">Sustainable Materials</p>
              </div>
            </div>
            <div>
              <p className="section-subtitle">Our Commitment</p>
              <h2 className="section-title text-4xl mb-6">
                Luxury Without
                <br />
                Compromise
              </h2>
              <p className="text-[#888888] leading-relaxed mb-6">
                Every piece in our collection is crafted with a deep respect for the planet. 
                We source only the finest sustainable materials, partner with ethical manufacturers, 
                and offset 100% of our carbon footprint.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { value: "100%", label: "Sustainable Materials" },
                  { value: "0", label: "Carbon Footprint" },
                  { value: "50+", label: "Ethical Partners" },
                  { value: "2030", label: "Net Zero Target" },
                ].map((stat) => (
                  <div key={stat.label} className="border border-[#2a2a2a] p-4">
                    <p className="text-2xl font-bold text-[#c9a84c] font-serif">{stat.value}</p>
                    <p className="text-xs text-[#888888] mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/sustainability" className="btn-secondary">
                Learn More
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRESS LOGOS ─── */}
      <section className="py-16 border-y border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-[#888888] tracking-widest uppercase mb-10">
            As Featured In
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {["VOGUE", "HARPER'S BAZAAR", "WALLPAPER*", "BOF", "ELLE", "W MAGAZINE"].map((pub) => (
              <span
                key={pub}
                className="font-serif text-lg font-bold text-[#3a3a3a] hover:text-[#888888] transition-colors cursor-default tracking-wider"
              >
                {pub}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-subtitle">What They Say</p>
          <h2 className="section-title text-4xl">Client Stories</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Alexandra M.",
              location: "New York",
              text: "COSSIRAE has completely transformed my wardrobe. Every piece is a work of art — the quality is unmatched and the aesthetic is exactly what I've been searching for.",
              rating: 5,
            },
            {
              name: "James K.",
              location: "London",
              text: "The Obsidian Blazer is the most beautifully constructed garment I've ever owned. Worth every penny. The attention to detail is extraordinary.",
              rating: 5,
            },
            {
              name: "Sofia R.",
              location: "Paris",
              text: "I discovered COSSIRAE through a friend and I've never looked back. The dark aesthetic speaks to my soul and the sustainability commitment aligns with my values.",
              rating: 5,
            },
          ].map((review) => (
            <div key={review.name} className="card-dark p-8">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    className="text-[#c9a84c]"
                    fill="currentColor"
                  />
                ))}
              </div>
              <p className="text-[#cccccc] text-sm leading-relaxed mb-6 italic">
                &ldquo;{review.text}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-sm">{review.name}</p>
                <p className="text-xs text-[#888888]">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TRUST BADGES ─── */}
      <section className="py-16 bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: "Free Global Shipping",
                desc: "On all orders over $300",
              },
              {
                icon: RefreshCw,
                title: "30-Day Returns",
                desc: "Hassle-free return policy",
              },
              {
                icon: Shield,
                title: "Secure Payments",
                desc: "256-bit SSL encryption",
              },
              {
                icon: Globe,
                title: "Ships Worldwide",
                desc: "To over 150 countries",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 border border-[#2a2a2a] flex items-center justify-center text-[#c9a84c]">
                  <Icon size={22} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-xs text-[#888888] mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INSTAGRAM GRID ─── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-subtitle">@cossirae</p>
          <h2 className="section-title text-4xl">Follow Our World</h2>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80",
            "https://images.unsplash.com/photo-1594938298603-c8148c4b4f7b?w=400&q=80",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
          ].map((img, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src={img}
                alt={`Instagram post ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#c9a84c]/0 group-hover:bg-[#c9a84c]/20 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold tracking-widest uppercase">
                  View
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
