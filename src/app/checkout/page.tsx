"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, CreditCard, Truck, Check } from "lucide-react";
import { useCartStore } from "@/lib/store";

type Step = "information" | "shipping" | "payment" | "confirmation";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState<Step>("information");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId] = useState(() => Math.random().toString(36).substr(2, 8).toUpperCase());
  const total = getTotalPrice();
  const shipping = total >= 300 ? 0 : 25;
  const tax = total * 0.08;
  const orderTotal = total + shipping + tax;

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "United States",
    zip: "",
    phone: "",
    shippingMethod: "standard",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === "information") {
      setCurrentStep("shipping");
    } else if (currentStep === "shipping") {
      setCurrentStep("payment");
    } else if (currentStep === "payment") {
      setIsProcessing(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsProcessing(false);
      clearCart();
      setCurrentStep("confirmation");
    }
  };

  const steps: { key: Step; label: string }[] = [
    { key: "information", label: "Information" },
    { key: "shipping", label: "Shipping" },
    { key: "payment", label: "Payment" },
  ];

  const stepIndex = steps.findIndex((s) => s.key === currentStep);

  if (currentStep === "confirmation") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-[#c9a84c]/10 border border-[#c9a84c] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-[#c9a84c]" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-3">Order Confirmed!</h1>
          <p className="text-[#888888] mb-2">
            Thank you for your order. We&apos;ve sent a confirmation to{" "}
            <span className="text-[#cccccc]">{formData.email}</span>
          </p>
          <p className="text-[#888888] text-sm mb-8">
            Order #KIL-{orderId}
          </p>
          <div className="space-y-3">
            <Link href="/account/orders" className="btn-primary w-full justify-center">
              Track Your Order
            </Link>
            <Link href="/shop" className="btn-secondary w-full justify-center">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[#1a1a1a] py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-bold tracking-[0.2em] uppercase">
            KILENTAR
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#888888]">
            <Lock size={12} />
            Secure Checkout
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* ─── FORM SECTION ─── */}
          <div className="lg:col-span-3">
            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-8">
              {steps.map((step, i) => (
                <div key={step.key} className="flex items-center gap-2">
                  <div
                    className={`flex items-center gap-2 text-xs font-semibold tracking-widest uppercase ${
                      i <= stepIndex ? "text-[#c9a84c]" : "text-[#888888]"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
                        i < stepIndex
                          ? "bg-[#c9a84c] border-[#c9a84c] text-[#0a0a0a]"
                          : i === stepIndex
                          ? "border-[#c9a84c] text-[#c9a84c]"
                          : "border-[#3a3a3a] text-[#888888]"
                      }`}
                    >
                      {i < stepIndex ? <Check size={12} /> : i + 1}
                    </div>
                    {step.label}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-8 h-px ${i < stepIndex ? "bg-[#c9a84c]" : "bg-[#2a2a2a]"}`} />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Information Step */}
              {currentStep === "information" && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl font-semibold">Contact Information</h2>
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

                  <h2 className="font-serif text-2xl font-semibold pt-4">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label-dark">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        className="input-dark"
                        required
                      />
                    </div>
                    <div>
                      <label className="label-dark">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        className="input-dark"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label-dark">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street address"
                      className="input-dark"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="label-dark">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="input-dark"
                        required
                      />
                    </div>
                    <div>
                      <label className="label-dark">ZIP Code</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        placeholder="ZIP"
                        className="input-dark"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label-dark">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="input-dark"
                    >
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>France</option>
                      <option>Germany</option>
                      <option>Japan</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Shipping Step */}
              {currentStep === "shipping" && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl font-semibold">Shipping Method</h2>
                  <div className="space-y-3">
                    {[
                      { id: "standard", label: "Standard Shipping", desc: "5-7 business days", price: total >= 300 ? "Free" : "$25" },
                      { id: "express", label: "Express Shipping", desc: "2-3 business days", price: "$45" },
                      { id: "overnight", label: "Overnight Shipping", desc: "Next business day", price: "$85" },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                          formData.shippingMethod === method.id
                            ? "border-[#c9a84c] bg-[#c9a84c]/5"
                            : "border-[#2a2a2a] hover:border-[#3a3a3a]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value={method.id}
                            checked={formData.shippingMethod === method.id}
                            onChange={handleChange}
                            className="accent-[#c9a84c]"
                          />
                          <div>
                            <p className="font-semibold text-sm">{method.label}</p>
                            <p className="text-xs text-[#888888]">{method.desc}</p>
                          </div>
                        </div>
                        <span className={`font-semibold text-sm ${method.price === "Free" ? "text-[#c9a84c]" : ""}`}>
                          {method.price}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === "payment" && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl font-semibold">Payment Details</h2>

                  {/* Payment Methods */}
                  <div className="grid grid-cols-3 gap-3">
                    {["Credit Card", "PayPal", "Apple Pay"].map((method) => (
                      <button
                        key={method}
                        type="button"
                        className="p-3 border border-[#2a2a2a] text-xs font-semibold text-[#888888] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
                      >
                        {method}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="label-dark">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className="input-dark pr-12"
                        maxLength={19}
                        required
                      />
                      <CreditCard
                        size={18}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label-dark">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      placeholder="Name on card"
                      className="input-dark"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label-dark">Expiry Date</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM / YY"
                        className="input-dark"
                        maxLength={7}
                        required
                      />
                    </div>
                    <div>
                      <label className="label-dark">CVC</label>
                      <input
                        type="text"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        placeholder="CVC"
                        className="input-dark"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#888888] bg-[#1a1a1a] border border-[#2a2a2a] p-3">
                    <Lock size={12} className="text-[#c9a84c]" />
                    Your payment information is encrypted and secure
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-4">
                {currentStep !== "information" ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (currentStep === "shipping") setCurrentStep("information");
                      if (currentStep === "payment") setCurrentStep("shipping");
                    }}
                    className="flex items-center gap-2 text-sm text-[#888888] hover:text-white transition-colors"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                ) : (
                  <Link href="/cart" className="flex items-center gap-2 text-sm text-[#888888] hover:text-white transition-colors">
                    <ArrowLeft size={16} />
                    Return to Cart
                  </Link>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-primary"
                >
                  {isProcessing ? (
                    "Processing..."
                  ) : currentStep === "payment" ? (
                    <>
                      <Lock size={16} />
                      Place Order · ${orderTotal.toFixed(2)}
                    </>
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* ─── ORDER SUMMARY ─── */}
          <div className="lg:col-span-2">
            <div className="bg-[#111111] border border-[#2a2a2a] p-6 sticky top-24">
              <h3 className="font-serif text-lg font-semibold mb-6">Order Summary</h3>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="relative w-16 h-20 bg-[#1a1a1a] flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#888888] text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight">{item.product.name}</p>
                      <p className="text-xs text-[#888888] mt-1">
                        {item.size} · {item.color}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-[#c9a84c]">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Discount code"
                  className="input-dark flex-1 text-sm"
                />
                <button className="btn-secondary px-4 py-2 text-xs">Apply</button>
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-[#2a2a2a] pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#888888]">Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#888888]">Shipping</span>
                  <span className={shipping === 0 ? "text-[#c9a84c]" : ""}>
                    {shipping === 0 ? "Free" : `$${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#888888]">Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-[#2a2a2a] pt-3">
                  <span>Total</span>
                  <span className="text-[#c9a84c]">${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="flex items-center gap-2 mt-4 text-xs text-[#888888]">
                <Truck size={14} className="text-[#c9a84c]" />
                Estimated delivery: 5-7 business days
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
