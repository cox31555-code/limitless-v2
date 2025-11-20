import React from "react";
import styles from "./carUsage.module.css";
import SelectedItem2 from "../selectedItem2/SelectedItem2";
import { Plus_Jakarta_Sans } from "next/font/google";
import InputWithData2 from "@/ui/inputs/InputWithData2/InputWithData2";
import { carUsageOptions } from "@/app/temporary/get-quote/data";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const CarUsage = ({ carUsage }) => {

  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
          What do you use the car for?
        </h3>
        <SelectedItem2
          option={{
            title: carUsage?.usageType,
            description:
              carUsageOptions.find((item) => item.title == carUsage?.usageType)
                ?.description || "N/A",
          }}
        />
      </div>
      <div className={styles.second}>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "License Type",
              value: carUsage?.licenseType || "",
            }}
          />
          <InputWithData2
            item={{
              label: "License Held",
              value: carUsage?.licenseHeld || "",
            }}
          />
          <InputWithData2
            item={{
              label: "License No. (Optional)",
              value: carUsage?.licenseNumber || "",
            }}
          />
        </div>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "No Claims Bonus (NCB) Years",
              value: carUsage?.NCB || "",
            }}
          />
          <InputWithData2
            item={{
              label: "Voluntary Excess",
              value: carUsage?.voluntaryExcess || "",
            }}
          />
        </div>
      </div>
      <div className={styles.third}>
        <InputWithData2
          item={{
            label:
              "Do you have any unspent or outstanding criminal convictions?",
            value: carUsage?.criminalConvictions ? "Yes" : "No" || "N/A",
          }}
        />
        <InputWithData2
          item={{
            label:
              "Do you have any medical conditions that are notifible to the DVLA?",
            value: carUsage?.medicalConditions ? "Yes" : "No" || "N/A",
          }}
        />
        {carUsage?.medicalConditions && (
          <InputWithData2
            item={{
              label: "DVLA Condition Status",
              value: carUsage?.dvlaConditionType || "N/A",
            }}
          />
        )}
        <InputWithData2
          item={{
            label:
              "Have you ever had insurance cancelled, a claim refused, a policy voided, or any special terms imposed? Unspent or outstanding criminal convictions?",
            value: carUsage?.insuranceCancelledOrClaimRefusedOrPolicyVoided
              ? "Yes"
              : "No" || "N/A",
          }}
        />
      </div>
    </div>
  );
};

export default CarUsage;
