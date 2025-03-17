"use client";

import { cartColumns } from "@/app/order/cart/cart-columns";
import { DataTable } from "@/components/ui/data-table";
import { Cart } from "@/lib/types";
import { useProductList } from "@/hooks/use-product-list";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type ProductListProps = {
  data: Cart[];
};

const ProductList = ({ data }: ProductListProps) => {
  const { products, setProducts } = useProductList();

  useEffect(() => {
    setProducts(data);
  }, []);

  return (
    <div className="col-span-9">
      <DataTable
        data={products}
        columns={cartColumns}
        disableDelete={true}
        api={"products"}
      />
    </div>
  );
};

export default ProductList;
