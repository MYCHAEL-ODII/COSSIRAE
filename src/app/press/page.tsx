import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, ExternalLink } from "lucide-react";
import { pressFeatures } from "@/lib/data";

export const metadata: Metadata = {
  title: "Press & Media",
  description: "COSSIRAE press coverage, media kit, and brand assets.",
};

export default function PressPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#0d0d0d] border-b border-[#1a1a1a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-subtitle">Media</p>
          <h1 className="section-title text-4xl">Press & Media</h1>
          <p className="text-[#888888] mt-3 max-w-lg">
            For press inquiries, interview requests, and media assets, 
            please contact our press team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Press Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <div className="lg:col-span-2 card-dark p-8">
            <h2 className="font-serif text-2xl font-semibold mb-4">Press Contact</h2>
            <p className="text-[#888888] mb-6">
              For all media inquiries, interview requests, product loans, and press releases, 
              please reach out to our communications team.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="label-dark">Press & Communications</p>
                <p className="font-semibold">Camille Dubois</p>
                <p className="text-sm text-[#888888]">press@cossirae.com</p>
                <p className="text-sm text-[#888888]">+33 1 42 86 00 00</p>
              </div>
              <div>
                <p className="label-dark">International Press</p>
                <p className="font-semibold">James Whitfield</p>
                <p className="text-sm text-[#888888]">international@cossirae.com</p>
                <p className="text-sm text-[#888888]">+1 212 555 0100</p>
              </div>
            </div>
          </div>
          <div className="card-dark p-8">
            <h2 className="font-serif text-2xl font-semibold mb-4">Media Kit</h2>
            <p className="text-[#888888] text-sm mb-6">
              Download our brand assets, high-resolution images, and press materials.
            </p>
            <div className="space-y-3">
              {[
                "Brand Guidelines (PDF)",
                "High-Res Images (ZIP)",
                "Press Release (PDF)",
                "Logo Package (ZIP)",
              ].map((asset) => (
                <button
                  key={asset}
                  className="w-full flex items-center justify-between p-3 border border-[#2a2a2a] text-sm text-[#888888] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
                >
                  {asset}
                  <Download size={14} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Press Features */}
        <div className="mb-20">
          <div className="mb-10">
            <p className="section-subtitle">Coverage</p>
            <h2 className="section-title text-4xl">In the Press</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pressFeatures.map((feature) => (
              <div key={feature.id} className="card-dark p-8 group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-serif text-2xl font-bold text-[#3a3a3a] group-hover:text-[#888888] transition-colors">
                    {feature.logo}
                  </span>
                  <ExternalLink size={16} className="text-[#3a3a3a] group-hover:text-[#c9a84c] transition-colors" />
                </div>
                <p className="text-xs text-[#888888] mb-3">{feature.date}</p>
                <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-[#c9a84c] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#888888] leading-relaxed italic">
                  &ldquo;{feature.excerpt}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="mb-20">
          <div className="mb-10">
            <p className="section-subtitle">Recognition</p>
            <h2 className="section-title text-4xl">Awards & Accolades</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { year: "2024", award: "Best Sustainable Luxury Brand", org: "Fashion Awards" },
              { year: "2024", award: "Emerging Designer of the Year", org: "CFDA" },
              { year: "2023", award: "Innovation in Sustainable Fashion", org: "Green Fashion Awards" },
              { year: "2023", award: "Best New Luxury Brand", org: "Vogue Business" },
              { year: "2022", award: "Ethical Fashion Pioneer", org: "B Corp Community" },
              { year: "2022", award: "Best Debut Collection", org: "Paris Fashion Week" },
            ].map((award) => (
              <div key={award.award} className="card-dark p-6">
                <p className="text-[#c9a84c] font-bold text-sm mb-2">{award.year}</p>
                <h3 className="font-semibold text-sm mb-1">{award.award}</h3>
                <p className="text-xs text-[#888888]">{award.org}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Story for Press */}
        <div className="card-dark p-10 text-center">
          <p className="section-subtitle">For Editors</p>
          <h2 className="section-title text-3xl mb-4">Brand Story</h2>
          <p className="text-[#888888] max-w-2xl mx-auto mb-8 leading-relaxed">
            COSSIRAE is a Paris-based luxury fashion house founded in 2019 by architect-turned-designer 
            Elara Voss. The brand is defined by its commitment to dark aesthetics, sustainable luxury, 
            and architectural precision. Each collection is a meditation on the beauty of darkness — 
            the space between stars, the depth of shadows, the quiet power of restraint.
          </p>
          <Link href="/about" className="btn-secondary">
            Full Brand Story
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
