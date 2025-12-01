/**
 * Admin Route Component
 * 
 * A specialized protected route component for admin-only access.
 * Redirects non-admin users to unauthorized page.
 */

"use client";

import ProtectedRoute from "./ProtectedRoute";

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  return (
    <ProtectedRoute requireAdmin={true} redirectTo="/auth/signin">
      {children}
    </ProtectedRoute>
  );
}
