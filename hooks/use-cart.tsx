import { Cart } from "@/lib/types";
import { create } from "zustand";

export interface CartState {
  items: Cart[];
  addItem: (item: Cart) => void;
  removeItem: (itemId: string) => void;
  removeAll: () => void;
}

export const useCart = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find(
        (cartItem) => cartItem.id === item.id,
      );
      if (existingItem) {
        return {
          items: state.items.map((prevItem) =>
            prevItem.id === item.id
              ? { ...prevItem, amount: prevItem.amount + item.amount }
              : prevItem,
          ),
        };
      } else {
        return { items: [item, ...state.items] };
      }
    }),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    })),
  removeAll: () => set({ items: [] }),
}));
