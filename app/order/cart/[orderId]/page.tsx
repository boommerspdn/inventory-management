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

const include = { products: true };

export type CartProduct = Prisma.ProductGetPayload<{
  select: typeof select;
}>;

export type initialCart = Prisma.CartGetPayload<{
  include: typeof include;
}>;

const CartPage = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { orderId } = await params;

  const products = await prismadb.product.findMany({
    orderBy: { date: "desc" },
    select,
  });
  const initialCart = await prismadb.cart.findMany({
    where: { orderId: orderId },
    include,
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
        <ProductCart initialData={initialCart} />
      </div>
    </div>
  );
};

export default CartPage;
