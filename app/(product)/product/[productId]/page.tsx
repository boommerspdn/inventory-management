import type { Metadata } from "next";
import ProductDetailClient from "./product-detail-client";

export const metadata: Metadata = {
  title: "รายละเอียดสินค้า",
  description: "เพิ่มหรือแก้ไขข้อมูลสินค้า",
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const resolvedParams = await params;
  return <ProductDetailClient params={resolvedParams} />;
}
