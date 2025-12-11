"use client";

import React, { useState, useCallback, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useError } from "@/contexts/ErrorContext";
import { annualInsuranceSchema } from "@/utils/schemas/insuranceSchema";
import DashboardDropdown from "./DashboardDropdown";
import LoadingOverlay from "@/ui/loadingSpinner/LoadingOverlay";
import styles from "./editVehicleDetailsClient.module.css";

const VehicleModificationsModal = dynamic(
  () => import("@/app/annual/get-quote/_components/VehicleModificationsModal"),
  { ssr: false }
);

const carColors = [
  "White", "Black", "Gray", "Silver", "Blue", "Red", "Green", "Brown",
  "Orange", "Beige", "Purple", "Gold", "Yellow",
];

const vehicleTypes = ["Car", "Motorcycle", "Truck", "Bus"];
const vehicleMakes = ["Audi", "BMW", "Ford", "Honda", "Toyota", "Volkswagen"];
const vehicleModels = ["Model A", "Model B", "Model C"];
const vehicleYears = ["2024", "2023", "2022", "2021", "2020"];
const vehicleDoors = ["2", "4", "5"];
const vehicleFuels = ["Petrol", "Diesel", "Hybrid", "Electric"];
const vehicleTransmissions = ["Manual", "Automatic"];
const yesNoOptions = ["No", "Yes"];
const alarmImmobiliserOptions = [
  "Factory Fitted Thatcham Approved Alarm/Immobiliser",
  "Factory Fitted Thatcham Approved Alarm",
  "Factory Fitted Non-Thatcham Alarm/Immobiliser",
  "Factory Fitted Non-Thatcham Alarm",
  "Factory Fitted",
  "None",
];
const trackingDeviceOptions = ["No", "Yes - Factory Fitted", "Yes - Aftermarket"];
const driverSideOptions = ["Left Hand", "Right Hand"];
const seatsOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const EditVehicleDetailsClient = ({ policyId, policy, vehicleDetails }) => {
  const router = useRouter();
  const { addError } = useError();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModificationsModal, setShowModificationsModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const form = useForm({
    mode: "onSubmit",
    defaultValues: {
      vehicleDetails: {
        type: vehicleDetails?.type || "",
        make: vehicleDetails?.make || "",
        model: vehicleDetails?.model || "",
        year: vehicleDetails?.year || "",
        doors: vehicleDetails?.doors || "",
        fuel: vehicleDetails?.fuel || "",
        transmission: vehicleDetails?.transmission || "",
        colour: vehicleDetails?.colour || "",
        vehicleModified: vehicleDetails?.vehicleModified || "No",
        vehicleModifications: vehicleDetails?.vehicleModifications || [],
        alarmImmobiliser: vehicleDetails?.alarmImmobiliser || "",
        trackingDevice: vehicleDetails?.trackingDevice || "",
        importedVehicle: vehicleDetails?.importedVehicle || "",
        driverSide: vehicleDetails?.driverSide || "",
        seats: vehicleDetails?.seats || "",
      },
    },
  });

  const { watch, setValue, formState: { errors } } = form;
  const vehicleModified = watch("vehicleDetails.vehicleModified");
  const vehicleModifications = watch("vehicleDetails.vehicleModifications") || [];

  // Debug form errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form validation errors:", errors);
    }
  }, [errors]);

  const handleDropdownChange = useCallback((field, value) => {
    setValue(`vehicleDetails.${field}`, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [setValue]);

  // Open modifications modal when "Yes" is selected
  useEffect(() => {
    if (vehicleModified === "Yes") {
      setShowModificationsModal(true);
    }
  }, [vehicleModified]);

  const handleModificationsConfirm = (selectedModifications) => {
    setValue("vehicleDetails.vehicleModifications", selectedModifications, {
      shouldValidate: true,
      shouldDirty: true,
    });
    if (selectedModifications.length === 0) {
      setValue("vehicleDetails.vehicleModified", "No", {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    setShowModificationsModal(false);
  };

  const handleModificationsCancel = () => {
    if (vehicleModifications.length === 0) {
      setValue("vehicleDetails.vehicleModified", "No", {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    setShowModificationsModal(false);
  };

  const handleSave = async (data) => {
    console.log("handleSave called", data);
    try {
      setIsSubmitting(true);
      // Show loading for 3 seconds
      await new Promise(resolve => setTimeout(resolve, 3000));
      // Show error modal
      setShowErrorModal(true);
    } catch (error) {
      toast.error("Failed to update vehicle details");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const vehicleType = watch("vehicleDetails.type");
  const make = watch("vehicleDetails.make");
  const model = watch("vehicleDetails.model");
  const year = watch("vehicleDetails.year");
  const doors = watch("vehicleDetails.doors");
  const fuel = watch("vehicleDetails.fuel");
  const transmission = watch("vehicleDetails.transmission");
  const registration = vehicleDetails?.registrationNumber || "";

  return (
    <div className={styles.container}>
      {/* Loading Overlay */}
      <LoadingOverlay isVisible={isSubmitting} text="Processing request" />

      {/* Error Modal */}
      {showErrorModal && (
        <div className={styles.modalOverlay} onClick={() => setShowErrorModal(false)}>
          <div className={styles.errorModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.errorIconWrapper}>
              <svg className={styles.errorIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="16" r="1" fill="currentColor"/>
              </svg>
            </div>
            <h3 className={styles.errorTitle}>Unable to Make These Changes</h3>
            <p className={styles.errorMessage}>
              We're unable to process your vehicle update at this time. This may be due to system maintenance or policy restrictions.
            </p>
            <p className={styles.errorContact}>
              Please contact our support team who will be happy to assist you with these changes.
            </p>
            <div className={styles.errorActions}>
              <button
                className={styles.contactBtn}
                onClick={() => {
                  setShowErrorModal(false);
                  router.push('/contact');
                }}
              >
                Contact Support
              </button>
              <button
                className={styles.closeBtn}
                onClick={() => setShowErrorModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modifications Modal */}
      <VehicleModificationsModal
        isOpen={showModificationsModal}
        onClose={handleModificationsCancel}
        onConfirm={handleModificationsConfirm}
        selectedModifications={vehicleModifications}
      />

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
            <h1 className={`${styles.greetingTitle} ${plusJakartaSans.className}`}>Edit Vehicle Details</h1>
            <p className={styles.greetingSubtitle}>Update your vehicle information</p>
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
        <span className={`${styles.breadcrumbItem} ${styles.active}`}>Edit vehicle details</span>
      </div>

      {/* Content */}
      <div className={styles.contentWrapper}>
        <form onSubmit={form.handleSubmit(handleSave)} className={styles.formContainer}>
          {/* Info Banner */}
          <div className={styles.infoBanner}>
            <svg className={styles.infoIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 17V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="currentColor"/>
            </svg>
            <p className={styles.infoBannerText}>
              Heads up - to keep things simple any further changes will need to take place <strong>after</strong> this change has taken effect.
            </p>
          </div>

          {/* Vehicle Information Card - Static Data */}
          <div className={styles.vehicleInfoCard}>
            <div className={styles.vehicleHeader}>
              <div className={styles.iconWrapper}>
                <svg className={styles.vehicleIcon} viewBox="0 0 56 56" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 3.3790 49.7383 L 6.1446 49.7383 C 7.8790 49.7383 9.2383 48.4023 9.2383 46.6680 L 9.2383 42.7305 C 14.4415 43.0586 21.9649 43.2930 27.9883 43.2930 C 34.0352 43.2930 41.5587 43.0586 46.7617 42.7305 L 46.7617 46.6680 C 46.7617 48.4023 48.0976 49.7383 49.8553 49.7383 L 52.6211 49.7383 C 54.3788 49.7383 55.7382 48.4023 55.7382 46.6680 L 55.7382 33.1445 C 55.7382 29.2070 54.9414 26.9805 52.7617 24.1680 L 50.7932 21.6133 C 49.9259 17.3945 48.3788 12.9648 47.5585 11.2305 C 46.3163 8.5820 43.8788 7.0117 40.7618 6.5898 C 39.1915 6.4024 34.0587 6.2617 27.9883 6.2617 C 21.9415 6.2617 16.8087 6.4258 15.2383 6.5898 C 12.1212 6.9648 9.6837 8.5820 8.4415 11.2305 C 7.6212 12.9648 6.0743 17.3945 5.2071 21.6133 L 3.2383 24.1680 C 1.0587 26.9805 .2618 29.2070 .2618 33.1445 L .2618 46.6680 C .2618 48.4023 1.6212 49.7383 3.3790 49.7383 Z M 9.9415 19.6680 C 10.5040 17.0898 11.6290 13.7383 12.4024 12.3789 C 13.0352 11.2773 13.7149 10.8086 14.9805 10.6445 C 16.7618 10.3867 20.7462 10.2461 27.9883 10.2461 C 35.2540 10.2461 39.2383 10.3398 41.0196 10.6445 C 42.2618 10.8320 42.9414 11.2773 43.5976 12.3789 C 44.3948 13.7148 45.4494 17.0898 46.0585 19.6680 C 46.2697 20.5351 45.9179 20.8633 45.0040 20.7929 C 41.1134 20.5586 36.4727 20.3008 27.9883 20.3008 C 19.5274 20.3008 14.8868 20.5586 10.9962 20.7929 C 10.0821 20.8633 9.7540 20.5351 9.9415 19.6680 Z M 10.9024 37.2227 C 8.6759 37.2227 7.0118 35.5351 7.0118 33.3320 C 7.0118 31.1055 8.6759 29.4414 10.9024 29.4414 C 13.1290 29.4414 14.7930 31.1055 14.7930 33.3320 C 14.7930 35.5351 13.1290 37.2227 10.9024 37.2227 Z M 45.0977 37.2227 C 42.8712 37.2227 41.2071 35.5351 41.2071 33.3320 C 41.2071 31.1055 42.8712 29.4414 45.0977 29.4414 C 47.3243 29.4414 48.9883 31.1055 48.9883 33.3320 C 48.9883 35.5351 47.3243 37.2227 45.0977 37.2227 Z"/>
                </svg>
              </div>
              <div className={styles.vehicleNameArea}>
                <h3 className={styles.vehicleInfoTitle}>Your Vehicle</h3>
                <div className={styles.vehicleTitle}>
                  {make && model ? `${make} ${model}` : "Vehicle Information"}
                </div>
                {registration && (
                  <div className={styles.vehicleRegistration}>
                    ({registration})
                  </div>
                )}
              </div>
            </div>
            <div className={styles.vehicleInfoContent}>
              <div className={styles.vehicleMetaInfo}>
                {year && <span className={styles.metaItem}>{year}</span>}
                {transmission && <span className={styles.metaItem}>{transmission}</span>}
                {fuel && <span className={styles.metaItem}>{fuel}</span>}
                {doors && <span className={styles.metaItem}>{doors} Doors</span>}
              </div>
              {vehicleType && (
                <div className={styles.vehicleTypeInfo}>
                  Type: <span className={styles.vehicleTypeValue}>{vehicleType}</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.mainSection}>
            {/* Vehicle Modifications */}
            <div className={styles.fieldGroup}>
              <h4 className={styles.fieldGroupTitle}>Has the car been modified in any way?</h4>
              <p className={styles.fieldGroupDescription}>Modifications are changes to the car's original specification. These can be mechanical, or cosmetic changes inside or outside the car.</p>
              <DashboardDropdown
                label=""
                selected={vehicleModified}
                options={yesNoOptions}
                setSelected={(value) => handleDropdownChange("vehicleModified", value)}
                placeholder="Select option"
              />
              {vehicleModified === "Yes" && vehicleModifications.length > 0 && (
                <div className={styles.modificationsDisplay}>
                  <div className={styles.modificationsHeader}>
                    <p className={styles.modificationsLabel}>Selected Modifications:</p>
                    <button
                      type="button"
                      className={styles.editModificationsBtn}
                      onClick={() => setShowModificationsModal(true)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className={styles.modificationsList}>
                    {vehicleModifications.map((modification) => (
                      <span key={modification} className={styles.modificationTag}>
                        {modification}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Alarm/Immobiliser */}
            <div className={styles.fieldGroup}>
              <h4 className={styles.fieldGroupTitle}>What type of alarm and/or immobiliser does the car have?</h4>
              <p className={styles.fieldGroupDescription}>Check your car's manual if you're unsure.</p>
              <DashboardDropdown
                label=""
                selected={watch("vehicleDetails.alarmImmobiliser") || ""}
                options={alarmImmobiliserOptions}
                setSelected={(value) => handleDropdownChange("alarmImmobiliser", value)}
                placeholder="Select alarm type"
              />
            </div>

            {/* Tracking Device */}
            <div className={styles.fieldGroup}>
              <h4 className={styles.fieldGroupTitle}>Is the car fitted with a tracking device?</h4>
              <DashboardDropdown
                label=""
                selected={watch("vehicleDetails.trackingDevice") || ""}
                options={trackingDeviceOptions}
                setSelected={(value) => handleDropdownChange("trackingDevice", value)}
                placeholder="Select option"
              />
            </div>

            {/* Imported Vehicle */}
            <div className={styles.fieldGroup}>
              <h4 className={styles.fieldGroupTitle}>Is the car an import?</h4>
              <DashboardDropdown
                label=""
                selected={watch("vehicleDetails.importedVehicle") || ""}
                options={yesNoOptions}
                setSelected={(value) => handleDropdownChange("importedVehicle", value)}
                placeholder="Select option"
              />
            </div>

            {/* Driver Side */}
            <div className={styles.fieldGroup}>
              <h4 className={styles.fieldGroupTitle}>Is the car left or right-hand drive?</h4>
              <p className={styles.fieldGroupDescription}>The UK standard is right-hand drive. This means that when you are sat in the vehicle facing the windscreen, the steering wheel is on the right side.</p>
              <DashboardDropdown
                label=""
                selected={watch("vehicleDetails.driverSide") || ""}
                options={driverSideOptions}
                setSelected={(value) => handleDropdownChange("driverSide", value)}
                placeholder="Select option"
              />
            </div>

            {/* Seats */}
            <div className={styles.fieldGroup}>
              <h4 className={styles.fieldGroupTitle}>How many seats are there in the car?</h4>
              <p className={styles.fieldGroupDescription}>Count the number of seatbelts if you're unsure.</p>
              <DashboardDropdown
                label=""
                selected={watch("vehicleDetails.seats") || ""}
                options={seatsOptions}
                setSelected={(value) => handleDropdownChange("seats", value)}
                placeholder="Select number of seats"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button
              type="button"
              onClick={() => router.back()}
              className={styles.cancelBtn}
              disabled={isSubmitting}
            >
              Back
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

export default EditVehicleDetailsClient;
