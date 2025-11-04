"use client";

import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";

const Header = dynamic(() => import("@/ui/layout/header/Header"));

export default function ClientLayout({ children }) {
  return (
    <>
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
    </>
  );
}
