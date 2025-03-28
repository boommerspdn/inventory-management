"use client";
import { useEffect } from "react";
import { useProductList } from "@/hooks/use-product-list";
import { cartColumns } from "@/app/order/cart/[orderId]/cart-columns";
import { CartProduct } from "@/app/order/cart/[orderId]/page";
import { DataTable } from "@/components/ui/data-table";

type ProductListProps = {
  data: CartProduct[];
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
