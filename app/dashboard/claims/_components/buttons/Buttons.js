"use client";
import React from "react";
import styles from "./buttons.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Buttons = () => {
  const router = useRouter();

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this claim? This action cannot be undone.")) {
      router.push("/dashboard/claims");
    }
  };

  return (
    <div className={styles.buttons}>
      <Link href="/dashboard/claims" className={styles.backButton}>
        ← Back to Claims
      </Link>
      <button className={styles.cancelButton} onClick={handleCancel}>
        Cancel Claim
      </button>
    </div>
  );
};

export default Buttons;
