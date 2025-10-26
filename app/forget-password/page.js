import styles from "./page.module.css";
import Image from "next/image";
import Form from "./_components/form/Form";
import { Plus_Jakarta_Sans } from "next/font/google";
import React, { Suspense } from "react";

export const metadata = {
  title: "Forgot Password | Limitless Cover",
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const page = () => {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.titleSection}>
          <h1>Reset Password</h1>
          <p>Enter your email to receive a password reset link</p>
        </div>

        <div className={styles.formAndImages}>
          <div className={styles.images}>
            <Image
              src="/svg/squares-2.svg"
              alt="squares"
              width={1100}
              height={700}
              className={styles.squares}
              priority
            />
            <Image
              className={styles.image1}
              src={"/svg/login-image.svg"}
              alt="reset password illustration"
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
    </div>
  );
};

export default page;
