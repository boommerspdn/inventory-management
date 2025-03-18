"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Prisma } from "@prisma/client";
import { QuotationNumber } from "@/lib/types";

const FormSchema = z.object({
  initial: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

type QuotationNumberSettingProps = {
  data: QuotationNumber | null;
};

const QuotationNumberSetting = ({ data }: QuotationNumberSettingProps) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      initial: data?.initial || "",
    },
  });

  const year = new Date().getFullYear() + 543;

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const response = await axios.post("/api/quotation-number", values);
      toast.success("เพิ่มสินค้าสำเร็จ");
    } catch (error) {
      console.log(error);
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
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
                <FormLabel>ขึ้นต้น</FormLabel>
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
        <Button type="submit" disabled={loading}>
          {loading ? (
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
