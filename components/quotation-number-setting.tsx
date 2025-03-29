"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { QuotationSetting } from "@prisma/client";
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
import { LoaderCircle } from "lucide-react";

const FormSchema = z.object({
  initial: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

type QuotationNumberSettingProps = {
  data: QuotationSetting | null;
};

const QuotationNumberSetting = ({ data }: QuotationNumberSettingProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      initial: data?.initial || "",
    },
  });

  const year = new Date().getFullYear() + 543;

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      const response = await axios.post("/api/quotation-number", values);
      toast.success("เพิ่มสินค้าสำเร็จ");
    } catch (error) {
      console.log(error);
      toast.error("เกิดข้อผิดพลาด");
    } finally {
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-12 gap-6">
          <FormField
            control={form.control}
            name="initial"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>ขึ้นต้น (รหัสใบกำกับภาษี)</FormLabel>
                <FormControl>
                  <Input placeholder="EXMP" {...field} />
                </FormControl>
                <FormDescription>
                  คำขึ้นต้นเช่น EXMP จากนั้นต่อด้วยปี พ.ศ
                  และต่อด้วยตัวเลขลำดับอัตโนมัติ โดยจะเริ่มค้นนับใหม่ทุกปี เช่น
                  EXMP-{year}-00001
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "บันทึกตั้งค่า"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default QuotationNumberSetting;
