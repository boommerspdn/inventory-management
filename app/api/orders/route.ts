import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import { CartProduct } from "@/app/order/cart/[orderId]/page";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { vendor, name, date, price, address, taxId, phone, note, cart } =
      body;

    const generateOrderNumber = async () => {
      // Fetch quotation setting
      const quotation = await prisma.quotationSetting.findUnique({
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
      const lastOrder = await prisma.order.findMany({
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

    const order = await prisma.order.create({
      data: {
        name,
        vendorId: vendor,
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
                const product = await prisma.product.findUnique({
                  where: { id: item.id },
                  select: { amount: true },
                });

                if (!product) throw new Error(`Product ${item.id} not found`);

                // Update product stock
                await prisma.product.update({
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

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const {
      id,
      vendor,
      name,
      date,
      address,
      taxId,
      phone,
      note,
      price,
      addedItems,
      removedItems,
      stockUpdates,
    } = body;

    if (
      !id ||
      !vendor ||
      !name ||
      !date ||
      !address ||
      !taxId ||
      !phone ||
      !price
    ) {
      return new NextResponse("Missing body", { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id },
      data: {
        vendorId: vendor,
        name,
        date,
        address,
        taxId,
        phone,
        note,
        price,
      },
    });

    const createCart = await prisma.cart.createMany({
      data: addedItems.map((item: CartProduct) => ({
        productId: item.id,
        amount: item.amount,
        orderId: id,
      })),
    });

    const removeCart = await prisma.cart.deleteMany({
      where: { id: { in: removedItems } },
    });

    const updateCart = stockUpdates.map(
      async (item: { id: string; newAmount: number; stockChange: number }) => {
        await prisma.cart.updateMany({
          where: { orderId: id, productId: item.id },
          data: {
            amount: item.newAmount,
          },
        });

        await prisma.product.update({
          where: { id: item.id },
          data: { amount: { increment: item.stockChange } },
        });
      },
    );
    Promise.all(updateCart);

    return NextResponse.json({ order, createCart, removeCart, updateCart });
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

    const order = await prisma.order.deleteMany({
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
