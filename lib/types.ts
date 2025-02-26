export type Image = {
  title: string;
  url: string;
};

export type Product = {
  id: string;
  title: string;
  number: string;
  amount: number;
  price: number;
  date: Date;
  image: Image;
};

type Order = {};
