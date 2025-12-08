"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import GetQuotePageHeader from "@/app/annual/get-quote/_components/GetQuotePageHeader";
import PolicyDetailsReview from "./PolicyDetailsReview";
import QuoteHeader from "./quoteHeader/QuoteHeader";
import PaymentOptions from "./paymentOptions/PaymentOptions";
import Actions from "./actions/Actions";
import styles from "../page.module.css";
import heroStyles from "./paymentSummaryHero.module.css";

const PaymentIframe = dynamic(() => import("./PaymentIframe"), { ssr: false });

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
        <div className={heroStyles.heroBackground}>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="106.238px" height="176.262px" viewBox="0 0 106.238 140.262" className={heroStyles.heroBackgroundImage}>
            <style>{`.st0{fill:#FFFFFF;}.st1{fill:#05AFFF;}.st2{fill:#0A0913;}`}</style>
            <path className="st1" d="M86.515,75.233L44.398,94.136v25.204l-4.194-4.194l-13.187-13.187l-7.276-7.276l24.658-11.08l17.44-7.823l35.953-16.152c9.13-4.116,11.334-16.094,4.253-23.175L70.012,4.419C60.57-5.023,44.398,1.669,44.398,15.012v20.171L0.115,55.081v19.098l17.44-7.823l39.484-17.713l4.916-2.204V27.302l-0.117,0.058v-6.457l24.677,24.677l-10.944,4.916l0.02,0.039l-46.682,21.01l-0.039-0.078L8.464,80.636c-0.351,0.156-0.683,0.312-0.995,0.488c-4.253,2.302-6.808,6.399-7.354,10.768c-0.527,4.175,0.741,8.583,4.077,11.919l32.051,32.032c9.442,9.442,25.594,2.751,25.594-10.612v-19.82l24.677-11.08l19.722-8.837V66.357L86.515,75.233z"/>
          </svg>
        </div>
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
            <PolicyDetailsReview insuranceData={insuranceData} />
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
