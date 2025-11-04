"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./actions.module.css";

const Actions = ({ insuranceId, insuranceType, onPayClick }) => {
  const router = useRouter();

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

  return (
    <div className={styles.actions}>
      <button className={styles.cancelButton} onClick={handleBack}>
        Back
      </button>
      <button className={styles.payButton} onClick={handlePayment}>
        Continue to payment
      </button>
    </div>
  );
};

export default Actions;
