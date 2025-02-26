import { productColumns } from "./product-columns";
import { ProductTable } from "./product-table";

import { Product } from "@/lib/types";
import Header from "@/components/header";
import { Checkbox } from "@/components/ui/checkbox";

async function getData(): Promise<Product[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      title: "sasd",
      number: "asd-1212",
      amount: 12,
      date: new Date(),
      price: 500,
      image: {
        title: "file",
        url: "/evaporator.jpg",
      },
    },
    // ...
  ];
}

const ProductPage = async () => {
  const data = await getData();

  return (
    <div className="space-y-6">
      <Header
        title="รายการสินค้า"
        description="สินค้าที่มีอยู่ในคลัง สามารถเพิ่ม ลบ หรือแก้ไขสถานะได้ที่นี่"
      />
      <ProductTable columns={productColumns} data={data} />
    </div>
  );
};

export default ProductPage;
