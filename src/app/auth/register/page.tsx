"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    newsletter: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const passwordStrength = () => {
    const p = formData.password;
    if (p.length === 0) return 0;
    if (p.length < 6) return 1;
    if (p.length < 10) return 2;
    return 3;
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen flex">
      {/* Left - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
          alt="Register"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
          <Link href="/" className="font-serif text-3xl font-bold tracking-[0.2em] uppercase text-white mb-6">
            KILENTAR
          </Link>
          <div className="space-y-4 text-left max-w-xs">
            {[
              "Early access to new collections",
              "Exclusive member discounts",
              "Free express shipping",
              "Personal style consultations",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#c9a84c]/20 border border-[#c9a84c] rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={10} className="text-[#c9a84c]" />
                </div>
                <span className="text-sm text-[#cccccc]">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="font-serif text-2xl font-bold tracking-[0.2em] uppercase">
              KILENTAR
            </Link>
          </div>

          <h1 className="font-serif text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-[#888888] text-sm mb-8">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#c9a84c] hover:underline">
              Sign in
            </Link>
          </p>

          <form className="space-y-5">
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

            <div>
              <label className="label-dark">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="input-dark pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          strength >= level
                            ? level === 1
                              ? "bg-red-500"
                              : level === 2
                              ? "bg-yellow-500"
                              : "bg-green-500"
                            : "bg-[#2a2a2a]"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-[#888888] mt-1">
                    {strength === 1 ? "Weak" : strength === 2 ? "Good" : "Strong"} password
                  </p>
                </div>
              )}
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                className="mt-0.5 accent-[#c9a84c]"
              />
              <span className="text-sm text-[#888888]">
                Subscribe to our newsletter for exclusive offers and new collection updates
              </span>
            </label>

            <button type="submit" className="btn-primary w-full justify-center">
              Create Account
              <ArrowRight size={16} />
            </button>

            <p className="text-xs text-[#888888] text-center">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-[#c9a84c] hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-[#c9a84c] hover:underline">Privacy Policy</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
