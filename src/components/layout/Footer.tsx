import Link from "next/link";
import { Instagram, Twitter, Facebook, Youtube, ArrowRight } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "New Arrivals", href: "/shop?filter=new" },
    { label: "Collections", href: "/collections" },
    { label: "Bestsellers", href: "/shop?filter=bestsellers" },
    { label: "Sale", href: "/shop?filter=sale" },
    { label: "Gift Cards", href: "/gift-cards" },
  ],
  company: [
    { label: "Our Story", href: "/about" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Press & Media", href: "/press" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Care Instructions", href: "/care" },
    { label: "Track Order", href: "/track" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a]">
      {/* Newsletter Section */}
      <div className="border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-subtitle">Stay Connected</p>
              <h2 className="section-title text-3xl mb-4">
                Join the Inner Circle
              </h2>
              <p className="text-[#888888] text-sm leading-relaxed max-w-md">
                Be the first to discover new collections, exclusive offers, and the stories behind our craft. 
                No noise — only what matters.
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="input-dark flex-1"
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe
                  <ArrowRight size={16} />
                </button>
              </form>
              <p className="text-[#888888] text-xs mt-3">
                By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-serif text-2xl font-bold tracking-[0.2em] text-white uppercase block mb-6"
            >
              COSSIRAE
            </Link>
            <p className="text-[#888888] text-sm leading-relaxed mb-8 max-w-xs">
              Luxury fashion for those who understand that true style is a philosophy, 
              not a trend. Crafted with intention. Worn with purpose.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-[#2a2a2a] flex items-center justify-center text-[#888888] hover:text-[#c9a84c] hover:border-[#c9a84c] transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-[#f5f5f5] mb-6">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#888888] hover:text-[#c9a84c] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-[#f5f5f5] mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#888888] hover:text-[#c9a84c] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-[#f5f5f5] mb-6">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#888888] hover:text-[#c9a84c] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#888888] text-xs">
              © {new Date().getFullYear()} COSSIRAE. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-[#888888] text-xs hover:text-[#c9a84c] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[#888888] text-xs hover:text-[#c9a84c] transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-[#888888] text-xs hover:text-[#c9a84c] transition-colors">
                Cookie Policy
              </Link>
            </div>
            <div className="flex items-center gap-2">
              {["visa", "mc", "amex", "paypal", "apple"].map((card) => (
                <div
                  key={card}
                  className="w-10 h-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded flex items-center justify-center"
                >
                  <span className="text-[8px] text-[#888888] font-bold uppercase">{card}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
