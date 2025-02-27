import AddProductForm from "@/components/add-product-form";
import Header from "@/components/header";
import { Separator } from "@/components/ui/separator";

type AddProductPageProps = {};

const AddProductPage = ({}: AddProductPageProps) => {
  return (
    <div className="space-y-4">
      <Header
        title="เพิ่มสินค้า"
        description="กรอกข้อมูลของสินค้า จากนั้นกดปุ่ม เพิ่มสินค้า เพิ่มเพิ่มสินค้าไปยังรายการ"
      />
      <Separator />
      <AddProductForm />
    </div>
  );
};

export default AddProductPage;
