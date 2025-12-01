"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ProductGrid from "@/components/shop/ProductGrid";
import Button from "@/components/ui/button/Button";
import HeroCarousel from "@/components/common/HeroCarousel";
import { ArrowRightIcon } from "@/icons";

// Default fallback hero images (cloud-hosted on Unsplash CDN - free public images)
// These are PLACEHOLDER images. Upload your own via Admin Panel → Hero Images to use ImgBB!
const defaultHeroImages = [
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=90", // Online shopping - woman with laptop and credit card
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=90", // E-commerce - shopping cart with phone
  "https://images.unsplash.com/photo-1557821552-17105176677c?w=1920&q=90", // Modern shopping - packages and devices
];

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  badge?: "new" | "sale" | "hot";
}

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [heroImages, setHeroImages] = useState<string[]>(defaultHeroImages);
  const [loading, setLoading] = useState(true);

  // Fetch products and hero images from API/Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const response = await fetch("/api/products");
        const data = await response.json();
        if (data.success) {
          // Show first 4 products as featured
          setFeaturedProducts(data.products.slice(0, 4));
        }

        // Fetch hero images from Firestore
        try {
          const { getDocument, collections } = await import("@/lib/firebase");
          const settings = await getDocument(collections.settings, "hero-images");
          if (settings && settings.images && settings.images.length > 0) {
            setHeroImages(settings.images);
          }
        } catch (error) {
          // Silently use default hero images if Firestore fetch fails
          // This can happen if user is not authenticated or settings don't exist yet
          console.log("Using default hero images");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {/* Hero Section with Carousel Background */}
      <section className="relative overflow-hidden h-[85vh] min-h-[500px] max-h-[800px]">
        {/* Background Carousel */}
        <HeroCarousel images={heroImages} interval={5000} />

        {/* Hero Content - Left Side Dominant */}
        <div className="container relative z-10 h-full px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center h-full">
            <div className="w-full max-w-4xl text-white lg:w-3/5">
              {/* Brand Name - MORENAL */}
              <div className="mb-6 lg:mb-8">
                <h1 className="text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-9xl drop-shadow-2xl">
                  MORENAL
                </h1>
              </div>

              {/* Slogan - Elegance in every Purchase */}
              <div className="mb-8 lg:mb-12">
                <p className="text-2xl font-light italic tracking-wide text-white/95 sm:text-3xl lg:text-4xl xl:text-5xl drop-shadow-xl">
                  Elegance in every Purchase
                </p>
              </div>

              {/* Decorative Line */}
              <div className="w-32 h-1 mb-8 bg-white/80 lg:w-40 lg:h-1.5"></div>

              {/* Description */}
              <p className="mb-10 text-base leading-relaxed text-white/90 lg:text-lg xl:text-xl drop-shadow-md max-w-2xl">
                Discover curated collections of premium products. Experience luxury, 
                quality, and sophistication with every item you choose. Your journey 
                to elegance starts here.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 lg:gap-6">
                <Link href="/shop">
                  <Button 
                    size="md"
                    className="!bg-white !text-gray-900 hover:!bg-gray-100 !border-white shadow-2xl font-semibold px-10 py-6 text-base lg:px-12 lg:py-7 lg:text-lg"
                  >
                    Shop Now
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button 
                    variant="outline" 
                    size="md"
                    className="!border-2 !border-white !text-white hover:!bg-white/20 backdrop-blur-sm font-semibold px-10 py-6 text-base lg:px-12 lg:py-7 lg:text-lg"
                  >
                    View Collections
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Browse our wide range of categories
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
            {["Electronics", "Clothing", "Home & Garden", "Accessories"].map(
              (category) => (
                <Link
                  key={category}
                  href={`/shop?category=${category.toLowerCase()}`}
                  className="p-8 text-center transition bg-white border border-gray-200 group rounded-2xl hover:shadow-theme-md dark:border-gray-800 dark:bg-gray-dark"
                >
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition bg-brand-50 rounded-2xl group-hover:bg-brand-500 dark:bg-brand-500/15">
                    <svg
                      className="w-8 h-8 text-brand-500 group-hover:text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {category}
                  </h3>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white dark:bg-gray-dark">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Discover our most popular items
            </p>
          </div>
          {loading ? (
            <div className="py-12 text-center text-gray-600 dark:text-gray-400">
              Loading products...
            </div>
          ) : (
            <ProductGrid products={featuredProducts} />
          )}
          <div className="mt-12 text-center">
            <Link href="/shop">
              <Button size="md">
                View All Products
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-brand-50 dark:bg-brand-500/15">
                <svg
                  className="w-8 h-8 text-brand-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Free Shipping
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                On orders over $50
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-brand-50 dark:bg-brand-500/15">
                <svg
                  className="w-8 h-8 text-brand-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Secure Payment
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                100% secure transactions
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-brand-50 dark:bg-brand-500/15">
                <svg
                  className="w-8 h-8 text-brand-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Easy Returns
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                30-day return policy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white dark:bg-gray-dark">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="p-12 text-center bg-gradient-to-br from-brand-500 to-brand-700 rounded-3xl">
            <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
              Subscribe to Our Newsletter
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Get the latest updates on new products and upcoming sales
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 text-gray-900 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button className="!bg-white !text-brand-500 hover:!bg-white/90">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
