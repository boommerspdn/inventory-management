// invoice-client.tsx — read from search params first, fallback to store
"use client";

import PDFDocument from "@/components/pdf-document";
import { useOrderStore } from "@/hooks/use-order-store";
import { Order } from "@/app/types";
import { use } from "react";
import InvoiceNotFound from "@/components/invoice-not-found";

const InvoicePage = ({
  params,
  searchParams,
}: {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ data?: string }>;
}) => {
  const { orderId } = use(params);
  const { data } = use(searchParams);
  const getOrderById = useOrderStore((state) => state.getOrderById);

  // New tab won't have store state, so parse from search params
  const invoice: Order | undefined = data
    ? JSON.parse(data)
    : getOrderById(orderId);

  if (!invoice) {
    return <InvoiceNotFound />;
  }

  return (
    <div className="h-full">
      <PDFDocument data={invoice} />
    </div>
  );
};

export default InvoicePage;
