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

      <div className={styles.rightToCancel}>
        <h3 className={styles.rightToCancelTitle}>Right to Cancel</h3>
        <p className={styles.rightToCancelText}>
          If you cancel before your policy starts no charges will be made. If you cancel within <strong>14 days</strong> of purchasing your policy (the cooling off period) - we'll refund any money you've paid minus a charge for the number of days you've had cover. A refund will still be paid if you've made a claim. You won't have to pay cancellation fee.
        </p>
        <p className={styles.rightToCancelText}>
          If you cancel after 14 days of purchasing your policy, we'll refund any money you've paid minus a charge for the number of days you've had cover and a cancellation charge of <strong>£40</strong>. A refund will not be paid if you've made a claim.
        </p>
      </div>

      <div className={styles.autoRenewal}>
        <h3 className={styles.autoRenewalTitle}>Auto-renewal makes things a little easier...</h3>
        <div className={styles.autoRenewalList}>
          <div className={styles.autoRenewalItem}>
            <span className={styles.checkmark}>✓</span>
            <div>
              <strong>Continuous cover for peace of mind:</strong>
              <span className={styles.autoRenewalDescription}> Save time, stay covered</span>
            </div>
          </div>
          <div className={styles.autoRenewalItem}>
            <span className={styles.checkmark}>✓</span>
            <div>
              <strong>Control:</strong>
              <span className={styles.autoRenewalDescription}> We'll check you're happy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actions;
