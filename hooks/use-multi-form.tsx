import { FormSchema } from "@/components/quotation-form";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type MultiStepForm = Partial<FormSchema> & {
  setData: (data: Partial<FormSchema>) => void; // Allow cart in data
};

export const useMultiFormStore = create<MultiStepForm>()(
  persist(
    (set) => ({
      setData: (data) => set((state) => ({ ...state, ...data })), // Merge existing state with new data
    }),
    {
      name: "form-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
