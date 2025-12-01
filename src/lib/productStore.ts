// Simple in-memory product store (temporary until Firebase integration)
// In production, this would be replaced with database queries

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  inventory: number;
  rating?: number;
  reviews?: number;
  badge?: "new" | "sale" | "hot";
  inStock: boolean;
  features?: string[];
  specifications?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

// Initial seed data
let products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "Experience superior sound quality with our Premium Wireless Headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort for all-day wear.",
    price: 299.99,
    originalPrice: 399.99,
    image: "/images/product/product-01.png",
    images: [
      "/images/product/product-01.png",
      "/images/product/product-02.png",
      "/images/product/product-03.png",
      "/images/product/product-04.png",
    ],
    category: "Electronics",
    inventory: 45,
    rating: 4.8,
    reviews: 128,
    badge: "sale",
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    description: "Advanced fitness tracking with heart rate monitoring, GPS, and 7-day battery life.",
    price: 449.99,
    image: "/images/product/product-02.png",
    category: "Wearables",
    inventory: 32,
    rating: 4.5,
    reviews: 89,
    badge: "new",
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Laptop Stand Aluminum",
    description: "Ergonomic laptop stand made from premium aluminum with adjustable height.",
    price: 79.99,
    image: "/images/product/product-03.png",
    category: "Accessories",
    inventory: 67,
    rating: 5,
    reviews: 245,
    badge: "hot",
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Mechanical Keyboard RGB",
    description: "Professional mechanical keyboard with customizable RGB lighting and premium switches.",
    price: 159.99,
    originalPrice: 199.99,
    image: "/images/product/product-04.png",
    category: "Accessories",
    inventory: 28,
    rating: 4.7,
    reviews: 167,
    badge: "sale",
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Wireless Mouse Pro",
    description: "Precision wireless mouse with ergonomic design and long battery life.",
    price: 59.99,
    image: "/images/product/product-01.png",
    category: "Accessories",
    inventory: 89,
    rating: 4.3,
    reviews: 92,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "USB-C Hub Adapter",
    description: "7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and 100W power delivery.",
    price: 49.99,
    image: "/images/product/product-02.png",
    category: "Accessories",
    inventory: 124,
    rating: 4.8,
    reviews: 156,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Noise Canceling Earbuds",
    description: "True wireless earbuds with active noise cancellation and premium sound quality.",
    price: 199.99,
    originalPrice: 249.99,
    image: "/images/product/product-03.png",
    category: "Electronics",
    inventory: 56,
    rating: 4.9,
    reviews: 203,
    badge: "sale",
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "4K Webcam",
    description: "Professional 4K webcam with auto-focus and built-in microphone.",
    price: 129.99,
    image: "/images/product/product-04.png",
    category: "Electronics",
    inventory: 41,
    rating: 4.6,
    reviews: 78,
    badge: "new",
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// CRUD operations
export const productStore = {
  getAll: (): Product[] => {
    return products;
  },

  getById: (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  },

  getByCategory: (category: string): Product[] => {
    return products.filter((p) => p.category === category);
  },

  create: (product: Omit<Product, "id" | "createdAt" | "updatedAt">): Product => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    products.push(newProduct);
    return newProduct;
  },

  update: (id: string, updates: Partial<Product>): Product | null => {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    products[index] = {
      ...products[index],
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };
    return products[index];
  },

  delete: (id: string): boolean => {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return false;

    products.splice(index, 1);
    return true;
  },

  updateInventory: (id: string, quantity: number): boolean => {
    const product = products.find((p) => p.id === id);
    if (!product) return false;

    product.inventory = quantity;
    product.inStock = quantity > 0;
    product.updatedAt = new Date().toISOString();
    return true;
  },

  decrementInventory: (id: string, amount: number = 1): boolean => {
    const product = products.find((p) => p.id === id);
    if (!product || product.inventory < amount) return false;

    product.inventory -= amount;
    product.inStock = product.inventory > 0;
    product.updatedAt = new Date().toISOString();
    return true;
  },
};
