"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSignOut } from "@/hooks/useFirebaseAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { queryDocuments, collections, createConstraints } from "@/lib/firebase";
import Link from "next/link";

interface Order {
  id: string;
  items: any[];
  total: number;
  status: string;
  createdAt: any;
}

function AccountPageContent() {
  const { user } = useAuth();
  const { signOut } = useSignOut();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Simple query - no composite index needed!
      const constraints = [
        createConstraints.where("userId", "==", user.uid),
      ];
      const allOrders = await queryDocuments<Order>(collections.orders, constraints);
      
      // Filter and sort in JavaScript (no index needed)
      const userOrders = allOrders
        .filter(order => order.status !== "cart")
        .sort((a, b) => {
          // Sort by createdAt descending (newest first)
          const timeA = a.createdAt?.toMillis?.() || 0;
          const timeB = b.createdAt?.toMillis?.() || 0;
          return timeB - timeA;
        });
      
      setOrders(userOrders);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (confirm("Are you sure you want to sign out?")) {
      await signOut();
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Account
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your account settings and view your order history
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="p-6 bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-800 rounded-2xl">
              <div className="mb-6">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-brand-100 dark:bg-brand-900">
                  <svg
                    className="w-10 h-10 text-brand-600 dark:text-brand-400"
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
                </div>
                <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white">
                  {user?.displayName || "Customer"}
                </h3>
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full px-4 py-3 text-left rounded-lg transition ${
                    activeTab === "profile"
                      ? "bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full px-4 py-3 text-left rounded-lg transition ${
                    activeTab === "orders"
                      ? "bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  Order History
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-3 text-left text-red-600 transition rounded-lg hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="p-6 bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-800 rounded-2xl">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                  Profile Information
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="w-full px-4 py-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Email cannot be changed
                    </p>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={user?.displayName || "Not set"}
                      disabled
                      className="w-full px-4 py-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Account Type
                    </label>
                    <input
                      type="text"
                      value="Customer Account"
                      disabled
                      className="w-full px-4 py-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                    />
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Link
                        href="/cart"
                        className="px-6 py-3 text-center text-white transition bg-brand-500 rounded-lg hover:bg-brand-600"
                      >
                        View Cart
                      </Link>
                      <Link
                        href="/shop"
                        className="px-6 py-3 text-center transition border border-gray-300 rounded-lg dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="p-6 bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-800 rounded-2xl">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                  Order History
                </h2>

                {loading ? (
                  <p className="text-gray-600 dark:text-gray-400">Loading orders...</p>
                ) : orders.length === 0 ? (
                  <div className="py-12 text-center">
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-gray-400"
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
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                      No Orders Yet
                    </h3>
                    <p className="mb-6 text-gray-600 dark:text-gray-400">
                      You haven't placed any orders yet
                    </p>
                    <Link
                      href="/shop"
                      className="inline-block px-6 py-3 text-white transition bg-brand-500 rounded-lg hover:bg-brand-600"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              Order #{order.id.slice(-8)}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {order.createdAt?.toDate?.()?.toLocaleDateString() || "N/A"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">
                              ${order.total.toFixed(2)}
                            </p>
                            <span className="inline-block px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300">
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.items.length} item(s)
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <ProtectedRoute>
      <AccountPageContent />
    </ProtectedRoute>
  );
}
