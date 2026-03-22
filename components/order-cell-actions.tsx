import { Order } from "@/app/types";
import { useOrderStore } from "@/hooks/use-order-store";
import { MoreHorizontal } from "lucide-react";
import RemoveDialog from "./remove-dialog";
import StatusDialog from "./status-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OrderCellActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Order;
}

export function OrderCellActions({
  className,
  ...props
}: OrderCellActionsProps) {
  const deleteOrder = useOrderStore((state) => state.deleteOrder);
  const data = props.data;

  return (
    <RemoveDialog ids={[data.id]} fn={() => deleteOrder(data.id)}>
      <StatusDialog id={data.id} currentStatus={data.status}>
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
            <DropdownMenuItem
              onClick={() => window.open(`/invoice/${data.id}`, "_blank")}
            >
              ดูใบกำกับภาษี
            </DropdownMenuItem>

            <DialogTrigger asChild>
              <DropdownMenuItem>อัพเดทสถานะ</DropdownMenuItem>
            </DialogTrigger>
            <Link href={`/order/quotation/${data.id}`}>
              <DropdownMenuItem>แก้ไขคำสั่งซื้อ</DropdownMenuItem>
            </Link>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>ลบข้อมูล</DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
      </StatusDialog>
    </RemoveDialog>
  );
}
