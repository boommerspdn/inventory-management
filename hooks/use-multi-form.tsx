import { FormSchema } from "@/components/quotation-form";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type MultiStepForm = Partial<FormSchema> & {
  setData: (data: Partial<FormSchema>) => void; // Allow cart in data
  reset: () => void;
};

const initialState = {
  vendor: undefined,
  name: "",
  date: undefined,
  address: "",
  taxId: "",
  phone: "",
  note: "",
};

export const useMultiFormStore = create<MultiStepForm>()((set) => ({
  setData: (data) => set(data),
  reset: () => set(initialState),
}));
