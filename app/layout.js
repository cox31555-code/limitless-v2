import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Poppins } from "next/font/google";
import Footer from "@/ui/layout/footer/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import ClientLayout from "./clientLayout";

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
          <ClientLayout>{children}</ClientLayout>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
