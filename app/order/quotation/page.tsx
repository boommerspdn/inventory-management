import prismadb from "@/lib/prismadb";
import Header from "@/components/header";
import QuotationForm from "@/components/quotation-form";
import { Separator } from "@/components/ui/separator";
import { Prisma } from "@prisma/client";

const select = { id: true, name: true };

export type VendorSelectBox = Prisma.VendorGetPayload<{
  select: typeof select;
}>;

const QuotationPage = async () => {
  const vendors = await prismadb.vendor.findMany({
    orderBy: { name: "desc" },
    select,
  });

  return (
    <div className="space-y-4">
      <Header
        title="ออกใบกำกับภาษี"
        description="ออกใบกำกับภาษีที่นี่ เลือก(หรือสร้าง)ผู้ออกใบกำกับภาษี จากนั้นกรอกข้อมูลของผู้ซื้อและกดปุ่มต่อไป"
      />
      <Separator />
      <QuotationForm vendors={vendors} />
    </div>
  );
};

export default QuotationPage;
