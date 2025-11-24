import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "rsuite/dist/rsuite.min.css";
import { Poppins } from "next/font/google";
import Footer from "@/ui/layout/footer/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import ClientLayout from "./clientLayout";
import { InsuranceModalProvider } from "@/contexts/InsuranceModalContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <AuthProvider>
          <InsuranceModalProvider>
            <ClientLayout>{children}</ClientLayout>
            <Footer />
          </InsuranceModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
