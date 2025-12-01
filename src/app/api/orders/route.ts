import { NextResponse } from "next/server";
import { 
  queryDocuments, 
  setDocument, 
  collections, 
  createConstraints,
  serverTimestamp 
} from "@/lib/firebase";

// GET orders (with optional userId filter)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const constraints = userId 
      ? [
          createConstraints.where("userId", "==", userId),
          createConstraints.where("status", "!=", "cart"),
          createConstraints.orderBy("createdAt", "desc"),
        ]
      : [
          createConstraints.where("status", "!=", "cart"),
          createConstraints.orderBy("createdAt", "desc"),
        ];

    const orders = await queryDocuments(collections.orders, constraints);

    return NextResponse.json({
      success: true,
      orders,
      count: orders.length,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST create new order
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.userId || !body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid order data" },
        { status: 400 }
      );
    }

    const orderId = `order-${Date.now()}`;
    const orderData = {
      userId: body.userId,
      items: body.items,
      total: body.total || 0,
      subtotal: body.subtotal || 0,
      tax: body.tax || 0,
      shipping: body.shipping || 0,
      status: body.status || "pending",
      paymentStatus: body.paymentStatus || "pending",
      paymentMethod: body.paymentMethod || "card",
      shippingAddress: body.shippingAddress || {},
      billingAddress: body.billingAddress || {},
      customerEmail: body.customerEmail || "",
      customerName: body.customerName || "",
      customerPhone: body.customerPhone || "",
      notes: body.notes || "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDocument(collections.orders, orderId, orderData);

    return NextResponse.json({
      success: true,
      orderId,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
