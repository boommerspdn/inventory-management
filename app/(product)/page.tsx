import type { Metadata } from "next";
import { prisma } from "@/lib/prismadb";
import { productColumns } from "./product-columns";
import Header from "@/components/header";
import { DataTable } from "@/components/ui/data-table";

export const metadata: Metadata = {
  title: "รายการสินค้า",
};

const ProductPage = async () => {
  const products = await prisma.product.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <div className="space-y-6 w-full">
      <Header
        title="รายการสินค้า"
        description="สินค้าที่มีอยู่ในคลัง สามารถเพิ่ม ลบ หรือแก้ไขสถานะได้ที่นี่"
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
