import type { Metadata } from "next";
import PDFDocument from "@/components/pdf-document";
import { prisma } from "@/lib/prismadb";
import { Prisma } from "@prisma/client";

export const metadata: Metadata = {
  title: "ใบกำกับภาษี",
};

const include = {
  carts: {
    include: { products: true },
  },
  vendor: true,
};

export type Invoice = Prisma.OrderGetPayload<{
  include: typeof include;
}>;

const InvoicePage = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { orderId } = await params;

  const invoice = await prisma.order.findUnique({
    where: { id: orderId },
    include,
  });

  return (
    <div className="h-full">
      <PDFDocument data={invoice} />
    </div>
  );
};

export default InvoicePage;
