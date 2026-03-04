import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Leaf, Recycle, Globe, Heart, Sun, Droplets } from "lucide-react";

export const metadata: Metadata = {
  title: "Sustainability & Impact",
  description: "Our commitment to sustainable luxury fashion and positive environmental impact.",
};

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=80"
            alt="Sustainability"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <p className="section-subtitle">Our Commitment</p>
          <h1 className="section-title text-5xl lg:text-6xl max-w-2xl">
            Luxury Without
            <br />
            <span className="text-gradient-gold italic">Compromise</span>
          </h1>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xl text-[#cccccc] leading-relaxed font-serif italic mb-8">
          &ldquo;We believe that the most beautiful things should also be the most responsible. 
          Luxury and sustainability are not opposites — they are partners.&rdquo;
        </p>
        <div className="divider mx-auto" />
      </section>

      {/* Impact Numbers */}
      <section className="py-16 bg-[#0d0d0d] border-y border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "100%", label: "Sustainable Materials", desc: "All fabrics certified sustainable" },
              { value: "0", label: "Carbon Footprint", desc: "Fully offset since 2022" },
              { value: "50+", label: "Ethical Partners", desc: "Certified fair-trade suppliers" },
              { value: "2030", label: "Net Zero Target", desc: "Our commitment to the planet" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-[#c9a84c] font-serif mb-2">{stat.value}</p>
                <p className="font-semibold text-sm mb-1">{stat.label}</p>
                <p className="text-xs text-[#888888]">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-subtitle">Our Approach</p>
          <h2 className="section-title text-4xl">The Four Pillars</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: Leaf,
              title: "Sustainable Materials",
              desc: "We source only certified organic, recycled, or sustainably harvested materials. Our wool comes from certified humane farms, our cotton is GOTS certified, and our leather is vegetable-tanned using traditional methods.",
              items: ["GOTS Certified Organic Cotton", "RWS Certified Wool", "Vegetable-Tanned Leather", "Recycled Polyester Linings"],
            },
            {
              icon: Globe,
              title: "Carbon Neutrality",
              desc: "Since 2022, COSSIRAE has been fully carbon neutral. We measure our entire carbon footprint — from raw materials to delivery — and offset 100% through verified reforestation and renewable energy projects.",
              items: ["Full supply chain measurement", "Verified carbon offsets", "Renewable energy in production", "Carbon-neutral shipping"],
            },
            {
              icon: Heart,
              title: "Ethical Production",
              desc: "Every person who touches a COSSIRAE garment is paid a living wage and works in safe, dignified conditions. We audit all our partners annually and publish the results publicly.",
              items: ["Living wage guarantee", "Annual factory audits", "Published supply chain", "Worker welfare programs"],
            },
            {
              icon: Recycle,
              title: "Circular Fashion",
              desc: "We design for longevity, not obsolescence. Our repair program extends the life of every garment, and our take-back scheme ensures nothing ends up in landfill.",
              items: ["Free lifetime repairs", "Take-back program", "Recyclable packaging", "Timeless design philosophy"],
            },
          ].map(({ icon: Icon, title, desc, items }) => (
            <div key={title} className="card-dark p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 border border-[#c9a84c]/30 bg-[#c9a84c]/10 flex items-center justify-center">
                  <Icon size={22} className="text-[#c9a84c]" />
                </div>
                <h3 className="font-serif text-xl font-semibold">{title}</h3>
              </div>
              <p className="text-[#888888] text-sm leading-relaxed mb-6">{desc}</p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#cccccc]">
                    <span className="text-[#c9a84c]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Materials Deep Dive */}
      <section className="py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-subtitle">Materials</p>
              <h2 className="section-title text-4xl mb-6">
                Every Thread Tells a Story
              </h2>
              <p className="text-[#888888] leading-relaxed mb-8">
                We obsess over the provenance of every material we use. From the Mongolian cashmere 
                herders who raise our goats with traditional methods, to the Italian mills that have 
                been weaving fine fabrics for generations — we know where everything comes from.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Sun, label: "Solar-powered production facilities" },
                  { icon: Droplets, label: "Water recycling in all dyeing processes" },
                  { icon: Leaf, label: "Zero synthetic pesticides in cotton farming" },
                  { icon: Recycle, label: "Packaging made from 100% recycled materials" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon size={16} className="text-[#c9a84c] flex-shrink-0" />
                    <span className="text-sm text-[#cccccc]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", label: "Organic Cotton" },
                { src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80", label: "Merino Wool" },
                { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80", label: "Cashmere" },
                { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80", label: "Silk" },
              ].map((material) => (
                <div key={material.label} className="relative aspect-square overflow-hidden group">
                  <img
                    src={material.src}
                    alt={material.label}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 overlay-gradient" />
                  <p className="absolute bottom-3 left-3 text-xs font-semibold tracking-widest uppercase text-white">
                    {material.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-subtitle">Verified</p>
          <h2 className="section-title text-4xl">Our Certifications</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "GOTS", full: "Global Organic Textile Standard" },
            { name: "B Corp", full: "Certified B Corporation" },
            { name: "RWS", full: "Responsible Wool Standard" },
            { name: "Fair Trade", full: "Fair Trade Certified" },
          ].map((cert) => (
            <div key={cert.name} className="card-dark p-6 text-center">
              <div className="w-16 h-16 border border-[#c9a84c]/30 bg-[#c9a84c]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#c9a84c] font-bold text-xs">{cert.name}</span>
              </div>
              <p className="text-xs text-[#888888]">{cert.full}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0d0d0d] text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="section-subtitle">Take Action</p>
          <h2 className="section-title text-4xl mb-6">Shop with Purpose</h2>
          <p className="text-[#888888] mb-8">
            Every purchase supports our mission. When you buy COSSIRAE, you&apos;re investing in 
            a better future for fashion.
          </p>
          <Link href="/shop" className="btn-primary">
            Shop Sustainably
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
