import Header from "@/components/header";
import QuotationForm from "@/components/quotation-form";
import { Separator } from "@/components/ui/separator";

const QuotationPage = () => {
  return (
    <div className="space-y-4">
      <Header
        title="ออกใบกำกับภาษี"
        description="ออกใบกำกับภาษีที่นี่ เลือก(หรือสร้าง)ผู้ออกใบกำกับภาษี จากนั้นกรอกข้อมูลของผู้ซื้อและกดปุ่มต่อไป"
      />
      <Separator />
      <QuotationForm />
    </div>
  );
};

export default QuotationPage;
