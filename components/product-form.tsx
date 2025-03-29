"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import path from "path";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { ImageOff, LoaderCircle } from "lucide-react";
import { Product } from "@prisma/client";
import { priceFormatter } from "@/lib/utils";

type ProductFormProps = {
  initialData?: Product | null;
};

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "ชื่อสินค้าต้องมีมากกว่า 1 ตัวอักษร" })
    .max(50, { message: "ชื่อสินค้าต้องไม่มากกว่า 50 ตัวอักษร" }),
  number: z
    .string()
    .min(1, { message: "รหัสสินค้าต้องมีมากกว่า 1 ตัวอักษร" })
    .max(50),
  amount: z.coerce.number().min(0),
  price: z.coerce.number().min(0),
  image: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "กรุณาอัพโหลดรูปภาพ",
    }),
});

const ProductForm = ({ initialData }: ProductFormProps) => {
  const [imageUpload, setImageUpload] = useState<string | undefined>(
    initialData?.image,
  );

  const router = useRouter();

  const convertedPrice = initialData
    ? parseFloat(priceFormatter(initialData.price))
    : 0;
  const buttonLabel = initialData ? "บันทึกรายการ" : "เพิ่มสินค้า";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      number: initialData?.number || "",
      amount: initialData?.amount || 0,
      price: convertedPrice,
      image: initialData?.image || null,
    },
  });

  useEffect(() => {
    if (initialData?.image) {
      // Manually create a mock `File` object from the image path
      const file = new File([""], initialData.image, { type: "image/jpeg" }); // Adjust type as needed

      // Use DataTransfer to create a FileList
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);

      // Set the file in React Hook Form
      form.setValue("image", dataTransfer.files);
    }
  }, [initialData, form.setValue]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const filename = values.image[0].name;
      const extension = path.extname(filename);
      const newFileName = `${uuidv4()}${extension}`;

      if (initialData) {
        const body = {
          id: initialData.id,
          title: values.title,
          number: values.number,
          amount: values.amount,
          price: values.price,
          image:
            initialData.image === filename
              ? initialData.image
              : `/uploads/${newFileName}`,
        };
        const response = await axios.patch("/api/products/", body);

        if (initialData?.image !== filename) {
          const response = await axios.delete("/api/upload/", {
            data: { fileName: initialData?.image },
            headers: { "Content-Type": "application/json" },
          });
        }
      } else {
        const body: z.infer<typeof formSchema> = {
          title: values.title,
          number: values.number,
          amount: values.amount,
          price: values.price,
          image: `/uploads/${newFileName}`,
        };
        const response = await axios.post("/api/products/", body);
      }

      if (!initialData || initialData.image !== filename) {
        const formData = new FormData();
        formData.append("file", values.image[0]);
        formData.append("fileName", newFileName);

        const uploadResponse = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      toast.success("เพิ่มสินค้าสำเร็จ");
    } catch (error) {
      console.log(error);
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      router.push("/");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-12 gap-y-8 gap-x-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-full sm:col-span-8 md:col-span-6 xl:col-span-4">
              <FormLabel>ชื่อสินค้า</FormLabel>
              <FormControl>
                <Input placeholder="กรอกชื่อสินค้า" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem className=" col-start-1 col-span-full sm:col-span-5 md:col-start-1 md:col-span-4 xl:col-start-1 xl:col-span-3">
              <FormLabel>รหัสสินค้า</FormLabel>
              <FormControl>
                <Input placeholder="กรอกรหัสสินค้า" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="col-start-1 col-span-6 sm:col-start-1 sm:col-span-3 md:col-start-1 md:col-span-2 xl:col-start-1 xl:col-span-1">
              <FormLabel>ราคา</FormLabel>
              <FormControl>
                <Input
                  placeholder="กรอกราคาสินค้า"
                  type="number"
                  min={0}
                  step={"any"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="col-span-6 sm:col-span-3 md:col-span-2 xl:col-span-1">
              <FormLabel>จำนวน</FormLabel>
              <FormControl>
                <Input placeholder="กรอกราคาสินค้า" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="col-span-full col-start-1 sm:col-span-9 sm:col-start-1 xl:col-start-1 xl:col-span-3">
              <FormLabel>รูปภาพสินค้า</FormLabel>
              <div className="relative min-h-[300px] w-auto">
                {imageUpload ? (
                  <Image
                    src={imageUpload}
                    alt={imageUpload}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={initialData ? true : false}
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <FormLabel className="size-[300px] bg-accent rounded-md flex justify-center items-center cursor-pointer">
                    <ImageOff size={100} />
                  </FormLabel>
                )}
              </div>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  className="cursor-pointer"
                  onChange={(e) => {
                    field.onChange(e.target.files);
                    const file = e.target.files?.[0];
                    setImageUpload(
                      file ? URL.createObjectURL(file) : undefined,
                    );
                  }} // Correctly handle the file input
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="col-start-1 col-span-full sm:col-span-4 md:col-start-1 md:col-span-3 xl:col-start-1 xl:col-span-2"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            buttonLabel
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
