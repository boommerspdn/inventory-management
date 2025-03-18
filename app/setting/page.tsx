import Header from "@/components/header";
import QuotationNumberSetting from "@/components/quotation-number-setting";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";

const SettingPage = async () => {
  const quotationNumber = await prismadb.quotationSetting.findUnique({
    where: { id: "global" },
  });
  return (
    <div className="space-y-6">
      <Header
        title="ตั้งค่า"
        description="ตั้งค่าค่าต่างๆเช่น รหัสใบเสนอราคา"
      />
      <QuotationNumberSetting data={quotationNumber} />
    </div>
  );
};

export default SettingPage;
