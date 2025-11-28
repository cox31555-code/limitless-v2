"use client";

import React, { useState, useCallback, useEffect, useReducer, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { annualInsuranceSchema } from "@/utils/schemas/insuranceSchema";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import { SelectPicker, Button, Input } from "rsuite";
import RegistrationInput from "@/app/annual/get-quote/_components/RegistrationInput";
import VehicleModificationsModal from "@/app/annual/get-quote/_components/VehicleModificationsModal";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import styles from "@/app/annual/get-quote/_components/annualVehicle.module.css";
import replaceStyles from "./replaceVehicleClient.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const vehicleWorthOptions = [
  "£0 - £5,000",
  "£5,000 - £10,000",
  "£10,000 - £20,000",
  "£20,000 - £30,000",
  "£30,000 - £50,000",
  "Over £50,000",
];

const carColors = [
  "White", "Black", "Gray", "Silver", "Blue", "Red", "Green", "Brown",
  "Orange", "Beige", "Purple", "Gold", "Yellow",
];

const trackingDeviceOptions = ["No", "Yes - Factory Fitted", "Yes - Aftermarket"];
const alarmImmobiliserOptions = [
  "No",
  "Thatcham approved immobiliser",
  "Thatcham approved alarm",
  "Thatcham approved alarm and immobiliser",
  "Factory fitted immobiliser",
  "Factory fitted alarm and immobiliser",
  "Other",
];
const yesNoOptions = ["No", "Yes"];
const ownerOptions = ["Policyholder", "Spouse/Partner", "Parent", "Company", "Other"];
const keeperOptions = ["Policyholder", "Spouse/Partner", "Parent", "Company", "Other"];

const initialVehicleState = {
  makes: ["Audi", "BMW", "Ford", "Honda", "Toyota", "Volkswagen"],
  error: null,
  options: {
    models: [],
    years: [],
    doors: [],
    fuels: [],
    transmissions: [],
  },
  values: {
    make: "",
    model: "",
    year: "",
    doors: "",
    fuel: "",
    transmission: "",
  },
};

const vehicleReducer = (state, action) => {
  switch (action.type) {
    case "SET_MAKES":
      return { ...state, makes: action.payload };
    case "SET_VEHICLE_DATA":
      return {
        ...state,
        options: action.payload.options || state.options,
        values: { ...state.values, ...(action.payload.values || {}) },
        error: null,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_OPTIONS":
      return {
        ...state,
        options: {
          models: [],
          years: [],
          doors: [],
          fuels: [],
          transmissions: [],
        },
      };
    default:
      return state;
  }
};

const ReplaceVehicleClient = ({ policyId, policy, vehicleDetails }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVehicleDetails, setShowVehicleDetails] = useState(false);
  const [isLoadingVehicleData, setIsLoadingVehicleData] = useState(false);
  const [state, dispatch] = useReducer(vehicleReducer, initialVehicleState);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [foundVehicleData, setFoundVehicleData] = useState(null);
  const [showFoundData, setShowFoundData] = useState(false);
  const [showModificationsModal, setShowModificationsModal] = useState(false);
  const isAutoSelectingRef = useRef(false);

  const form = useForm({
    resolver: zodResolver(annualInsuranceSchema),
    defaultValues: {
      vehicleDetails: {
        registrationNumber: "",
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
        driverSide: "Right Hand",
        seats: "5",
      },
    },
  });

  const { watch, setValue, register, formState: { errors }, setError, clearErrors } = form;

  const selectedType = watch("vehicleDetails.type");
  const selectedMake = watch("vehicleDetails.make");
  const selectedModel = watch("vehicleDetails.model");
  const selectedYear = watch("vehicleDetails.year");
  const selectedDoors = watch("vehicleDetails.doors");
  const selectedFuel = watch("vehicleDetails.fuel");
  const vehicleModified = watch("vehicleDetails.vehicleModified");
  const vehicleModifications = watch("vehicleDetails.vehicleModifications") || [];
  const legalOwner = watch("vehicleDetails.legalOwner");
  const owner = watch("vehicleDetails.owner");

  const toggleVehicleDetails = () => {
    setShowVehicleDetails(!showVehicleDetails);
  };

  const handleDropdownChange = (field, value) => {
    setValue(`vehicleDetails.${field}`, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    dispatch({
      type: "SET_VEHICLE_DATA",
      payload: {
        values: { [field]: value },
        options: state.options,
      },
    });
  };

  const handleFindVehicle = useCallback(async () => {
    const registrationNumber = watch("vehicleDetails.registrationNumber");

    if (!registrationNumber?.trim()) {
      setError("vehicleDetails.registrationNumber", {
        message: "Please enter a registration number",
      });
      return;
    }

    const cleanRegNumber = registrationNumber.trim().toUpperCase();
    setIsLoadingVehicleData(true);

    setTimeout(() => {
      const mockVehicleData = {
        registrationNumber: cleanRegNumber,
        make: "Toyota",
        model: "Corolla",
        yearOfManufacture: "2023",
        fuelType: "Petrol",
        transmission: "Automatic",
        colour: "Black",
      };

      setFoundVehicleData(mockVehicleData);
      setShowFoundData(true);

      setValue("vehicleDetails.registrationNumber", cleanRegNumber);
      setValue("vehicleDetails.type", "Car");
      setValue("vehicleDetails.make", mockVehicleData.make);
      setValue("vehicleDetails.model", mockVehicleData.model);
      setValue("vehicleDetails.year", mockVehicleData.yearOfManufacture);
      setValue("vehicleDetails.fuel", mockVehicleData.fuelType);
      setValue("vehicleDetails.transmission", mockVehicleData.transmission);
      setValue("vehicleDetails.colour", mockVehicleData.colour);
      setValue("vehicleDetails.alarmImmobiliser", "Factory Fitted Thatcham Approved Alarm/Immobiliser");
      setValue("vehicleDetails.trackingDevice", "No");
      setValue("vehicleDetails.importedVehicle", "No");
      setValue("vehicleDetails.driverSide", "Right Hand");
      setValue("vehicleDetails.seats", "5");

      clearErrors("vehicleDetails.registrationNumber");
      setIsLoadingVehicleData(false);
    }, 3000);
  }, [watch, setError, setValue, clearErrors]);

  const handleChangeVehicle = () => {
    setFoundVehicleData(null);
    setShowFoundData(false);
    setValue("vehicleDetails.registrationNumber", "");
    clearErrors("vehicleDetails.registrationNumber");
  };

  // Fetch vehicle data when make is selected
  useEffect(() => {
    if (selectedMake) {
      const defaultOptions = {
        models: ["Model A", "Model B", "Model C"],
        years: ["2024", "2023", "2022", "2021", "2020"],
        doors: ["2", "4", "5"],
        fuels: ["Petrol", "Diesel", "Hybrid", "Electric"],
        transmissions: ["Manual", "Automatic"],
      };
      dispatch({
        type: "SET_VEHICLE_DATA",
        payload: { values: {}, options: defaultOptions },
      });
    }
  }, [selectedMake]);

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
          <ComponentWrapper title="Your New Vehicle Information">
            <div className={styles.content}>
              {/* Instruction Box */}
              <div className={styles.instructionBox}>
                <div className={styles.instructionIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#5a6b7d" strokeWidth="2"/>
                    <path d="M12 16V12M12 8H12.01" stroke="#5a6b7d" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className={styles.instructionContent}>
                  <p className={styles.instructionText}>We can only show you quotes for cars registered in the UK.</p>
                </div>
              </div>

              {/* Vehicle Registration Section */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>What's your car's registration?</h3>
                </div>
                <div className={styles.registrationSection}>
                  {!showFoundData ? (
                    <div className={styles.registrationInputWrapper}>
                      <div className={styles.inputContainer}>
                        <RegistrationInput
                          label="Registration Number"
                          value={watch("vehicleDetails.registrationNumber")}
                          onChange={(e) => {
                            const formattedValue = e.target.value.toUpperCase();
                            setValue("vehicleDetails.registrationNumber", formattedValue, {
                              shouldValidate: false,
                              shouldDirty: true,
                              shouldTouch: true,
                            });
                          }}
                          onButtonClick={handleFindVehicle}
                          disabled={showFoundData || isLoadingVehicleData}
                          isLoading={isLoadingVehicleData}
                          error={errors.vehicleDetails?.registrationNumber?.message}
                          placeholder="Enter car registration..."
                          buttonText="Find my car"
                        />
                      </div>
                      <div className={styles.dividerWithText}>
                        <span className={styles.dividerText}>OR</span>
                      </div>
                      <Button
                        type="button"
                        className={styles.manualEntryBtn}
                        onClick={toggleVehicleDetails}
                        appearance="default"
                      >
                        <span className={styles.manualEntryIcon}>✎</span>
                        <span className={styles.manualEntryText}>Enter make and model</span>
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className={styles.vehicleDataDisplay}>
                        <p className={styles.vehicleDataRow}>
                          {foundVehicleData.make} {foundVehicleData.model} ({foundVehicleData.yearOfManufacture})
                        </p>
                        <p className={styles.vehicleDataRow}>
                          {foundVehicleData.registrationNumber}
                        </p>
                      </div>
                      <Button
                        type="button"
                        className={styles.changeVehicleBtn}
                        onClick={handleChangeVehicle}
                        appearance="default"
                      >
                        Change Vehicle
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Manual Vehicle Entry Section Header */}
              {showVehicleDetails && !foundVehicleData && (
                <div className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>Enter Vehicle Details</h3>
                    <p className={styles.sectionDescription}>Back to registration lookup</p>
                  </div>
                </div>
              )}

              {/* Manual Vehicle Entry */}
              <div
                className={`${styles.vehicleDetailsContainer} ${
                  showVehicleDetails && !foundVehicleData ? styles.vehicleDetailsVisible : styles.vehicleDetailsHidden
                }`}
              >
                <div className={styles.rows}>
                  {/* Instruction */}
                  {showVehicleDetails && !foundVehicleData && (
                    <div className={replaceStyles.progressiveInstruction}>
                      Please complete each field in order to unlock the next selection.
                    </div>
                  )}

                  {/* Vehicle Type and Make Row */}
                  {!foundVehicleData && (
                    <div className={styles.cleanFormGrid2Col}>
                      <Dropdown
                        label="Vehicle Type"
                        selected={watch("vehicleDetails.type") || ""}
                        options={["Car", "Motorcycle", "Truck", "Bus"]}
                        setSelected={(value) => handleDropdownChange("type", value)}
                        placeholder="Select vehicle type"
                      />
                      {selectedType && (
                        <Dropdown
                          label="Make"
                          selected={state.values.make || selectedMake || ""}
                          options={state.makes}
                          setSelected={(value) => handleDropdownChange("make", value)}
                          placeholder="Select make"
                        />
                      )}
                    </div>
                  )}

                  {/* Model and Year Row */}
                  {selectedMake && !foundVehicleData && (
                    <div className={`${styles.cleanFormGrid2Col} ${styles.progressiveRow}`}>
                      <div className={styles.rsuiteFormGroup}>
                        <label className={styles.label}>Model</label>
                        <SelectPicker
                          key={`model-${forceUpdate}`}
                          data={state.options.models.map((option) => ({ label: option, value: option }))}
                          placeholder="Select model"
                          disabled={!selectedMake || state.options.models.length === 0}
                          value={state.values.model || selectedModel || null}
                          onChange={(value) => handleDropdownChange("model", value || "")}
                          className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.model ? styles.error : ""}`}
                          style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                        />
                      </div>
                      <div className={styles.rsuiteFormGroup}>
                        <label className={styles.label}>Year</label>
                        <SelectPicker
                          key={`year-${forceUpdate}`}
                          data={state.options.years.map((option) => ({ label: option, value: option }))}
                          placeholder="Select year"
                          disabled={!selectedMake || state.options.years.length === 0}
                          value={state.values.year || selectedYear || null}
                          onChange={(value) => handleDropdownChange("year", value || "")}
                          className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.year ? styles.error : ""}`}
                          style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Doors and Fuel Type Row */}
                  {selectedYear && !foundVehicleData && (
                    <div className={`${styles.cleanFormGrid2Col} ${styles.progressiveRow}`}>
                      <div className={styles.rsuiteFormGroup}>
                        <label className={styles.label}>Doors</label>
                        <SelectPicker
                          key={`doors-${forceUpdate}`}
                          data={state.options.doors.map((option) => ({ label: option, value: option }))}
                          placeholder="Select doors"
                          disabled={!selectedYear || state.options.doors.length === 0}
                          value={state.values.doors || selectedDoors || null}
                          onChange={(value) => handleDropdownChange("doors", value || "")}
                          className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.doors ? styles.error : ""}`}
                          style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                        />
                      </div>
                      <div className={styles.rsuiteFormGroup}>
                        <label className={styles.label}>Fuel Type</label>
                        <SelectPicker
                          key={`fuel-${forceUpdate}`}
                          data={state.options.fuels.map((option) => ({ label: option, value: option }))}
                          placeholder="Select fuel type"
                          disabled={!selectedYear || state.options.fuels.length === 0}
                          value={state.values.fuel || selectedFuel || null}
                          onChange={(value) => handleDropdownChange("fuel", value || "")}
                          className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.fuel ? styles.error : ""}`}
                          style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Transmission and Colour Row */}
                  {selectedFuel && !foundVehicleData && (
                    <div className={`${styles.cleanFormGrid2Col} ${styles.progressiveRow}`}>
                      <div className={styles.rsuiteFormGroup}>
                        <label className={styles.label}>Transmission</label>
                        <SelectPicker
                          key={`transmission-${forceUpdate}`}
                          data={state.options.transmissions.map((option) => ({ label: option, value: option }))}
                          placeholder="Select transmission"
                          disabled={!selectedFuel || state.options.transmissions.length === 0}
                          value={state.values.transmission || watch("vehicleDetails.transmission") || null}
                          onChange={(value) => handleDropdownChange("transmission", value || "")}
                          className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.transmission ? styles.error : ""}`}
                          style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                        />
                      </div>
                      <div className={styles.rsuiteFormGroup}>
                        <label className={styles.label}>Colour</label>
                        <SelectPicker
                          data={carColors.map((option) => ({ label: option, value: option }))}
                          placeholder="Select colour"
                          value={watch("vehicleDetails.colour") || null}
                          onChange={(value) => handleDropdownChange("colour", value || "")}
                          className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.colour ? styles.error : ""}`}
                          style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Safety & Security Features Section */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Safety & Security Features</h3>
                  <p className={styles.sectionDescription}>Tell us about your vehicle's safety and security features</p>
                </div>
                <div className={styles.additionalDetailsSection}>
                  <div className={styles.cleanFormGrid2Col}>
                    <div className={styles.rsuiteFormGroup}>
                      <label className={styles.label}>Alarm / Immobiliser</label>
                      <SelectPicker
                        data={alarmImmobiliserOptions.map((option) => ({ label: option, value: option }))}
                        placeholder="Please select"
                        value={watch("vehicleDetails.alarmImmobiliser") || null}
                        onChange={(value) => setValue("vehicleDetails.alarmImmobiliser", value || "")}
                        className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.alarmImmobiliser ? styles.error : ""}`}
                        style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                      />
                      {errors.vehicleDetails?.alarmImmobiliser && (
                        <span className={styles.errorMessage}>{errors.vehicleDetails.alarmImmobiliser.message}</span>
                      )}
                    </div>
                    <div className={styles.rsuiteFormGroup}>
                      <label className={styles.label}>Tracking device</label>
                      <SelectPicker
                        data={trackingDeviceOptions.map((option) => ({ label: option, value: option }))}
                        placeholder="Please select"
                        value={watch("vehicleDetails.trackingDevice") || null}
                        onChange={(value) => setValue("vehicleDetails.trackingDevice", value || "")}
                        className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.trackingDevice ? styles.error : ""}`}
                        style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                      />
                      {errors.vehicleDetails?.trackingDevice && (
                        <span className={styles.errorMessage}>{errors.vehicleDetails.trackingDevice.message}</span>
                      )}
                    </div>
                  </div>

                  <div className={styles.cleanFormGrid2Col}>
                    <div className={styles.rsuiteFormGroup}>
                      <label className={styles.label}>Imported vehicle</label>
                      <SelectPicker
                        data={yesNoOptions.map((option) => ({ label: option, value: option }))}
                        placeholder="Please select"
                        value={watch("vehicleDetails.importedVehicle") || null}
                        onChange={(value) => setValue("vehicleDetails.importedVehicle", value || "")}
                        className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.importedVehicle ? styles.error : ""}`}
                        style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                      />
                      {errors.vehicleDetails?.importedVehicle && (
                        <span className={styles.errorMessage}>{errors.vehicleDetails.importedVehicle.message}</span>
                      )}
                    </div>
                    <div className={styles.rsuiteFormGroup}>
                      <label className={styles.label}>Car hand drive</label>
                      <SelectPicker
                        data={["Left Hand", "Right Hand"].map((option) => ({ label: option, value: option }))}
                        placeholder="Please select"
                        value={watch("vehicleDetails.driverSide") || null}
                        onChange={(value) => setValue("vehicleDetails.driverSide", value || "")}
                        className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.driverSide ? styles.error : ""}`}
                        style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                      />
                      {errors.vehicleDetails?.driverSide && (
                        <span className={styles.errorMessage}>{errors.vehicleDetails.driverSide.message}</span>
                      )}
                    </div>
                  </div>

                  <div className={styles.cleanFormGrid2Col}>
                    <div className={styles.rsuiteFormGroup}>
                      <label className={styles.label}>Number of seats</label>
                      <SelectPicker
                        data={["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((option) => ({ label: option, value: option }))}
                        placeholder="Please select"
                        value={watch("vehicleDetails.seats") || null}
                        onChange={(value) => setValue("vehicleDetails.seats", value || "")}
                        className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.seats ? styles.error : ""}`}
                        style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                      />
                      {errors.vehicleDetails?.seats && (
                        <span className={styles.errorMessage}>{errors.vehicleDetails.seats.message}</span>
                      )}
                    </div>
                  </div>

                  <div className={styles.cleanFormGrid2Col}>
                    <div className={styles.rsuiteFormGroup}>
                      <label className={styles.label}>Has your vehicle been modified?</label>
                      <SelectPicker
                        data={yesNoOptions.map((option) => ({ label: option, value: option }))}
                        placeholder="Please select"
                        value={watch("vehicleDetails.vehicleModified") || null}
                        onChange={(value) => setValue("vehicleDetails.vehicleModified", value || "")}
                        className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.vehicleModified ? styles.error : ""}`}
                        style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                      />
                      {errors.vehicleDetails?.vehicleModified && (
                        <span className={styles.errorMessage}>{errors.vehicleDetails.vehicleModified.message}</span>
                      )}
                    </div>
                  </div>

                  {vehicleModified === "Yes" && (
                    <div className={styles.rsuiteFormGroup}>
                      <p className={replaceStyles.modificationInfo}>
                        Modifications are changes to the car's original specification. These can be mechanical, or cosmetic changes inside or outside the car. <a href="#" onClick={(e) => { e.preventDefault(); setShowModificationsModal(true); }}>How can I find out if my car's been modified?</a>
                      </p>
                      <Button
                        type="button"
                        className={styles.editModificationsBtn}
                        onClick={() => setShowModificationsModal(true)}
                        appearance="default"
                      >
                        Select modifications
                      </Button>
                      {vehicleModifications.length > 0 && (
                        <div className={styles.modificationsTagsList}>
                          {vehicleModifications.map((modification) => (
                            <span key={modification} className={styles.modificationTag}>
                              {modification}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ComponentWrapper>

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
