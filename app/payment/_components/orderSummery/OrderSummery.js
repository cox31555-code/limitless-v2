"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./orderSummery.module.css";

const OrderSummery = ({ data, vehicleDetails, carUsage }) => {
  const router = useRouter();
  const formatCurrency = (amount) => {
    return `£${amount?.toFixed(2) || "0.00"}`;
  };

  const getInsuranceTitle = () => {
    const regNumber = vehicleDetails?.registrationNumber || "N/A";
    const insuranceType = data?.insuranceType || "Temporary";
    return `${insuranceType} insurance / ${regNumber}`;
  };

  const priceBreakdown = useMemo(() => {
    const totalPrice = data?.priceAmount || 0;
    const vat = totalPrice * 0.2;
    const basePrice = totalPrice * 0.8;
    const discount = data?.price?.fee || 0;

    return {
      basePrice,
      vat,
      discount,
      total: totalPrice,
    };
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Order Summary</h3>
        <div className={styles.orderRef}>
          <span className={styles.orderRefLabel}>Order Reference</span>
          <span className={styles.orderRefValue}>{data?.orderRef || "N/A"}</span>
        </div>
      </div>

      <div className={styles.itemsList}>
        <div className={styles.itemRow}>
          <span className={styles.itemLabel}>{getInsuranceTitle()}</span>
          <span className={styles.itemValue}>{formatCurrency(priceBreakdown.basePrice)}</span>
        </div>
        <div className={styles.itemRow}>
          <span className={styles.itemLabel}>VAT (20%)</span>
          <span className={styles.itemValue}>{formatCurrency(priceBreakdown.vat)}</span>
        </div>
        {priceBreakdown.discount > 0 && (
          <div className={styles.itemRow}>
            <span className={styles.itemLabel}>Discount</span>
            <span className={styles.itemValue}>-{formatCurrency(priceBreakdown.discount)}</span>
          </div>
        )}
      </div>

      <div className={styles.totalSection}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalValue}>{formatCurrency(priceBreakdown.total)}</span>
      </div>

      <button
        className={styles.dashboardButton}
        onClick={() => router.push('/dashboard')}
      >
        Go to Dashboard
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className={styles.infoSection}>
        <div className={styles.infoBox}>
          <p className={styles.infoTitle}>Email Confirmation</p>
          <p className={styles.infoText}>A confirmation email with your policy details has been sent to your inbox.</p>
          <p className={styles.infoText}>You will also receive a special login link via email to access your customer dashboard.</p>
        </div>
        <div className={styles.voluntarySection}>
          <span className={styles.voluntaryLabel}>Voluntary Excess</span>
          <span className={styles.voluntaryValue}>{carUsage?.voluntaryExcess || "N/A"}</span>
        </div>
      </div>

      <div className={styles.supportSection}>
        <p className={styles.supportText}>Questions? <Link href="https://www.limitlesscover.co.uk/contact" target="_blank" rel="noopener noreferrer">Contact support</Link></p>
      </div>
    </div>
  );
};

export default OrderSummery;
