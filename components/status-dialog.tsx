"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type StatusDialog = {
  id: string;
  currentStatus: string;
  children?: React.ReactNode;
};

const FormSchema = z.object({
  status: z.string({
    required_error: "Please select an email to display.",
  }),
});

const StatusDialog = ({ children, id, currentStatus }: StatusDialog) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { status: currentStatus },
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const body = {
        id,
        status: data.status,
      };
      await axios.patch("/api/status/", body);
      toast.success("อัพเดทสถานะสำเร็จ");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  return (
    <Dialog>
      {children}
      <DialogContent className="gap-8">
        <DialogHeader>
          <DialogTitle>อัพเดทสถานะ</DialogTitle>
          <DialogDescription>
            เลือกสถานะการชำระเงินของคำสั่งซื้อ
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="สถานะคำสั่งซื้อ" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="รอการยืนยัน">รอการยืนยัน</SelectItem>
                      <SelectItem value="ชำระเงินแล้ว">ชำระเงินแล้ว</SelectItem>
                      <SelectItem value="ยกเลิกคำสั่งซื้อ">
                        ยกเลิกคำสั่งซื้อ
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "บันทึกข้อมูล"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default StatusDialog;
