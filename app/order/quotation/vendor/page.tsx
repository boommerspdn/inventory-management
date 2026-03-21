import type { Metadata } from "next";
import VendorListClient from "./vendor-list-client";

export const metadata: Metadata = {
  title: "ผู้ออกใบกำกับภาษี",
  description: "สร้าง/แก้ไข หรือลบข้อมูลผู้ออกใบกำกับภาษีได้ที่นี่",
};

export default function VendorPage() {
  return <VendorListClient />;
}
