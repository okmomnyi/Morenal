import { NextResponse } from "next/server";
import { 
  getDocument, 
  setDocument, 
  deleteDocument, 
  collections 
} from "@/lib/firebase";

// GET user's cart
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    const cartId = `cart-${userId}`;
    const cart = await getDocument(collections.orders, cartId);

    return NextResponse.json({
      success: true,
      cart: cart || { items: [], total: 0 },
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

// POST update user's cart
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, items, total } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    const cartId = `cart-${userId}`;
    await setDocument(collections.orders, cartId, {
      userId,
      items: items || [],
      total: total || 0,
      status: "cart",
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Cart updated successfully",
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

// DELETE clear user's cart
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    const cartId = `cart-${userId}`;
    await deleteDocument(collections.orders, cartId);

    return NextResponse.json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json(
      { success: false, error: "Failed to clear cart" },
      { status: 500 }
    );
  }
}
