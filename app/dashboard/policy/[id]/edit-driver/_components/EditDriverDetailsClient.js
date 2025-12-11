"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { annualInsuranceSchema } from "@/utils/schemas/insuranceSchema";
import styles from "./editDriverDetailsClient.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import DriverSummaryCard from "./DriverSummaryCard";
import DriverQuestions from "./DriverQuestions";
import { useLoading } from "@/contexts/LoadingContext";
import LoadingOverlay from "@/ui/loadingSpinner/LoadingOverlay";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const EditDriverDetailsClient = ({ policyId, driverId, policy, driver }) => {
  const router = useRouter();
  const { showLoading } = useLoading();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUnableModal, setShowUnableModal] = useState(false);
  const [claims, setClaims] = useState([]);
  const [convictions, setConvictions] = useState([]);

  const form = useForm({
    resolver: zodResolver(annualInsuranceSchema),
    defaultValues: {
      userDetails: {
        title: driver?.title || "",
        firstName: driver?.firstName || "",
        surname: driver?.surname || "",
        dateOfBirth: driver?.dateOfBirth || "",
        maritalStatus: driver?.relationshipStatus || "",
        ownsHome: driver?.homeowner !== undefined ? driver.homeowner : false,
        childrenUnder16: driver?.childrenUnder16 || false,
        livedInUKSinceBirth: driver?.livedInUKSinceBirth !== undefined ? driver.livedInUKSinceBirth : true,
        addressLine1: driver?.address || "",
        postcode: driver?.postCode || "",
        phone: driver?.phone || "",
        email: driver?.email || "",
        employmentStatus: driver?.employmentStatus || "",
        occupation: driver?.occupation || "",
        industry: driver?.industry || "",
      },
      carUsage: {
        licenseType: driver?.licenceType || "",
        licenseHeld: driver?.yearsLicenceHeld || "",
        licenseIssueCountry: "England, Scotland or Wales (Great Britain)",
        licenseNumber: "",
        licenseNumberFirst: "",
        licenseNumberLast: "",
        licenseNumberNI: "",
        declineShareLicenseNumber: false,
        medicalConditions: driver?.medicalConditions || "",
        dvlaConditionType: driver?.dvlaConditionType || "",
      },
    },
  });

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      // Show unable modal
      setShowUnableModal(true);
      setIsSubmitting(false);
    } catch (error) {
      toast.error("Failed to update driver details");
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Loading Overlay */}
      <LoadingOverlay isVisible={isSubmitting} text="Processing request" />

      {/* Unable to Update Modal */}
      {showUnableModal && (
        <div className={styles.modalOverlay} onClick={() => setShowUnableModal(false)}>
          <div className={styles.unableModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.unableIconWrapper}>
              <svg className={styles.unableIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="16" r="1" fill="currentColor"/>
              </svg>
            </div>
            <h3 className={styles.unableTitle}>Unable to Update Driver Details</h3>
            <p className={styles.unableMessage}>
              We're unable to process the driver update at this time. This may be due to system maintenance or policy restrictions.
            </p>
            <p className={styles.unableContact}>
              Please contact our support team who will be happy to assist you with updating driver details.
            </p>
            <div className={styles.unableActions}>
              <button
                className={styles.contactBtn}
                onClick={() => {
                  setShowUnableModal(false);
                  showLoading();
                  router.push('/contact');
                }}
              >
                Contact Support
              </button>
              <button
                className={styles.closeBtn}
                onClick={() => setShowUnableModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="106.238px" height="176.262px" viewBox="0 0 106.238 140.262" className={styles.heroBackgroundImage}>
            <style>{`.st0{fill:#FFFFFF;}.st1{fill:#05AFFF;}.st2{fill:#0A0913;}`}</style>
            <path className="st1" d="M86.515,75.233L44.398,94.136v25.204l-4.194-4.194l-13.187-13.187l-7.276-7.276l24.658-11.08l17.44-7.823l35.953-16.152c9.13-4.116,11.334-16.094,4.253-23.175L70.012,4.419C60.57,-5.023,44.398,1.669,44.398,15.012v20.171L0.115,55.081v19.098l17.44-7.823l39.484-17.713l4.916-2.204V27.302l-0.117,0.058v-6.457l24.677,24.677l-10.944,4.916l0.02,0.039l-46.682,21.01l-0.039-0.078L8.464,80.636c-0.351,0.156-0.683,0.312-0.995,0.488c-4.253,2.302-6.808,6.399-7.354,10.768c-0.527,4.175,0.741,8.583,4.077,11.919l32.051,32.032c9.442,9.442,25.594,2.751,25.594-10.612v-19.82l24.677-11.08l19.722-8.837V66.357L86.515,75.233z"/>
          </svg>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.greetingArea}>
            <h1 className={`${styles.greetingTitle} ${plusJakartaSans.className}`}>Edit driver details</h1>
            <p className={styles.greetingSubtitle}>Update {driver?.firstName} {driver?.surname}'s information</p>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbItem}>Dashboard</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbItem}>Manage Policy</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbItem}>Policy summary</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={`${styles.breadcrumbItem} ${styles.active}`}>Edit driver details</span>
      </div>

      {/* Content */}
      <div className={styles.contentWrapper}>
        <form onSubmit={form.handleSubmit(handleSave)} className={styles.formContainer}>
          <DriverSummaryCard driver={driver} form={form} />
          <DriverQuestions
            form={form}
            claims={claims}
            setClaims={setClaims}
            convictions={convictions}
            setConvictions={setConvictions}
          />

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button
              type="button"
              onClick={() => router.back()}
              className={styles.cancelBtn}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.saveBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDriverDetailsClient;
