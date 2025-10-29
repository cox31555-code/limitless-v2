"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./actions.module.css";

const Actions = ({ insuranceId, onPayClick }) => {
  const router = useRouter();

  const handlePayment = () => {
    // Show iframe if onPayClick callback is provided
    if (onPayClick) {
      onPayClick();
    }
  };

  const handleBack = () => {
    router.push("/temporary/get-quote?step=3");
  };

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
};

export default Actions;
