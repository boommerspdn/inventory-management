import Header from "@/components/header";
import { DataTable } from "@/components/ui/data-table";
import prismadb from "@/lib/prismadb";
import { vendorColumns } from "./vendor-columns";

const VendorPage = async () => {
  const vendors = await prismadb.vendor.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <Header
        title="ผู้ออกใบกำกับภาษี"
        description="สร้าง/แก้ไข หรือลบข้อมูลผู้ออกใบกำกับภาษีได้ที่นี่"
      />
      <DataTable
        data={vendors}
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
