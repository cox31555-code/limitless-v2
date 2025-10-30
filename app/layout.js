"use client";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import { Poppins } from "next/font/google";
import Footer from "@/ui/layout/footer/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Header = dynamic(() => import("@/ui/layout/header/Header"), { ssr: false });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
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
        </AuthProvider>
      </body>
    </html>
  );
}
