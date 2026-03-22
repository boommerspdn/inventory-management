import { Product } from "@/app/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProductStore } from "@/hooks/use-product-store";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import RemoveDialog from "./remove-dialog";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCellActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Product;
}

export function ProductCellActions({
  className,
  ...props
}: ProductCellActionsProps) {
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  return (
    <RemoveDialog ids={[props.data.id]} fn={() => deleteProduct(props.data.id)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className={cn("", className)}
          {...props}
        >
          <Link href={`/product/${props.data.id}`}>
            <DropdownMenuItem>แก้ไขข้อมูล</DropdownMenuItem>{" "}
          </Link>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>ลบข้อมูล</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    </RemoveDialog>
  );
}
