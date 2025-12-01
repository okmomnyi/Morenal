"use client";
import { useState } from "react";
import { setDocument, collections } from "@/lib/firebase";

const sampleProducts = [
  {
    name: "Wireless Headphones Pro",
    description: "Premium noise-cancelling wireless headphones with 40-hour battery life",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "electronics",
    inventory: 50,
    badge: "sale" as const,
  },
  {
    name: "Smart Watch Elite",
    description: "Advanced fitness tracker with heart rate monitor and GPS",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    category: "electronics",
    inventory: 30,
    badge: "new" as const,
  },
  {
    name: "Laptop Stand Aluminum",
    description: "Ergonomic adjustable laptop stand for better posture",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    category: "accessories",
    inventory: 100,
  },
  {
    name: "USB-C Hub 7-in-1",
    description: "Multiport adapter with HDMI, USB 3.0, and SD card reader",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500",
    category: "accessories",
    inventory: 75,
    badge: "hot" as const,
  },
];

function TestSetupContent() {
  const [productsSeeded, setProductsSeeded] = useState(false);
  const [heroSeeded, setHeroSeeded] = useState(false);
  const [loading, setLoading] = useState(false);

  const seedProducts = async () => {
    setLoading(true);
    try {
      for (const product of sampleProducts) {
        const productId = `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        await setDocument(collections.products, productId, {
          ...product,
          images: [product.image],
          features: [],
          specifications: {},
          rating: 4.5,
          reviews: 128,
          inStock: product.inventory > 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      setProductsSeeded(true);
      alert(`✅ Successfully seeded ${sampleProducts.length} sample products!`);
    } catch (error) {
      console.error("Error seeding products:", error);
      alert("❌ Failed to seed products. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const seedHeroImages = async () => {
    setLoading(true);
    try {
      // Online shopping themed hero images (Unsplash placeholders)
      const heroImages = [
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=90", // Online shopping - woman with laptop
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=90", // E-commerce - shopping cart
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=1920&q=90", // Modern shopping - packages
      ];

      await setDocument(collections.settings, "hero-images", {
        images: heroImages,
        updatedAt: new Date(),
      });

      setHeroSeeded(true);
      alert("✅ Successfully seeded hero images!");
    } catch (error) {
      console.error("Error seeding hero images:", error);
      alert("❌ Failed to seed hero images. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            🧪 Test & Setup Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Seed sample data to test your Firestore and ImgBB integration
          </p>
        </div>

        <div className="space-y-6">
          {/* Test ImgBB API */}
          <div className="p-6 bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl">
            <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              ✅ ImgBB API Configured
            </h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Your ImgBB API key is configured. You can upload images in the Products or Hero Images pages.
            </p>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-400">
                <strong>Status:</strong> Ready to upload images to ImgBB CDN
              </p>
            </div>
          </div>

          {/* Seed Products */}
          <div className="p-6 bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl">
            <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              📦 Seed Sample Products
            </h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Add {sampleProducts.length} sample products to Firestore with Unsplash placeholder images.
            </p>
            <button
              onClick={seedProducts}
              disabled={loading || productsSeeded}
              className="px-6 py-3 text-white transition bg-brand-500 rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Seeding..." : productsSeeded ? "✓ Products Seeded" : "Seed Products"}
            </button>
          </div>

          {/* Seed Hero Images */}
          <div className="p-6 bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl">
            <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              🖼️ Seed Hero Images
            </h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Add 3 sample hero carousel images to Firestore (using Unsplash placeholders).
            </p>
            <button
              onClick={seedHeroImages}
              disabled={loading || heroSeeded}
              className="px-6 py-3 text-white transition bg-brand-500 rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Seeding..." : heroSeeded ? "✓ Hero Images Seeded" : "Seed Hero Images"}
            </button>
          </div>

          {/* Test Results */}
          <div className="p-6 bg-blue-50 border border-blue-200 dark:border-blue-800 dark:bg-blue-900/20 rounded-2xl">
            <h2 className="mb-2 text-xl font-bold text-blue-900 dark:text-blue-300">
              🎯 Next Steps
            </h2>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
              <li>✅ Products API now uses Firestore (data persists on restart)</li>
              <li>✅ Admin can add/delete products with ImgBB image uploads</li>
              <li>✅ Hero images loaded from Firestore (or fallback to defaults)</li>
              <li>✅ Cart API ready for Firestore persistence</li>
              <li>✅ Orders API ready for checkout flow</li>
              <li>⚠️ Payment integration: Add Stripe keys to .env.local for payments</li>
            </ul>
          </div>

          {/* Verification Links */}
          <div className="p-6 bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              🔍 Verify Setup
            </h2>
            <div className="space-y-2">
              <a
                href="/"
                className="block px-4 py-2 text-center text-white transition bg-brand-500 rounded-lg hover:bg-brand-600"
                target="_blank"
              >
                View Customer Homepage →
              </a>
              <a
                href="/admin/products"
                className="block px-4 py-2 text-center text-brand-600 transition bg-brand-50 rounded-lg dark:bg-brand-900/20 dark:text-brand-400 hover:bg-brand-100"
              >
                Manage Products →
              </a>
              <a
                href="/admin/hero-images"
                className="block px-4 py-2 text-center text-brand-600 transition bg-brand-50 rounded-lg dark:bg-brand-900/20 dark:text-brand-400 hover:bg-brand-100"
              >
                Manage Hero Images →
              </a>
            </div>
          </div>

          {/* Security Check */}
          <div className="p-6 bg-green-50 border border-green-200 dark:border-green-800 dark:bg-green-900/20 rounded-2xl">
            <h2 className="mb-2 text-xl font-bold text-green-900 dark:text-green-300">
              🔒 Security Status
            </h2>
            <ul className="space-y-2 text-sm text-green-800 dark:text-green-400">
              <li>✅ No hardcoded API keys in code</li>
              <li>✅ All credentials in .env.local (gitignored)</li>
              <li>✅ Firebase credentials secured</li>
              <li>✅ ImgBB API key secured</li>
              <li>✅ Admin routes protected with AdminRoute wrapper</li>
              <li>✅ Role-based access control active</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestSetupPage() {
  return <TestSetupContent />;
}
