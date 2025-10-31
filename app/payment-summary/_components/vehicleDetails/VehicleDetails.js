import React from "react";
import styles from "./vehicleDetails.module.css";
import VehicleCovered from "@/app/payment/_components/vehicleCovered/VehicleCovered";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import Duration from "@/app/payment/_components/duration/Duration";
import InputWithData2 from "@/ui/inputs/InputWithData2/InputWithData2";

const VehicleDetails = ({ data, carUsage }) => {
  return (
    <ComponentWrapper title="Vehicle Details" icon={{ width: 62, height: 62 }} isPaymentPage={true}>
      <div className={styles.content}>
        <VehicleCovered data={data} hideIcon={true} />
        <div className={styles.vehicleInfoSection}>
          <div className={styles.row}>
            <InputWithData2
              item={{
                label: "Vehicle Type",
                value: data?.type || "N/A",
              }}
            />
            <InputWithData2
              item={{
                label: "Fuel Type",
                value: data?.fuel || "N/A",
              }}
            />
            <InputWithData2
              item={{
                label: "Colour",
                value: data?.colour || "N/A",
              }}
            />
          </div>
          <div className={styles.row}>
            <InputWithData2
              item={{
                label: "Transmission",
                value: data?.transmission || "N/A",
              }}
            />
            <InputWithData2
              item={{
                label: "Doors",
                value: data?.doors || "N/A",
              }}
            />
            <InputWithData2
              item={{
                label: "Voluntary Excess",
                value: carUsage?.voluntaryExcess || "N/A",
              }}
            />
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default VehicleDetails;
