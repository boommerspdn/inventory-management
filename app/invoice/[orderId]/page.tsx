import PDFDocument from "@/components/pdf-document";
import prismadb from "@/lib/prismadb";

const InvoicePage = async () => {
  const invoice = await prismadb.order.findUnique({
    where: { id: "e6b0228c-ad56-4c78-ad2a-c6949c55c044" },
    include: { carts: true, vendor: true },
  });

  return (
    <div className="h-full">
      <PDFDocument name={invoice?.name} />
    </div>
  );
};

export default InvoicePage;
