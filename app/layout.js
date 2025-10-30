"use client";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import { Poppins } from "next/font/google";
import Footer from "@/ui/layout/footer/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";

const Header = dynamic(() => import("@/ui/layout/header/Header"), { ssr: false });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isGetQuotePage = pathname.includes("/get-quote");

  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          {!isGetQuotePage && <Header />}
          {children}
          {!isLoginPage && !isGetQuotePage && <Footer />}
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
