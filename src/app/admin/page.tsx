"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminRoute from "@/components/auth/AdminRoute";

function AdminIndexContent() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to test-setup page as the default admin landing
    router.push("/admin/test-setup");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-600 dark:text-gray-400">Redirecting to admin panel...</p>
    </div>
  );
}

export default function AdminIndexPage() {
  return (
    <AdminRoute>
      <AdminIndexContent />
    </AdminRoute>
  );
}
