import React from "react";
import styles from "./policyOverview.module.css";

const PolicyOverview = ({ vehicleDetails, coverDetails, userDetails, carUsage }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const getVehicleDescription = () => {
    if (!vehicleDetails) return "N/A";
    const { make, model, year, fuel, doors } = vehicleDetails;
    return `${make} ${model} (${year}) ${fuel} ${doors} DOOR`;
  };

  const getCoverPeriod = () => {
    if (!coverDetails) return "N/A";
    const { type, period } = coverDetails;
    return `${period} ${type}`;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Overview of Policy</h2>

      {/* Vehicle Details Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Vehicle Details</h3>
        <div className={styles.grid}>
          <div className={styles.item}>
            <span className={styles.label}>Vehicle to be covered</span>
            <span className={styles.value}>{getVehicleDescription()}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>Registration Mark</span>
            <div className={styles.registrationBadge}>
              <span className={styles.registrationPrefix}>GB</span>
              <span className={styles.registrationNumber}>{vehicleDetails?.registrationNumber || "N/A"}</span>
            </div>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>Vehicle Type</span>
            <span className={styles.value}>N/A</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>Voluntary Excess</span>
            <span className={styles.value}>{carUsage?.voluntaryExcess || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Cover Details Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Cover Details</h3>
        <div className={styles.grid}>
          <div className={styles.item}>
            <span className={styles.label}>Duration</span>
            <span className={styles.value}>{getCoverPeriod()}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>Start Date</span>
            <span className={styles.value}>{formatDate(coverDetails?.startDate)}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>Start Time</span>
            <span className={styles.value}>{coverDetails?.startTime || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Personal Details Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Personal Details</h3>
        
        {/* Contact Information */}
        <div className={styles.subsection}>
          <h4 className={styles.subsectionTitle}>Contact Information</h4>
          <div className={styles.grid}>
            <div className={styles.item}>
              <span className={styles.label}>First Name</span>
              <span className={styles.value}>{userDetails?.firstName || "N/A"}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Surname</span>
              <span className={styles.value}>{userDetails?.surname || "N/A"}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Date of Birth</span>
              <span className={styles.value}>{formatDate(userDetails?.dateOfBirth)}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Email Address</span>
              <span className={styles.value}>{userDetails?.email || "N/A"}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Contact Number</span>
              <span className={styles.value}>{userDetails?.phone || "N/A"}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Post Code</span>
              <span className={styles.value}>{userDetails?.postCode || "N/A"}</span>
            </div>
            <div className={styles.itemFullWidth}>
              <span className={styles.label}>Selected Address</span>
              <span className={styles.value}>{userDetails?.address || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Employment Information */}
        <div className={styles.subsection}>
          <h4 className={styles.subsectionTitle}>Employment Information</h4>
          <div className={styles.grid}>
            <div className={styles.item}>
              <span className={styles.label}>Employment Status</span>
              <span className={styles.value}>N/A</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Occupation</span>
              <span className={styles.value}>N/A</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Industry</span>
              <span className={styles.value}>N/A</span>
            </div>
          </div>
        </div>

        {/* Car Usage & Parking */}
        <div className={styles.subsection}>
          <h4 className={styles.subsectionTitle}>Car Usage & Parking</h4>
          <div className={styles.grid}>
            <div className={styles.item}>
              <span className={styles.label}>Where do you keep your car during the day?</span>
              <span className={styles.value}>{carUsage?.keepingCarDuringDay || "N/A"}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Where do you keep your car during the night?</span>
              <span className={styles.value}>{carUsage?.keepingCarDuringNight || "N/A"}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>What do you use the car for?</span>
              <span className={styles.value}>{carUsage?.usageType || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* License & Claims */}
        <div className={styles.subsection}>
          <h4 className={styles.subsectionTitle}>Driving Record</h4>
          <div className={styles.grid}>
            <div className={styles.item}>
              <span className={styles.label}>License Type</span>
              <span className={styles.value}>{carUsage?.licenseType || "N/A"}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>License Held</span>
              <span className={styles.value}>{carUsage?.licenseHeld || "N/A"}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>License No.</span>
              <span className={styles.value}>{carUsage?.licenseNumber || "N/A"}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>No Claims Bonus (NCB)</span>
              <span className={styles.value}>{carUsage?.NCB ? `${carUsage.NCB} years` : "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Declarations */}
        <div className={styles.subsection}>
          <h4 className={styles.subsectionTitle}>Declarations</h4>
          <div className={styles.declarationsGrid}>
            <div className={styles.declarationItem}>
              <span className={styles.label}>Criminal Convictions</span>
              <span className={styles.declarationValue}>
                {carUsage?.criminalConvictions ? "Yes" : "No"}
              </span>
            </div>
            <div className={styles.declarationItem}>
              <span className={styles.label}>Medical Conditions</span>
              <span className={styles.declarationValue}>
                {carUsage?.medicalConditions ? "Yes" : "No"}
              </span>
            </div>
            <div className={styles.declarationItem}>
              <span className={styles.label}>Insurance Cancelled/Voided</span>
              <span className={styles.declarationValue}>
                {carUsage?.insuranceCancelledOrClaimRefusedOrPolicyVoided ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyOverview;
