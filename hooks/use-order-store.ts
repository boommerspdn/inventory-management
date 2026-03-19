import { create } from "zustand";
import { Order } from "@/app/types";

const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    number: "ORD-7291846053712",
    name: "บริษัท ดิจิตอล โซลูชัน จำกัด",
    vendorId: "V001",
    date: new Date("2024-03-01"),
    price: 2900,
    address: "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
    taxId: "1234567890123",
    phone: "0812345678",
    note: null,
    status: "ชำระเงินแล้ว",
    createdAt: new Date("2024-03-01"),
    orderedItems: [
      { productId: "3", amount: 1 },
      { productId: "7", amount: 2 },
    ],
  },
  {
    id: "2",
    number: "ORD-4853920671348",
    name: "ร้าน ออฟฟิศ โปร",
    vendorId: "V002",
    date: new Date("2024-03-05"),
    price: 1500,
    address: "456 ถนนพระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10310",
    taxId: "9876543210987",
    phone: "0898765432",
    note: "กรุณาส่งด่วน",
    status: "รอการยืนยัน",
    createdAt: new Date("2024-03-05"),
    orderedItems: [
      { productId: "1", amount: 1 },
      { productId: "5", amount: 3 },
      { productId: "9", amount: 2 },
    ],
  },
  {
    id: "3",
    number: "ORD-9174628305491",
    name: "บริษัท ดิจิตอล โซลูชัน จำกัด",
    vendorId: "V001",
    date: new Date("2024-03-08"),
    price: 4500,
    address: "789 ถนนลาดพร้าว แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพฯ 10230",
    taxId: "1122334455667",
    phone: "0856781234",
    note: null,
    status: "ชำระเงินแล้ว",
    createdAt: new Date("2024-03-08"),
    orderedItems: [
      { productId: "2", amount: 2 },
      { productId: "6", amount: 1 },
      { productId: "8", amount: 4 },
      { productId: "10", amount: 1 },
    ],
  },
  {
    id: "4",
    number: "ORD-3062759184726",
    name: "บริษัท อินโนเวท เทรดดิ้ง จำกัด",
    vendorId: "V003",
    date: new Date("2024-03-10"),
    price: 900,
    address: "321 ถนนรัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพฯ 10400",
    taxId: "9988776655443",
    phone: "0823456789",
    note: "โทรก่อนส่ง",
    status: "รอการยืนยัน",
    createdAt: new Date("2024-03-10"),
    orderedItems: [
      { productId: "4", amount: 5 },
      { productId: "7", amount: 1 },
    ],
  },
  {
    id: "5",
    number: "ORD-8519374062815",
    name: "บริษัท อินโนเวท เทรดดิ้ง จำกัด",
    vendorId: "V002",
    date: new Date("2024-03-12"),
    price: 3500,
    address: "654 ถนนเพชรบุรี แขวงราชเทวี เขตราชเทวี กรุงเทพฯ 10400",
    taxId: "5544332211009",
    phone: "0867890123",
    note: null,
    status: "ชำระเงินแล้ว",
    createdAt: new Date("2024-03-12"),
    orderedItems: [
      { productId: "1", amount: 2 },
      { productId: "3", amount: 1 },
      { productId: "5", amount: 3 },
      { productId: "9", amount: 2 },
      { productId: "10", amount: 1 },
    ],
  },
];

interface OrderStore {
  orders: Order[];
  getOrderById: (id: string) => Order | undefined;
  createOrder: (data: Omit<Order, "id" | "createdAt">) => Order;
  updateOrder: (
    id: string,
    data: Partial<Omit<Order, "id" | "createdAt">>,
  ) => Order | undefined;
  deleteOrder: (id: string | string[]) => void;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: MOCK_ORDERS,

  getOrderById: (id) => {
    return get().orders.find((o) => o.id === id);
  },

  createOrder: (data) => {
    const newOrder: Order = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    set((state) => ({ orders: [newOrder, ...state.orders] }));
    return newOrder;
  },

  updateOrder: (id, data) => {
    let updated: Order | undefined;
    set((state) => ({
      orders: state.orders.map((o) => {
        if (o.id === id) {
          updated = { ...o, ...data };
          return updated;
        }
        return o;
      }),
    }));
    return updated;
  },

  deleteOrder: (id: string | string[]) => {
    const ids = Array.isArray(id) ? id : [id];
    set((state) => ({
      orders: state.orders.filter((o) => !ids.includes(o.id)),
    }));
  },
}));
