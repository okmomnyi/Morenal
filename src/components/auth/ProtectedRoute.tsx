/**
 * Protected Route Component
 * 
 * This component protects routes that require authentication,
 * redirecting unauthenticated users to the sign-in page.
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireCustomer?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
  requireCustomer = false,
  redirectTo = "/auth/signin",
}: ProtectedRouteProps) {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Redirect if not authenticated
    if (!user) {
      router.push(redirectTo);
      return;
    }

    // Redirect if admin access is required but user is not admin
    if (requireAdmin && role !== "admin") {
      router.push("/unauthorized");
      return;
    }

    // Redirect if customer access is required but user is not customer
    if (requireCustomer && role !== "customer") {
      router.push("/admin");
      return;
    }
  }, [user, role, loading, requireAdmin, requireCustomer, redirectTo, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated or doesn't have required role
  if (!user) return null;
  if (requireAdmin && role !== "admin") return null;
  if (requireCustomer && role !== "customer") return null;

  return <>{children}</>;
}
