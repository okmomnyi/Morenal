"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

export default function CustomerHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 dark:border-gray-800 dark:bg-gray-dark">
      {/* Top Bar */}
      <div className="border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-end h-10">
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="text-xs text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white sm:text-sm"
              >
                Support
              </Link>
              {user ? (
                <Link
                  href="/account"
                  className="text-xs text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white sm:text-sm"
                >
                  My Account
                </Link>
              ) : (
                <Link
                  href="/auth/signin"
                  className="text-xs text-brand-600 transition hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 sm:text-sm"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo/logo.svg"
              alt="Morenal Logo"
              width={32}
              height={32}
              style={{ width: 'auto', height: '32px' }}
              className="dark:hidden"
            />
            <Image
              src="/images/logo/logo-dark.svg"
              alt="Morenal Logo"
              width={32}
              height={32}
              style={{ width: 'auto', height: '32px' }}
              className="hidden dark:block"
            />
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white lg:text-2xl">
              MORENAL
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="items-center hidden gap-8 lg:flex">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 transition hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-sm font-medium text-gray-700 transition hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
            >
              Shop
            </Link>
            <Link
              href="/shop?category=new"
              className="text-sm font-medium text-gray-700 transition hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
            >
              New Arrivals
            </Link>
            <Link
              href="/shop?sale=true"
              className="text-sm font-medium text-gray-700 transition hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
            >
              Sale
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 transition hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
            >
              About
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center justify-center w-10 h-10 text-gray-500 transition bg-white border border-gray-200 rounded-full hover:text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="items-center justify-center hidden w-10 h-10 text-gray-500 transition bg-white border border-gray-200 rounded-full sm:flex hover:text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              {theme === "dark" ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Account/Sign In */}
            {user ? (
              <Link
                href="/account"
                className="items-center justify-center hidden w-10 h-10 text-gray-500 transition bg-white border border-gray-200 rounded-full sm:flex hover:text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
            ) : (
              <Link
                href="/auth/signin"
                className="items-center justify-center hidden px-4 py-2 text-sm font-medium text-white transition rounded-full sm:flex bg-brand-500 hover:bg-brand-600"
              >
                Sign In
              </Link>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-10 h-10 text-gray-500 transition bg-white border border-gray-200 rounded-full hover:text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-semibold text-white rounded-full -top-1 -right-1 bg-brand-500">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-10 h-10 text-gray-500 transition bg-white border border-gray-200 rounded-full lg:hidden hover:text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 lg:hidden dark:border-gray-800">
          <nav className="container px-4 py-4 mx-auto space-y-3 sm:px-6">
            <Link
              href="/"
              className="block text-sm font-medium text-gray-700 transition hover:text-brand-500 dark:text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="block text-sm font-medium text-gray-700 transition hover:text-brand-500 dark:text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/shop?category=new"
              className="block text-sm font-medium text-gray-700 transition hover:text-brand-500 dark:text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              New Arrivals
            </Link>
            <Link
              href="/shop?sale=true"
              className="block text-sm font-medium text-gray-700 transition hover:text-brand-500 dark:text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sale
            </Link>
            <Link
              href="/about"
              className="block text-sm font-medium text-gray-700 transition hover:text-brand-500 dark:text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
