import styles from "./page.module.css";
import Form from "./_components/form/Form";
import React, { Suspense } from "react";

export const metadata = {
  title: "Login | Limitless Cover",
};

const LoginPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.darkBackground} />
      
      <div className={styles.mainContainer}>
        <div className={styles.leftSection}>
          <div className={styles.gradientOverlay} />
          <svg
            className={styles.logo}
            width="180"
            height="185"
            viewBox="0 0 180 185"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Limitless Cover Logo"
          >
            <rect width="180" height="185" rx="21.1893" fill="#0388FF" />
            <path
              d="M118.292 96.5994L82.6119 112.637L82.6119 134.02L79.0589 130.462L67.8873 119.274L61.7233 113.101L82.6128 103.701L97.3874 97.0635L127.846 83.3599C135.58 79.8678 137.447 69.7056 131.449 63.698L104.311 36.5199C96.3123 28.5092 82.6119 34.186 82.6119 45.5072V62.6205L45.0967 79.5022V95.7052L59.8714 89.068L93.321 74.0401L97.4857 72.1702V55.9341L97.3866 55.9834V50.5052L118.292 71.4414L109.021 75.6122L109.038 75.6453L69.4901 93.4704L69.4571 93.4043L52.1706 101.183C51.8732 101.316 51.592 101.448 51.3277 101.597C47.7247 103.55 45.5601 107.026 45.0976 110.733C44.6511 114.275 45.7253 118.015 48.5515 120.845L75.7041 148.022C83.7031 156.032 97.3866 150.356 97.3866 139.018V122.203L118.292 112.802L135 105.305V89.0689L118.292 96.5994Z"
              fill="#FEFEFE"
            />
          </svg>
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
    </div>
  );
};

export default LoginPage;
