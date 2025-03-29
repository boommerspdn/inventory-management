"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { Vendor } from "@prisma/client";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Textarea } from "./ui/textarea";

type VendorFormProps = {
  initialData?: Vendor | null;
};

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "ชื่อผู้ออกต้องมีมากกว่า 1 ตัวอักษร" })
    .max(50, { message: "ชื่อสินค้าต้องไม่มากกว่า 50 ตัวอักษร" }),
  address: z
    .string()
    .min(1, { message: "เลขประจำตัวผู้เสียภาษีผู้ออกต้องมีมากกว่า 1 ตัวอักษร" })
    .max(50, { message: "ชื่อสินค้าต้องไม่มากกว่า 200 ตัวอักษร" }),
  taxId: z
    .string()
    .min(1, { message: "ชื่อสินค้าต้องมีมากกว่า 1 ตัวอักษร" })
    .max(50, { message: "ชื่อสินค้าต้องไม่มากกว่า 50 ตัวอักษร" }),
  phone: z
    .string()
    .min(1, { message: "เบอร์โทรศัพท์ผู้ออกต้องมีมากกว่า 1 ตัวอักษร" })
    .max(50, { message: "ชื่อสินค้าต้องไม่มากกว่า 50 ตัวอักษร" }),
});

const VendorForm = ({ initialData }: VendorFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      address: initialData?.address || "",
      taxId: initialData?.taxId || "",
      phone: initialData?.phone || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/vendor", values);

      toast.success("เพิ่มสินค้าสำเร็จ");
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
      console.log(error);
    } finally {
      router.refresh();
      router.push("/order/quotation/vendor");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-12 gap-y-8 gap-x-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-full sm:col-span-8 md:col-span-6 xl:col-span-3">
              <FormLabel>ชื่อผู้ออก</FormLabel>
              <FormControl>
                <Input placeholder="กรอกชื่อผู้ออก" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="col-span-full sm:col-span-10 md:col-span-7 xl:col-start-1 xl:col-span-4">
              <FormLabel>ที่อยู่ผู้ออก</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="กรอกที่อยู่ผู้ออก"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taxId"
          render={({ field }) => (
            <FormItem className="col-span-full sm:col-span-6 md:col-start-1 md:col-span-4 xl:col-start-1 xl:col-span-2">
              <FormLabel>เลขประจำตัวผู้เสียภาษีผู้ออก</FormLabel>
              <FormControl>
                <Input
                  placeholder="กรอกเลขประจำตัวผู้เสียภาษีผู้ออก"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="col-span-full sm:col-start-1 sm:col-span-6 md:col-start-1 md:col-span-4 xl:col-start-1 xl:col-span-2">
              <FormLabel>เบอร์โทรศัพท์ผู้ออก</FormLabel>
              <FormControl>
                <Input placeholder="กรอกเบอร์โทรศัพท์ผู้ออก" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-full sm:col-start-1 sm:col-span-4 md:col-start-1 md:col-span-3 lg:col-start-1 lg:col-span-2">
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "สร้างผู้ออกใบกำกับภาษี"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VendorForm;
