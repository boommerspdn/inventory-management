import { Cart } from "@/lib/types";

import Header from "@/components/header";
import ProductCart from "@/components/product-cart";
import ProductList from "@/components/product-list";
import { Separator } from "@/components/ui/separator";
import { faker } from "@faker-js/faker";

async function getData(): Promise<Cart[]> {
  // return Array.from(Array(10), (e, i) => ({
  //   id: faker.string.uuid(),
  //   title: faker.commerce.productName(),
  //   number: faker.commerce.isbn(10),
  //   amount: faker.number.int({ min: 1, max: 200 }),
  //   price: faker.number.int({ min: 1000, max: 50000 }),
  // }));
  return [
    { id: "1", title: "Glove", number: "GT-420", amount: 5, price: 400 },
    { id: "2", title: "Screwdriver", number: "GT-432", amount: 12, price: 100 },
  ];
}

const CartPage = async () => {
  const data = await getData();

  return (
    <div className="space-y-4">
      <Header
        title="ออกใบเสนอราคา (เลือกสินค้า)"
        description="เลือกสินค้าที่ต้องการจะเพิ่มในใบเสนอราคา จากนั้นกดสร้างใบเสนอราคา"
      />
      <Separator />
      <div className="grid grid-cols-12 gap-4">
        <ProductList data={data} />
        <ProductCart />
      </div>
    </div>
  );
};

export default CartPage;
