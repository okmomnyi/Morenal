/**
 * Unauthorized Access Page
 * 
 * This page is shown when a user tries to access a route they don't have permission for.
 */

"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function UnauthorizedPage() {
  const { isAdmin, isCustomer } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full dark:bg-red-900/20">
            <svg
              className="w-12 h-12 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Access Denied
          </h1>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
            You don't have permission to access this page.
          </p>
        </div>

        <div className="space-y-3">
          {isAdmin && (
            <Link
              href="/admin"
              className="block w-full px-6 py-3 text-white transition bg-brand-500 rounded-xl hover:bg-brand-600"
            >
              Go to Admin Dashboard
            </Link>
          )}
          {isCustomer && (
            <Link
              href="/"
              className="block w-full px-6 py-3 text-white transition bg-brand-500 rounded-xl hover:bg-brand-600"
            >
              Go to Home
            </Link>
          )}
          <Link
            href="/auth/signin"
            className="block w-full px-6 py-3 text-gray-700 transition border border-gray-300 dark:border-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Sign In with Different Account
          </Link>
        </div>
      </div>
    </div>
  );
}
