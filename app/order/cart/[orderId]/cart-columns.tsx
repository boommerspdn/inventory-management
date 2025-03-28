"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useCart } from "@/hooks/use-cart";
import { useProductList } from "@/hooks/use-product-list";
import { priceFormatter } from "@/lib/utils";
import { CartProduct } from "./page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, PackagePlus } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const cartColumns: ColumnDef<CartProduct>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          ชื่อสินค้า
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          รหัสสินค้า
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          ราคา
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.original.price;

      return <div>{priceFormatter(price)}฿</div>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          คงเหลือ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [value, setValue] = useState("");
      const data = row.original;

      const cart = useCart();

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Allow only numbers and restrict to max 3 digits
        if (/^\d{0,3}$/.test(inputValue)) {
          setValue(inputValue);
        }
      };

      const addToCart = (cartItem: CartProduct) => {
        const valueToAdd = parseInt(value);

        if (value !== "" && value !== "0" && valueToAdd <= cartItem.amount) {
          cart.addItem({
            id: cartItem.id,
            title: cartItem.title,
            amount: valueToAdd,
            number: cartItem.number,
            price: cartItem.price,
          });
          useProductList.getState().decreaseAmount(cartItem.id, valueToAdd);
          setValue("");
        }
      };

      return (
        <div className="flex">
          <Input
            type="text"
            className="w-[60px] h-8"
            value={value}
            onChange={handleChange}
            placeholder="0"
            maxLength={3} // Extra security in case
            inputMode="numeric" // Mobile keyboard optimization
          />
          <Button
            className="rounded-s-none size-8"
            onClick={() => addToCart(data)}
            disabled={
              value == "" || value == "0" || parseInt(value) > data.amount
            }
          >
            <PackagePlus />
          </Button>
        </div>
      );
    },
  },
];
