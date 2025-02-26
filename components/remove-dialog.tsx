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

type RemoveDialog = {
  children: React.ReactNode;
  ids?: number | number[];
};

const RemoveDialog = ({ children }: RemoveDialog) => {
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
          <AlertDialogAction>ลบสินค้า</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveDialog;
