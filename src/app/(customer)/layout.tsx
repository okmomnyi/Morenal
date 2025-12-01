import CustomerHeader from "@/layout/CustomerHeader";
import CustomerFooter from "@/layout/CustomerFooter";
import { CartProvider } from "@/context/CartContext";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <CustomerHeader />
        <main className="flex-1">{children}</main>
        <CustomerFooter />
      </div>
    </CartProvider>
  );
}
