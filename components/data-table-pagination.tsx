import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Trash,
} from "lucide-react";
import { cn } from "@/lib/utils";
import RemoveDialog from "./remove-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  disableDelete?: Boolean;
  api: "products" | "orders" | "vendor";
}

export function DataTablePagination<TData>({
  table,
  disableDelete,
  api,
}: DataTablePaginationProps<TData>) {
  const arraySelectedUsersId = table
    .getSelectedRowModel()
    .rows.map(({ original }) => (original as { id: string }).id);

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3",
        disableDelete && "justify-end",
      )}
    >
      {!disableDelete && (
        <>
          <RemoveDialog ids={arraySelectedUsersId} api={api}>
            <AlertDialogTrigger asChild>
              <Button
                variant={"outline"}
                size={"icon"}
                disabled={arraySelectedUsersId.length == 0}
              >
                <Trash />
              </Button>
            </AlertDialogTrigger>
          </RemoveDialog>
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} ใน{" "}
            {table.getFilteredRowModel().rows.length} แถวที่เลือก
          </div>
        </>
      )}
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">แถวต่อหน้า</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          หน้า {table.getState().pagination.pageIndex + 1} จาก{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">หน้าแรก</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">ย้อนกลับ</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">ถัดไป</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">หน้าสุดท้าย</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
