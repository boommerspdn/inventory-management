"use client";

import { Vendor } from "@/app/types";
import { Checkbox } from "@/components/ui/checkbox";
import { VendorCellActions } from "@/components/vendor-cell-actions";

import { ColumnDef } from "@tanstack/react-table";

export const vendorColumns: ColumnDef<Vendor>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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

      return <VendorCellActions data={data} />;
    },
  },
];
