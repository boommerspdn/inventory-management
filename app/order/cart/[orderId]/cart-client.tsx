"use client";

import Header from "@/components/header";
import ProductCart from "@/components/product-cart";
import ProductList from "@/components/product-list";
import { Separator } from "@/components/ui/separator";
import { useProductStore } from "@/hooks/use-product-store";
import { useOrderStore } from "@/hooks/use-order-store";
import { CartProduct } from "@/app/types";

const CartClient = ({ params }: { params: { orderId: string } }) => {
  const { orderId } = params;
  const orderById = useOrderStore((state) =>
    state.orders.find((order) => order.id === orderId),
  );
  const products = useProductStore((state) => state.products);
  // const isNew = orderId === "new";
  // const formattedCart: CartProduct[] | undefined = orderById?.orderedItems.map(
  //   (item) => {
  //     const findProduct = products.find(
  //       (product) => product.id === item.productId,
  //     );

  //     return {
  //       id: item.productId,
  //       title: findProduct?.title || "",
  //       amount: item.amount,
  //       number: findProduct?.number || "",
  //       price: findProduct?.price || 0,
  //     };
  //   },
  // );
  // const initialCart = isNew ? null : formattedCart;

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
          initialData={orderById}
        />
      </div>
    </div>
  );
};

export default CartClient;
