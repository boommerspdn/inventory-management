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
};

export type CartProduct = {
  id: string;
  title: string;
  amount: number;
  number: string;
  price: number;
};
