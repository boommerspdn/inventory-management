import Header from "@/components/header";
import { DataTable } from "@/components/ui/data-table";
import { Order } from "@/lib/types";
import { orderColumns } from "./order-columns";

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
      <DataTable
        data={data}
        columns={orderColumns}
        buttonLink={{ href: "/order/quotation", label: "สร้างใบเสนอราคา" }}
      />
    </div>
  );
};

export default OrderPage;
