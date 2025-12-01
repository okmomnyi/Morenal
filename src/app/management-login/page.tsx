"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSignIn } from "@/hooks/useFirebaseAuth";
import Button from "@/components/ui/button/Button";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useSignIn();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn(email, password);
      
      // Check if user is admin
      const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || [];
      const isAdmin = adminEmails.some(adminEmail => 
        adminEmail.trim().toLowerCase() === email.toLowerCase()
      );

      if (isAdmin) {
        router.push('/admin/dashboard');
      } else {
        setError("Access denied. Management privileges required.");
        // Sign out non-admin user
        // You might want to implement signOut here
      }
    } catch (error: any) {
      setError(error.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-500 to-brand-600 p-12 flex-col justify-center">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <Image
              src="/images/logo/logo-dark.svg"
              alt="MORENAL Logo"
              width={40}
              height={40}
              style={{ width: 'auto', height: '40px' }}
            />
            <span className="text-2xl font-bold text-white">MORENAL</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Management Suite
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Elegance in every Purchase
          </p>
          <p className="text-white/80">
            Comprehensive business management tools for your e-commerce platform. 
            Streamline operations and optimize performance.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center justify-center gap-3 mb-8 lg:hidden">
            <Image
              src="/images/logo/logo.svg"
              alt="MORENAL Logo"
              width={32}
              height={32}
              style={{ width: 'auto', height: '32px' }}
            />
            <span className="text-xl font-bold text-gray-900">MORENAL</span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Management Portal
            </h2>
            <p className="text-gray-600">
              Authorized access only
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                placeholder="email@morenal.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Accessing..." : "Access Management Portal"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Need help?</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-brand-600 hover:text-brand-500"
              >
                Forgot your password?
              </Link>
              <div className="text-sm text-gray-500">
                Customer login? <Link href="/auth/signin" className="text-brand-600 hover:text-brand-500">Go to store</Link>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-900">Secure Admin Access</p>
                <p className="text-xs text-gray-600 mt-1">
                  Only authorized administrators can access this panel. All activities are logged.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
