import React, { Suspense } from "react";
import styles from "./page.module.css";
import Form from "./_components/form/Form";
import GetQuoteHeaderWithNav from "@/ui/getQuote/GetQuoteHeaderWithNav";

export const metadata = {
  title: "Change Password | Limitless Cover",
};

const ChangePasswordPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <GetQuoteHeaderWithNav title="Change Your Password" subtitle="Update your account password securely" />
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
    </div>
  );
};

export default ChangePasswordPage;
