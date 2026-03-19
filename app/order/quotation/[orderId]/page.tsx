"use client";

import Header from "@/components/header";
import QuotationForm from "@/components/quotation-form";
import { Separator } from "@/components/ui/separator";
import { useOrderStore } from "@/hooks/use-order-store";
import { useVendorStore } from "@/hooks/use-vendor-store";
import { use } from "react";

export type VendorSelectBox = {
  id: string;
  name: string;
};

const QuotationPage = ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { orderId } = use(params);
  const getOrderById = useOrderStore((state) => state.getOrderById);
  const vendors = useVendorStore((state) => state.vendors);
  const isNew = orderId === "new";
  const order = isNew ? null : getOrderById(orderId);

  const title = order ? "แก้ไขใบกำกับภาษี" : "ออกใบกำกับภาษี";
  const description = order
    ? "แก้ไขใบกำกับภาษีที่นี่ แก้ไขข้อมูลที่ต้อการแก้ไขและกดปุ่มต่อไป"
    : "ออกใบกำกับภาษีที่นี่ เลือก(หรือสร้าง)ผู้ออกใบกำกับภาษี จากนั้นกรอกข้อมูลของผู้ซื้อและกดปุ่มต่อไป";

  return (
    <div className="space-y-4">
      <Header title={title} description={description} />
      <Separator />
      <QuotationForm vendors={vendors} initialData={order} />
    </div>
  );
};

export default QuotationPage;
