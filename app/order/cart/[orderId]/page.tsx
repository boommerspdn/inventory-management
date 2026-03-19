import type { Metadata } from "next";
import Header from "@/components/header";
import ProductCart from "@/components/product-cart";
import ProductList from "@/components/product-list";
import { Separator } from "@/components/ui/separator";
import { generateMockCart, generateMockProduct } from "@/lib/datas";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ออกใบกำกับภาษี (เลือกสินค้า)",
};

const CartPage = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { orderId } = await params;
  const isNew = orderId === "new";
  const initialCart = isNew
    ? null
    : Array.from({ length: 10 }, generateMockCart);

  const products = Array.from({ length: 10 }, generateMockProduct);
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
