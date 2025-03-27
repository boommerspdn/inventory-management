import ProductForm from "@/components/product-form";
import Header from "@/components/header";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const product = await prismadb.product.findFirst({
    where: { id: productId },
  });

  const title = product ? "แก้ไขสินค้า" : "เพิ่มสินค้า";
  const description = product
    ? "แก้ไขข้อมูลสินค้าจากนั้นกดปุ่ม บันทึกรายการ เพื่อบันทึกการแก้ไขข้อมูล"
    : "กรอกข้อมูลของสินค้า จากนั้นกดปุ่ม เพิ่มสินค้า เพื่อเพิ่มสินค้าไปยังรายการ";

  return (
    <div className="space-y-4">
      <Header title={title} description={description} />
      <Separator />
      <ProductForm initialData={product} />
    </div>
  );
};

export default ProductPage;
