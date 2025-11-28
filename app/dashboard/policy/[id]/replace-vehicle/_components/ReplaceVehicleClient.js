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
import replaceStyles from "./replaceVehicleClient.module.css";
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

const ReplaceVehicleClient = ({ policyId, policy, vehicleDetails }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModificationsModal, setShowModificationsModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(annualInsuranceSchema),
    defaultValues: {
      vehicleDetails: {
        type: "",
        make: "",
        model: "",
        year: "",
        doors: "",
        fuel: "",
        transmission: "",
        colour: "",
        vehicleModified: "",
        vehicleModifications: [],
        alarmImmobiliser: "",
        trackingDevice: "",
        importedVehicle: "",
        driverSide: "",
        seats: "",
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
      toast.success("Vehicle replacement submitted successfully");
      router.push(`/dashboard/policy/${policyId}`);
    } catch (error) {
      toast.error("Failed to replace vehicle");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={replaceStyles.container}>
      {/* Modifications Modal */}
      <VehicleModificationsModal
        isOpen={showModificationsModal}
        onClose={handleModificationsCancel}
        onConfirm={handleModificationsConfirm}
        selectedModifications={vehicleModifications}
      />

      {/* Hero Section */}
      <section className={replaceStyles.heroSection}>
        <div className={replaceStyles.heroBackground}>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="106.238px" height="176.262px" viewBox="0 0 106.238 140.262" className={replaceStyles.heroBackgroundImage}>
            <style>{`.st0{fill:#FFFFFF;}.st1{fill:#05AFFF;}.st2{fill:#0A0913;}`}</style>
            <path className="st1" d="M86.515,75.233L44.398,94.136v25.204l-4.194-4.194l-13.187-13.187l-7.276-7.276l24.658-11.08l17.44-7.823l35.953-16.152c9.13-4.116,11.334-16.094,4.253-23.175L70.012,4.419C60.57,-5.023,44.398,1.669,44.398,15.012v20.171L0.115,55.081v19.098l17.44-7.823l39.484-17.713l4.916-2.204V27.302l-0.117,0.058v-6.457l24.677,24.677l-10.944,4.916l0.02,0.039l-46.682,21.01l-0.039-0.078L8.464,80.636c-0.351,0.156-0.683,0.312-0.995,0.488c-4.253,2.302-6.808,6.399-7.354,10.768c-0.527,4.175,0.741,8.583,4.077,11.919l32.051,32.032c9.442,9.442,25.594,2.751,25.594-10.612v-19.82l24.677-11.08l19.722-8.837V66.357L86.515,75.233z"/>
          </svg>
        </div>
        <div className={replaceStyles.heroContent}>
          <div className={replaceStyles.greetingArea}>
            <h1 className={`${replaceStyles.greetingTitle} ${plusJakartaSans.className}`}>Replace Your Vehicle</h1>
            <p className={replaceStyles.greetingSubtitle}>Select a new vehicle for your policy</p>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className={replaceStyles.breadcrumb}>
        <span className={replaceStyles.breadcrumbItem}>Dashboard</span>
        <span className={replaceStyles.breadcrumbSeparator}>›</span>
        <span className={replaceStyles.breadcrumbItem}>Manage Policy</span>
        <span className={replaceStyles.breadcrumbSeparator}>›</span>
        <span className={replaceStyles.breadcrumbItem}>Policy summary</span>
        <span className={replaceStyles.breadcrumbSeparator}>›</span>
        <span className={`${replaceStyles.breadcrumbItem} ${replaceStyles.active}`}>Replace vehicle</span>
      </div>

      {/* Content */}
      <div className={replaceStyles.contentWrapper}>
        <form onSubmit={form.handleSubmit(handleSave)} className={replaceStyles.formContainer}>
          <div className={replaceStyles.mainSection}>
            {/* Basic Vehicle Details */}
            <div className={styles.cleanFormGrid2Col}>
              <Dropdown
                label="Vehicle Type"
                selected={watch("vehicleDetails.type") || ""}
                options={vehicleTypes}
                setSelected={(value) => handleDropdownChange("type", value)}
                placeholder="Select vehicle type"
              />
              <Dropdown
                label="Make"
                selected={watch("vehicleDetails.make") || ""}
                options={vehicleMakes}
                setSelected={(value) => handleDropdownChange("make", value)}
                placeholder="Select make"
              />
            </div>

            <div className={styles.cleanFormGrid2Col}>
              <Dropdown
                label="Model"
                selected={watch("vehicleDetails.model") || ""}
                options={vehicleModels}
                setSelected={(value) => handleDropdownChange("model", value)}
                placeholder="Select model"
              />
              <Dropdown
                label="Year"
                selected={watch("vehicleDetails.year") || ""}
                options={vehicleYears}
                setSelected={(value) => handleDropdownChange("year", value)}
                placeholder="Select year"
              />
            </div>

            <div className={styles.cleanFormGrid2Col}>
              <Dropdown
                label="Doors"
                selected={watch("vehicleDetails.doors") || ""}
                options={vehicleDoors}
                setSelected={(value) => handleDropdownChange("doors", value)}
                placeholder="Select doors"
              />
              <Dropdown
                label="Fuel Type"
                selected={watch("vehicleDetails.fuel") || ""}
                options={vehicleFuels}
                setSelected={(value) => handleDropdownChange("fuel", value)}
                placeholder="Select fuel type"
              />
            </div>

            <div className={styles.cleanFormGrid2Col}>
              <Dropdown
                label="Transmission"
                selected={watch("vehicleDetails.transmission") || ""}
                options={vehicleTransmissions}
                setSelected={(value) => handleDropdownChange("transmission", value)}
                placeholder="Select transmission"
              />
              <Dropdown
                label="Colour"
                selected={watch("vehicleDetails.colour") || ""}
                options={carColors}
                setSelected={(value) => handleDropdownChange("colour", value)}
                placeholder="Select colour"
              />
            </div>

            {/* Divider */}
            <div className={replaceStyles.sectionDivider}></div>

            {/* Vehicle Modifications */}
            <div className={replaceStyles.fieldGroup}>
              <h4 className={replaceStyles.fieldGroupTitle}>Has the car been modified in any way?</h4>
              <p className={replaceStyles.fieldGroupDescription}>Modifications are changes to the car's original specification. These can be mechanical, or cosmetic changes inside or outside the car.</p>
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
            <div className={replaceStyles.fieldGroup}>
              <h4 className={replaceStyles.fieldGroupTitle}>What type of alarm and/or immobiliser does the car have?</h4>
              <p className={replaceStyles.fieldGroupDescription}>Check your car's manual if you're unsure.</p>
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
            <div className={replaceStyles.fieldGroup}>
              <h4 className={replaceStyles.fieldGroupTitle}>Is the car fitted with a tracking device?</h4>
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
            <div className={replaceStyles.fieldGroup}>
              <h4 className={replaceStyles.fieldGroupTitle}>Is the car an import?</h4>
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
            <div className={replaceStyles.fieldGroup}>
              <h4 className={replaceStyles.fieldGroupTitle}>Is the car left or right-hand drive?</h4>
              <p className={replaceStyles.fieldGroupDescription}>The UK standard is right-hand drive. This means that when you are sat in the vehicle facing the windscreen, the steering wheel is on the right side.</p>
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
            <div className={replaceStyles.fieldGroup}>
              <h4 className={replaceStyles.fieldGroupTitle}>How many seats are there in the car?</h4>
              <p className={replaceStyles.fieldGroupDescription}>Count the number of seatbelts if you're unsure.</p>
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
          <div className={replaceStyles.actionButtons}>
            <button
              type="button"
              onClick={() => router.back()}
              className={replaceStyles.cancelBtn}
              disabled={isSubmitting}
            >
              Back
            </button>
            <button
              type="submit"
              className={replaceStyles.saveBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Replacing..." : "Replace Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReplaceVehicleClient;
