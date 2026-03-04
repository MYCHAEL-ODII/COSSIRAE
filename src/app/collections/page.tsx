import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections } from "@/lib/data";

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore COSSIRAE's curated collections of dark luxury fashion.",
};

export default function CollectionsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#0d0d0d] border-b border-[#1a1a1a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-subtitle">Curated</p>
          <h1 className="section-title text-4xl">Collections</h1>
          <p className="text-[#888888] mt-3 max-w-lg">
            Each collection is a chapter in our ongoing story — a meditation on darkness, 
            beauty, and the art of dressing with intention.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Collection */}
        <div className="mb-16">
          <Link
            href={`/collections/${collections[0].slug}`}
            className="group relative block overflow-hidden"
          >
            <div className="aspect-[21/9] overflow-hidden">
              <img
                src={collections[0].image}
                alt={collections[0].name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 overlay-gradient" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-10">
              <p className="text-xs text-[#c9a84c] font-semibold tracking-widest uppercase mb-2">
                Featured Collection · {collections[0].itemCount} pieces
              </p>
              <h2 className="font-serif text-4xl font-bold text-white mb-3">
                {collections[0].name}
              </h2>
              <p className="text-[#cccccc] max-w-md mb-4">{collections[0].description}</p>
              <div className="flex items-center gap-2 text-[#c9a84c] text-sm font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                Shop Collection
                <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        </div>

        {/* All Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 overlay-gradient" />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs text-[#c9a84c] font-semibold tracking-widest uppercase mb-1">
                    {collection.itemCount} pieces
                  </p>
                  <h3 className="font-serif text-2xl font-bold text-white mb-1">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-[#cccccc] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {collection.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="text-xs font-semibold tracking-widest uppercase text-[#c9a84c]">
                      Explore
                    </span>
                    <ArrowRight size={14} className="text-[#c9a84c]" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
