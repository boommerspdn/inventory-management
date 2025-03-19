import { create } from "zustand";
import { CartProduct } from "@/app/order/cart/page";

export interface ProductListState {
  products: CartProduct[];
  setProducts: (products: CartProduct[]) => void;
  decreaseAmount: (id: string, value: number) => void;
  increaseAmount: (id: string, value: number) => void;
}

export const useProductList = create<ProductListState>()((set) => ({
  products: [],
  setProducts: (newProducts) =>
    set(() => {
      return { products: newProducts };
    }),
  decreaseAmount: (id, value) =>
    set((state) => {
      const matchedIdObject = state.products.find(
        (product) => product.id === id,
      );

      if (matchedIdObject) {
        const minusAmount = matchedIdObject?.amount - value;
        return {
          products: state.products.map((prevProduct) =>
            prevProduct.id === id
              ? { ...prevProduct, amount: minusAmount }
              : prevProduct,
          ),
        };
      } else {
        return {
          products: [...state.products],
        };
      }
    }),
  increaseAmount: (id, value) =>
    set((state) => {
      const matchedIdObject = state.products.find(
        (product) => product.id === id,
      );

      if (matchedIdObject) {
        const plusAmount = matchedIdObject?.amount + value;
        return {
          products: state.products.map((prevProduct) =>
            prevProduct.id === id
              ? { ...prevProduct, amount: plusAmount }
              : prevProduct,
          ),
        };
      } else {
        return {
          products: [...state.products],
        };
      }
    }),
}));
