import "../globals.css";
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
      <main className="dashboard-main" style={{ marginTop: "75px" }}>
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

            // Customize Tawk.to widget styling and appearance
            Tawk_API = Tawk_API || {};
            Tawk_API.onLoad = function() {
              // Apply custom styling to the widget
              Tawk_API.setAttributes({
                'name': 'User',
                'email': 'user@example.com'
              }, function(error) {});

              // Customize widget appearance
              const style = document.createElement('style');
              style.innerHTML = \`
                /* Modern professional Tawk.to widget styling */
                #tawk-badge-frame {
                  display: none !important;
                }

                .tawk-min-container {
                  box-shadow: 0 4px 12px rgba(0, 52, 102, 0.15) !important;
                  border-radius: 12px !important;
                }

                .tawk-widget-frame {
                  border-radius: 12px !important;
                  box-shadow: 0 4px 12px rgba(0, 52, 102, 0.15) !important;
                }

                .tawk-widget-bubble {
                  background: linear-gradient(135deg, #0052a3 0%, #003d7a 100%) !important;
                  box-shadow: 0 4px 12px rgba(0, 52, 102, 0.2) !important;
                  border-radius: 50% !important;
                  border: none !important;
                  width: 56px !important;
                  height: 56px !important;
                }

                .tawk-button {
                  background: linear-gradient(135deg, #0052a3 0%, #003d7a 100%) !important;
                  border: none !important;
                  border-radius: 50% !important;
                  box-shadow: 0 4px 12px rgba(0, 52, 102, 0.2) !important;
                }

                .tawk-button:hover {
                  box-shadow: 0 6px 16px rgba(0, 52, 102, 0.25) !important;
                  transform: scale(1.05) !important;
                }

                /* Chat window styling */
                .tawk-window {
                  border-radius: 12px !important;
                  box-shadow: 0 8px 24px rgba(0, 52, 102, 0.2) !important;
                  border: 1px solid #d4e4f7 !important;
                }

                .tawk-window-header {
                  background: linear-gradient(135deg, #0052a3 0%, #003d7a 100%) !important;
                  border-radius: 12px 12px 0 0 !important;
                }

                .tawk-window-header h3 {
                  color: #ffffff !important;
                  font-weight: 700 !important;
                  font-size: 16px !important;
                  letter-spacing: -0.3px !important;
                }

                .tawk-message {
                  border-radius: 8px !important;
                  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
                }

                .tawk-message-user {
                  background: #0388ff !important;
                  color: #ffffff !important;
                  border-radius: 8px !important;
                }

                .tawk-message-agent {
                  background: #f0f4f8 !important;
                  color: #003366 !important;
                  border-radius: 8px !important;
                }

                .tawk-input {
                  border: 1px solid #d4e4f7 !important;
                  border-radius: 8px !important;
                  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
                  font-size: 14px !important;
                }

                .tawk-send-button {
                  background: #0388ff !important;
                  border: none !important;
                  border-radius: 6px !important;
                }

                .tawk-send-button:hover {
                  background: #0275dd !important;
                }

                /* Badge styling - modern professional look */
                .tawk-bubble {
                  background: linear-gradient(135deg, #0052a3 0%, #003d7a 100%) !important;
                  box-shadow: 0 4px 12px rgba(0, 52, 102, 0.2) !important;
                }
              \`;
              document.head.appendChild(style);
            };
          `
        }}
      />
    </div>
  );
}
