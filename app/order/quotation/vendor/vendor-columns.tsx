"use client";

import RemoveDialog from "@/components/remove-dialog";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Vendor } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const vendorColumns: ColumnDef<Vendor>[] = [
  {
    accessorKey: "name",
    header: "ชื่อผู้ออก",
  },
  {
    accessorKey: "address",
    header: "ที่อยู่ผู้ออก",
  },
  {
    accessorKey: "taxId",
    header: "เลขประจำตัวผู้เสียภาษีผู้ออก",
  },
  {
    accessorKey: "phone",
    header: "เบอร์โทรศัพท์ผู้ออก",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <RemoveDialog ids={[data.id]} api="vendor">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
    },
  },
];
