import { NextResponse } from "next/server";
import { join, extname } from "path";
import { createReadStream, existsSync } from "fs";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ imageName: string }> },
) {
  const { imageName } = await params;

  const filePath = join(process.cwd(), "public/uploads", imageName);

  if (!existsSync(filePath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  // Determine the MIME type based on file extension
  const extension = extname(imageName).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
  };
  const contentType = mimeTypes[extension] || "application/octet-stream";

  // Convert Node.js ReadStream to a ReadableStream (for Next.js)
  const readStream = createReadStream(filePath);
  const readableStream = new ReadableStream({
    start(controller) {
      readStream.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      readStream.on("end", () => {
        controller.close();
      });
      readStream.on("error", (err) => {
        controller.error(err);
      });
    },
  });

  return new NextResponse(readableStream, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable", // Adjust the caching strategy
    },
  });
}
