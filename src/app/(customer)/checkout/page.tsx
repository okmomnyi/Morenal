"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/button/Button";
import InputField from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

function CheckoutPageContent() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);

  const handlePlaceOrder = () => {
    // In a real app, process payment here
    alert("Order placed successfully!");
    clearCart();
    window.location.href = "/";
  };

  if (items.length === 0) {
    return (
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Your cart is empty
          </h1>
          <Link href="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          Checkout
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Steps */}
            <div className="flex items-center justify-between p-6 mb-6 bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    step >= 1
                      ? "bg-brand-500 text-white"
                      : "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                    1
                  </div>
                <span
                  className={`text-sm font-medium ${
                    step >= 1
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  Shipping
                </span>
              </div>
              <div className="w-12 h-px bg-gray-200 dark:bg-gray-800"></div>
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    step >= 2
                      ? "bg-brand-500 text-white"
                      : "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  2
                </div>
                <span
                  className={`text-sm font-medium ${
                    step >= 2
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  Payment
                </span>
              </div>
              <div className="w-12 h-px bg-gray-200 dark:bg-gray-800"></div>
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    step >= 3
                      ? "bg-brand-500 text-white"
                      : "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  3
                </div>
                <span
                  className={`text-sm font-medium ${
                    step >= 3
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  Review
                </span>
              </div>
            </div>

            {/* Step Content */}
            <div className="p-6 bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-gray-900">
              {step === 1 && (
                <div>
                  <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                    Shipping Information
                  </h2>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <InputField
                        id="firstName"
                        label="First Name"
                        placeholder="John"
                      />
                      <InputField
                        id="lastName"
                        label="Last Name"
                        placeholder="Doe"
                      />
                    </div>
                    <InputField
                      id="email"
                      label="Email"
                      type="email"
                      placeholder="john@example.com"
                    />
                    <InputField
                      id="phone"
                      label="Phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                    />
                    <InputField
                      id="address"
                      label="Address"
                      placeholder="123 Main St"
                    />
                    <div className="grid gap-4 md:grid-cols-3">
                      <InputField id="city" label="City" placeholder="New York" />
                      <Select
                        id="state"
                        label="State"
                        options={[
                          { value: "NY", label: "New York" },
                          { value: "CA", label: "California" },
                          { value: "TX", label: "Texas" },
                        ]}
                        selected="NY"
                        onSelect={() => {}}
                      />
                      <InputField
                        id="zip"
                        label="ZIP Code"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button onClick={() => setStep(2)} className="flex-1">
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                    Payment Information
                  </h2>
                  <div className="space-y-4">
                    <InputField
                      id="cardNumber"
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                      <InputField
                        id="expiry"
                        label="Expiry Date"
                        placeholder="MM/YY"
                      />
                      <InputField id="cvv" label="CVV" placeholder="123" />
                    </div>
                    <InputField
                      id="cardName"
                      label="Name on Card"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} className="flex-1">
                      Continue to Review
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                    Review Order
                  </h2>
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl dark:bg-gray-800"
                      >
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button onClick={handlePlaceOrder} className="flex-1">
                      Place Order
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="p-6 bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-gray-900">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Order Summary
              </h2>
              <div className="pb-4 mb-4 space-y-2 border-b border-gray-200 dark:border-gray-800">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                <span>Total</span>
                <span>${(totalPrice * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutPageContent />
    </ProtectedRoute>
  );
}
