import "../globals.css";
import { Poppins } from "next/font/google";
import TopNavbar from "@/ui/dashboard/layout/topNavbar/TopNavbar";
import Header from "@/ui/dashboard/header/Header";
import DashboardFooter from "@/ui/dashboard/footer/DashboardFooter";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Header />
      <TopNavbar />
      <main className="dashboard-main">
        <div className="dashboardContainer">{children}</div>
      </main>
      <DashboardFooter />
      <Script
        id="tawk-to-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/68ccb891f60acf1928976f5c/1j5fr1uc6';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `
        }}
      />
    </div>
  );
}
