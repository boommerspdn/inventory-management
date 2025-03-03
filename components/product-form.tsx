"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { object, z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ImageOff } from "lucide-react";

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "ชื่อสินค้าต้องมีมากกว่า 1 ตัวอักษร" })
    .max(50),
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

type ProductFormProps = {};

const ProductForm = ({}: ProductFormProps) => {
  const [imageUpload, setImageUpload] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      number: "",
      amount: 0,
      price: 0,
      image: null,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
            <FormItem className="col-span-4">
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
            <FormItem className="col-start-1 col-span-3">
              <FormLabel>รหัสสินค้า</FormLabel>
              <FormControl>
                <Input placeholder="กรอกรหัสสินค้า" min={0} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="col-start-1 col-span-1">
              <FormLabel>ราคา</FormLabel>
              <FormControl>
                <Input
                  placeholder="กรอกราคาสินค้า"
                  type="number"
                  min={0}
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
            <FormItem className="col-span-1">
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
            <FormItem className="col-start-1 col-span-3">
              <FormLabel>รูปภาพสินค้า</FormLabel>
              <div className="relative min-h-[300px] w-auto">
                {imageUpload ? (
                  <Image
                    src={imageUpload}
                    alt={imageUpload}
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

        <Button type="submit" className="col-start-1">
          เพิ่มสินค้า
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
