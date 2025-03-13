import { Cart } from "@/lib/types";

import Header from "@/components/header";
import ProductCart from "@/components/product-cart";
import ProductList from "@/components/product-list";
import { Separator } from "@/components/ui/separator";
import { faker } from "@faker-js/faker";
import prismadb from "@/lib/prismadb";

const CartPage = async () => {
  const products = await prismadb.product.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <div className="space-y-4">
      <Header
        title="ออกใบเสนอราคา (เลือกสินค้า)"
        description="เลือกสินค้าที่ต้องการจะเพิ่มในใบเสนอราคา จากนั้นกดสร้างใบเสนอราคา"
      />
      <Separator />
      <div className="grid grid-cols-12 gap-4">
        <ProductList data={products} />
        <ProductCart />
      </div>
    </div>
  );
};

export default CartPage;
