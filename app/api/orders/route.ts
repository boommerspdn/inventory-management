import prismadb from "@/lib/prismadb";
import { Cart } from "@/lib/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, date, price, address, taxId, phone, note, cart } = body;

    const order = await prismadb.order.create({
      data: {
        name,
        date,
        price,
        address,
        taxId,
        phone,
        note: note ? note : undefined,
        number: "sf",
        status: "รอการยืนยัน",
        carts: {
          createMany: {
            data: await Promise.all(
              cart.map(async (item: Cart) => {
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
