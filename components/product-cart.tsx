"use client";

import { useCart } from "@/hooks/use-cart";
import { useMultiFormStore } from "@/hooks/use-multi-form";
import { useProductList } from "@/hooks/use-product-list";
import { cn, handleRemoveAll, priceFormatter } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { CartProduct, Order } from "@/app/types";
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
import { useOrderStore } from "@/hooks/use-order-store";
import { useProductStore } from "@/hooks/use-product-store";
import { PackagePlus, ShoppingCart } from "lucide-react";

type ProductCartProps = React.HTMLAttributes<HTMLDivElement> & {
  initialData?: Order | null;
};

const ProductCart = ({
  initialData,
  className,
  ...props
}: ProductCartProps) => {
  const cart = useCart();
  const productList = useProductList();
  const router = useRouter();
  const { createOrder, updateOrder } = useOrderStore();
  const { getProductById } = useProductStore();

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
    if (initialData) {
      const initialCartItems: CartProduct[] = initialData.orderedItems
        .map((item) => {
          const product = getProductById(item.productId);
          if (!product) return null;
          return {
            id: product.id,
            title: product.title,
            amount: item.amount,
            number: product.number,
            price: product.price,
          };
        })
        .filter(Boolean) as CartProduct[];
      cart.setItems(initialCartItems);
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
          initialData && initialData.orderedItems.length !== 0
            ? initialData.id
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
      if (initialData) {
        updateOrder(initialData.id, {
          name: name ?? "",
          date: date ?? new Date(),
          address: address ?? "",
          taxId: taxId ?? "",
          phone: phone ?? "",
          note: note ?? null,
          price: sumsPrice,
          number: initialData.number,
          vendorId: initialData.vendorId,
          status: initialData.status,
          orderedItems: cart.items.map((item) => ({
            productId: item.id,
            amount: item.amount,
          })),
        });
        window.open(`/invoice/${initialData.id}`, "_blank");
      } else {
        const newOrder = createOrder({
          name: name ?? "",
          date: date ?? new Date(),
          address: address ?? "",
          taxId: taxId ?? "",
          phone: phone ?? "",
          note: note ?? null,
          price: sumsPrice,
          number: `ORD-${Date.now()}`,
          vendorId: vendor ?? "",
          status: "รอการยืนยัน",
          orderedItems: cart.items.map((item) => ({
            productId: item.id,
            amount: item.amount,
          })),
        });
        const params = new URLSearchParams({
          data: JSON.stringify(newOrder),
        });
        window.open(`/invoice/${newOrder.id}?${params.toString()}`, "_blank");
      }

      setIsRedirecting(true);
      toast.success(`${initialData ? "แก้ไข" : "เพิ่ม"}รายการสั่งซื้อสำเร็จ`);
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
