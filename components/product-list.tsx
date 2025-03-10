"use client";

import { cartColumns } from "@/app/order/cart/cart-columns";
import { DataTable } from "@/components/ui/data-table";
import { Cart } from "@/lib/types";
import { useProductList } from "@/hooks/use-product-list";
import { useEffect } from "react";

type ProductListProps = {
  data: Cart[];
};

const ProductList = ({ data }: ProductListProps) => {
  const { products, setProducts } = useProductList();

  useEffect(() => {
    if (data.length > 0) {
      setProducts(data);
    }
  }, []);

  return (
    <div className="col-span-9">
      <DataTable data={products} columns={cartColumns} />
    </div>
  );
};

export default ProductList;
