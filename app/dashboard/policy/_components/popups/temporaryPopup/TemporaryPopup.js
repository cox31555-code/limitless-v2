import React from "react";
import TermsAndConditions from "@/ui/insurance-quotes/termsAndConditions/TermsAndConditions";
import styles from "./temporaryPopup.module.css";
import CoverDetails from "@/ui/insurance-quotes/coverDetails/CoverDetails";
import PersonalDetails from "@/ui/insurance-quotes/personalDetails/PersonalDetails";
import VehicleDetails from "@/ui/insurance-quotes/vehicleDetails/VehicleDetails";
import Stepper from "@/ui/insurance-quotes/stepper/Stepper";
const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
          Temporary Insurance
        </h3>
        <Stepper
          steps={[
            {
              img: { src: "/svg/vehicle.svg", width: 82, height: 82 },
              title: "Vehicle",
            },
            {
              img: { src: "/svg/quote.svg", width: 72, height: 72 },
              title: "Quote",
            },
            {
              img: { src: "/svg/payment.svg", width: 72, height: 72 },
              title: "Payment",
            },
          ]}
        />
      </div>
      <div className={styles.wrapper}>
        <VehicleDetails />
        <CoverDetails />
        <PersonalDetails />
        <TermsAndConditions />
      </div>
    </div>
  );
};

export default page;
