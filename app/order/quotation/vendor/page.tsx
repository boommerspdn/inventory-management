"use client";

import Header from "@/components/header";
import { DataTable } from "@/components/ui/data-table";
import { vendorColumns } from "./vendor-columns";
import { useVendorStore } from "@/hooks/use-vendor-store";

const VendorPage = () => {
  const vendors = useVendorStore((state) => state.vendors);

  return (
    <div className="space-y-6">
      <Header
        title="ผู้ออกใบกำกับภาษี"
        description="สร้าง/แก้ไข หรือลบข้อมูลผู้ออกใบกำกับภาษีได้ที่นี่"
      />
      <DataTable
        data={vendors}
        columns={vendorColumns}
        buttonLink={{
          label: "สร้างผู้ออกใบกำกับภาษี",
          href: "/order/quotation/vendor/new",
        }}
        api="vendor"
        disableDelete={false}
      />
    </div>
  );
};

export default VendorPage;
