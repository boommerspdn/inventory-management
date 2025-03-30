import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, address, taxId, phone } = body;

    if (!name || !address || !taxId || !phone) {
      return new NextResponse("Missing body", { status: 400 });
    }

    const vendor = await prisma.vendor.create({
      data: {
        name,
        address,
        taxId,
        phone,
      },
    });

    return NextResponse.json(vendor);
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

    const vendor = await prisma.vendor.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json(vendor);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
