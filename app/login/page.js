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
        <div className={styles.gradientOverlay}></div>
        <svg className={styles.logo} width="228" height="234" viewBox="0 0 228 234" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="228" height="234" rx="21.1893" fill="#0388FF"/>
          <path d="M150.908 125.211L103.731 146.37V174.582L99.0334 169.887L84.2621 155.127L76.1119 146.982L103.732 134.58L123.268 125.823L163.54 107.744C173.767 103.137 176.236 89.7294 168.304 81.8034L132.423 45.9467C121.846 35.378 103.731 42.8674 103.731 57.8038V80.3819L54.1279 102.654V124.031L73.6633 115.275L117.891 95.4481L123.398 92.9811V71.5604L123.267 71.6253V64.3978L150.908 92.0196L138.65 97.5222L138.672 97.5659L86.3814 121.083L86.3377 120.996L63.4811 131.259C63.088 131.434 62.7161 131.608 62.3666 131.805C57.6026 134.382 54.7406 138.968 54.129 143.858C53.5387 148.531 54.9591 153.465 58.6959 157.2L94.5977 193.054C105.174 203.623 123.267 196.133 123.267 181.176V158.99L150.908 146.588L173 136.697V115.276L150.908 125.211Z" fill="#FEFEFE"/>
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
  );
};

export default page;
