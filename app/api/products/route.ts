import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, number, amount, price, image } = body;

    if (!title || !number || !amount || !price || !image) {
      return new NextResponse("Missing body", { status: 400 });
    }

    const covertedPrice = Math.round(price * 100);

    const product = await prisma.product.create({
      data: {
        title,
        number,
        amount,
        price: covertedPrice,
        image,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { id, title, number, amount, price, image } = body;

    if (!id || !title || !number || !amount || !price || !image) {
      return new NextResponse("Missing body", { status: 400 });
    }

    const covertedPrice = Math.round(price * 100);

    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        title,
        number,
        amount,
        price: covertedPrice,
        image,
      },
    });

    return NextResponse.json(product);
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

    const product = await prisma.product.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
