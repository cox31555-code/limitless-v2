"use client";

import React from "react";
import styles from "./noHiddenFees.module.css";
import { useRouter } from "next/navigation";
import { useInsuranceModal } from "@/contexts/InsuranceModalContext";

const NoHiddenFees = () => {
  const router = useRouter();
  const { setIsInsuranceModalOpen } = useInsuranceModal();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          Need help?
          <span className={styles.titleSpan}>We're here for you</span>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={() => setIsInsuranceModalOpen(true)}
            className={styles.getQuoteBtn}
            aria-label="Get a Quote"
          >
            Get a Quote
          </button>
          <button
            onClick={() => router.push("/login")}
            className={styles.membersPortalBtn}
            aria-label="Customer Login"
          >
            Customer Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoHiddenFees;
