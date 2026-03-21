import type { Metadata } from "next";
import QuotationClient from "./quotation-client";

export const metadata: Metadata = {
  title: "ออกใบกำกับภาษี",
  description: "สร้างหรือแก้ไขใบกำกับภาษี",
};

export default async function QuotationPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const resolvedParams = await params;
  return <QuotationClient params={resolvedParams} />;
}
