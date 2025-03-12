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
    if (products.length === 0 && data.length > 0) {
      setProducts(data);
    }
  }, [products, data, setProducts]);

  return (
    <div className="col-span-9">
      <DataTable data={products} columns={cartColumns} disableDelete={true} />
    </div>
  );
};

export default ProductList;
