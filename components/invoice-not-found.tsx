import { FileX } from "lucide-react";

const InvoiceNotFound = () => {
  return (
    <div className="flex flex-col size-full items-center justify-center py-16 gap-4">
      <div className="relative">
        <FileX className="w-12 h-12 text-muted-foreground" />
      </div>
      <p className="text-base font-medium">ไม่พบใบกำกับภาษี</p>
      <p className="text-sm text-muted-foreground">
        ไม่พบรายการสั่งซื้อที่ต้องการ
      </p>
    </div>
  );
};

export default InvoiceNotFound;
