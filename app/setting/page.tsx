import type { Metadata } from "next";
import SettingClient from "./setting-client";

export const metadata: Metadata = {
  title: "ตั้งค่า",
  description: "ตั้งค่าค่าต่างๆเช่น รหัสใบกำกับภาษี",
};

export default function SettingPage() {
  return <SettingClient />;
}
