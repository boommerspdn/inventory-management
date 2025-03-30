"use client";

import { useCart } from "@/hooks/use-cart";
import { useMultiFormStore } from "@/hooks/use-multi-form";
import { useProductList } from "@/hooks/use-product-list";
import { cn, handleRemoveAll, priceFormatter } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { CartProduct, initialCart } from "@/app/order/cart/[orderId]/page";
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

type ProductCartProps = React.HTMLAttributes<HTMLDivElement> & {
  initialData?: initialCart[];
};

const ProductCart = ({
  initialData,
  className,
  ...props
}: ProductCartProps) => {
  const cart = useCart();
  const productList = useProductList();
  const router = useRouter();

  const [isRedirecting, setIsRedirecting] = useState(false);

  const sumsPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.amount,
    0,
  );

  const handleBack = () => {
    router.back();
  };

  const { vendor, name, date, address, taxId, phone, note, reset } =
    useMultiFormStore();

  useEffect(() => {
    if (initialData && initialData.length !== 0) {
      const initialCartItems: CartProduct[] = initialData.map((cartItem) => ({
        id: cartItem.productId || "",
        title: cartItem.products?.title || "",
        amount: cartItem.amount || 0,
        number: cartItem.products?.number || "",
        price: cartItem.products?.price || 0,
      }));
      cart.items = initialCartItems;
    } else {
      cart.removeAll();
    }
  }, [initialData]);

  useEffect(() => {
    if (
      (!vendor || !name || !date || !address || !taxId || !phone) &&
      isRedirecting == false
    ) {
      router.push(
        `/order/quotation/${
          initialData && initialData.length !== 0
            ? initialData[0].orderId
            : "new"
        }`,
      );
    } else if (isRedirecting == true) {
      router.push("/order");
    }
  }, [
    vendor,
    name,
    date,
    address,
    taxId,
    phone,
    note,
    isRedirecting,
    router,
    initialData,
  ]);

  const handleSubmit = async () => {
    try {
      if (initialData && initialData.length !== 0) {
        const originalCart = initialData;
        const newCart = cart.items;

        const addedItems = newCart.filter(
          (item) => !originalCart.some((orig) => orig.productId === item.id),
        );

        const removedItems = originalCart
          .filter((orig) => !newCart.some((item) => item.id === orig.productId))
          .map((item) => item.id);

        const updatedItems = newCart.filter((item) =>
          originalCart.some(
            (orig) =>
              orig.productId === item.id &&
              orig.amount !== item.amount &&
              JSON.stringify(orig),
          ),
        );

        const stockUpdates = updatedItems.map((item) => {
          const originalItem = originalCart.find(
            (orig) => orig.productId === item.id,
          );

          if (!originalItem) {
            // This is a newly added item, decrease stock by new quantity
            return {
              id: item.id,
              newAmount: item.amount,
              stockChange: -item.amount,
            };
          }

          // Calculate difference in quantity
          const quantityDifference = item.amount - originalItem.amount;

          return {
            id: item.id,
            newAmount: item.amount,
            stockChange: -quantityDifference,
          };
        });

        const body = {
          id: initialData[0].orderId,
          vendor,
          name,
          date,
          address,
          taxId,
          phone,
          note,
          price: sumsPrice,
          addedItems,
          removedItems,
          stockUpdates,
        };

        await axios.patch("/api/orders/", body);
        window.open(`/invoice/${initialData[0].orderId}`, "_blank");
      } else {
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
        window.open(`/invoice/${response.data.id}`, "_blank");
      }
      setIsRedirecting(true);
      toast.success("เพิ่มรายการสั่งซื้อสำเร็จ");
    } catch (error) {
      console.log(error);
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      reset();
    }
  };

  return (
    <Card className={cn("h-fit", className)} {...props}>
      <CardHeader>
        <CardTitle>ตะกร้าสินค้า</CardTitle>
        <CardDescription>
          เลือกจำนวนสินค้าจากนั้นกด &quot;
          <ShoppingCart className="inline-block" size={16} />
          &quot; เพื่อเพิ่มสินค้า
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
              <span className="font-semibold">
                {priceFormatter(sumsPrice)}฿
              </span>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="md:grid md:grid-cols-12 lg:flex justify-between gap-4">
        <Button
          className="md:col-span-full"
          variant={"destructive"}
          onClick={() => handleRemoveAll(cart, productList)}
        >
          ล้าง
        </Button>
        <div className="md:grid md:grid-cols-12 md:col-span-12 lg:flex flex gap-2">
          <Button
            className="md:col-span-full"
            variant={"outline"}
            onClick={() => handleBack()}
          >
            ย้อนกลับ
          </Button>
          <Button
            className="md:col-span-full"
            disabled={cart.items.length === 0}
            onClick={() => handleSubmit()}
          >
            สร้างใบกำกับภาษี
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCart;
