"use client";

import { VendorSelectBox } from "@/app/order/quotation/[orderId]/page";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useMultiFormStore } from "@/hooks/use-multi-form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Order } from "@prisma/client";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type QuotationFormProps = {
  vendors: VendorSelectBox[];
  initialData?: Order | null;
};

export const formSchema = z.object({
  vendor: z.string({ required_error: "กรุณาเลือกข้อมูลผู้ออก" }),
  name: z
    .string()
    .min(1, { message: "ต้องมีตัวอักษรมากกว่า 1 ตัวอักษร" })
    .max(50, { message: "ต้องมีตัวอักษรไม่มากกว่า 50 ตัวอักษร" }),
  date: z.date({
    required_error: "กรุณาเลือกวันที่ออกใบกำกับภาษี",
  }),
  address: z
    .string()
    .min(1, { message: "ต้องมีตัวอักษรมากกว่า 1 ตัวอักษร" })
    .max(100, { message: "ต้องมีตัวอักษรไม่มากกว่า 100 ตัวอักษร" }),
  taxId: z
    .string()
    .min(1, { message: "ต้องมีตัวอักษรมากกว่า 1 ตัวอักษร" })
    .max(20, { message: "ต้องมีตัวอักษรไม่มากกว่า 20 ตัวอักษร" }),
  phone: z
    .string()
    .min(1, { message: "ต้องมีตัวอักษรมากกว่า 1 ตัวอักษร" })
    .max(15, { message: "ต้องมีตัวอักษรไม่มากกว่า 15 ตัวอักษร" }),
  note: z
    .string()
    .min(0)
    .max(200, { message: "ต้องมีตัวอักษรไม่มากกว่า 200 ตัวอักษร" })
    .optional(),
});

export type FormSchema = z.infer<typeof formSchema>;

const QuotationForm = ({ vendors, initialData }: QuotationFormProps) => {
  const setData = useMultiFormStore((state) => state.setData);
  const router = useRouter();

  const defaultValues = {
    vendor: initialData?.vendorId || undefined,
    name: initialData?.name || "",
    date: initialData?.date ? new Date(initialData.date) : undefined,
    address: initialData?.address || "",
    taxId: initialData?.taxId || "",
    phone: initialData?.phone || "",
    note: initialData?.note || "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setData(values);
    if (initialData) {
      router.push(`/order/cart/${initialData.id}`);
    } else {
      router.push("/order/cart/new");
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
          name="vendor"
          render={({ field }) => (
            <FormItem className="col-span-full sm:col-span-8 md:col-span-4 xl:col-span-4">
              <FormLabel>ข้อมูลผู้ออก</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="กรุณาเลือกข้อมูลผู้ออก" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vendors.length > 0 ? (
                    vendors.map((vendor) => (
                      <SelectItem value={vendor.id} key={vendor.id}>
                        {vendor.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="notFound" disabled>
                      ไม่พบข้อมูลผู้ออก กรุณาเพิ่มข้อมูลผู้ออก
                    </SelectItem>
                  )}

                  <Separator className="my-2" />
                  <Link
                    href="/order/quotation/vendor"
                    className="ml-8 pr-2 text-sm text-muted-foreground hover:text-foreground underline transition-colors"
                  >
                    สร้าง/แก้ไข ผู้ออกใบกำกับภาษี
                  </Link>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="col-start-1 col-span-full" />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-full sm:col-span-9 md:col-span-5 xl:col-start-1 xl:col-span-4">
              <FormLabel>ชื่อผู้ซื้อ</FormLabel>
              <FormControl>
                <Input placeholder="กรอกชื่อผู้ซื้อ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="col-span-full sm:col-span-6 md:col-start-1 md:col-span-4 xl:col-start-1 xl:col-span-2 flex flex-col">
              <FormLabel>วันที่ออกใบสั่งซื่้อ</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: th })
                      ) : (
                        <span>เลือกวันที่</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    locale={th}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="col-span-full sm:col-span-10 md:col-start-1 md:col-span-7 xl:col-start-1 xl:col-span-5">
              <FormLabel>ที่อยู่ผู้ซื้อ</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="กรอกที่อยู่ผู้ซื้อ"
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
            <FormItem className="col-span-full sm:col-span-6 md:col-start-1 md:col-span-4 xl:col-start-1 xl:col-span-3">
              <FormLabel>เลขที่ผู้เสียภาษี</FormLabel>
              <FormControl>
                <Input placeholder="กรอกเลขที่ผู้เสียภาษี" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="col-span-full sm:col-start-1 sm:col-span-6 md:col-start-1 md:col-span-4  xl:col-start-1 xl:col-span-2">
              <FormLabel>เบอร์โทรศัพท์</FormLabel>
              <FormControl>
                <Input placeholder="กรอกเบอร์โทรศัพท์" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="col-span-12" />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem className="col-span-full sm:col-span-10 md:col-span-7 xl:col-start-1 xl:col-span-5">
              <FormLabel>หมายเหตุ</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="กรอกหมายเหตุ"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-full sm:col-start-1 sm:col-span-3 md:col-start-1 md:col-span-2 xl:col-start-1 xl:col-span-1">
          <Button type="submit" className="w-full">
            ต่อไป
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuotationForm;
