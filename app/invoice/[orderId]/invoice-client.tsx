"use client";

import { Order } from "@/app/types";
import InvoiceNotFound from "@/components/invoice-not-found";
import PDFDocument from "@/components/pdf-document";
import { useOrderStore } from "@/hooks/use-order-store";

const InvoiceClient = ({
  params,
  searchParams,
}: {
  params: { orderId: string };
  searchParams: { data?: string };
}) => {
  const { orderId } = params;
  const { data } = searchParams;
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

export default InvoiceClient;
