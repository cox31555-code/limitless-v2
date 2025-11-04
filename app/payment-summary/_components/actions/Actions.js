"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./actions.module.css";

const Actions = ({ insuranceId, insuranceType, onPayClick }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePayment = () => {
    // Show iframe if onPayClick callback is provided
    if (onPayClick) {
      onPayClick();
    }
  };

  const handleBack = () => {
    let backRoute = "/temporary/get-quote?step=4";

    if (insuranceType === "Annual") {
      backRoute = "/annual/get-quote?step=4";
    } else if (insuranceType === "Impound") {
      backRoute = "/impound/get-quote?step=4";
    } else if (insuranceType === "Temp") {
      backRoute = "/temporary/get-quote?step=4";
    }

    router.push(backRoute);
  };

  // Render buttons in different order based on mounting state to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={styles.actions}>
        <button className={styles.cancelButton} onClick={handleBack}>
          Back
        </button>
        <button className={styles.payButton} onClick={handlePayment}>
          Proceed to payment
        </button>
      </div>
    );
  }

  return (
    <div className={styles.actions}>
      <button className={styles.payButton} onClick={handlePayment}>
        Proceed to payment
      </button>
      <button className={styles.cancelButton} onClick={handleBack}>
        Back
      </button>
    </div>
  );
};

export default Actions;
