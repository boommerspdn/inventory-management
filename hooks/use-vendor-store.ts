// lib/store/vendor-store.ts
import { create } from "zustand";
import { Vendor } from "@/app/types";

const MOCK_VENDORS: Vendor[] = [
  {
    id: "1",
    name: "บริษัท เทคโนโลยี จำกัด",
    address: "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
    taxId: "1234567890123",
    phone: "0812345678",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "ห้างหุ้นส่วน สมาร์ทซัพพลาย",
    address: "456 ถนนพระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10310",
    taxId: "9876543210987",
    phone: "0898765432",
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "3",
    name: "บริษัท ดิจิตอล โซลูชัน จำกัด",
    address: "789 ถนนลาดพร้าว แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพฯ 10230",
    taxId: "1122334455667",
    phone: "0856781234",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "4",
    name: "ร้าน ออฟฟิศ โปร",
    address: "321 ถนนรัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพฯ 10400",
    taxId: "9988776655443",
    phone: "0823456789",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "5",
    name: "บริษัท อินโนเวท เทรดดิ้ง จำกัด",
    address: "654 ถนนเพชรบุรี แขวงราชเทวี เขตราชเทวี กรุงเทพฯ 10400",
    taxId: "5544332211009",
    phone: "0867890123",
    createdAt: new Date("2024-01-20"),
  },
];

interface VendorStore {
  vendors: Vendor[];
  getVendorById: (id: string) => Vendor | undefined;
  createVendor: (data: Omit<Vendor, "id" | "createdAt">) => Vendor;
  updateVendor: (id: string, data: Omit<Vendor, "id" | "createdAt">) => void;
  deleteVendor: (id: string | string[]) => void;
}

export const useVendorStore = create<VendorStore>((set, get) => ({
  vendors: MOCK_VENDORS,

  getVendorById: (id) => {
    return get().vendors.find((v) => v.id === id);
  },

  createVendor: (data) => {
    const newVendor: Vendor = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    set((state) => ({ vendors: [newVendor, ...state.vendors] }));
    return newVendor;
  },

  updateVendor: (id, data) => {
    set((state) => ({
      vendors: state.vendors.map((v) => (v.id === id ? { ...v, ...data } : v)),
    }));
  },

  deleteVendor: (id: string | string[]) => {
    const ids = Array.isArray(id) ? id : [id];
    set((state) => ({
      vendors: state.vendors.filter((o) => !ids.includes(o.id)),
    }));
  },
}));
