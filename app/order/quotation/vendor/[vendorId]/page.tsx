import type { Metadata } from "next";
import VendorFormClient from "./vendor-form-client";

export const metadata: Metadata = {
  title: "ผู้ออกใบกำกับภาษี",
  description: "สร้างหรือแก้ไขข้อมูลผู้ออกใบกำกับภาษี",
};

export default async function VendorFormPage({
  params,
}: {
  params: Promise<{ vendorId: string }>;
}) {
  const resolvedParams = await params;
  return <VendorFormClient params={resolvedParams} />;
}
