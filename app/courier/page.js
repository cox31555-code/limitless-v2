"use client";
import React, { useState } from "react";
import LoadingOverlay from "@/ui/loadingSpinner/LoadingOverlay";
import styles from "./page.module.css";

const CourierPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.container}>
      <LoadingOverlay isVisible={isLoading} />

      <div className={styles.content}>
        <h1>Courier Insurance</h1>
        <p>Coming soon...</p>
      </div>
    </div>
  );
};

export default CourierPage;
