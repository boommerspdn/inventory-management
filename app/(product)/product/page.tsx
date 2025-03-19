import ProductForm from "@/components/product-form";
import Header from "@/components/header";
import { Separator } from "@/components/ui/separator";

const ProductPage = () => {
  return (
    <div className="space-y-4">
      <Header
        title="เพิ่มสินค้า"
        description="กรอกข้อมูลของสินค้า จากนั้นกดปุ่ม เพิ่มสินค้า เพิ่มเพิ่มสินค้าไปยังรายการ"
      />
      <Separator />
      <ProductForm />
    </div>
  );
};

export default ProductPage;
