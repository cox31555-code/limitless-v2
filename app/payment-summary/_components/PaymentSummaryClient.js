"use client";

import { useState } from "react";
import Header from "./header/Header";
import PersonalDetails from "./personalDetails/PersonalDetails";
import CoverDetails from "./coverDetails/CoverDetails";
import VehicleDetails from "./vehicleDetails/VehicleDetails";
import QuoteHeader from "./quoteHeader/QuoteHeader";
import PaymentOptions from "./paymentOptions/PaymentOptions";
import Actions from "./actions/Actions";
import PaymentIframe from "./PaymentIframe";
import styles from "../page.module.css";

export default function PaymentSummaryClient({ insuranceData, id }) {
  const [showIframe, setShowIframe] = useState(false);

  const handlePayClick = () => {
    setShowIframe(true);
  };

  const handleCloseIframe = () => {
    setShowIframe(false);
  };

  return (
    <div>
      <Header title="Here's Your Insurance Quote" subtitle="Review your quote and confirm your cover" />
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
              priceAmount={insuranceData.quote?.priceAmount || "49.99"}
              userName={insuranceData.userDetails?.firstName || "there"}
              insuranceType={insuranceData.type === "Temp" ? "Temporary Insurance" : insuranceData.type === "Impound" ? "Impound Insurance" : "Annual Insurance"}
            />
            <PaymentOptions monthlyPrice={47.40} annualPrice={525.65} />
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
