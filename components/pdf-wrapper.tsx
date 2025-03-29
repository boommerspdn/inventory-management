"use client";

import { PDFViewer, DocumentProps } from "@react-pdf/renderer";
import { useState, useEffect, ReactElement } from "react";
import { Loader2 } from "lucide-react";

type PDFWrapperProps = {
  children: ReactElement<DocumentProps>; // Enforce that only a `Document` is allowed
};

const PDFWrapper = ({ children }: PDFWrapperProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 250); // Simulate loading
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <div className="size-full flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return <PDFViewer className="size-full">{children}</PDFViewer>;
};

export default PDFWrapper;
