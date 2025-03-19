import Header from "@/components/header";
import ProductCart from "@/components/product-cart";
import ProductList from "@/components/product-list";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { Prisma } from "@prisma/client";

const select = {
  id: true,
  title: true,
  amount: true,
  number: true,
  price: true,
};

export type CartProduct = Prisma.ProductGetPayload<{
  select: typeof select;
}>;

const CartPage = async () => {
  const products = await prismadb.product.findMany({
    orderBy: { date: "desc" },
    select,
  });

  return (
    <div className="space-y-4">
      <Header
        title="ออกใบกำกับภาษี (เลือกสินค้า)"
        description="เลือกสินค้าที่ต้องการจะเพิ่มในใบกำกับภาษี จากนั้นกดสร้างใบกำกับภาษี"
        length={products.length}
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
