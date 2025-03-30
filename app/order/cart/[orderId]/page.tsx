import type { Metadata } from "next";
import Header from "@/components/header";
import ProductCart from "@/components/product-cart";
import ProductList from "@/components/product-list";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prismadb";
import { Prisma } from "@prisma/client";

export const metadata: Metadata = {
  title: "ออกใบกำกับภาษี (เลือกสินค้า)",
};

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

  const products = await prisma.product.findMany({
    orderBy: { date: "desc" },
    select,
  });
  const initialCart = await prisma.cart.findMany({
    where: { orderId: orderId },
    include,
  });

  return (
    <div className="space-y-4 ">
      <Header
        title="ออกใบกำกับภาษี (เลือกสินค้า)"
        description="เลือกสินค้าที่ต้องการจะเพิ่มในใบกำกับภาษี จากนั้นกดสร้างใบกำกับภาษี"
        length={products.length}
      />
      <Separator />

      <div className="grid grid-cols-12 col-span-full gap-4">
        <ProductList
          className="col-span-full order-2 md:order-1 md:col-span-7 2xl:col-span-9"
          data={products}
        />
        <ProductCart
          className="col-span-full order-1 md:order-2 md:col-span-5 2xl:col-span-3"
          initialData={initialCart}
        />
      </div>
    </div>
  );
};

export default CartPage;
