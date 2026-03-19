export type Product = {
  number: string;
  title: string;
  image: string;
  id: string;
  amount: number;
  price: number;
  date: Date;
  createdAt: Date;
};

export type Order = {
  number: string;
  id: string;
  name: string;
  vendorId: string;
  date: Date;
  price: number;
  address: string;
  taxId: string;
  phone: string;
  note: string | null;
  status: string;
  createdAt: Date;
  orderedItems: { productId: string; amount: number }[];
};

export type Vendor = {
  id: string;
  createdAt: Date;
  name: string;
  address: string;
  taxId: string;
  phone: string;
};

export type CartProduct = Pick<
  Product,
  "id" | "title" | "amount" | "number" | "price"
>;
