"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { ErrorProvider } from "@/contexts/ErrorContext";
import ClientLayout from "./clientLayout";
import { InsuranceModalProvider } from "@/contexts/InsuranceModalContext";
import { LoadingProvider } from "@/contexts/LoadingContext";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ErrorProvider>
        <InsuranceModalProvider>
          <LoadingProvider>
            <ClientLayout>{children}</ClientLayout>
          </LoadingProvider>
        </InsuranceModalProvider>
      </ErrorProvider>
    </AuthProvider>
  );
}
