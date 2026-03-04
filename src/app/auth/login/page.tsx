"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80"
          alt="Login"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
          <Link href="/" className="font-serif text-3xl font-bold tracking-[0.2em] uppercase text-white mb-6">
            KILENTAR
          </Link>
          <p className="text-[#cccccc] text-lg font-serif italic max-w-sm">
            &ldquo;Style is a way to say who you are without having to speak.&rdquo;
          </p>
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

          <h1 className="font-serif text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-[#888888] text-sm mb-8">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-[#c9a84c] hover:underline">
              Create one
            </Link>
          </p>

          <form className="space-y-5">
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
              <div className="flex items-center justify-between mb-2">
                <label className="label-dark">Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-[#c9a84c] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
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
            </div>

            <button type="submit" className="btn-primary w-full justify-center">
              Sign In
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2a2a2a]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#0a0a0a] px-4 text-xs text-[#888888] uppercase tracking-widest">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["Google", "Apple"].map((provider) => (
              <button
                key={provider}
                className="btn-secondary justify-center py-3"
              >
                {provider}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
