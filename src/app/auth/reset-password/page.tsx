/**
 * Reset Password Page
 * 
 * This page allows users to request a password reset email.
 */

"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { usePasswordReset } from "@/hooks/useFirebaseAuth";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const { resetPassword, loading, error, success } = usePasswordReset();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await resetPassword(email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="p-8 bg-white shadow-xl dark:bg-gray-dark rounded-2xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              Reset Password
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your email to receive a password reset link
            </p>
          </div>

          {error && (
            <div className="p-4 mb-6 text-sm text-red-800 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-xl">
              {error.message}
            </div>
          )}

          {success && (
            <div className="p-4 mb-6 text-sm text-green-800 bg-green-50 dark:bg-green-900/20 dark:text-green-400 rounded-xl">
              Password reset email sent! Please check your inbox.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 text-white transition bg-brand-500 rounded-xl hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/auth/signin"
              className="text-sm font-medium text-brand-500 hover:text-brand-600"
            >
              ← Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
