import Header from "@/components/header";
import { OrderTable } from "./order-table";
import { orderColumns } from "./order-columns";
import { Order } from "@/lib/types";

async function getData(): Promise<Order[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "sasd",
      number: "asd-1212",
      date: new Date(),
      price: 500,
      status: "รอการยืนยัน",
    },
    // ...
  ];
}

const OrderPage = async () => {
  const data = await getData();

  return (
    <div className="space-y-6">
      <Header
        title="รายการสั่งซื้อ"
        description="คำสั่งซื้อทั้งหมด สามารถออกใบเสนอราคาเพื่อสร้างคำสั่งซื้อได้ที่นี่"
      />
      <OrderTable data={data} columns={orderColumns} />
    </div>
  );
};

export default OrderPage;
