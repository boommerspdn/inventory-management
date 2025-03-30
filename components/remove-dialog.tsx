import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type RemoveDialog = {
  children: React.ReactNode;
  ids: string[];
  api: "products" | "orders" | "vendor";
};

const RemoveDialog = ({ children, ids, api }: RemoveDialog) => {
  const router = useRouter();

  const handleDelete = async (ids: string[]) => {
    try {
      if (ids.length === 0) {
        throw new Error("No IDs provided");
      }

      await axios.delete(`/api/${api}/`, {
        data: { ids },
        headers: { "Content-Type": "application/json" },
      });

      toast.success("ลบรายการสำเร็จ");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("เกิดข้อผิดพลาด");
    }
  };
  return (
    <AlertDialog>
      {children}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>คุณแน่ใจที่จะลบรายการนี้หรือไม่</AlertDialogTitle>
          <AlertDialogDescription>
            หากลบรายการแล้วจะไม่สามารถนำกลับคืนมาได้
            หากคุณแน่ใจแล้วที่จะลบรายการให้กด &quot;ลบรายการ&quot;
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(ids)}>
            ลบรายการ
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveDialog;
