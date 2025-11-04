"use client";

import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";

const Header = dynamic(() => import("@/ui/layout/header/Header"), {
  ssr: false,
  loading: () => <div style={{ height: "80px", backgroundColor: "#000822" }} />
});

export default function ClientLayout({ children }) {
  return (
    <>
      <Suspense fallback={<div style={{ height: "80px", backgroundColor: "#000822" }} />}>
        <Header />
      </Suspense>
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
