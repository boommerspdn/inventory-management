import type { Metadata } from "next";
import CartClient from "./cart-client";

export const metadata: Metadata = {
  title: "ออกใบกำกับภาษี (เลือกสินค้า)",
  description: "เลือกสินค้าที่ต้องการจะเพิ่มในใบกำกับภาษี จากนั้นกดสร้างใบกำกับภาษี",
};

export default async function CartPage({ params }: { params: Promise<{ orderId: string }> }) {
  const resolvedParams = await params;
  return <CartClient params={resolvedParams} />;
}
