"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Star,
} from "lucide-react";

const mockOrders = [
  {
    id: "KIL-A8F2B1",
    date: "Feb 28, 2024",
    status: "delivered" as const,
    items: 2,
    total: 805,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4f7b?w=200&q=80",
  },
  {
    id: "KIL-C3D9E4",
    date: "Feb 10, 2024",
    status: "shipped" as const,
    items: 1,
    total: 320,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80",
  },
  {
    id: "KIL-F7G1H5",
    date: "Jan 22, 2024",
    status: "processing" as const,
    items: 3,
    total: 1240,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80",
  },
];

const statusColors = {
  delivered: "text-green-400 bg-green-400/10 border-green-400/30",
  shipped: "text-[#c9a84c] bg-[#c9a84c]/10 border-[#c9a84c]/30",
  processing: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  cancelled: "text-red-400 bg-red-400/10 border-red-400/30",
};

const navItems = [
  { icon: Package, label: "Orders", id: "orders" },
  { icon: Heart, label: "Wishlist", id: "wishlist" },
  { icon: MapPin, label: "Addresses", id: "addresses" },
  { icon: CreditCard, label: "Payment", id: "payment" },
  { icon: Settings, label: "Settings", id: "settings" },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#0d0d0d] border-b border-[#1a1a1a] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full flex items-center justify-center">
              <User size={28} className="text-[#c9a84c]" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold">Alexandra Mitchell</h1>
              <p className="text-[#888888] text-sm">alexandra@example.com</p>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={10} className="text-[#c9a84c]" fill="currentColor" />
                ))}
                <span className="text-xs text-[#888888] ml-1">Gold Member</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {navItems.map(({ icon: Icon, label, id }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-all ${
                    activeTab === id
                      ? "bg-[#c9a84c]/10 border-l-2 border-[#c9a84c] text-[#c9a84c]"
                      : "text-[#888888] hover:text-white hover:bg-[#1a1a1a]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    {label}
                  </div>
                  <ChevronRight size={14} />
                </button>
              ))}
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#888888] hover:text-red-400 transition-colors">
                <LogOut size={16} />
                Sign Out
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-6">Order History</h2>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="card-dark p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-20 bg-[#1a1a1a] overflow-hidden flex-shrink-0">
                          <img
                            src={order.image}
                            alt="Order"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="font-semibold text-sm">Order #{order.id}</p>
                              <p className="text-xs text-[#888888] mt-1">{order.date}</p>
                              <p className="text-xs text-[#888888]">{order.items} item{order.items > 1 ? "s" : ""}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-[#c9a84c]">${order.total.toLocaleString()}</p>
                              <span
                                className={`inline-block mt-1 px-2 py-0.5 text-xs font-semibold border rounded-full ${
                                  statusColors[order.status]
                                }`}
                              >
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-3 mt-4">
                            <button className="text-xs text-[#c9a84c] hover:underline">
                              View Details
                            </button>
                            {order.status === "shipped" && (
                              <button className="text-xs text-[#888888] hover:text-white transition-colors">
                                Track Package
                              </button>
                            )}
                            {order.status === "delivered" && (
                              <button className="text-xs text-[#888888] hover:text-white transition-colors">
                                Write Review
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-6">My Wishlist</h2>
                <div className="text-center py-16">
                  <Heart size={48} className="text-[#3a3a3a] mx-auto mb-4" />
                  <p className="text-[#888888] mb-6">Your wishlist is empty</p>
                  <Link href="/shop" className="btn-primary">
                    Explore Shop
                  </Link>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl font-semibold">Saved Addresses</h2>
                  <button className="btn-secondary text-sm py-2 px-4">Add Address</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="card-dark p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span className="tag-gold text-xs">Default</span>
                      <button className="text-xs text-[#888888] hover:text-[#c9a84c] transition-colors">Edit</button>
                    </div>
                    <p className="font-semibold text-sm">Alexandra Mitchell</p>
                    <p className="text-sm text-[#888888] mt-1">
                      123 Fashion Avenue<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                  <div className="border border-dashed border-[#2a2a2a] p-6 flex items-center justify-center cursor-pointer hover:border-[#c9a84c] transition-colors group">
                    <div className="text-center">
                      <p className="text-[#888888] group-hover:text-[#c9a84c] transition-colors text-sm">
                        + Add New Address
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Tab */}
            {activeTab === "payment" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl font-semibold">Payment Methods</h2>
                  <button className="btn-secondary text-sm py-2 px-4">Add Card</button>
                </div>
                <div className="space-y-4">
                  <div className="card-dark p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-[#1a1a1a] border border-[#2a2a2a] rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-[#888888]">VISA</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">•••• •••• •••• 4242</p>
                        <p className="text-xs text-[#888888]">Expires 12/26</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="tag-gold text-xs">Default</span>
                      <button className="text-xs text-[#888888] hover:text-red-400 transition-colors">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-6">Account Settings</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label-dark">First Name</label>
                      <input type="text" defaultValue="Alexandra" className="input-dark" />
                    </div>
                    <div>
                      <label className="label-dark">Last Name</label>
                      <input type="text" defaultValue="Mitchell" className="input-dark" />
                    </div>
                  </div>
                  <div>
                    <label className="label-dark">Email Address</label>
                    <input type="email" defaultValue="alexandra@example.com" className="input-dark" />
                  </div>
                  <div>
                    <label className="label-dark">Phone Number</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" className="input-dark" />
                  </div>
                  <div className="border-t border-[#2a2a2a] pt-6">
                    <h3 className="font-semibold text-sm mb-4">Notifications</h3>
                    <div className="space-y-3">
                      {[
                        "Order updates and shipping notifications",
                        "New collection announcements",
                        "Exclusive member offers",
                        "Style recommendations",
                      ].map((pref) => (
                        <label key={pref} className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="accent-[#c9a84c]" />
                          <span className="text-sm text-[#888888]">{pref}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
