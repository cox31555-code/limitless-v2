import React from "react";
import Image from "next/image";
import styles from "./vehicleCovered.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const VehicleCovered = ({ data, hideIcon = false }) => {
  const getVehicleDescription = () => {
    if (!data) return "N/A";
    const parts = [];
    if (data.make) parts.push(data.make);
    if (data.model) parts.push(data.model);
    if (data.year) parts.push(`(${data.year})`);
    if (data.fuel) parts.push(data.fuel);
    if (data.doors) parts.push(`${data.doors} DOOR`);
    return parts.join(" ");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {!hideIcon && (
          <Image
            src={"/svg/vehicle-covered.svg"}
            alt="vehicle-covered"
            width={35}
            height={46}
          />
        )}
        <p className={`${styles.headerTitle} ${plusJakartaSans.className}`}>
          Vehicle to be covered
        </p>
      </div>
      <div className={styles.content}>
        <p className={`${styles.vetype} ${plusJakartaSans.className}`}>
          {getVehicleDescription()}
        </p>
        <div className={styles.vehicleNumber}>
          <span className={styles.inputSpan}> GB</span>
          {data?.registrationNumber || "N/A"}
        </div>
      </div>
    </div>
  );
};

export default VehicleCovered;
