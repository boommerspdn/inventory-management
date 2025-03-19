import { Prisma } from "@prisma/client";
import Header from "@/components/header";
import { DataTable } from "@/components/ui/data-table";
import { orderColumns } from "./order-columns";
import prismadb from "@/lib/prismadb";

const orderSelect = {
  id: true,
  name: true,
  date: true,
  number: true,
  price: true,
  status: true,
};

export type OrderTable = Prisma.OrderGetPayload<{
  select: typeof orderSelect;
}>;

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
        description="คำสั่งซื้อทั้งหมด สามารถออกใบกำกับภาษีเพื่อสร้างคำสั่งซื้อได้ที่นี่"
        length={orders.length}
      />
      <DataTable
        data={orders}
        columns={orderColumns}
        buttonLink={{ href: "/order/quotation", label: "สร้างใบกำกับภาษี" }}
        api="orders"
      />
    </div>
  );
};

export default OrderPage;
