import React, { Suspense } from "react";
import styles from "./page.module.css";
import Form from "./_components/form/Form";

export const metadata = {
  title: "Login | Limitless Cover",
};

const LoginPage = () => {
  return (
    <div className={styles.pageWrapper}>
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

export default LoginPage;
