import { NextResponse } from "next/server";
import { 
  queryDocuments, 
  setDocument, 
  collections, 
  createConstraints,
  serverTimestamp 
} from "@/lib/firebase";

// GET all products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const constraints = category 
      ? [createConstraints.where("category", "==", category)]
      : [];

    const products = await queryDocuments(collections.products, constraints);

    return NextResponse.json({
      success: true,
      products,
      count: products.length,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST create new product
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const productId = `prod-${Date.now()}`;
    const productData = {
      name: body.name,
      description: body.description || "",
      price: parseFloat(body.price),
      originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : undefined,
      image: body.image,
      images: body.images || [body.image],
      category: body.category,
      inventory: parseInt(body.inventory) || 0,
      rating: body.rating || 0,
      reviews: body.reviews || 0,
      badge: body.badge,
      inStock: parseInt(body.inventory) > 0,
      features: body.features || [],
      specifications: body.specifications || {},
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDocument(collections.products, productId, productData);

    return NextResponse.json({
      success: true,
      productId,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
