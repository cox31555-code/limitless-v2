"use client";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/ui/layout/header/Header";
import { Poppins } from "next/font/google";
import Footer from "@/ui/layout/footer/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <Header />
          {children}
          {!isLoginPage && <Footer />}
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
