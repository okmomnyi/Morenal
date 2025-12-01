/**
 * Customer Route Component
 * 
 * A specialized protected route component for customer-only access.
 * Redirects admin users to admin panel.
 */

"use client";

import ProtectedRoute from "./ProtectedRoute";

interface CustomerRouteProps {
  children: React.ReactNode;
}

export default function CustomerRoute({ children }: CustomerRouteProps) {
  return (
    <ProtectedRoute requireCustomer={true} redirectTo="/auth/signin">
      {children}
    </ProtectedRoute>
  );
}
