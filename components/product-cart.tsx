"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCart } from "@/hooks/use-cart";
import { useMultiFormStore } from "@/hooks/use-multi-form";
import { useProductList } from "@/hooks/use-product-list";
import { handleRemoveAll, priceFormatter } from "@/lib/utils";

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
import { PackagePlus, ShoppingCart } from "lucide-react";

const ProductCart = () => {
  const cart = useCart();
  const productList = useProductList();
  const router = useRouter();

  const [isRedirecting, setIsRedirecting] = useState(false);

  const sumsPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.amount,
    0,
  );

  const handleBack = () => {
    router.replace("/order/quotation");
  };

  const { vendor, name, date, address, taxId, phone, note, reset } =
    useMultiFormStore();

  useEffect(() => {
    cart.removeAll();

    if (
      (!vendor || !name || !date || !address || !taxId || !phone) &&
      isRedirecting == false
    ) {
      router.push("/order/quotation");
    } else if (isRedirecting == true) {
      router.push("/order");
    }
  }, [name, date, address, taxId, phone, note, isRedirecting, router]);

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
      setIsRedirecting(true);
      toast.success("เพิ่มสินค้าสำเร็จ");
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      reset();
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
            สร้างใบกำกับภาษี
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCart;
