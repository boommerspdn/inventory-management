import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, number, amount, price, image } = body;

    if (!title || !number || !amount || !price || !image) {
      return new NextResponse("Missing body", { status: 400 });
    }

    const product = await prismadb.product.create({
      data: {
        title,
        number,
        amount,
        price,
        image,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const { ids } = body;

    console.log("DELETE" + ids);

    if (!Array.isArray(ids)) {
      return new NextResponse("Id(s) must be an array", { status: 400 });
    }

    const product = await prismadb.product.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
