"use client";

import { useEffect } from "react";
import Header from "@/components/header";
import { DataTable } from "@/components/ui/data-table";
import { useProductStore } from "@/hooks/use-product-store";
import { productColumns } from "./product-columns";

const ProductClient = () => {
  const products = useProductStore((state) => state.products);

  useEffect(() => {
    document.title = "รายการสินค้า";
  }, []);

  return (
    <div className="space-y-6 w-full">
      <Header
        title="รายการสินค้า"
        description="สินค้าที่มีอยู่ในคลัง สามารถเพิ่ม ลบ หรืออัพเดทสถานะได้ที่นี่"
        length={products.length}
      />
      <DataTable
        columns={productColumns}
        data={products}
        buttonLink={{ href: "/product/new", label: "เพิ่มสินค้า" }}
        api="products"
      />
    </div>
  );
};

export default ProductClient;
