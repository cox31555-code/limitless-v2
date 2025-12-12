"use client";
import React, { useState } from "react";
import CourierLoadingOverlay from "./_components/CourierLoadingOverlay";
import styles from "./page.module.css";

const CourierPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.container}>
      <CourierLoadingOverlay isVisible={isLoading} />

      <div className={styles.content}>
        <h1>Courier Insurance</h1>
        <p>Coming soon...</p>
      </div>
    </div>
  );
};

export default CourierPage;
