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

export type Order = {
  id: string;
  name: string;
  date: Date;
  number: string;
  price: number;
  status: "รอการยืนยัน" | "การสั่งซื้อสำเร็จ" | "ปฏิเสธการสั่งซื้อ";
};
