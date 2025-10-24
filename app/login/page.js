import styles from "./page.module.css";
import Image from "next/image";
import Form from "./_components/form/Form";
import { Plus_Jakarta_Sans } from "next/font/google";
import React, { Suspense } from "react";

export const metadata = {
  title: "Log in to Your Portal | Limitless Cover",
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const page = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Secure Login Portal</h1>
        <p>Access your Limitless Cover account</p>
      </div>

      <div className={styles.content}>
        <div className={styles.images}>
        <Image
          src="/svg/squares-2.svg"
          alt="squares"
          width={948}
          height={480}
          className={styles.squares}
          priority
        />
        <Image
          className={styles.image1}
          src={"/svg/login-image.svg"}
          alt="login illustration"
          width={400}
          height={410}
          priority
        />
        <Image
          className={styles.image4}
          src={"/svg/login-mobile.svg"}
          alt="mobile illustration"
          width={293}
          height={389}
          priority
        />
      </div>

      <div className={styles.form}>
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
    </div>
  );
};

export default page;
