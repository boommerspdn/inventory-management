import { cn } from "@/lib/utils";
import RemoveDialog from "@/components/remove-dialog";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useVendorStore } from "@/hooks/use-vendor-store";
import Link from "next/link";
import { Vendor } from "@/app/types";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface VendorCellActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Vendor;
}

export function VendorCellActions({
  className,
  ...props
}: VendorCellActionsProps) {
  const deleteVendor = useVendorStore((state) => state.deleteVendor);
  const data = props.data;

  return (
    <RemoveDialog ids={[data.id]} fn={() => deleteVendor(data.id)}>
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
          <Link href={`/order/quotation/vendor/${data.id}`}>
            <DropdownMenuItem>แก้ไขข้อมูล</DropdownMenuItem>
          </Link>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>ลบข้อมูล</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    </RemoveDialog>
  );
}
