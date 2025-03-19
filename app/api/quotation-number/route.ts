import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { initial } = body;

    if (!initial) {
      return new NextResponse("Missing body", { status: 400 });
    }

    const quotationNumber = await prismadb.quotationSetting.upsert({
      where: { id: "global" },
      update: { initial },
      create: { id: "global", initial },
    });

    return NextResponse.json(quotationNumber);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
