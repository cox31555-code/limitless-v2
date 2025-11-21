"use client";

import React from "react";
import { useWatch } from "react-hook-form";
import styles from "./reviewQuote.module.css";

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
  const optionalExtras = useWatch({
    control: form.control,
    name: "optionalExtras",
  });

  const formatValue = (value) => {
    if (value === null || value === undefined || value === "") return "N/A";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (Array.isArray(value)) return value.length > 0 ? value.join(", ") : "N/A";
    return value;
  };

  const calculateEndDate = () => {
    if (!coverDetails?.startDate) return null;

    const startDate = new Date(coverDetails.startDate);
    let endDate = new Date(startDate);

    if (insuranceType === "Annual") {
      // Add 1 year for annual insurance
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      // For temporary/impound, calculate based on duration
      const period = coverDetails.period || 0;
      switch (coverDetails.type) {
        case "Hours":
          endDate.setHours(endDate.getHours() + period);
          break;
        case "Days":
          endDate.setDate(endDate.getDate() + period);
          break;
        case "Weeks":
          endDate.setDate(endDate.getDate() + period * 7);
          break;
        case "Months":
          endDate.setMonth(endDate.getMonth() + period);
          break;
        case "Years":
          endDate.setFullYear(endDate.getFullYear() + period);
          break;
      }
    }

    return endDate.toISOString().split('T')[0];
  };

  const getEndTime = () => {
    if (!coverDetails?.startDate || !coverDetails?.startTime) return null;

    const startDate = new Date(`${coverDetails.startDate}T${coverDetails.startTime}`);
    let endDate = new Date(startDate);

    if (insuranceType === "Annual") {
      // Add 1 year for annual insurance
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      // For temporary/impound, calculate based on duration
      const period = coverDetails.period || 0;
      switch (coverDetails.type) {
        case "Hours":
          endDate.setHours(endDate.getHours() + period);
          break;
        case "Days":
          endDate.setDate(endDate.getDate() + period);
          break;
        case "Weeks":
          endDate.setDate(endDate.getDate() + period * 7);
          break;
        case "Months":
          endDate.setMonth(endDate.getMonth() + period);
          break;
        case "Years":
          endDate.setFullYear(endDate.getFullYear() + period);
          break;
      }
    }

    return endDate.toTimeString().slice(0, 5);
  };

  const renderField = (label, value) => (
    <div className={styles.field}>
      <label>{label}</label>
      <p>{formatValue(value)}</p>
    </div>
  );

  return (
    <div className={styles.reviewContainer}>
      <h2 className={styles.reviewTitle}>Review Your Quote</h2>

      <div className={styles.reviewSections}>
        {/* VEHICLE DETAILS SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Vehicle Details</h3>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              {renderField("Registration", vehicleDetails?.registrationNumber)}
              {renderField("Make", vehicleDetails?.make)}
              {renderField("Model", vehicleDetails?.model)}
            </div>
            <div className={styles.row}>
              {renderField("Year", vehicleDetails?.year)}
              {renderField("Type", vehicleDetails?.type)}
              {renderField("Colour", vehicleDetails?.colour)}
            </div>
            <div className={styles.row}>
              {renderField("Fuel Type", vehicleDetails?.fuel)}
              {renderField("Transmission", vehicleDetails?.transmission)}
              {renderField("Doors", vehicleDetails?.doors)}
            </div>
            {vehicleDetails?.worth && (
              <div className={styles.row}>
                {renderField("Value", vehicleDetails?.worth)}
              </div>
            )}

            {/* ANNUAL-SPECIFIC VEHICLE FIELDS */}
            {insuranceType === "Annual" && (
              <>
                <div className={styles.row}>
                  {renderField("Tracking Device", vehicleDetails?.trackingDevice)}
                  {renderField("Alarm/Immobiliser", vehicleDetails?.alarmImmobiliser)}
                  {renderField("Imported Vehicle", vehicleDetails?.importedVehicle)}
                </div>
                <div className={styles.row}>
                  {renderField("Vehicle Modified", vehicleDetails?.vehicleModified)}
                  {vehicleDetails?.vehicleModifications && vehicleDetails.vehicleModifications.length > 0 && 
                    renderField("Modifications", vehicleDetails.vehicleModifications.join(", "))}
                  {renderField("Purchase Date", vehicleDetails?.purchaseDate)}
                </div>
                <div className={styles.row}>
                  {renderField("Owner", vehicleDetails?.owner)}
                  {renderField("Registered Keeper", vehicleDetails?.registeredKeeper)}
                </div>
              </>
            )}
          </div>
        </div>

        {/* COVER DETAILS SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Cover Details</h3>
          <div className={styles.sectionContent}>
            {insuranceType === "Annual" ? (
              <>
                <div className={styles.row}>
                  {renderField("Cover Level", coverDetails?.level ? coverDetails.level.charAt(0).toUpperCase() + coverDetails.level.slice(1) : "N/A")}
                </div>
                <div className={styles.row}>
                  {renderField("Start Date", coverDetails?.startDate)}
                </div>
                <div className={styles.row}>
                  {renderField("End Date", calculateEndDate())}
                </div>
              </>
            ) : (
              <>
                <div className={styles.row}>
                  {renderField("Duration", `${coverDetails?.period || "N/A"} ${coverDetails?.type || ""}`)}
                </div>
                <div className={styles.row}>
                  {renderField("Start Date", coverDetails?.startDate)}
                  {renderField("Start Time", coverDetails?.startTime)}
                </div>
                <div className={styles.row}>
                  {renderField("End Date", calculateEndDate())}
                  {renderField("End Time", getEndTime())}
                </div>
              </>
            )}
          </div>
        </div>

        {/* PERSONAL DETAILS SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Personal Details</h3>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              {renderField("First Name", userDetails?.firstName)}
              {renderField("Surname", userDetails?.surname)}
              {renderField("Date of Birth", userDetails?.dateOfBirth)}
            </div>
            <div className={styles.row}>
              {renderField("Email", userDetails?.email)}
              {renderField("Phone", userDetails?.phone)}
              {renderField("Postcode", userDetails?.postCode)}
            </div>
            <div className={styles.row}>
              {renderField("Address", userDetails?.address)}
            </div>
          </div>
        </div>

        {/* EMPLOYMENT DETAILS SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Employment Details</h3>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              {renderField("Employment Status", userDetails?.employmentStatus)}
              {renderField("Industry", userDetails?.industry)}
              {renderField("Occupation", userDetails?.occupation)}
            </div>
          </div>
        </div>

        {/* CAR PARKING & USAGE SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Car Parking & Usage</h3>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              {renderField("Keeping Car During Day", carUsage?.keepingCarDuringDay)}
              {renderField("Keeping Car During Night", carUsage?.keepingCarDuringNight)}
              {renderField("What Do You Use Car For", carUsage?.usageType)}
            </div>

            {/* ANNUAL-SPECIFIC CAR USAGE */}
            {insuranceType === "Annual" && (
              <>
                <div className={styles.row}>
                  {renderField("Own Other Vehicles", carUsage?.otherVehicles)}
                  {carUsage?.otherVehicles === "Yes" && renderField("Other Vehicles Type", carUsage?.otherVehiclesType)}
                  {renderField("Additional Qualifications", carUsage?.hasAdditionalQualifications)}
                </div>
                {carUsage?.hasAdditionalQualifications === "Yes" && (
                  <div className={styles.row}>
                    {renderField("Qualification Type", carUsage?.additionalQualificationType)}
                    {renderField("Month/Year", `${carUsage?.qualificationMonth || "N/A"} ${carUsage?.qualificationYear || ""}`)}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* LICENSE & CLAIMS SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>License & Claims</h3>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              {renderField("License Type", carUsage?.licenseType)}
              {renderField("License Held Since", carUsage?.licenseHeld)}
              {renderField("License Number", carUsage?.licenseNumber)}
            </div>
            <div className={styles.row}>
              {renderField("No Claims Bonus", carUsage?.NCB)}
              {renderField("Voluntary Excess", carUsage?.voluntaryExcess)}
            </div>
          </div>
        </div>

        {/* DECLARATIONS SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Declarations</h3>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              {renderField(
                "Criminal Convictions",
                carUsage?.criminalConvictions ? `Yes (${carUsage?.convictions?.length || 0} conviction${carUsage?.convictions?.length !== 1 ? "s" : ""})` : "No"
              )}
              {renderField("Medical Conditions", carUsage?.medicalConditions)}
              {renderField("Insurance Cancelled or Claim Refused", carUsage?.insuranceCancelledOrClaimRefusedOrPolicyVoided)}
            </div>

            {/* CONVICTION DETAILS */}
            {carUsage?.criminalConvictions && carUsage?.convictions?.length > 0 && (
              <div className={styles.convictionsContainer}>
                <h4 className={styles.convictionsTitle}>Conviction Details</h4>
                {carUsage.convictions.map((conviction, index) => (
                  <div key={index} className={styles.convictionItem}>
                    <div className={styles.convictionRow}>
                      <span className={styles.convictionLabel}>Conviction {index + 1}:</span>
                      <span className={styles.convictionValue}>{conviction.type || "N/A"}</span>
                    </div>
                    <div className={styles.convictionRow}>
                      <span className={styles.convictionLabel}>Location:</span>
                      <span className={styles.convictionValue}>{conviction.location || "N/A"}</span>
                    </div>
                    <div className={styles.convictionRow}>
                      <span className={styles.convictionLabel}>Date:</span>
                      <span className={styles.convictionValue}>
                        {conviction.day && conviction.month && conviction.year
                          ? `${conviction.day}/${conviction.month}/${conviction.year}`
                          : "N/A"}
                      </span>
                    </div>
                    {conviction.penaltyPoints && (
                      <div className={styles.convictionRow}>
                        <span className={styles.convictionLabel}>Penalty Points:</span>
                        <span className={styles.convictionValue}>{conviction.pointsNumber || "N/A"}</span>
                      </div>
                    )}
                    {conviction.resultedInFine && (
                      <div className={styles.convictionRow}>
                        <span className={styles.convictionLabel}>Fine Amount:</span>
                        <span className={styles.convictionValue}>£{conviction.fineAmount || "N/A"}</span>
                      </div>
                    )}
                    {conviction.resultedInBan && (
                      <div className={styles.convictionRow}>
                        <span className={styles.convictionLabel}>Ban Period:</span>
                        <span className={styles.convictionValue}>{conviction.banMonths || "N/A"} months</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ANNUAL-SPECIFIC ADDITIONAL INFO */}
        {insuranceType === "Annual" && (
          <>
            {(carUsage?.ownsHome !== undefined || carUsage?.childrenUnder16 !== undefined || carUsage?.livedInUKSinceBirth !== undefined || carUsage?.hasAdditionalDrivers === true) && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Additional Information</h3>
                <div className={styles.sectionContent}>
                  {(carUsage?.ownsHome !== undefined || carUsage?.childrenUnder16 !== undefined || carUsage?.livedInUKSinceBirth !== undefined) && (
                    <div className={styles.row}>
                      {carUsage?.ownsHome !== undefined && renderField("Own Home", carUsage?.ownsHome)}
                      {carUsage?.childrenUnder16 !== undefined && renderField("Children Under 16", carUsage?.childrenUnder16)}
                      {carUsage?.livedInUKSinceBirth !== undefined && renderField("Lived in UK Since Birth", carUsage?.livedInUKSinceBirth)}
                    </div>
                  )}

                  {/* ADDITIONAL DRIVERS - NESTED UNDER ADDITIONAL INFO */}
                  {carUsage?.hasAdditionalDrivers === true && carUsage?.additionalDrivers?.length > 0 && (
                    <div className={styles.driversContainer}>
                      <h4 className={styles.additionalInfoSubtitle}>Additional Drivers</h4>
                      {carUsage.additionalDrivers.map((driver, index) => (
                        <div key={index} className={styles.driverCard}>
                          <h5 className={styles.driverTitle}>Driver {index + 2}</h5>
                          <div className={styles.row}>
                            {renderField("First Name", driver?.firstName)}
                            {renderField("Last Name", driver?.lastName)}
                            {renderField("Date of Birth", driver?.dateOfBirth)}
                          </div>
                          <div className={styles.row}>
                            {renderField("License Type", driver?.licenseType)}
                            {renderField("License Held", driver?.licenseHeld)}
                            {renderField("Employment Status", driver?.employmentStatus)}
                          </div>
                          <div className={styles.row}>
                            {renderField("Occupation", driver?.occupation)}
                            {renderField("Industry", driver?.industry)}
                          </div>
                          {(driver?.criminalConvictions !== undefined || driver?.medicalConditions !== undefined || driver?.insuranceCancelledOrClaimRefusedOrPolicyVoided !== undefined) && (
                            <div className={styles.row}>
                              {driver?.criminalConvictions !== undefined && renderField("Criminal Convictions", driver?.criminalConvictions)}
                              {driver?.medicalConditions !== undefined && renderField("Medical Conditions", driver?.medicalConditions)}
                              {driver?.insuranceCancelledOrClaimRefusedOrPolicyVoided !== undefined && renderField("Insurance Cancelled/Refused", driver?.insuranceCancelledOrClaimRefusedOrPolicyVoided)}
                            </div>
                          )}

                          {/* DRIVER CONVICTION DETAILS */}
                          {driver?.criminalConvictions && driver?.convictions?.length > 0 && (
                            <div className={styles.convictionsContainer}>
                              <h6 className={styles.convictionsTitle}>Conviction Details</h6>
                              {driver.convictions.map((conviction, convIndex) => (
                                <div key={convIndex} className={styles.convictionItem}>
                                  <div className={styles.convictionRow}>
                                    <span className={styles.convictionLabel}>Conviction {convIndex + 1}:</span>
                                    <span className={styles.convictionValue}>{conviction.type || "N/A"}</span>
                                  </div>
                                  <div className={styles.convictionRow}>
                                    <span className={styles.convictionLabel}>Location:</span>
                                    <span className={styles.convictionValue}>{conviction.location || "N/A"}</span>
                                  </div>
                                  <div className={styles.convictionRow}>
                                    <span className={styles.convictionLabel}>Date:</span>
                                    <span className={styles.convictionValue}>
                                      {conviction.day && conviction.month && conviction.year
                                        ? `${conviction.day}/${conviction.month}/${conviction.year}`
                                        : "N/A"}
                                    </span>
                                  </div>
                                  {conviction.penaltyPoints && (
                                    <div className={styles.convictionRow}>
                                      <span className={styles.convictionLabel}>Penalty Points:</span>
                                      <span className={styles.convictionValue}>{conviction.pointsNumber || "N/A"}</span>
                                    </div>
                                  )}
                                  {conviction.resultedInFine && (
                                    <div className={styles.convictionRow}>
                                      <span className={styles.convictionLabel}>Fine Amount:</span>
                                      <span className={styles.convictionValue}>£{conviction.fineAmount || "N/A"}</span>
                                    </div>
                                  )}
                                  {conviction.resultedInBan && (
                                    <div className={styles.convictionRow}>
                                      <span className={styles.convictionLabel}>Ban Period:</span>
                                      <span className={styles.convictionValue}>{conviction.banMonths || "N/A"} months</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* OPTIONAL EXTRAS SECTION */}
            {(optionalExtras?.protectedNCD === true || optionalExtras?.motorLegal === true || optionalExtras?.courtesyCar === true || optionalExtras?.breakdownCover === true || optionalExtras?.foreignUseCover === true) && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Optional Extras</h3>
                <div className={styles.sectionContent}>
                  <div className={styles.extrasGrid}>
                    {optionalExtras?.protectedNCD === true && (
                      <div className={styles.extraItem}>
                        <div className={styles.extraItemHeader}>
                          <span className={styles.extraItemTitle}>Protected no claim discount</span>
                          <span className={styles.extraItemPrice}>£50/year</span>
                        </div>
                        <span className={styles.extraItemStatus}>Selected</span>
                      </div>
                    )}
                    {optionalExtras?.motorLegal === true && (
                      <div className={styles.extraItem}>
                        <div className={styles.extraItemHeader}>
                          <span className={styles.extraItemTitle}>Motor legal</span>
                          <span className={styles.extraItemPrice}>£150/year</span>
                        </div>
                        <span className={styles.extraItemStatus}>Selected</span>
                      </div>
                    )}
                    {optionalExtras?.courtesyCar === true && (
                      <div className={styles.extraItem}>
                        <div className={styles.extraItemHeader}>
                          <span className={styles.extraItemTitle}>Courtesy car</span>
                          <span className={styles.extraItemPrice}>£100/year</span>
                        </div>
                        <span className={styles.extraItemStatus}>Selected</span>
                      </div>
                    )}
                    {optionalExtras?.breakdownCover === true && (
                      <div className={styles.extraItem}>
                        <div className={styles.extraItemHeader}>
                          <span className={styles.extraItemTitle}>Breakdown cover</span>
                          <span className={styles.extraItemPrice}>£110/year</span>
                        </div>
                        <span className={styles.extraItemStatus}>Selected</span>
                      </div>
                    )}
                    {optionalExtras?.foreignUseCover === true && (
                      <div className={styles.extraItem}>
                        <div className={styles.extraItemHeader}>
                          <span className={styles.extraItemTitle}>Foreign use cover</span>
                          <span className={styles.extraItemPrice}>£50/year</span>
                        </div>
                        <span className={styles.extraItemStatus}>Selected</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewQuote;
