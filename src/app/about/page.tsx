import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story",
  description: "The story behind KILENTAR — luxury fashion born from darkness and intention.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
            alt="Our Story"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <p className="section-subtitle">Who We Are</p>
          <h1 className="section-title text-5xl lg:text-6xl">Our Story</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xl lg:text-2xl text-[#cccccc] leading-relaxed font-serif italic">
            &ldquo;We didn&apos;t set out to create a fashion brand. We set out to create a philosophy — 
            one that celebrates darkness not as absence, but as depth.&rdquo;
          </p>
          <div className="divider mx-auto mt-8" />
          <p className="text-sm text-[#888888] mt-4">— Founder, KILENTAR</p>
        </div>
      </section>

      {/* Story Sections */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
          <div>
            <p className="section-subtitle">The Beginning</p>
            <h2 className="section-title text-4xl mb-6">Born from Darkness</h2>
            <p className="text-[#888888] leading-relaxed mb-4">
              KILENTAR was founded in 2019 in a small atelier in Paris, born from a singular vision: 
              to create clothing that speaks to those who find beauty in shadows, who understand that 
              the most profound things often exist in the spaces between light.
            </p>
            <p className="text-[#888888] leading-relaxed mb-4">
              Our founder, a former architect turned fashion designer, brought a structural sensibility 
              to the world of clothing — treating each garment as a building, each seam as a load-bearing 
              wall, each silhouette as a skyline.
            </p>
            <p className="text-[#888888] leading-relaxed">
              The name KILENTAR comes from an ancient word meaning &ldquo;the space between stars&rdquo; — 
              that infinite darkness that makes the light meaningful.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
                alt="Our Atelier"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#1a1a1a] border border-[#2a2a2a] p-6 hidden lg:block">
              <p className="text-[#c9a84c] font-bold text-2xl font-serif">2019</p>
              <p className="text-[#888888] text-sm">Founded in Paris</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
                alt="Our Craft"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="section-subtitle">The Craft</p>
            <h2 className="section-title text-4xl mb-6">Obsessed with Quality</h2>
            <p className="text-[#888888] leading-relaxed mb-4">
              Every KILENTAR piece begins with the finest materials sourced from the world&apos;s most 
              respected mills and tanneries. We work exclusively with suppliers who share our commitment 
              to quality and ethical production.
            </p>
            <p className="text-[#888888] leading-relaxed mb-4">
              Our master craftspeople — many with decades of experience in haute couture — bring each 
              design to life with meticulous attention to detail. A single blazer may take up to 40 hours 
              to complete.
            </p>
            <p className="text-[#888888] leading-relaxed">
              We believe that true luxury is not about logos or price tags — it&apos;s about the feeling 
              of wearing something that was made with absolute care and intention.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="section-subtitle">The People</p>
            <h2 className="section-title text-4xl">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Elara Voss", role: "Founder & Creative Director", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
              { name: "Marcus Chen", role: "Head of Design", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
              { name: "Isabelle Noir", role: "Head of Sustainability", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
              { name: "Theo Laurent", role: "Master Tailor", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
            ].map((member) => (
              <div key={member.name} className="group">
                <div className="aspect-square overflow-hidden mb-4">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="font-serif font-semibold">{member.name}</h3>
                <p className="text-sm text-[#888888]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-subtitle">What We Stand For</p>
          <h2 className="section-title text-4xl">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Intentional Design",
              desc: "Every element of every piece is considered. Nothing is accidental. Nothing is superfluous. We design with purpose.",
            },
            {
              title: "Ethical Craft",
              desc: "We pay our artisans fairly, source materials responsibly, and maintain complete transparency throughout our supply chain.",
            },
            {
              title: "Timeless Quality",
              desc: "We don't follow trends. We create pieces that transcend seasons and become part of your story for years to come.",
            },
          ].map((value) => (
            <div key={value.title} className="card-dark p-8">
              <div className="divider mb-6" />
              <h3 className="font-serif text-xl font-semibold mb-4">{value.title}</h3>
              <p className="text-[#888888] text-sm leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0d0d0d] text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="section-subtitle">Join Us</p>
          <h2 className="section-title text-4xl mb-6">Wear Your Philosophy</h2>
          <p className="text-[#888888] mb-8">
            Discover pieces crafted for those who understand that how you dress is how you face the world.
          </p>
          <Link href="/shop" className="btn-primary">
            Explore the Collection
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
