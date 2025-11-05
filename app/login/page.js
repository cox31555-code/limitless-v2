import React, { Suspense } from "react";
import styles from "./page.module.css";
import Form from "./_components/form/Form";
import GetQuoteHeaderWithNav from "@/ui/getQuote/GetQuoteHeaderWithNav";
import GetQuoteFooterBanner from "@/ui/layout/getQuoteFooterBanner/GetQuoteFooterBanner";

export const metadata = {
  title: "Login | Limitless Cover",
};

const LoginPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <GetQuoteHeaderWithNav title="Manage Your Coverage" description="Access your policy, claims, and documents anytime" />
      <div className={styles.mainContent}>
        <div className={styles.formContainer}>
          <Suspense
            fallback={
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px", color: "#666" }}>
                Loading...
              </div>
            }
          >
            <Form />
          </Suspense>
        </div>
      </div>
      <GetQuoteFooterBanner />
    </div>
  );
};

export default LoginPage;
