"use client";

"use client";

import { useState } from "react";
import Header from "./header/Header";
import PersonalDetails from "./personalDetails/PersonalDetails";
import CoverDetails from "./coverDetails/CoverDetails";
import VehicleDetails from "./vehicleDetails/VehicleDetails";
import CoverLevel from "./coverLevel/CoverLevel";
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
            <CoverLevel
              data={insuranceData.quote}
              insuranceType={insuranceData.type}
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
