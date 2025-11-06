"use client";

import Header from "@/ui/layout/header/Header";
import { ToastContainer } from "react-toastify";
import { InsuranceModalProvider } from "@/contexts/InsuranceModalContext";

export default function ClientLayout({ children }) {
  return (
    <InsuranceModalProvider>
      <Header />
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </InsuranceModalProvider>
  );
}
