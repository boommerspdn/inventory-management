import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File; // Type assertion
    const fileName = formData.get("fileName") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Read file data into a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Define file path
    const uploadDir = path.join(process.cwd(), "/public/uploads");
    const filePath = path.join(uploadDir, fileName);

    // Ensure uploads directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Save the file
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({
      message: "File uploaded successfully",
      fileName: fileName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const { fileName } = body;

    if (!fileName) {
      return new NextResponse("Missing fileName", { status: 400 });
    }

    const filePath = path.join(process.cwd(), "public", fileName);

    console.log(filePath);
    // Check if file exists
    await fs.access(filePath); // Throws an error if file does not exist

    // Delete the file
    await fs.unlink(filePath);

    return NextResponse.json({
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
