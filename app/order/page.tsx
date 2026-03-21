import type { Metadata } from "next";
import OrderClient from "./order-client";

export const metadata: Metadata = {
  title: "รายการสั่งซื้อ",
  description: "คำสั่งซื้อทั้งหมด สามารถออกใบกำกับภาษีเพื่อสร้างคำสั่งซื้อได้ที่นี่",
};

export default function OrderPage() {
  return <OrderClient />;
}
