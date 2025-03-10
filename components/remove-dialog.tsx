import axios from "axios";
import toast from "react-hot-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";

type RemoveDialog = {
  children: React.ReactNode;
  ids: string[];
};

const RemoveDialog = ({ children, ids }: RemoveDialog) => {
  const router = useRouter();

  const handleDelete = async (ids: string[]) => {
    console.log(ids);
    try {
      const response = await axios.delete("/api/products", {
        data: { ids },
        headers: { "Content-Type": "application/json" },
      });

      toast.success("ลบสินค้าสำเร็จ");
      router.refresh();
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
    }
  };
  return (
    <AlertDialog>
      {children}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>คุณแน่ใจที่จะลบสินค้านี้หรือไม่</AlertDialogTitle>
          <AlertDialogDescription>
            หากลบสินค้าแล้วจะไม่สามารถนำกลับคืนมาได้
            หากคุณแน่ใจแล้วที่จะลบสินค้าให้กด "ลบสินค้า"
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(ids)}>
            ลบสินค้า
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveDialog;
