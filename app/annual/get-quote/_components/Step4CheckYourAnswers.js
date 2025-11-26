"use client";
import React from "react";
import styles from "./step4CheckYourAnswers.module.css";
import buttonStyles from "./step3CarOwner.module.css";

const Step4CheckYourAnswers = ({
  form,
  foundVehicleData,
  additionalDrivers = [],
  carOwnerData = {},
  ncdData = {},
  productsData = {},
  contactInformationData = {},
  claims = [],
  convictions = [],
  onBack = () => {},
  onSubmit = () => {}
}) => {
  const formData = form.getValues();
  
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return dateString;
  };

  const getDisplayValue = (value) => {
    if (value === null || value === undefined || value === "") return "N/A";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    return value;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Let's check your answers</h1>
        <p className={styles.subtitle}>Insurers will use the details below to fetch your quotes.</p>
      </div>

      <div className={styles.warningBox}>
        <p>Check your details are right or your cover may not be valid, your claims could be refused, and the cost of your insurance could go up.</p>
      </div>

      <div className={styles.content}>
        {/* Car Details Section */}
        <div className={styles.mainSection}>
          <h2 className={styles.sectionTitle}>Car details</h2>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <h3 className={styles.subsectionTitle}>Your car</h3>
              <button className={styles.changeLink}>
                <span className={styles.changeLinkText}>Change</span>
              </button>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Car make and model</span>
              <span className={styles.value}>
                {foundVehicleData?.apiData?.make || formData?.vehicleDetails?.make || "N/A"} {foundVehicleData?.apiData?.model || formData?.vehicleDetails?.model || ""}
              </span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Alarm/Immobiliser</span>
              <span className={styles.value}>{getDisplayValue(formData?.vehicleDetails?.alarmImmobiliser)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Tracking device</span>
              <span className={styles.value}>{getDisplayValue(formData?.vehicleDetails?.trackingDevice)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Import</span>
              <span className={styles.value}>{getDisplayValue(formData?.vehicleDetails?.importedVehicle)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Driver side</span>
              <span className={styles.value}>{getDisplayValue(foundVehicleData?.apiData?.driverSide || "Right Hand")}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Seats</span>
              <span className={styles.value}>{getDisplayValue(foundVehicleData?.apiData?.seats || formData?.vehicleDetails?.doors)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Modifications</span>
              <span className={styles.value}>{formData?.vehicleDetails?.vehicleModified === "Yes" ? "Yes" : "No"}</span>
            </div>
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <h3 className={styles.subsectionTitle}>Car value</h3>
              <button className={styles.changeLink}>
                <span className={styles.changeLinkText}>Change</span>
              </button>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Current vehicle market value</span>
              <span className={styles.value}>£{getDisplayValue(formData?.vehicleDetails?.worth || formData?.vehicleDetails?.carValue)}</span>
            </div>
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <h3 className={styles.subsectionTitle}>Car usage</h3>
              <button className={styles.changeLink}>
                <span className={styles.changeLinkText}>Change</span>
              </button>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>When you bought the car</span>
              <span className={styles.value}>{formatDate(formData?.vehicleDetails?.purchaseDate)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Car usage</span>
              <span className={styles.value}>{getDisplayValue(formData?.carUsage?.usageType)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Annual personal mileage</span>
              <span className={styles.value}>{getDisplayValue(formData?.carUsage?.annualMileage)}</span>
            </div>
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <h3 className={styles.subsectionTitle}>Car storage</h3>
              <button className={styles.changeLink}>
                <span className={styles.changeLinkText}>Change</span>
              </button>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Daytime storage</span>
              <span className={styles.value}>{getDisplayValue(formData?.carUsage?.keepingCarDuringDay)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Nighttime storage</span>
              <span className={styles.value}>{getDisplayValue(formData?.carUsage?.keepingCarDuringNight)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Car kept at home overnight</span>
              <span className={styles.value}>{getDisplayValue(formData?.carUsage?.carKeptAtHomeOvernight)}</span>
            </div>
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <h3 className={styles.subsectionTitle}>Other cars</h3>
              <button className={styles.changeLink}>
                <span className={styles.changeLinkText}>Change</span>
              </button>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Number of cars at your household</span>
              <span className={styles.value}>{getDisplayValue(formData?.carUsage?.householdCarsCount)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Use of any other vehicles</span>
              <span className={styles.value}>{getDisplayValue(formData?.carUsage?.otherVehicles)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>What other vehicles</span>
              <span className={styles.value}>{getDisplayValue(formData?.carUsage?.otherVehiclesType)}</span>
            </div>
          </div>
        </div>

        {/* Your Details Section */}
        <div className={styles.mainSection}>
          <h2 className={styles.sectionTitle}>Your details</h2>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <h3 className={styles.subsectionTitle}>About you</h3>
              <button className={styles.changeLink}>
                <span className={styles.changeLinkText}>Change</span>
              </button>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Name</span>
              <span className={styles.value}>
                {getDisplayValue(formData?.userDetails?.title)} {getDisplayValue(formData?.userDetails?.firstName)} {getDisplayValue(formData?.userDetails?.surname)}
              </span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Date of birth</span>
              <span className={styles.value}>{formatDate(formData?.userDetails?.dateOfBirth)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Relationship status</span>
              <span className={styles.value}>{getDisplayValue(formData?.userDetails?.maritalStatus)}</span>
            </div>
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <h3 className={styles.subsectionTitle}>Your household</h3>
              <button className={styles.changeLink}>
                <span className={styles.changeLinkText}>Change</span>
              </button>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Home address</span>
              <span className={styles.value}>
                {getDisplayValue(formData?.userDetails?.addressLine1)}<br />
                {formData?.userDetails?.addressLine2 && <>{formData.userDetails.addressLine2}<br /></>}
                {formData?.userDetails?.city && <>{formData.userDetails.city}<br /></>}
                {getDisplayValue(formData?.userDetails?.postcode)}
              </span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Homeowner</span>
              <span className={styles.value}>{getDisplayValue(formData?.userDetails?.ownsHome)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Children under 16 living with you</span>
              <span className={styles.value}>{getDisplayValue(formData?.userDetails?.childrenUnder16)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Lived in the UK since birth</span>
              <span className={styles.value}>{getDisplayValue(formData?.userDetails?.livedInUKSinceBirth)}</span>
            </div>
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <h3 className={styles.subsectionTitle}>Your employment</h3>
              <button className={styles.changeLink}>
                <span className={styles.changeLinkText}>Change</span>
              </button>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Employment status</span>
              <span className={styles.value}>{getDisplayValue(formData?.userDetails?.employmentStatus)}</span>
            </div>
            {formData?.userDetails?.studentType && (
              <div className={styles.dataRow}>
                <span className={styles.label}>Student type</span>
                <span className={styles.value}>{getDisplayValue(formData?.userDetails?.studentType)}</span>
              </div>
            )}
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <h3 className={styles.subsectionTitle}>Your licence</h3>
              <button className={styles.changeLink}>
                <span className={styles.changeLinkText}>Change</span>
              </button>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Licence type</span>
              <span className={styles.value}>{getDisplayValue(formData?.carUsage?.licenseType)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Years licence held for</span>
              <span className={styles.value}>{getDisplayValue(formData?.carUsage?.licenseHeld)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Additional driving qualifications</span>
              <span className={styles.value}>{getDisplayValue(formData?.carUsage?.hasAdditionalQualifications)}</span>
            </div>
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <h3 className={styles.subsectionTitle}>Licence restrictions</h3>
              <button className={styles.changeLink}>
                <span className={styles.changeLinkText}>Change</span>
              </button>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>DVLA reportable conditions</span>
              <span className={styles.value}>{getDisplayValue(formData?.carUsage?.medicalConditions)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Had insurance denied before</span>
              <span className={styles.value}>{getDisplayValue(formData?.carUsage?.insuranceCancelledOrClaimRefusedOrPolicyVoided)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Unspent non-motoring convictions</span>
              <span className={styles.value}>{getDisplayValue(formData?.carUsage?.criminalConvictions)}</span>
            </div>
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <h3 className={styles.subsectionTitle}>Claims in the last 5 years</h3>
              <button className={styles.changeLink}>
                <span className={styles.changeLinkText}>Change</span>
              </button>
            </div>
            {claims.length > 0 ? (
              claims.map((claim, index) => (
                <div key={index} className={styles.dataRow}>
                  <span className={styles.label}>{formatDate(claim.date)}</span>
                  <span className={styles.value}>{claim.type}</span>
                </div>
              ))
            ) : (
              <div className={styles.dataRow}>
                <span className={styles.value}>None</span>
              </div>
            )}
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <h3 className={styles.subsectionTitle}>Motoring convictions in the last 5 years</h3>
              <button className={styles.changeLink}>
                <span className={styles.changeLinkText}>Change</span>
              </button>
            </div>
            {convictions.length > 0 ? (
              convictions.map((conviction, index) => (
                <div key={index} className={styles.dataRow}>
                  <span className={styles.label}>{formatDate(conviction.date)}</span>
                  <span className={styles.value}>{conviction.type}</span>
                </div>
              ))
            ) : (
              <div className={styles.dataRow}>
                <span className={styles.value}>None</span>
              </div>
            )}
          </div>
        </div>

        {/* Your Policy Section */}
        <div className={styles.mainSection}>
          <h2 className={styles.sectionTitle}>Your policy</h2>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <h3 className={styles.subsectionTitle}>Additional drivers</h3>
              <button className={styles.changeLink}>
                <span className={styles.changeLinkText}>Change</span>
              </button>
            </div>
            {additionalDrivers.length > 0 ? (
              additionalDrivers.map((driver, index) => (
                <div key={index}>
                  <div className={styles.dataRow}>
                    <span className={styles.label}>Name</span>
                    <span className={styles.value}>
                      {getDisplayValue(driver.title)} {getDisplayValue(driver.firstName)} {getDisplayValue(driver.surname)}
                    </span>
                  </div>
                  <div className={styles.dataRow}>
                    <span className={styles.label}>Date of birth</span>
                    <span className={styles.value}>{formatDate(driver.dateOfBirth)}</span>
                  </div>
                  <div className={styles.dataRow}>
                    <span className={styles.label}>Relationship status</span>
                    <span className={styles.value}>{getDisplayValue(driver.maritalStatus)}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.dataRow}>
                <span className={styles.value}>None</span>
              </div>
            )}
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <h3 className={styles.subsectionTitle}>Car owner</h3>
              <button className={styles.changeLink}>
                <span className={styles.changeLinkText}>Change</span>
              </button>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Main driver</span>
              <span className={styles.value}>
                {getDisplayValue(formData?.userDetails?.firstName)} {getDisplayValue(formData?.userDetails?.surname)}
              </span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Registered keeper</span>
              <span className={styles.value}>{getDisplayValue(carOwnerData?.registeredKeeper)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Legal owner</span>
              <span className={styles.value}>{getDisplayValue(carOwnerData?.legalOwner)}</span>
            </div>
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <h3 className={styles.subsectionTitle}>Your cover</h3>
              <button className={styles.changeLink}>
                <span className={styles.changeLinkText}>Change</span>
              </button>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Cover type</span>
              <span className={styles.value}>{getDisplayValue(formData?.coverDetails?.level)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Voluntary excess</span>
              <span className={styles.value}>£{getDisplayValue(formData?.carUsage?.voluntaryExcess)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Payment preference</span>
              <span className={styles.value}>{getDisplayValue(formData?.coverDetails?.paymentPreference || "One annual payment")}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Policy start date</span>
              <span className={styles.value}>{formatDate(formData?.coverDetails?.startDate)}</span>
            </div>
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <h3 className={styles.subsectionTitle}>Your no claims discount</h3>
              <button className={styles.changeLink}>
                <span className={styles.changeLinkText}>Change</span>
              </button>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>No claims discount</span>
              <span className={styles.value}>{getDisplayValue(ncdData?.noClaimsDiscount || "No NCD")}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Protected no claims discount</span>
              <span className={styles.value}>{getDisplayValue(ncdData?.protectedNcd || "No")}</span>
            </div>
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <h3 className={styles.subsectionTitle}>Additional products</h3>
              <button className={styles.changeLink}>
                <span className={styles.changeLinkText}>Change</span>
              </button>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Personal accident cover</span>
              <span className={styles.value}>{getDisplayValue(productsData?.personalAccidentCover)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Courtesy car</span>
              <span className={styles.value}>{getDisplayValue(productsData?.courtesyCar)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Breakdown cover</span>
              <span className={styles.value}>{getDisplayValue(productsData?.breakdownCover)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Motor legal protection</span>
              <span className={styles.value}>{getDisplayValue(productsData?.motorLegalProtection)}</span>
            </div>
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              <h3 className={styles.subsectionTitle}>Contact information</h3>
              <button className={styles.changeLink}>
                <span className={styles.changeLinkText}>Change</span>
              </button>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Email address</span>
              <span className={styles.value}>{getDisplayValue(contactInformationData?.email)}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Can insurance providers contact you?</span>
              <span className={styles.value}>
                {contactInformationData?.contactMethod?.includes("Do not contact me about the above") ? "No" : "Yes"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={buttonStyles.buttonGroup}>
        <button type="button" className={buttonStyles.backBtn} onClick={onBack}>
          Back
        </button>
        <button type="button" className={buttonStyles.nextBtn} onClick={onSubmit}>
          Get Quote
        </button>
      </div>
    </div>
  );
};

export default Step4CheckYourAnswers;
