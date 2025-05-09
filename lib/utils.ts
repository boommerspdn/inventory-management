import { CartState } from "@/hooks/use-cart";
import { ProductListState } from "@/hooks/use-product-list";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const priceFormatter = (price: number) => {
  const formatted = (price / 100).toFixed(2);

  return formatted;
};

export const handleRemoveAll = (
  cart: CartState,
  productList: ProductListState,
) => {
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
