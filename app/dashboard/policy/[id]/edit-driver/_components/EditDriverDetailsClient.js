"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { annualInsuranceSchema } from "@/utils/schemas/insuranceSchema";
import styles from "./editDriverDetailsClient.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import DriverSummaryCard from "./DriverSummaryCard";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const Step2PersonalDetailsHidden = dynamic(() => import("./Step2PersonalDetailsHidden"), { ssr: false });
const Step2HouseholdHidden = dynamic(() => import("./Step2HouseholdHidden"), { ssr: false });
const Step2Employment = dynamic(() => import("@/app/annual/get-quote/_components/Step2Employment"), { ssr: false });
const Step2LicenceHidden = dynamic(() => import("./Step2LicenceHidden"), { ssr: false });
const Step2LicenceRestrictions = dynamic(() => import("@/app/annual/get-quote/_components/Step2LicenceRestrictions"), { ssr: false });
const Step2ClaimsAndConvictions = dynamic(() => import("@/app/annual/get-quote/_components/Step2ClaimsAndConvictions"), { ssr: false });

const EditDriverDetailsClient = ({ policyId, driverId, policy, driver }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        hasAdditionalQualifications: driver?.additionalDrivingQualifications ? true : false,
        additionalQualificationType: driver?.additionalDrivingQualifications || "",
        qualificationMonth: "",
        qualificationYear: "",
      },
    },
  });

  const handleSave = async (data) => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Driver details updated successfully");
      router.push(`/dashboard/policy/${policyId}`);
    } catch (error) {
      toast.error("Failed to update driver details");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
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
          <Step2PersonalDetailsHidden form={form} />
          <Step2HouseholdHidden form={form} />
          <Step2Employment form={form} />
          <Step2LicenceHidden form={form} />
          <Step2LicenceRestrictions form={form} />
          <Step2ClaimsAndConvictions
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
