"use client";

import { use, useEffect } from "react";
import Header from "@/components/header";
import ProductForm from "@/components/product-form";
import { Separator } from "@/components/ui/separator";
import { useProductStore } from "@/hooks/use-product-store";

const ProductPage = ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = use(params);
  const getProductById = useProductStore((state) => state.getProductById);
  const isNew = productId === "new";
  const product = isNew ? null : getProductById(productId);

  useEffect(() => {
    document.title = isNew ? "เพิ่มสินค้า" : (product?.title ?? "ไม่พบสินค้า");
  }, [product, isNew]);

  const title = product ? "แก้ไขสินค้า" : "เพิ่มสินค้า";
  const description = product
    ? "แก้ไขข้อมูลสินค้าจากนั้นกดปุ่ม บันทึกรายการ เพื่อบันทึกการแก้ไขข้อมูล"
    : "กรอกข้อมูลของสินค้า จากนั้นกดปุ่ม เพิ่มสินค้า เพื่อเพิ่มสินค้าไปยังรายการ";

  return (
    <div className="space-y-4">
      <Header title={title} description={description} />
      <Separator />
      <ProductForm initialData={product} />
    </div>
  );
};

export default ProductPage;
