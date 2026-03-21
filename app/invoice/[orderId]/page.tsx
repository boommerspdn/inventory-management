import type { Metadata } from "next";
import InvoiceClient from "./invoice-client";

export const metadata: Metadata = {
  title: "ใบกำกับภาษี",
  description: "แสดงใบกำกับภาษีสำหรับคำสั่งซื้อ",
};

export default async function InvoicePage({
  params,
  searchParams,
}: {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ data?: string }>;
}) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([params, searchParams]);
  
  return <InvoiceClient params={resolvedParams} searchParams={resolvedSearchParams} />;
}
