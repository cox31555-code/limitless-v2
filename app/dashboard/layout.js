import "../globals.css";
import "./dashboard.css";
import { Poppins } from "next/font/google";
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
      <main className="dashboard-main" style={{ marginTop: "75px" }} suppressHydrationWarning>
        <div className="dashboardContainer">{children}</div>
      </main>
      <DashboardFooter />
      <Script
        id="crisp-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.$crisp=[];window.CRISP_WEBSITE_ID="80335e6a-e33e-478a-8ce3-1b88c05b4ad4";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
            window.$crisp.push(["do", "chat:hide:powered-by"]);

            // Remove Crisp watermark on load and with observer
            function removeCrispWatermark() {
              const watermark = document.querySelector('a[href*="crisp.chat/en/livechat"]');
              if (watermark) {
                watermark.closest('[class^="cc-"]')?.remove();
              }
            }

            // Try immediately
            setTimeout(removeCrispWatermark, 500);
            setTimeout(removeCrispWatermark, 1500);

            // Use observer for dynamically loaded content
            const observer = new MutationObserver(removeCrispWatermark);
            observer.observe(document.body, { childList: true, subtree: true });
          `
        }}
      />
    </div>
  );
}

export const metadata = {
  title: "Dashboard",
  description: "Manage your insurance policies",
};
