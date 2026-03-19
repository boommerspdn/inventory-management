import { create } from "zustand";

type QuotationSetting = {
  id: string;
  initial: string;
};

interface QuotationSettingStore {
  setting: QuotationSetting;
  updateSetting: (data: Partial<QuotationSetting>) => void;
}

export const useQuotationSettingStore = create<QuotationSettingStore>(
  (set) => ({
    setting: {
      id: "1",
      initial: "ORD",
    },

    updateSetting: (data) =>
      set((state) => ({
        setting: { ...state.setting, ...data },
      })),
  }),
);
