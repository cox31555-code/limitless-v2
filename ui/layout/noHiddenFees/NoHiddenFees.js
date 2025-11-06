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
          No hidden fees
          <span className={styles.titleSpan}>Limitless Cover</span>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={() => setIsInsuranceModalOpen(true)}
            className={styles.getQuoteBtn}
            aria-label="Get a quote"
          >
            Get a quote
          </button>
          <button
            onClick={() => router.push("/login")}
            className={styles.membersPortalBtn}
            aria-label="Members Portal"
          >
            Members Portal
          </button>
        </div>
      </div>
      <div className={styles.imageContainer} />
    </div>
  );
};

export default NoHiddenFees;
