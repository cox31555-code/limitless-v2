import "../globals.css";
import { Poppins } from "next/font/google";
import Header from "@/ui/dashboard/header/Header";
import DashboardFooter from "@/ui/dashboard/footer/DashboardFooter";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function AllianzDashboardLayout({ children }) {
  return (
    <div>
      <Header />
      <main className="dashboard-main" style={{ marginTop: "75px" }}>
        <div className="dashboardContainer">{children}</div>
      </main>
      <DashboardFooter />
      <ChatWidget />
    </div>
  );
}
