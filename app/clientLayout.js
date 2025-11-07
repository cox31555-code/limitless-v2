"use client";

import Header from "@/ui/layout/header/Header";
import { ToastContainer } from "react-toastify";

export default function ClientLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={false}
        pauseOnHover={true}
        theme="light"
        limit={3}
      />
    </>
  );
}
