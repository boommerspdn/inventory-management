"use client";

import { HTMLAttributes } from "react";
import { useCart } from "@/hooks/use-cart";
import { useProductList } from "@/hooks/use-product-list";
import { cn, priceFormatter } from "@/lib/utils";
import { Trash } from "lucide-react";

type CartItemProps = {
  itemId: string;
  title: string;
  amount: number;
  price: number;
} & HTMLAttributes<HTMLElement>;

const CartItem = ({
  itemId,
  title,
  amount,
  price,
  className,
}: CartItemProps) => {
  const cart = useCart();
  const productList = useProductList();

  const handleRemove = () => {
    cart.removeItem(itemId);
    productList.increaseAmount(itemId, amount);
  };

  return (
    <div
      className={cn(
        "flex justify-between border-b last:border-b-0 text-sm py-2",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        x{amount} {title}
        <div
          className="space-x-1 text-red-500 cursor-pointer"
          onClick={() => handleRemove()}
        >
          <Trash size={16} className="inline-block" />
          <span>ลบสินค้า</span>
        </div>
      </div>
      <div className="font-semibold">{priceFormatter(price)}</div>
    </div>
  );
};

export default CartItem;
