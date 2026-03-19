"use client";

import Header from "@/components/header";
import QuotationNumberSetting from "@/components/quotation-number-setting";
import { useQuotationSettingStore } from "@/hooks/use-quotation-setting-store";

const SettingPage = () => {
  const quotationNumber = useQuotationSettingStore((state) => state.setting);

  return (
    <div className="space-y-6">
      <Header
        title="ตั้งค่า"
        description="ตั้งค่าค่าต่างๆเช่น รหัสใบกำกับภาษี"
      />
      <QuotationNumberSetting data={quotationNumber} />
    </div>
  );
};

export default SettingPage;
