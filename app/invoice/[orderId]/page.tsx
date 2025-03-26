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
    where: { id: "511cbf06-3445-4050-a69e-9bb4d5387213" },
    include,
  });

  return (
    <div className="h-full">
      <PDFDocument data={invoice} />
    </div>
  );
};

export default InvoicePage;
