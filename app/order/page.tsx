import Header from "@/components/header";
import { DataTable } from "@/components/ui/data-table";
import { Order } from "@/lib/types";
import { orderColumns } from "./order-columns";
import prismadb from "@/lib/prismadb";

const OrderPage = async () => {
  const orders = await prismadb.order.findMany({
    select: {
      id: true,
      name: true,
      date: true,
      number: true,
      price: true,
      status: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <Header
        title="รายการสั่งซื้อ"
        description="คำสั่งซื้อทั้งหมด สามารถออกใบเสนอราคาเพื่อสร้างคำสั่งซื้อได้ที่นี่"
      />
      <DataTable
        data={orders}
        columns={orderColumns}
        buttonLink={{ href: "/order/quotation", label: "สร้างใบเสนอราคา" }}
        api="orders"
      />
    </div>
  );
};

export default OrderPage;
