import styles from "./page.module.css";
import Form from "./_components/form/Form";
import React, { Suspense } from "react";

export const metadata = {
  title: "Login | Limitless Cover",
};

const page = () => {
  return (
    <div className={styles.page}>
      <div className={styles.leftSection}>
        <div className={styles.logoBox}>
          <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="150" height="150" rx="20" fill="#0388FF"/>
            <path d="M45 45L75 60L105 45M45 105V45L75 60V120L45 105Z" fill="white" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M105 105V45L75 60V120L105 105Z" fill="white" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className={styles.rightSection}>
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
  );
};

export default page;
