import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import { Poppins } from "next/font/google";
import Footer from "@/ui/layout/footer/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import ClientLayout from "./clientLayout";

const Header = dynamic(() => import("@/ui/layout/header/Header"), { ssr: false });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <Header />
          <ClientLayout>{children}</ClientLayout>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
