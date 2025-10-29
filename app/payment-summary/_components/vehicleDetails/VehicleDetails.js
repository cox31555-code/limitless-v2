import React from "react";
import styles from "./vehicleDetails.module.css";
import VehicleCovered from "@/app/payment/_components/vehicleCovered/VehicleCovered";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import Duration from "@/app/payment/_components/duration/Duration";

const VehicleDetails = ({ data, carUsage }) => {
  return (
    <ComponentWrapper title="Vehicle Details" icon={{ width: 62, height: 62 }} isPaymentPage={true}>
      <div className={styles.content}>
        <VehicleCovered data={data} hideIcon={true} />
        <div className={styles.cards}>
          {[
            {
              title: "Vehicle Type",
              value: `${data?.type || "N/A"}`,
            },
            // {
            //   title: "Vehicle Worth",
            //   value: `${data?.worth || "N/A"}`,
            // },
            {
              title: "voluntary excess",
              value: `${carUsage?.voluntaryExcess || "N/A"}`,
            },
          ].map((item, index) => (
            <Duration
              key={index}
              title={item.title}
              value={item.value}
              // editIcon={true}
            />
          ))}
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default VehicleDetails;
