"use client";

import Image from "next/image";
import OrderSummery from "./orderSummery/OrderSummery";
import VehicleDetails from "@/app/payment-summary/_components/vehicleDetails/VehicleDetails";
import CoverDetails from "@/app/payment-summary/_components/coverDetails/CoverDetails";
import PersonalDetails from "@/app/payment-summary/_components/personalDetails/PersonalDetails";
import CoverLevel from "@/app/payment-summary/_components/coverLevel/CoverLevel";
import styles from "../page.module.css";
import paymentSummaryStyles from "@/app/payment-summary/page.module.css";
import { redirect } from "next/navigation";

export default function PaymentConfirmationClient({ insuranceData }) {
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
                  src="/svg/logo.svg"
                  alt="logo"
                  width={66}
                  height={66}
                  className={styles.logo}
                />
              </div>
              <menu className={styles.menu} suppressHydrationWarning>
                <li className={styles.menuItem}>
                  <span className={styles.menuLink}>Car & Van</span>
                </li>
                <li className={styles.menuItem}>
                  <span className={styles.menuLink}>Motorbike</span>
                </li>
                <li className={styles.menuItem}>
                  <span className={styles.menuLink}>Impound</span>
                </li>
                <li className={styles.menuItem}>
                  <span className={styles.menuLink}>Courier</span>
                </li>
                <li className={styles.menuItem}>
                  <span className={styles.menuLink}>Contact</span>
                </li>
              </menu>
              <div className={styles.buttons}>
                <button className={styles.loginBtn}>Login</button>
                <button className={styles.quoteBtn}>Get a Quote</button>
              </div>
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

        {/* Details Grid */}
        <div className={styles.detailsContainer}>
          <div className={styles.detailsGrid}>
            <VehicleDetails
              data={insuranceData.vehicleDetails}
              carUsage={insuranceData.carUsage}
            />
            <CoverDetails data={insuranceData.coverDetails} />
            <PersonalDetails
              data={insuranceData.userDetails}
              carUsage={insuranceData.carUsage}
            />
          </div>
        </div>

        {/* Footer Message */}
        <div className={styles.footerMessage}>
          <p>A confirmation email has been sent to your inbox with all policy details.</p>
        </div>
      </div>
    </div>
  );
}
