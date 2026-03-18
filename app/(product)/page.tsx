import type { Metadata } from "next";
import { v4 as uuidv4 } from "uuid";

import { productColumns } from "./product-columns";
import Header from "@/components/header";
import { DataTable } from "@/components/ui/data-table";
import { Product } from "@/app/types";
import { generateMockProduct } from "@/lib/datas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "รายการสินค้า",
};

const ProductPage = () => {
  const products = Array.from({ length: 10 }, generateMockProduct);

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

export default ProductPage;
