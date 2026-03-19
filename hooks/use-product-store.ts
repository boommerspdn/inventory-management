// lib/store/product-store.ts
import { create } from "zustand";
import { Product } from "@/app/types";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Mechanical Keyboard Pro",
    amount: 15,
    price: 2900,
    number: "KB1234567A",
    image: "https://picsum.photos/id/1/400/300",
    createdAt: new Date("2024-01-10"),
    date: new Date("2024-03-01"),
  },
  {
    id: "2",
    title: "Wireless Noise-Cancelling Headphones",
    amount: 30,
    price: 1500,
    number: "HP9876543B",
    image: "https://picsum.photos/id/3/400/300",
    createdAt: new Date("2024-01-15"),
    date: new Date("2024-03-05"),
  },
  {
    id: "3",
    title: 'Ultra-Wide Monitor 34"',
    amount: 8,
    price: 4500,
    number: "MN1122334C",
    image: "https://picsum.photos/id/7/400/300",
    createdAt: new Date("2024-01-20"),
    date: new Date("2024-03-08"),
  },
  {
    id: "4",
    title: "USB-C Hub 10-in-1",
    amount: 50,
    price: 900,
    number: "HB5566778D",
    image: "https://picsum.photos/id/9/400/300",
    createdAt: new Date("2024-02-01"),
    date: new Date("2024-03-10"),
  },
  {
    id: "5",
    title: "Ergonomic Office Chair",
    amount: 5,
    price: 3500,
    number: "CH2233445E",
    image: "https://picsum.photos/id/20/400/300",
    createdAt: new Date("2024-02-05"),
    date: new Date("2024-03-11"),
  },
  {
    id: "6",
    title: "Portable SSD 1TB",
    amount: 25,
    price: 1200,
    number: "SS3344556F",
    image: "https://picsum.photos/id/30/400/300",
    createdAt: new Date("2024-02-10"),
    date: new Date("2024-03-12"),
  },
  {
    id: "7",
    title: "Webcam 4K Ultra HD",
    amount: 18,
    price: 1800,
    number: "WC4455667G",
    image: "https://picsum.photos/id/36/400/300",
    createdAt: new Date("2024-02-14"),
    date: new Date("2024-03-13"),
  },
  {
    id: "8",
    title: "Smart LED Desk Lamp",
    amount: 40,
    price: 800,
    number: "DL5566778H",
    image: "https://picsum.photos/id/42/400/300",
    createdAt: new Date("2024-02-18"),
    date: new Date("2024-03-14"),
  },
  {
    id: "9",
    title: "Wireless Charging Pad",
    amount: 60,
    price: 500,
    number: "CP6677889I",
    image: "https://picsum.photos/id/48/400/300",
    createdAt: new Date("2024-02-20"),
    date: new Date("2024-03-15"),
  },
  {
    id: "10",
    title: "Laptop Stand Aluminium",
    amount: 35,
    price: 700,
    number: "LS7788990J",
    image: "https://picsum.photos/id/60/400/300",
    createdAt: new Date("2024-02-25"),
    date: new Date("2024-03-16"),
  },
]; // your static array

interface ProductStore {
  products: Product[];
  createProduct: (data: Omit<Product, "id" | "createdAt" | "date">) => Product;
  updateProduct: (
    id: string,
    data: Omit<Product, "id" | "createdAt" | "date">,
  ) => void;
  getProductById: (id: string) => Product | undefined;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: MOCK_PRODUCTS,

  createProduct: (data) => {
    const newProduct: Product = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      date: new Date(),
    };
    set((state) => ({ products: [newProduct, ...state.products] }));
    return newProduct;
  },

  updateProduct: (id, data) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...data, date: new Date() } : p,
      ),
    }));
  },

  getProductById: (id) => {
    return get().products.find((p) => p.id === id);
  },
}));
