import React, { Suspense } from "react";
import styles from "./page.module.css";
import Form from "./_components/form/Form";
import Header from "@/app/payment-summary/_components/header/Header";

export const metadata = {
  title: "Retrieve Quote | Limitless Cover",
};

const RetrieveQuotePage = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header title="Retrieve Your Quote" />

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

export default RetrieveQuotePage;
