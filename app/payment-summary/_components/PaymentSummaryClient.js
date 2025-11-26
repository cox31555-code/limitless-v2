"use client";

import { useState } from "react";
import GetQuotePageHeader from "@/app/annual/get-quote/_components/GetQuotePageHeader";
import PersonalDetails from "./personalDetails/PersonalDetails";
import CoverDetails from "./coverDetails/CoverDetails";
import VehicleDetails from "./vehicleDetails/VehicleDetails";
import QuoteHeader from "./quoteHeader/QuoteHeader";
import PaymentOptions from "./paymentOptions/PaymentOptions";
import Actions from "./actions/Actions";
import PaymentIframe from "./PaymentIframe";
import styles from "../page.module.css";
import heroStyles from "./paymentSummaryHero.module.css";

export default function PaymentSummaryClient({ insuranceData, id }) {
  const [showIframe, setShowIframe] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("annual");

  const handlePayClick = () => {
    setShowIframe(true);
  };

  const handleCloseIframe = () => {
    setShowIframe(false);
  };

  const monthlyPrice = 47.40;
  const annualPrice = 525.65;
  const displayPrice = selectedPayment === "monthly" ? monthlyPrice : annualPrice;
  const displayLabel = selectedPayment === "monthly" ? "/month" : "/year";

  const insuranceTypeLabel = insuranceData.type === "Temp" ? "Temporary" : insuranceData.type === "Impound" ? "Impound" : "Annual";

  return (
    <div>
      <GetQuotePageHeader />
      <section className={heroStyles.heroSection}>
        <div className={heroStyles.heroContent}>
          <div className={heroStyles.mainInfo}>
            <h1 className={heroStyles.title}>{insuranceTypeLabel} Car Insurance Quote</h1>
            <div className={heroStyles.stepInfo}>
              <span className={heroStyles.stepBadge}>Your Quote</span>
              <span className={heroStyles.separator}>•</span>
              <span className={heroStyles.stepName}>Review and confirm your cover</span>
            </div>
          </div>

          <div className={heroStyles.trustInfo}>
            <div className={heroStyles.trustItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Secure & encrypted</span>
            </div>
            <div className={heroStyles.trustItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Instant cover</span>
            </div>
          </div>
        </div>
      </section>
      <div className={"centeredContent"}>
        <div className={styles.container}>
          <div className={styles.first}>
            <VehicleDetails
              data={insuranceData.vehicleDetails}
              carUsage={insuranceData.carUsage}
              insuranceType={insuranceData.type}
            />
            <CoverDetails data={insuranceData.coverDetails} insuranceType={insuranceData.type} />
            <PersonalDetails
              data={insuranceData.userDetails}
              carUsage={insuranceData.carUsage}
              insuranceType={insuranceData.type}
              optionalExtras={insuranceData.optionalExtras}
            />
          </div>
          <div className={styles.second}>
            <QuoteHeader
              priceAmount={displayPrice.toFixed(2)}
              priceLabel={displayLabel}
              userName={insuranceData.userDetails?.firstName || "there"}
              insuranceType={insuranceData.type === "Temp" ? "Temporary Insurance" : insuranceData.type === "Impound" ? "Impound Insurance" : "Annual Insurance"}
              quoteRef={insuranceData.quote?.quoteRef || "N/A"}
            />
            <PaymentOptions
              monthlyPrice={monthlyPrice}
              annualPrice={annualPrice}
              defaultPayment="annual"
              selectedPayment={selectedPayment}
              onPaymentChange={setSelectedPayment}
            />
            <Actions insuranceId={id} insuranceType={insuranceData.type} onPayClick={handlePayClick} />
          </div>
        </div>
      </div>

      {/* Payment iframe - shown when Pay button is clicked */}
      <PaymentIframe
        insuranceId={id}
        show={showIframe}
        onClose={handleCloseIframe}
      />
    </div>
  );
}
