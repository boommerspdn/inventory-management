import type { Metadata } from "next";
import ProductClient from "./product-client";

export const metadata: Metadata = {
  title: "รายการสินค้า",
  description: "สินค้าที่มีอยู่ในคลัง สามารถเพิ่ม ลบ หรืออัพเดทสถานะได้ที่นี่",
};

export default function ProductPage() {
  return <ProductClient />;
}
