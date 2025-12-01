"use client";
import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";
import ProductGrid from "@/components/shop/ProductGrid";

// Default product structure - will be replaced with API data
const defaultProduct = {
  id: "1",
  name: "Premium Wireless Headphones",
  price: 299.99,
  originalPrice: 399.99,
  description:
    "Experience superior sound quality with our Premium Wireless Headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort for all-day wear.",
  images: [
    "/images/product/product-01.png",
    "/images/product/product-02.png",
    "/images/product/product-03.png",
    "/images/product/product-04.png",
  ],
  rating: 4.8,
  reviews: 128,
  inStock: true,
  features: [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Premium comfort padding",
    "Bluetooth 5.0 connectivity",
    "Foldable design",
    "Includes carrying case",
  ],
  specifications: {
    Brand: "Premium Audio",
    Model: "PW-2024",
    Color: "Black",
    Weight: "250g",
    Connectivity: "Bluetooth 5.0",
    "Battery Life": "30 hours",
  },
};

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState(defaultProduct);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );
  const { addToCart } = useCart();

  // Fetch product and related products
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch single product
        const productResponse = await fetch(`/api/products/${id}`);
        const productData = await productResponse.json();

        if (productData.success) {
          setProduct(productData.product);
        }

        // Fetch all products for related items
        const allProductsResponse = await fetch("/api/products");
        const allProductsData = await allProductsResponse.json();

        if (allProductsData.success) {
          // Filter out current product and show up to 4 related items
          const related = allProductsData.products
            .filter((p: any) => p.id !== id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      },
      quantity
    );
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen py-12 bg-white dark:bg-gray-dark">
        <div className="text-lg text-gray-600 dark:text-gray-400">
          Loading product...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-12 bg-white dark:bg-gray-dark">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex mb-8 text-sm">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link
              href="/shop"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Shop
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 dark:text-white">{product.name}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Images */}
            <div>
              <div className="relative mb-4 overflow-hidden bg-gray-100 aspect-square rounded-2xl dark:bg-gray-800">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {discount > 0 && (
                  <div className="absolute top-4 left-4">
                    <Badge color="error">-{discount}%</Badge>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition ${
                      selectedImage === index
                        ? "border-brand-500"
                        : "border-gray-200 dark:border-gray-800"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-warning-500 text-warning-500"
                          : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 pb-6 mb-6 border-b border-gray-200 dark:border-gray-800">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <Badge color="success">In Stock</Badge>
                ) : (
                  <Badge color="error">Out of Stock</Badge>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex items-center justify-center w-10 h-10 text-gray-600 transition bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
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
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="w-16 text-center text-lg font-medium text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex items-center justify-center w-10 h-10 text-gray-600 transition bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-3">
                <Button onClick={handleAddToCart} className="flex-1">
                  Add to Cart
                </Button>
                <button className="flex items-center justify-center w-12 h-12 text-gray-600 transition bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Features */}
              <div className="p-6 mt-8 bg-gray-50 rounded-2xl dark:bg-gray-900">
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 mt-0.5 text-success-500"
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
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <div className="border-b border-gray-200 dark:border-gray-800">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`pb-4 text-sm font-medium transition ${
                    activeTab === "description"
                      ? "border-b-2 border-brand-500 text-brand-500"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-4 text-sm font-medium transition ${
                    activeTab === "reviews"
                      ? "border-b-2 border-brand-500 text-brand-500"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  Reviews ({product.reviews})
                </button>
              </div>
            </div>

            <div className="py-8">
              {activeTab === "description" && (
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                      Product Description
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {product.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                      Specifications
                    </h3>
                    <dl className="space-y-2">
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800"
                          >
                            <dt className="text-gray-600 dark:text-gray-400">
                              {key}
                            </dt>
                            <dd className="font-medium text-gray-900 dark:text-white">
                              {value}
                            </dd>
                          </div>
                        )
                      )}
                    </dl>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="max-w-2xl">
                  <p className="text-gray-600 dark:text-gray-400">
                    Customer reviews will be displayed here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
            You May Also Like
          </h2>
          <ProductGrid products={relatedProducts} />
        </div>
      </div>
    </>
  );
}
