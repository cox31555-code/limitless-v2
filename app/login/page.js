import styles from "./page.module.css";
import Image from "next/image";
import Form from "./_components/form/Form";
import React, { Suspense } from "react";

export const metadata = {
  title: "Login | Limitless Cover",
};

const page = () => {
  return (
    <div className={styles.page}>
      <div className={styles.leftSection}>
        <div className={styles.logoContainer}>
          <Image
            src="/svg/logo.svg"
            alt="Limitless Cover Logo"
            width={150}
            height={150}
            className={styles.logo}
            priority
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "200px",
                color: "#666",
              }}
            >
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
