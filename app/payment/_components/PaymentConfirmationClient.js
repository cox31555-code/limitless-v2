"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import OrderSummery from "./orderSummery/OrderSummery";
import CoverLevel from "./coverLevel/CoverLevel";
import PolicyOverview from "./policyOverview/PolicyOverview";
import styles from "../page.module.css";
import { redirect } from "next/navigation";

export default function PaymentConfirmationClient({ insuranceData }) {
  const router = useRouter();
  const { quote } = insuranceData;
  console.log("quote", quote);
  console.log(`/payment-summary?id=${insuranceData?._id}`);
  if (quote.paid === false || !quote.sumupData) {
    redirect(`/payment-summary?id=${insuranceData?._id}`);
  }

  return (
    <div>
      <div className={styles.headerContainer}>
        <header className={styles.headerElement}>
          <div className={styles.headerContent}>
            <div className={styles.navigationBar}>
              <div className={styles.logoContainer}>
                <Image
                  onClick={() => router.push("/")}
                  src="/svg/logo.svg"
                  alt="logo"
                  width={66}
                  height={66}
                  className={styles.logo}
                />
              </div>

              <button className={styles.helpBtn} title="Get help">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                  <path d="M12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 12 11 11.75 11 15H13C13 12.75 16 12.5 16 10C16 7.79 14.21 6 12 6Z" fill="currentColor"/>
                  <circle cx="12" cy="18" r="1" fill="currentColor"/>
                </svg>
              </button>
            </div>

            <div className={styles.confirmationTitleSection}>
              <div className={styles.confirmationContent}>
                <div className={styles.confirmationBadge}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Order Confirmed</span>
                </div>

                <h1 className={styles.confirmationTitle}>Your policy is confirmed</h1>

                <p className={styles.confirmationSubtitle}>
                  Payment processed successfully. Your insurance policy is now active.
                </p>
              </div>
            </div>
          </div>
        </header>
      </div>

      <div className={"centeredContent"}>

        {/* Order Summary and Cover Level */}
        <div className={styles.summaryRow}>
          <div className={styles.summaryBlock}>
            <OrderSummery
              data={insuranceData.quote}
              vehicleDetails={insuranceData.vehicleDetails}
              carUsage={insuranceData.carUsage}
            />
          </div>
          <div className={styles.summaryBlock}>
            <CoverLevel
              data={insuranceData.quote}
              insuranceType={insuranceData.type}
            />
          </div>
        </div>

        {/* Policy Overview Container */}
        <div className={styles.policyOverviewWrapper}>
          <PolicyOverview
            vehicleDetails={insuranceData.vehicleDetails}
            coverDetails={insuranceData.coverDetails}
            userDetails={insuranceData.userDetails}
            carUsage={insuranceData.carUsage}
          />
        </div>
      </div>
    </div>
  );
}
