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
      <Script
        id="crisp-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.$crisp=[];window.CRISP_WEBSITE_ID="80335e6a-e33e-478a-8ce3-1b88c05b4ad4";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
          `
        }}
      />
    </div>
  );
}
