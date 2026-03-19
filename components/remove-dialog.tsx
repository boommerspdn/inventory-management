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
import { useProductStore } from "@/hooks/use-product-store";
import { useOrderStore } from "@/hooks/use-order-store";
import { useVendorStore } from "@/hooks/use-vendor-store";

type RemoveDialog = {
  children: React.ReactNode;
  ids: string[];
  api?: "products" | "orders" | "vendor";
  fn?: () => void;
};

const RemoveDialog = ({ children, ids, fn, api }: RemoveDialog) => {
  const productDelete = useProductStore((state) => state.deleteProduct);
  const orderDelete = useOrderStore((state) => state.deleteOrder);
  const venderDelete = useVendorStore((state) => state.deleteVendor);

  const handleDelete = async (ids: string[]) => {
    try {
      if (ids.length === 0) {
        throw new Error("No IDs provided");
      }
      if (fn) {
        fn();
      }

      if (api) {
        if (api === "products") {
          productDelete(ids);
        } else if (api === "orders") {
          orderDelete(ids);
        } else if (api === "vendor") {
          venderDelete(ids);
        }
      }
      toast.success("ลบรายการสำเร็จ");
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
