"use client";

import React from "react";
import { useWatch } from "react-hook-form";
import styles from "./reviewQuote.module.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const ReviewQuote = ({ form, insuranceType = "Temp" }) => {
  const vehicleDetails = useWatch({
    control: form.control,
    name: "vehicleDetails",
  });
  const coverDetails = useWatch({
    control: form.control,
    name: "coverDetails",
  });
  const userDetails = useWatch({
    control: form.control,
    name: "userDetails",
  });
  const carUsage = useWatch({
    control: form.control,
    name: "carUsage",
  });

  const getInsuranceTypeName = () => {
    if (insuranceType === "Temp") return "Temporary Insurance";
    if (insuranceType === "Impound") return "Impound Insurance";
    return insuranceType;
  };

  const features =
    insuranceType === "Temp"
      ? [
          "Instant documents",
          "Uninsured driver promise",
          "European cover",
          "Protected no claims",
          "Loss, theft, fire or vandalism cover",
          "Legal liability cover",
        ]
      : [
          "Instant documents",
          "Uninsured driver promise",
          "Protected no claims",
          "Loss, theft, fire or vandalism cover",
          "Legal liability cover",
          "Impound Release",
        ];

  return (
    <div className={styles.reviewContainer}>
      <h2 className={styles.reviewTitle}>Review Your Quote</h2>

      <div className={styles.reviewSections}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Vehicle Details</h3>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Registration</label>
                <p>{vehicleDetails?.registrationNumber || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>Make & Model</label>
                <p>
                  {vehicleDetails?.make || "N/A"} {vehicleDetails?.model || ""}
                </p>
              </div>
              <div className={styles.field}>
                <label>Year</label>
                <p>{vehicleDetails?.year || "N/A"}</p>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Type</label>
                <p>{vehicleDetails?.type || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>Fuel</label>
                <p>{vehicleDetails?.fuel || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>Colour</label>
                <p>{vehicleDetails?.colour || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Cover Details</h3>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Duration</label>
                <p>
                  {coverDetails?.period || "N/A"} {coverDetails?.type || ""}
                </p>
              </div>
              <div className={styles.field}>
                <label>Start Date</label>
                <p>{coverDetails?.startDate || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>Start Time</label>
                <p>{coverDetails?.startTime || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Personal Details</h3>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>First Name</label>
                <p>{userDetails?.firstName || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>Last Name</label>
                <p>{userDetails?.surname || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>Email</label>
                <p>{userDetails?.email || "N/A"}</p>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Phone</label>
                <p>{userDetails?.phone || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>Date of Birth</label>
                <p>{userDetails?.dateOfBirth || "N/A"}</p>
              </div>
              <div className={styles.field}>
                <label>Address</label>
                <p>{userDetails?.address || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReviewQuote;
