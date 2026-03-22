"use client";

import Header from "@/components/header";
import { DataTable } from "@/components/ui/data-table";
import { useOrderStore } from "@/hooks/use-order-store";
import { orderColumns } from "./order-columns";

const OrderClient = () => {
  const orders = useOrderStore((state) => state.orders);

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
        buttonLink={{ href: "/order/quotation/new", label: "สร้างใบกำกับภาษี" }}
        api="orders"
      />
    </div>
  );
};

export default OrderClient;
