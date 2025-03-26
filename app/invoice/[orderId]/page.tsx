import PDFDocument from "@/components/pdf-document";
import prismadb from "@/lib/prismadb";
import { Prisma } from "@prisma/client";

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
  const invoice = await prismadb.order.findUnique({
    where: { id: "2ee76dfa-1c6b-43df-8643-5c55276099f6" },
    include,
  });

  return (
    <div className="h-full">
      <PDFDocument data={invoice} />
    </div>
  );
};

export default InvoicePage;
