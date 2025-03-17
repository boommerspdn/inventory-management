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
import { handleRemoveAll, priceFormatter } from "@/lib/utils";
import { useProductList } from "@/hooks/use-product-list";
import { useMultiFormStore } from "@/hooks/use-multi-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const ProductCart = () => {
  const cart = useCart();
  const productList = useProductList();
  const router = useRouter();

  const sumsPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.amount,
    0,
  );

  const handleBack = () => {
    router.replace("/order/quotation");
  };

  const { vendor, name, date, address, taxId, phone, note } =
    useMultiFormStore();

  const handleCreateOrder = async () => {
    try {
      const body = {
        vendor,
        name,
        date,
        address,
        taxId,
        phone,
        note,
        price: sumsPrice,
        cart: cart.items,
      };
      const response = await axios.post("/api/orders/", body);

      toast.success("เพิ่มสินค้าสำเร็จ");
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      useMultiFormStore.getState().reset();
      router.push("/order");
    }
  };

  useEffect(() => {
    cart.removeAll();

    if (!name || !date || !address || !taxId || !phone) {
      router.push("/order/quotation");
    }
  }, [name, date, address, taxId, phone, note, router]);

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
        <Button
          variant={"destructive"}
          onClick={() => handleRemoveAll(cart, productList)}
        >
          ล้าง
        </Button>
        <div className="flex gap-2">
          <Button variant={"outline"} onClick={() => handleBack()}>
            ย้อนกลับ
          </Button>
          <Button
            disabled={cart.items.length === 0}
            onClick={() => handleCreateOrder()}
          >
            สร้างใบเสนอราคา
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCart;
