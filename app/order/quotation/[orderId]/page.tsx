import type { Metadata } from "next";
import { prisma } from "@/lib/prismadb";
import Header from "@/components/header";
import QuotationForm from "@/components/quotation-form";
import { Separator } from "@/components/ui/separator";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ออกใบกำกับภาษี",
};

const select = { id: true, name: true };

export type VendorSelectBox = Prisma.VendorGetPayload<{
  select: typeof select;
}>;

const QuotationPage = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { orderId } = await params;
  const order = await prisma.order.findFirst({
    where: { id: orderId },
  });

  const vendors = await prisma.vendor.findMany({
    orderBy: { name: "desc" },
    select,
  });

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
