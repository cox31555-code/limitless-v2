import React, { Suspense } from "react";
import styles from "./page.module.css";
import Form from "./_components/form/Form";
import Header from "@/app/payment-summary/_components/header/Header";
import GetQuoteFooterBanner from "@/ui/layout/getQuoteFooterBanner/GetQuoteFooterBanner";

export const metadata = {
  title: "Login | Limitless Cover",
};

const LoginPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header title="Login to Your Account" />
      
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
