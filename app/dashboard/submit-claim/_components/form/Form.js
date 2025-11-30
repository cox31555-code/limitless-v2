"use client";
import React, { useState, useEffect } from "react";
import styles from "./form.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  submitClaimFlatSchema,
  transformFormDataToApiFormat,
} from "@/utils/schemas/submitClaimSchema";
import FormTextInput from "@/ui/inputs/FormTextInput";
import FormTextArea from "@/ui/inputs/FormTextArea";
import FormDropdown from "@/ui/inputs/FormDropdown";
import FormDateInput from "@/ui/inputs/FormDateInput";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE_URL } from "@/utils/config";
import { useLoading } from "@/contexts/LoadingContext";
import UploadEvidence from "../uploadEvidence/UploadEvidence";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const Form = ({ claimReason }) => {
  const router = useRouter();
  const { user } = useAuth();
  const { showLoading } = useLoading();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get saved form data from sessionStorage
  const getSavedFormData = () => {
    if (typeof window === "undefined") return {};
    const claimData = JSON.parse(sessionStorage.getItem("claimData") || "{}");
    return claimData.formData || {};
  };

  const savedFormData = getSavedFormData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(submitClaimFlatSchema),
    defaultValues: {
      policyNumber: savedFormData.policyNumber || "",
      placeHolderFirstName: savedFormData.placeHolderFirstName || "",
      placeHolderLastName: savedFormData.placeHolderLastName || "",
      claimentsName: savedFormData.claimentsName || "",
      emailAddress: savedFormData.emailAddress || "",
      incidentDescription: savedFormData.incidentDescription || "",
      incidentDate: savedFormData.incidentDate || "",
      responsible: savedFormData.responsible || "",
      detailsIfNotResponsible: savedFormData.detailsIfNotResponsible || "",
      vehicleLocation: savedFormData.vehicleLocation || "",
      thirdPartyFullName: savedFormData.thirdPartyFullName || "",
      thirdPartyPhone: savedFormData.thirdPartyPhone || "",
      thirdPartyPostcode: savedFormData.thirdPartyPostcode || "",
      thirdPartyAddress: savedFormData.thirdPartyAddress || "",
      thirdPartyVehicleRegistration:
        savedFormData.thirdPartyVehicleRegistration || "",
      thirdPartyVehicleMake: savedFormData.thirdPartyVehicleMake || "",
      thirdPartyVehicleModel: savedFormData.thirdPartyVehicleModel || "",
      thirdPartyDamage: savedFormData.thirdPartyDamage || "",
      drivable: savedFormData.drivable || "",
      claimreason: claimReason || "",
    },
  });

  // Save form data to sessionStorage on every change
  useEffect(() => {
    const subscription = watch((value) => {
      if (typeof window !== "undefined") {
        try {
          // Filter out non-serializable values and DOM elements
          const serializableValue = {};
          Object.keys(value).forEach((key) => {
            const val = value[key];
            // Only include primitive values and plain objects
            if (
              val !== null &&
              val !== undefined &&
              (typeof val === "string" ||
                typeof val === "number" ||
                typeof val === "boolean" ||
                (typeof val === "object" && val.constructor === Object))
            ) {
              serializableValue[key] = val;
            }
          });

          const claimData = JSON.parse(
            sessionStorage.getItem("claimData") || "{}"
          );
          claimData.formData = serializableValue;
          sessionStorage.setItem("claimData", JSON.stringify(claimData));
        } catch (error) {
          console.warn("Failed to save form data to sessionStorage:", error);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const watchedValues = watch();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // BYPASSING API - Generate mock order reference
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

      // Generate mock order reference
      const mockOrderRef = `CLM${Date.now().toString().slice(-8)}`;

      console.log("Mock claim submission:", data);
      console.log("Generated order reference:", mockOrderRef);

      // Save form data to sessionStorage
      const claimData = JSON.parse(sessionStorage.getItem("claimData") || "{}");
      const cleanData = {};
      Object.keys(data).forEach((key) => {
        const val = data[key];
        if (
          val !== null &&
          val !== undefined &&
          (typeof val === "string" ||
            typeof val === "number" ||
            typeof val === "boolean" ||
            (typeof val === "object" && val.constructor === Object))
        ) {
          cleanData[key] = val;
        }
      });
      claimData.formData = cleanData;
      sessionStorage.setItem("claimData", JSON.stringify(claimData));

      // Redirect to success page with mock orderReference
      showLoading();
      router.push(
        `/dashboard/submit-claim?step=submitted&orderReference=${mockOrderRef}`
      );

      // Clean up sessionStorage
      sessionStorage.removeItem("claimData");

    } catch (error) {
      console.error("Error submitting claim:", error);
      setError("root", { message: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format claim reason for display
  const formatClaimReason = (reason) => {
    if (!reason) return "";
    return reason
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className={styles.page}>
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
            <h1 className={`${styles.greetingTitle} ${plusJakartaSans.className}`}>
              Submit a claim
            </h1>
            <p className={styles.greetingSubtitle}>
              {claimReason ? `Claim reason: ${formatClaimReason(claimReason)}` : "Let us know what happened and we'll guide you through the claims process"}
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbItem}>Dashboard</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbItem}>Manage Claims</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbItem}>Submit a Claim</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbItem}>What happened?</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={`${styles.breadcrumbItem} ${styles.active}`}>Claim Details</span>
      </div>

      {/* Content Wrapper */}
      <div className={styles.contentWrapper}>
        <div className={styles.pageHeader}>
          <h2 className={`${styles.pageTitle} ${plusJakartaSans.className}`}>
            Tell us about your claim
          </h2>
          <p className={styles.pageSubtitle}>
            Please provide as much detail as possible to help us process your claim quickly
          </p>
        </div>

        {/* Display general error */}
        {errors.root && (
          <div className={styles.errorAlert}>
            {errors.root.message}
          </div>
        )}

        <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formContainer}>
            {/* Policy Information Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Policy Information</h3>
              <div className={styles.formGrid}>
                <FormTextInput
                  label="Enter your policy no.*"
                  placeholder="Enter Policy Number"
                  type="text"
                  error={errors.policyNumber}
                  {...register("policyNumber")}
                />

                <div className={styles.row}>
                  <FormTextInput
                    label="Policyholder first name*"
                    placeholder="Enter Policy Holder First Name"
                    type="text"
                    error={errors.placeHolderFirstName}
                    {...register("placeHolderFirstName")}
                  />
                  <FormTextInput
                    label="Policyholder last name*"
                    placeholder="Enter Policy Holder Last Name"
                    type="text"
                    error={errors.placeHolderLastName}
                    {...register("placeHolderLastName")}
                  />
                </div>

                <div className={styles.row}>
                  <FormTextInput
                    label="Your name (if you are not the policyholder)"
                    placeholder="Enter Your Name"
                    type="text"
                    error={errors.claimentsName}
                    {...register("claimentsName")}
                  />
                  <FormTextInput
                    label="Email address"
                    placeholder="Enter Email Address"
                    type="email"
                    error={errors.emailAddress}
                    {...register("emailAddress")}
                  />
                </div>
              </div>
            </div>

            {/* Incident Details Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Incident Details</h3>
              <div className={styles.formGrid}>
                <FormTextArea
                  label="Incident description*"
                  placeholder="Enter Incident Description"
                  rows={6}
                  error={errors.incidentDescription}
                  {...register("incidentDescription")}
                />

                <div className={styles.row}>
                  <FormDateInput
                    dateLabel="Date of incident (Or estimate the date)*"
                    name="incidentDate"
                    type="date"
                    allowPastDates={true}
                    error={errors.incidentDate}
                    value={watchedValues.incidentDate}
                    onChange={(e) => setValue("incidentDate", e.target.value)}
                  />
                  <FormDropdown
                    label="Do you take responsibility for the incident?*"
                    options={["Yes", "No"]}
                    placeholder="Select Responsibility"
                    error={errors.responsible}
                    value={watchedValues.responsible}
                    onChange={(value) => {
                      const stringValue =
                        typeof value === "string"
                          ? value
                          : value?.target?.value || value;
                      setValue("responsible", stringValue);
                    }}
                  />
                </div>

                <FormTextArea
                  label="If not, please give details"
                  placeholder="Enter Extra Details"
                  rows={3}
                  error={errors.detailsIfNotResponsible}
                  {...register("detailsIfNotResponsible")}
                />
              </div>
            </div>

            {/* Vehicle Information Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Vehicle Information</h3>
              <div className={styles.formGrid}>
                <div className={styles.row}>
                  <FormTextInput
                    label="Where is the vehicle currently?*"
                    placeholder="Enter Vehicle Current Location"
                    type="text"
                    error={errors.vehicleLocation}
                    {...register("vehicleLocation")}
                  />
                  <FormDropdown
                    label="Is the vehicle drivable?*"
                    options={["Yes", "No"]}
                    placeholder="Select Drivability"
                    error={errors.drivable}
                    value={watchedValues.drivable}
                    onChange={(value) => {
                      const stringValue =
                        typeof value === "string"
                          ? value
                          : value?.target?.value || value;
                      setValue("drivable", stringValue);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Third Party Details Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Third Party Details</h3>
              <div className={styles.formGrid}>
                <div className={styles.row}>
                  <FormTextInput
                    label="Third party name*"
                    placeholder="Enter Third Party Name"
                    type="text"
                    error={errors.thirdPartyFullName}
                    {...register("thirdPartyFullName")}
                  />
                  <FormTextInput
                    label="Third party phone number*"
                    placeholder="Enter Third Party Phone"
                    type="text"
                    error={errors.thirdPartyPhone}
                    {...register("thirdPartyPhone")}
                  />
                </div>

                <div className={styles.row}>
                  <FormTextInput
                    label="Third party postcode*"
                    placeholder="Enter Third Party Postcode"
                    type="text"
                    error={errors.thirdPartyPostcode}
                    {...register("thirdPartyPostcode")}
                  />
                  <FormTextInput
                    label="Third party address*"
                    placeholder="Enter Third Party Address"
                    type="text"
                    error={errors.thirdPartyAddress}
                    {...register("thirdPartyAddress")}
                  />
                </div>
              </div>
            </div>

            {/* Third Party Vehicle Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Third Party Vehicle</h3>
              <div className={styles.formGrid}>
                <FormTextInput
                  label="Third party vehicle registration number*"
                  placeholder="Enter Vehicle Registration"
                  type="text"
                  error={errors.thirdPartyVehicleRegistration}
                  {...register("thirdPartyVehicleRegistration")}
                />

                <div className={styles.row}>
                  <FormTextInput
                    label="Third party vehicle make*"
                    placeholder="Enter Vehicle Make"
                    type="text"
                    error={errors.thirdPartyVehicleMake}
                    {...register("thirdPartyVehicleMake")}
                  />
                  <FormTextInput
                    label="Third party vehicle model*"
                    placeholder="Enter Vehicle Model"
                    type="text"
                    error={errors.thirdPartyVehicleModel}
                    {...register("thirdPartyVehicleModel")}
                  />
                </div>

                <FormTextInput
                  label="Tell us about any damage to the third party vehicle*"
                  placeholder="Enter Third Party Vehicle Damage"
                  type="text"
                  error={errors.thirdPartyDamage}
                  {...register("thirdPartyDamage")}
                />
              </div>
            </div>

            {/* Upload Evidence Section */}
            <UploadEvidence register={register} errors={errors} />

            {/* Submit Button */}
            <div className={styles.submitButtonWrapper}>
              <button
                type="button"
                className={styles.backButton}
                onClick={() => router.back()}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? "Submitting Claim..." : "Submit Claim"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
