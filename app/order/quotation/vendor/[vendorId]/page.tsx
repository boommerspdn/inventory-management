import Header from "@/components/header";
import { Separator } from "@/components/ui/separator";
import VendorForm from "@/components/vendor-form";
import { prisma } from "@/lib/prismadb";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ผู้ออกใบกำกับภาษี",
};

const VendorFormPage = async ({
  params,
}: {
  params: Promise<{ vendorId: string }>;
}) => {
  const { vendorId } = await params;
  const vendor = await prisma.vendor.findFirst({
    where: { id: vendorId },
  });
  const title = vendor ? "แก้ไขผู้ออกใบกำกับภาษี" : "สร้างผู้ออกใบกำกับภาษี";

  return (
    <div className="space-y-6">
      <Header
        title={title}
        description="สามารถสร้างผู้ออกใบกำกับภาษีได้ที่นี่ เพื่อนำไปใช้ในการสร้างใบกำกับภาษี"
      />
      <Separator />
      <VendorForm initialData={vendor} />
    </div>
  );
};

export default VendorFormPage;
