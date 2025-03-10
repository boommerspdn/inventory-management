import { productColumns } from "./product-columns";

import Header from "@/components/header";
import { DataTable } from "@/components/ui/data-table";
import prismadb from "@/lib/prismadb";
import { Product } from "@/lib/types";

const ProductPage = async () => {
  const products = await prismadb.product.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <div className="space-y-6">
      <Header
        title="รายการสินค้า"
        description="สินค้าที่มีอยู่ในคลัง สามารถเพิ่ม ลบ หรือแก้ไขสถานะได้ที่นี่"
      />
      <DataTable
        columns={productColumns}
        data={products}
        buttonLink={{ href: "/product", label: "เพิ่มสินค้า" }}
      />
    </div>
  );
};

export default ProductPage;
