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
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Professional and modern Tawk.to widget styling */
            #tawk-badge-frame {
              display: none !important;
            }

            /* Chat bubble/button styling */
            .tawk-min-container,
            #tawk-min-frame,
            .tawk-widget-frame {
              box-shadow: 0 4px 16px rgba(0, 52, 102, 0.12) !important;
              border-radius: 14px !important;
              border: none !important;
            }

            .tawk-min-container {
              border-radius: 50% !important;
              box-shadow: 0 4px 16px rgba(0, 52, 102, 0.15) !important;
            }

            .tawk-bubble {
              background: linear-gradient(135deg, #0052a3 0%, #003d7a 100%) !important;
              box-shadow: 0 4px 16px rgba(0, 52, 102, 0.15) !important;
              border: none !important;
            }

            .tawk-bubble:hover {
              box-shadow: 0 6px 20px rgba(0, 52, 102, 0.2) !important;
              transform: translateY(-2px) !important;
            }

            /* Main chat window styling */
            .tawk-window {
              border-radius: 14px !important;
              border: 1px solid #e8f0f7 !important;
              box-shadow: 0 8px 32px rgba(0, 52, 102, 0.16) !important;
            }

            .tawk-window-header,
            .tawk-header {
              background: linear-gradient(135deg, #0052a3 0%, #003d7a 100%) !important;
              border-radius: 14px 14px 0 0 !important;
              border: none !important;
            }

            .tawk-window-header h3,
            .tawk-header-title {
              color: #ffffff !important;
              font-weight: 700 !important;
              font-size: 16px !important;
              letter-spacing: -0.3px !important;
              font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
            }

            /* Close button styling */
            .tawk-close-button {
              color: #ffffff !important;
              opacity: 0.8 !important;
            }

            .tawk-close-button:hover {
              opacity: 1 !important;
            }

            /* Chat messages styling */
            .tawk-message {
              border-radius: 10px !important;
              font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
              font-size: 14px !important;
              line-height: 1.5 !important;
            }

            .tawk-message-user {
              background: #0388ff !important;
              color: #ffffff !important;
              border-radius: 10px 10px 4px 10px !important;
              box-shadow: 0 2px 8px rgba(3, 136, 255, 0.1) !important;
            }

            .tawk-message-agent {
              background: #f5f7fa !important;
              color: #003366 !important;
              border-radius: 10px 10px 10px 4px !important;
              box-shadow: 0 2px 8px rgba(0, 52, 102, 0.05) !important;
            }

            .tawk-message-system {
              background: transparent !important;
              color: #7a8fa3 !important;
              font-size: 13px !important;
            }

            /* Input area styling */
            .tawk-input {
              border: 1px solid #d4e4f7 !important;
              border-radius: 10px !important;
              font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
              font-size: 14px !important;
              color: #003366 !important;
              padding: 10px 12px !important;
            }

            .tawk-input:focus {
              border-color: #0388ff !important;
              outline: none !important;
              box-shadow: 0 0 0 3px rgba(3, 136, 255, 0.1) !important;
            }

            .tawk-input::placeholder {
              color: #a8b8c7 !important;
            }

            /* Send button styling */
            .tawk-send-button,
            .tawk-button-send {
              background: #0388ff !important;
              border: none !important;
              border-radius: 8px !important;
              color: #ffffff !important;
              cursor: pointer !important;
              font-weight: 600 !important;
              transition: all 0.2s ease !important;
            }

            .tawk-send-button:hover,
            .tawk-button-send:hover {
              background: #0275dd !important;
              box-shadow: 0 4px 12px rgba(3, 136, 255, 0.2) !important;
            }

            .tawk-send-button:active,
            .tawk-button-send:active {
              background: #0164c4 !important;
            }

            /* Chat content area */
            .tawk-scroll-area {
              background: #ffffff !important;
            }

            .tawk-messages {
              padding: 16px !important;
              gap: 12px !important;
            }

            /* Footer area styling */
            .tawk-footer {
              border-top: 1px solid #e8f0f7 !important;
              background: #f8fafb !important;
              border-radius: 0 0 14px 14px !important;
            }

            /* Links in chat */
            .tawk-link {
              color: #0388ff !important;
              text-decoration: none !important;
              font-weight: 500 !important;
            }

            .tawk-link:hover {
              color: #0275dd !important;
              text-decoration: underline !important;
            }

            /* Typing indicator */
            .tawk-typing-indicator {
              color: #7a8fa3 !important;
            }

            /* Agent online status */
            .tawk-agent-status {
              color: #1db584 !important;
              font-weight: 600 !important;
            }

            /* Smooth transitions */
            .tawk-window,
            .tawk-bubble,
            .tawk-message,
            .tawk-input,
            .tawk-send-button {
              transition: all 0.2s ease-in-out !important;
            }

            /* Mobile responsiveness */
            @media (max-width: 480px) {
              .tawk-window {
                border-radius: 12px !important;
              }

              .tawk-window-header h3 {
                font-size: 15px !important;
              }

              .tawk-message {
                font-size: 13px !important;
              }
            }
          `
        }}
      />
      <Script
        id="tawk-to-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/69215735430d9c1961f493f7/1jal3pauh';
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
