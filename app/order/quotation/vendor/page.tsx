import { vendorColumns } from "./vendor-columns";
import prismadb from "@/lib/prismadb";
import Header from "@/components/header";
import { DataTable } from "@/components/ui/data-table";

const VendorPage = async () => {
  const vendor = await prismadb.vendor.findMany();

  return (
    <div className="space-y-6">
      <Header
        title="ผู้ออกใบกำกับภาษี"
        description="สร้าง/แก้ไข หรือลบข้อมูลผู้ออกใบกำกับภาษีได้ที่นี่"
      />
      <DataTable
        data={vendor}
        columns={vendorColumns}
        api="vendor"
        buttonLink={{
          label: "สร้างผู้ออกใบกำกับภาษี",
          href: "/order/quotation/vendor/new",
        }}
      />
    </div>
  );
};

export default VendorPage;
