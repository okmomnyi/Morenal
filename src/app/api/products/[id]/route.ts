import { NextResponse } from "next/server";
import { 
  getDocument, 
  updateDocument, 
  deleteDocument, 
  collections,
  serverTimestamp 
} from "@/lib/firebase";

// GET single product by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await getDocument(collections.products, id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT update product
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updates: any = {
      updatedAt: serverTimestamp(),
    };
    
    if (body.name) updates.name = body.name;
    if (body.description !== undefined) updates.description = body.description;
    if (body.price) updates.price = parseFloat(body.price);
    if (body.originalPrice !== undefined)
      updates.originalPrice = body.originalPrice ? parseFloat(body.originalPrice) : undefined;
    if (body.image) updates.image = body.image;
    if (body.images) updates.images = body.images;
    if (body.category) updates.category = body.category;
    if (body.inventory !== undefined) {
      updates.inventory = parseInt(body.inventory);
      updates.inStock = updates.inventory > 0;
    }
    if (body.rating !== undefined) updates.rating = body.rating;
    if (body.reviews !== undefined) updates.reviews = body.reviews;
    if (body.badge !== undefined) updates.badge = body.badge;
    if (body.features) updates.features = body.features;
    if (body.specifications) updates.specifications = body.specifications;

    await updateDocument(collections.products, id, updates);

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteDocument(collections.products, id);

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
