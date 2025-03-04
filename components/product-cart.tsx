"use client";
import { faker } from "@faker-js/faker";
import { PackagePlus, ShoppingCart } from "lucide-react";

import CartItem from "@/components/cart-item";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { priceFormatter } from "@/lib/utils";
import { useProductList } from "@/hooks/use-product-list";

const ProductCart = () => {
  const cart = useCart();
  const productList = useProductList();

  const sumsPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.amount,
    0,
  );

  const handleRemoveAll = () => {
    const itemToRemove: { id: string; value: number }[] = cart.items.map(
      (item) => ({ id: item.id, value: item.amount }),
    );
    cart.removeAll();

    for (let index = 0; index < itemToRemove.length; index++) {
      productList.increaseAmount(
        itemToRemove[index].id,
        itemToRemove[index].value,
      );
    }
  };

  return (
    <Card className="col-span-3 h-fit">
      <CardHeader>
        <CardTitle>ตะกร้าสินค้า</CardTitle>
        <CardDescription>
          เลือกจำนวนสินค้าจากนั้นกด "
          <ShoppingCart className="inline-block" size={16} />" เพื่อเพิ่มสินค้า
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {cart.items.length == 0 ? (
          <div className="text-muted-foreground text-center text-sm flex flex-col items-center my-6">
            <PackagePlus />
            เลือกสินค้าที่ต้องการจะเพิ่ม
          </div>
        ) : (
          <>
            {cart.items.map((item) => (
              <CartItem
                key={item.id}
                itemId={item.id}
                amount={item.amount}
                price={item.price * item.amount}
                title={item.title}
              />
            ))}
            <div className="flex justify-between text-sm py-2">
              <span>ราคารวม</span>
              <span className="font-semibold">{priceFormatter(sumsPrice)}</span>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant={"outline"} onClick={() => handleRemoveAll()}>
          ล้าง
        </Button>
        <Button disabled={cart.items.length === 0}>สร้างใบเสนอราคา</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCart;
