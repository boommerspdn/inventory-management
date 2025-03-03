import Header from "@/components/header";
import QuotationForm from "@/components/quotation-form";
import { Separator } from "@/components/ui/separator";

const QuotationPage = () => {
  return (
    <div className="space-y-4">
      <Header
        title="ออกใบเสนอราคา"
        description="เพิ่มรายการสินค้าเข้าสู่คลังได้ที่นี่ หากกรอกข้อมูลเสร็จสิ้นแล้วให้กดที่เพิ่มรายการเพื่อยืนยันการทำรายการ "
      />
      <Separator />
      <QuotationForm />
    </div>
  );
};

export default QuotationPage;
