import { CartProduct } from "@/app/order/cart/[orderId]/page";
import { useCart } from "@/hooks/use-cart";
import { useProductList } from "@/hooks/use-product-list";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PackagePlus } from "lucide-react";

type AddProductCartProps = {
  data: CartProduct;
};

const AddProductCart = ({ data }: AddProductCartProps) => {
  const [value, setValue] = useState("");

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
        disabled={value == "" || value == "0" || parseInt(value) > data.amount}
      >
        <PackagePlus />
      </Button>
    </div>
  );
};

export default AddProductCart;
