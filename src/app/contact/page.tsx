"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#0d0d0d] border-b border-[#1a1a1a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-subtitle">Get in Touch</p>
          <h1 className="section-title text-4xl">Contact Us</h1>
          <p className="text-[#888888] mt-3 max-w-lg">
            We&apos;d love to hear from you. Whether you have a question about our products, 
            need styling advice, or want to discuss a collaboration.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-semibold mb-6">Reach Us</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "hello@cossirae.com",
                    sub: "We reply within 24 hours",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+1 (800) COSSIRAE",
                    sub: "Mon–Fri, 9am–6pm EST",
                  },
                  {
                    icon: MapPin,
                    label: "Atelier",
                    value: "12 Rue de la Paix, Paris",
                    sub: "By appointment only",
                  },
                  {
                    icon: Clock,
                    label: "Hours",
                    value: "Mon–Fri: 9am–6pm",
                    sub: "Sat: 10am–4pm EST",
                  },
                ].map(({ icon: Icon, label, value, sub }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-10 h-10 border border-[#2a2a2a] flex items-center justify-center text-[#c9a84c] flex-shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-[#888888] uppercase tracking-widest font-semibold mb-1">
                        {label}
                      </p>
                      <p className="text-sm font-medium">{value}</p>
                      <p className="text-xs text-[#888888]">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Links */}
            <div className="border-t border-[#2a2a2a] pt-8">
              <h3 className="font-semibold text-sm mb-4">Quick Help</h3>
              <div className="space-y-2">
                {[
                  "Track my order",
                  "Return & exchange policy",
                  "Size guide",
                  "Care instructions",
                  "Wholesale inquiries",
                ].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block text-sm text-[#888888] hover:text-[#c9a84c] transition-colors"
                  >
                    → {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="w-16 h-16 bg-[#c9a84c]/10 border border-[#c9a84c] rounded-full flex items-center justify-center mb-6">
                  <Check size={28} className="text-[#c9a84c]" />
                </div>
                <h2 className="font-serif text-2xl font-semibold mb-3">Message Sent!</h2>
                <p className="text-[#888888] max-w-sm">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="font-serif text-2xl font-semibold">Send a Message</h2>

                {/* Inquiry Type */}
                <div>
                  <label className="label-dark">Inquiry Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { value: "general", label: "General" },
                      { value: "order", label: "Order" },
                      { value: "returns", label: "Returns" },
                      { value: "press", label: "Press" },
                    ].map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: type.value })}
                        className={`py-2 text-xs font-semibold tracking-widest uppercase border transition-all ${
                          formData.type === type.value
                            ? "border-[#c9a84c] text-[#c9a84c] bg-[#c9a84c]/10"
                            : "border-[#2a2a2a] text-[#888888] hover:border-[#c9a84c] hover:text-[#c9a84c]"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-dark">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="input-dark"
                      required
                    />
                  </div>
                  <div>
                    <label className="label-dark">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="input-dark"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="label-dark">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="input-dark"
                    required
                  />
                </div>

                <div>
                  <label className="label-dark">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more..."
                    rows={6}
                    className="input-dark resize-none"
                    required
                  />
                </div>

                <button type="submit" className="btn-primary">
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="h-64 bg-[#111111] border-t border-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <MapPin size={32} className="text-[#c9a84c] mx-auto mb-3" />
          <p className="text-[#888888] text-sm">12 Rue de la Paix, 75002 Paris, France</p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#c9a84c] hover:underline mt-2 block"
          >
            Open in Google Maps →
          </a>
        </div>
      </div>
    </div>
  );
}
