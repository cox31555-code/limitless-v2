"use client";

import Header from "./header/Header";
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
      <Header title="Your policy is confirmed" />
      <div className={"centeredContent"}>
        {/* Confirmation Message Section */}
        <div className={styles.confirmationSection}>
          <p className={styles.confirmationSubtitle}>
            Payment processed successfully. Your insurance policy is now active.
          </p>
        </div>

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
