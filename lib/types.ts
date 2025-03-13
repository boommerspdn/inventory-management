export type Product = {
  id: string;
  title: string;
  number: string;
  amount: number;
  price: number;
  date: Date;
  image: string;
};

export type Order = {
  id: string;
  name: string;
  date: Date;
  number: string;
  price: number;
  status: string;
};

export type Cart = {
  id: string;
  title: string;
  number: string;
  amount: number;
  price: number;
};
