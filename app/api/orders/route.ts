import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { CartProduct } from "@/app/order/cart/page";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, date, price, address, taxId, phone, note, cart } = body;

    const generateOrderNumber = async () => {
      // Fetch quotation setting
      const quotation = await prismadb.quotationSetting.findUnique({
        where: { id: "global" },
      });
      const defaultInitial = "XXXX";

      // Get the current and Buddhist year
      const currentYear = new Date(date).getFullYear();
      const bhuddistYear = currentYear + 543;

      // Define start and end of the year for filtering orders
      const startOfYear = new Date(currentYear, 0, 1); // Jan 1
      const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999); // Dec 31

      // Fetch the last order of the year
      const lastOrder = await prismadb.order.findMany({
        where: {
          date: { gte: startOfYear, lte: endOfYear },
          number: {
            startsWith: quotation ? quotation.initial : defaultInitial,
          },
        },
        select: { id: true, number: true },
        orderBy: { date: "desc" },
        take: 1,
      });

      // Helper function to format and pad order number
      const formatOrderNumber = (number: number) =>
        number.toString().padStart(5, "0");

      // Default order number (1) and initial value
      // Calculate the new order number
      const orderNumber = lastOrder[0]
        ? parseInt(lastOrder[0].number.slice(-5)) + 1
        : 1;

      // Return the formatted order number
      const paddedOrderNumber = formatOrderNumber(orderNumber);
      return `${
        quotation ? quotation.initial : defaultInitial
      }-${bhuddistYear}-${paddedOrderNumber}`;
    };

    const order = await prismadb.order.create({
      data: {
        name,
        date,
        price,
        address,
        taxId,
        phone,
        note: note ? note : undefined,
        number: await generateOrderNumber(),
        status: "รอการยืนยัน",
        carts: {
          createMany: {
            data: await Promise.all(
              cart.map(async (item: CartProduct) => {
                // Fetch old amount first
                const product = await prismadb.product.findUnique({
                  where: { id: item.id },
                  select: { amount: true },
                });

                if (!product) throw new Error(`Product ${item.id} not found`);

                // Update product stock
                await prismadb.product.update({
                  where: { id: item.id },
                  data: {
                    amount: product.amount - item.amount,
                  },
                });

                // Return for CreateMany
                return {
                  productId: item.id,
                  amount: item.amount,
                };
              }),
            ),
          },
        },
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const { ids } = body;

    if (!Array.isArray(ids)) {
      return new NextResponse("Id(s) must be an array", { status: 400 });
    }

    const order = await prismadb.order.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    console.log("deleted", ids);

    return NextResponse.json(order);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
