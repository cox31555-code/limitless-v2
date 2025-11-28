"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { annualInsuranceSchema } from "@/utils/schemas/insuranceSchema";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import VehicleModificationsModal from "@/app/annual/get-quote/_components/VehicleModificationsModal";
import styles from "@/app/annual/get-quote/_components/annualVehicle.module.css";
import editStyles from "./editVehicleDetailsClient.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModificationsModal, setShowModificationsModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(annualInsuranceSchema),
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
        vehicleModified: vehicleDetails?.vehicleModified || "",
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
    try {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Vehicle details updated successfully");
      router.push(`/dashboard/policy/${policyId}`);
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
    <div className={editStyles.container}>
      {/* Modifications Modal */}
      <VehicleModificationsModal
        isOpen={showModificationsModal}
        onClose={handleModificationsCancel}
        onConfirm={handleModificationsConfirm}
        selectedModifications={vehicleModifications}
      />

      {/* Hero Section */}
      <section className={editStyles.heroSection} style={{ marginBottom: "0" }}>
        <div className={editStyles.heroBackground}>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="106.238px" height="176.262px" viewBox="0 0 106.238 140.262" className={editStyles.heroBackgroundImage}>
            <style>{`.st0{fill:#FFFFFF;}.st1{fill:#05AFFF;}.st2{fill:#0A0913;}`}</style>
            <path className="st1" d="M86.515,75.233L44.398,94.136v25.204l-4.194-4.194l-13.187-13.187l-7.276-7.276l24.658-11.08l17.44-7.823l35.953-16.152c9.13-4.116,11.334-16.094,4.253-23.175L70.012,4.419C60.57,-5.023,44.398,1.669,44.398,15.012v20.171L0.115,55.081v19.098l17.44-7.823l39.484-17.713l4.916-2.204V27.302l-0.117,0.058v-6.457l24.677,24.677l-10.944,4.916l0.02,0.039l-46.682,21.01l-0.039-0.078L8.464,80.636c-0.351,0.156-0.683,0.312-0.995,0.488c-4.253,2.302-6.808,6.399-7.354,10.768c-0.527,4.175,0.741,8.583,4.077,11.919l32.051,32.032c9.442,9.442,25.594,2.751,25.594-10.612v-19.82l24.677-11.08l19.722-8.837V66.357L86.515,75.233z"/>
          </svg>
        </div>
        <div className={editStyles.heroContent}>
          <div className={editStyles.greetingArea}>
            <h1 className={`${editStyles.greetingTitle} ${plusJakartaSans.className}`}>Edit Vehicle Details</h1>
            <p className={editStyles.greetingSubtitle}>Update your vehicle information</p>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className={editStyles.breadcrumb}>
        <span className={editStyles.breadcrumbItem}>Dashboard</span>
        <span className={editStyles.breadcrumbSeparator}>›</span>
        <span className={editStyles.breadcrumbItem}>Manage Policy</span>
        <span className={editStyles.breadcrumbSeparator}>›</span>
        <span className={editStyles.breadcrumbItem}>Policy summary</span>
        <span className={editStyles.breadcrumbSeparator}>›</span>
        <span className={`${editStyles.breadcrumbItem} ${editStyles.active}`}>Edit vehicle details</span>
      </div>

      {/* Content */}
      <div className={editStyles.contentWrapper}>
        <form onSubmit={form.handleSubmit(handleSave)} className={editStyles.formContainer}>
          <div className={editStyles.mainSection}>
            {/* Vehicle Information Card - Static Data */}
            <div className={editStyles.vehicleInfoCard}>
              <h3 className={editStyles.vehicleInfoTitle}>Your Vehicle</h3>
              <div className={editStyles.vehicleInfoContent}>
                <div className={editStyles.vehicleMainInfo}>
                  <div className={editStyles.vehicleTitle}>
                    {make && model ? `${make} ${model}` : "Vehicle Information"}
                  </div>
                  {registration && (
                    <div className={editStyles.vehicleRegistration}>
                      ({registration})
                    </div>
                  )}
                </div>
                <div className={editStyles.vehicleMetaInfo}>
                  {year && <span className={editStyles.metaItem}>{year}</span>}
                  {transmission && <span className={editStyles.metaItem}>{transmission}</span>}
                  {fuel && <span className={editStyles.metaItem}>{fuel}</span>}
                  {doors && <span className={editStyles.metaItem}>{doors} Doors</span>}
                </div>
              </div>
              {vehicleType && (
                <div className={editStyles.vehicleTypeInfo}>
                  Type: <span className={editStyles.vehicleTypeValue}>{vehicleType}</span>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className={editStyles.sectionDivider}></div>

            {/* Vehicle Modifications */}
            <div className={editStyles.fieldGroup}>
              <h4 className={editStyles.fieldGroupTitle}>Has the car been modified in any way?</h4>
              <p className={editStyles.fieldGroupDescription}>Modifications are changes to the car's original specification. These can be mechanical, or cosmetic changes inside or outside the car.</p>
              <div className={styles.cleanFormGrid2Col}>
                <Dropdown
                  label=""
                  selected={vehicleModified}
                  options={yesNoOptions}
                  setSelected={(value) => handleDropdownChange("vehicleModified", value)}
                  placeholder="Select option"
                />
              </div>
              {vehicleModified === "Yes" && vehicleModifications.length > 0 && (
                <div className={styles.modificationsListContainer}>
                  <div className={styles.modificationsLabelWrapper}>
                    <p className={styles.modificationsLabel}>Selected Modifications:</p>
                    <button
                      type="button"
                      className={styles.editModificationsBtn}
                      onClick={() => setShowModificationsModal(true)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className={styles.modificationsTagsList}>
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
            <div className={editStyles.fieldGroup}>
              <h4 className={editStyles.fieldGroupTitle}>What type of alarm and/or immobiliser does the car have?</h4>
              <p className={editStyles.fieldGroupDescription}>Check your car's manual if you're unsure.</p>
              <div className={styles.cleanFormGrid2Col}>
                <Dropdown
                  label=""
                  selected={watch("vehicleDetails.alarmImmobiliser") || ""}
                  options={alarmImmobiliserOptions}
                  setSelected={(value) => handleDropdownChange("alarmImmobiliser", value)}
                  placeholder="Select alarm type"
                />
              </div>
            </div>

            {/* Tracking Device */}
            <div className={editStyles.fieldGroup}>
              <h4 className={editStyles.fieldGroupTitle}>Is the car fitted with a tracking device?</h4>
              <div className={styles.cleanFormGrid2Col}>
                <Dropdown
                  label=""
                  selected={watch("vehicleDetails.trackingDevice") || ""}
                  options={trackingDeviceOptions}
                  setSelected={(value) => handleDropdownChange("trackingDevice", value)}
                  placeholder="Select option"
                />
              </div>
            </div>

            {/* Imported Vehicle */}
            <div className={editStyles.fieldGroup}>
              <h4 className={editStyles.fieldGroupTitle}>Is the car an import?</h4>
              <div className={styles.cleanFormGrid2Col}>
                <Dropdown
                  label=""
                  selected={watch("vehicleDetails.importedVehicle") || ""}
                  options={yesNoOptions}
                  setSelected={(value) => handleDropdownChange("importedVehicle", value)}
                  placeholder="Select option"
                />
              </div>
            </div>

            {/* Driver Side */}
            <div className={editStyles.fieldGroup}>
              <h4 className={editStyles.fieldGroupTitle}>Is the car left or right-hand drive?</h4>
              <p className={editStyles.fieldGroupDescription}>The UK standard is right-hand drive. This means that when you are sat in the vehicle facing the windscreen, the steering wheel is on the right side.</p>
              <div className={styles.cleanFormGrid2Col}>
                <Dropdown
                  label=""
                  selected={watch("vehicleDetails.driverSide") || ""}
                  options={driverSideOptions}
                  setSelected={(value) => handleDropdownChange("driverSide", value)}
                  placeholder="Select option"
                />
              </div>
            </div>

            {/* Seats */}
            <div className={editStyles.fieldGroup}>
              <h4 className={editStyles.fieldGroupTitle}>How many seats are there in the car?</h4>
              <p className={editStyles.fieldGroupDescription}>Count the number of seatbelts if you're unsure.</p>
              <div className={styles.cleanFormGrid2Col}>
                <Dropdown
                  label=""
                  selected={watch("vehicleDetails.seats") || ""}
                  options={seatsOptions}
                  setSelected={(value) => handleDropdownChange("seats", value)}
                  placeholder="Select number of seats"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={editStyles.actionButtons}>
            <button
              type="button"
              onClick={() => router.back()}
              className={editStyles.cancelBtn}
              disabled={isSubmitting}
            >
              Back
            </button>
            <button
              type="submit"
              className={editStyles.saveBtn}
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
