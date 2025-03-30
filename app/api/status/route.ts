import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { id, status } = body;

    if (!body) {
      return new NextResponse("Missing body", { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
