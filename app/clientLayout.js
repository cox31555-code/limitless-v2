"use client";

import Header from "@/ui/layout/header/Header";
import { ToastContainer } from "react-toastify";

export default function ClientLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <ToastContainer
        position="bottom-center"
        autoClose={3500}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={false}
        pauseOnHover={true}
        theme="light"
        limit={1}
      />
    </>
  );
}
