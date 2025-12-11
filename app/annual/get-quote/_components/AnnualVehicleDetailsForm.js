"use client";
import React, { useState, useEffect, useReducer, useCallback, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import RegistrationInput from "./RegistrationInput";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import FormDateInput from "@/ui/inputs/FormDateInput";
import Title from "@/ui/insurance-quotes/title/Title";
import styles from "./annualVehicle.module.css";

const VehicleModificationsModal = dynamic(
  () => import("./VehicleModificationsModal"),
  { ssr: false }
);
import { buildVehicleQuery, clearDependentFields, shouldAutoSelect } from "../../../temporary/get-quote/helperFucntion";

// Simplified state for vehicle data
const initialState = {
  makes: [],
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

const vehicleWorthOptions = [
  "£0 - £5,000",
  "£5,000 - £10,000",
  "£10,000 - £20,000",
  "£20,000 - £30,000",
  "£30,000 - £50,000",
  "Over £50,000",
];

const carColors = [
  "White",
  "Black",
  "Gray",
  "Silver",
  "Blue",
  "Red",
  "Green",
  "Brown",
  "Orange",
  "Beige",
  "Purple",
  "Gold",
  "Yellow",
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

const AnnualVehicleDetailsForm = ({ form, onVehicleDataFound, autoTriggerLookup = false }) => {
  const [showVehicleDetails, setShowVehicleDetails] = useState(false);
  const [isLoadingVehicleData, setIsLoadingVehicleData] = useState(false);
  const [state, dispatch] = useReducer(vehicleReducer, initialState);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [foundVehicleData, setFoundVehicleData] = useState(null);
  const [showFoundData, setShowFoundData] = useState(false);
  const [haventBoughtYet, setHaventBoughtYet] = useState(false);
  const [showModificationsModal, setShowModificationsModal] = useState(false);
  const isAutoSelectingRef = useRef(false);
  const hasAutoTriggeredRef = useRef(false);

  const { register, formState: { errors }, watch, setValue, setError, trigger, clearErrors, reset } = form;

  // Watch all form values
  const selectedMake = watch("vehicleDetails.make");
  const selectedModel = watch("vehicleDetails.model");
  const selectedYear = watch("vehicleDetails.year");
  const selectedDoors = watch("vehicleDetails.doors");
  const selectedFuel = watch("vehicleDetails.fuel");
  const purchaseDate = watch("vehicleDetails.purchaseDate");
  const owner = watch("vehicleDetails.owner");
  const registeredKeeper = watch("vehicleDetails.registeredKeeper");
  const legalOwner = watch("vehicleDetails.legalOwner");
  const vehicleModified = watch("vehicleDetails.vehicleModified");
  const vehicleModifications = watch("vehicleDetails.vehicleModifications") || [];

  // Open modifications modal when "Yes" is selected
  useEffect(() => {
    if (vehicleModified === "Yes") {
      setShowModificationsModal(true);
    }
  }, [vehicleModified]);

  // Clear owner and keeper fields if legal owner is "Yes"
  useEffect(() => {
    if (legalOwner === "Yes") {
      setValue("vehicleDetails.owner", "", { shouldValidate: false });
      setValue("vehicleDetails.registeredKeeper", "", { shouldValidate: false });
      setValue("vehicleDetails.ownerOther", "", { shouldValidate: false });
      setValue("vehicleDetails.registeredKeeperOther", "", { shouldValidate: false });
    }
  }, [legalOwner, setValue]);

  const handleModificationsConfirm = (selectedModifications) => {
    setValue("vehicleDetails.vehicleModifications", selectedModifications, {
      shouldValidate: true,
      shouldDirty: true,
    });
    // If no modifications are selected, reset vehicle modified to "No"
    if (selectedModifications.length === 0) {
      setValue("vehicleDetails.vehicleModified", "No", {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    setShowModificationsModal(false);
  };

  const handleModificationsCancel = () => {
    // Only reset to "No" if no modifications have been selected yet
    if (vehicleModifications.length === 0) {
      setValue("vehicleDetails.vehicleModified", "No", {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    setShowModificationsModal(false);
  };

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

  const fetchMakes = useCallback(async () => {
    const defaultMakes = ["Audi", "BMW", "Ford", "Honda", "Toyota", "Volkswagen"];
    dispatch({ type: "SET_MAKES", payload: defaultMakes });
  }, [setValue]);

  const fetchVehicleData = useCallback(async () => {
    const defaultOptions = {
      models: ["Model A", "Model B", "Model C"],
      years: ["2024", "2023", "2022", "2021", "2020"],
      doors: ["2", "4", "5"],
      fuels: ["Petrol", "Diesel", "Hybrid", "Electric"],
      transmissions: ["Manual", "Automatic"],
    };

    dispatch({
      type: "SET_VEHICLE_DATA",
      payload: {
        values: {},
        options: defaultOptions,
      },
    });
  }, []);

  const lastQueryRef = useRef("");

  useEffect(() => {
    fetchMakes();
  }, [fetchMakes]);

  useEffect(() => {
    if (isAutoSelectingRef.current) return;

    const currentQuery = buildVehicleQuery(watch);
    const previousQuery = lastQueryRef.current;

    if (currentQuery !== previousQuery) {
      const previousParams = new URLSearchParams(previousQuery);
      const currentParams = new URLSearchParams(currentQuery);

      let fieldsToClear = {};
      let shouldClearOptions = false;

      const fieldChanges = [
        { param: "make", clear: { model: "", year: "", doors: "", fuel: "", transmission: "" }, clearOptions: true },
        { param: "model", clear: { year: "", doors: "", fuel: "", transmission: "" }, clearOptions: false },
        { param: "year", clear: { doors: "", fuel: "", transmission: "" }, clearOptions: false },
        { param: "doors", clear: { fuel: "", transmission: "" }, clearOptions: false },
        { param: "fuel", clear: { transmission: "" }, clearOptions: false },
      ];

      for (const { param, clear, clearOptions } of fieldChanges) {
        if (previousParams.get(param) !== currentParams.get(param)) {
          clearDependentFields(param, setValue, isAutoSelectingRef, clearErrors);
          fieldsToClear = clear;
          shouldClearOptions = clearOptions;
          break;
        }
      }

      if (Object.keys(fieldsToClear).length > 0) {
        const optionsToUse = shouldClearOptions
          ? { models: [], years: [], doors: [], fuels: [], transmissions: [] }
          : state.options;

        dispatch({
          type: "SET_VEHICLE_DATA",
          payload: {
            values: fieldsToClear,
            options: optionsToUse,
          },
        });
      }

      lastQueryRef.current = currentQuery;

      if (selectedMake) {
        fetchVehicleData();
      } else {
        dispatch({ type: "CLEAR_OPTIONS" });
      }
    }
  }, [selectedMake, selectedModel, selectedYear, selectedDoors, selectedFuel, fetchVehicleData, watch, setValue, clearErrors, state.options]);

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

      if (onVehicleDataFound) {
        onVehicleDataFound(mockVehicleData);
      }

      setValue("vehicleDetails.apiData", mockVehicleData);
      setValue("vehicleDetails.registrationNumber", cleanRegNumber);
      setValue("vehicleDetails.type", "Car");
      setValue("vehicleDetails.make", mockVehicleData.make);
      setValue("vehicleDetails.model", mockVehicleData.model);
      setValue("vehicleDetails.year", mockVehicleData.yearOfManufacture);
      setValue("vehicleDetails.fuel", mockVehicleData.fuelType);
      setValue("vehicleDetails.transmission", mockVehicleData.transmission);
      setValue("vehicleDetails.colour", mockVehicleData.colour);

      clearErrors("vehicleDetails.registrationNumber");
      clearErrors("vehicleDetails.type");
      clearErrors("vehicleDetails.make");
      clearErrors("vehicleDetails.model");

      setIsLoadingVehicleData(false);
    }, 3000);
  }, [watch, setError, onVehicleDataFound, setValue, clearErrors]);

  const handleChangeVehicle = () => {
    setFoundVehicleData(null);
    setShowFoundData(false);
    setValue("vehicleDetails.registrationNumber", "");
    setValue("vehicleDetails.apiData", null);
    clearErrors("vehicleDetails.registrationNumber");

    if (onVehicleDataFound) {
      onVehicleDataFound(null);
    }
  };

  useEffect(() => {
    if (autoTriggerLookup && !hasAutoTriggeredRef.current) {
      const registrationNumber = watch("vehicleDetails.registrationNumber");
      if (registrationNumber && registrationNumber.trim()) {
        hasAutoTriggeredRef.current = true;
        setTimeout(() => {
          handleFindVehicle();
        }, 500);
      }
    }
  }, [autoTriggerLookup, watch, handleFindVehicle]);

  const handleHaventBoughtChange = (e) => {
    const isChecked = e.target.checked;
    setHaventBoughtYet(isChecked);
    if (isChecked) {
      setValue("vehicleDetails.purchaseDate", "");
    } else {
      // When unchecking, also clear the legal owner field
      setValue("vehicleDetails.legalOwner", "", { shouldValidate: false });
    }
  };

  return (
    <>
      <VehicleModificationsModal
        isOpen={showModificationsModal}
        onClose={handleModificationsCancel}
        onConfirm={handleModificationsConfirm}
        selectedModifications={vehicleModifications}
      />
      <ComponentWrapper title="Your Vehicle Information">
        <div className={styles.content}>
        {/* Instruction Message */}
        <div className={styles.instructionBox}>
          <div className={styles.instructionIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#5a6b7d" strokeWidth="2"/>
              <path d="M12 16V12M12 8H12.01" stroke="#5a6b7d" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className={styles.instructionContent}>
            <p className={styles.instructionText}>Please provide accurate vehicle details to ensure we calculate the correct insurance quote for you.</p>
          </div>
        </div>

        {/* Vehicle Registration Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Vehicle Registration</h3>
            <p className={styles.sectionDescription}>Find your vehicle using its registration number or enter details manually</p>
          </div>
          <div className={styles.registrationSection}>
            {!showFoundData ? (
              <div className={styles.registrationInputWrapper}>
                <div className={styles.inputContainer}>
                  <RegistrationInput
                    label="What is your registration number?"
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
                  />
                </div>
                <div className={styles.dividerWithText}>
                  <span className={styles.dividerText}>OR</span>
                </div>
                <Button type="button" className={styles.manualEntryBtn} onClick={toggleVehicleDetails} appearance="default">
                  <span className={styles.manualEntryIcon}>✎</span>
                  <span className={styles.manualEntryText}>Enter Vehicle Details Manually</span>
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

        {showVehicleDetails && !foundVehicleData && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Vehicle Specification</h3>
              <p className={styles.sectionDescription}>Provide details about your vehicle's make, model, and features</p>
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
            {!foundVehicleData && (
              <div className={styles.cleanFormGrid2Col}>
                <Dropdown
                  label="My Vehicle is a...."
                  selected={watch("vehicleDetails.type") || ""}
                  options={["Car", "Motorcycle", "Truck", "Bus"]}
                  setSelected={(value) => handleDropdownChange("type", value)}
                  placeholder="Choose Vehicle"
                />
                {watch("vehicleDetails.type") && !foundVehicleData && (
                  <Dropdown
                    label="Make"
                    selected={state.values.make || selectedMake || ""}
                    options={state.makes}
                    setSelected={(value) => handleDropdownChange("make", value)}
                    placeholder="Select Make"
                  />
                )}
              </div>
            )}

            {selectedMake && !foundVehicleData && (
              <div className={`${styles.cleanFormGrid2Col} ${styles.progressiveRow}`}>
                <div className={styles.rsuiteFormGroup}>
                  <label className={styles.label}>Model</label>
                  <SelectPicker
                    key={`model-${forceUpdate}`}
                    data={state.options.models.map((option) => ({ label: option, value: option }))}
                    placeholder="Select Model"
                    disabled={!!foundVehicleData || !selectedMake || state.options.models.length === 0}
                    value={state.values.model || selectedModel || null}
                    onChange={(value) => handleDropdownChange("model", value || "")}
                    className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.model ? styles.error : ""}`}
                    style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                  />
                  {errors.vehicleDetails?.model && (
                    <span className={styles.errorMessage}>{errors.vehicleDetails.model.message}</span>
                  )}
                </div>
                <div className={styles.rsuiteFormGroup}>
                  <label className={styles.label}>Year</label>
                  <SelectPicker
                    key={`year-${forceUpdate}`}
                    data={state.options.years.map((option) => ({ label: option, value: option }))}
                    placeholder="Select Year"
                    disabled={!!foundVehicleData || !selectedMake || state.options.years.length === 0}
                    value={state.values.year || selectedYear || null}
                    onChange={(value) => handleDropdownChange("year", value || "")}
                    className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.year ? styles.error : ""}`}
                    style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                  />
                  {errors.vehicleDetails?.year && (
                    <span className={styles.errorMessage}>{errors.vehicleDetails.year.message}</span>
                  )}
                </div>
              </div>
            )}

            {selectedYear && !foundVehicleData && (
              <div className={`${styles.cleanFormGrid2Col} ${styles.progressiveRow}`}>
                <div className={styles.rsuiteFormGroup}>
                  <label className={styles.label}>Doors</label>
                  <SelectPicker
                    key={`doors-${forceUpdate}`}
                    data={state.options.doors.map((option) => ({ label: option, value: option }))}
                    placeholder="Select Doors"
                    disabled={!!foundVehicleData || !selectedYear || state.options.doors.length === 0}
                    value={state.values.doors || selectedDoors || null}
                    onChange={(value) => handleDropdownChange("doors", value || "")}
                    className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.doors ? styles.error : ""}`}
                    style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                  />
                  {errors.vehicleDetails?.doors && (
                    <span className={styles.errorMessage}>{errors.vehicleDetails.doors.message}</span>
                  )}
                </div>
                <div className={styles.rsuiteFormGroup}>
                  <label className={styles.label}>Fuel Type</label>
                  <SelectPicker
                    key={`fuel-${forceUpdate}`}
                    data={state.options.fuels.map((option) => ({ label: option, value: option }))}
                    placeholder="Select Fuel Type"
                    disabled={!!foundVehicleData || !selectedYear || state.options.fuels.length === 0}
                    value={state.values.fuel || selectedFuel || null}
                    onChange={(value) => handleDropdownChange("fuel", value || "")}
                    className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.fuel ? styles.error : ""}`}
                    style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                  />
                  {errors.vehicleDetails?.fuel && (
                    <span className={styles.errorMessage}>{errors.vehicleDetails.fuel.message}</span>
                  )}
                </div>
              </div>
            )}

            {selectedFuel && !foundVehicleData && (
              <div className={`${styles.cleanFormGrid2Col} ${styles.progressiveRow}`}>
                <div className={styles.rsuiteFormGroup}>
                  <label className={styles.label}>Transmission</label>
                  <SelectPicker
                    key={`transmission-${forceUpdate}`}
                    data={state.options.transmissions.map((option) => ({ label: option, value: option }))}
                    placeholder="Select Transmission"
                    disabled={!!foundVehicleData || !selectedFuel || state.options.transmissions.length === 0}
                    value={state.values.transmission || watch("vehicleDetails.transmission") || null}
                    onChange={(value) => handleDropdownChange("transmission", value || "")}
                    className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.transmission ? styles.error : ""}`}
                    style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                  />
                  {errors.vehicleDetails?.transmission && (
                    <span className={styles.errorMessage}>{errors.vehicleDetails.transmission.message}</span>
                  )}
                </div>
                <div className={styles.rsuiteFormGroup}>
                  <label className={styles.label}>Vehicle Color</label>
                  <SelectPicker
                    data={carColors.map((option) => ({ label: option, value: option }))}
                    placeholder="Select Color"
                    value={watch("vehicleDetails.colour") || null}
                    onChange={(value) => handleDropdownChange("colour", value || "")}
                    disabled={!!foundVehicleData}
                    className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.colour ? styles.error : ""}`}
                    style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                  />
                  {errors.vehicleDetails?.colour && (
                    <span className={styles.errorMessage}>{errors.vehicleDetails.colour.message}</span>
                  )}
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
          {vehicleModified === "Yes" && vehicleModifications.length > 0 && (
            <div className={styles.modificationsListContainer}>
              <div className={styles.modificationsLabelWrapper}>
                <p className={styles.modificationsLabel}>Selected Modifications:</p>
                <Button
                  type="button"
                  className={styles.editModificationsBtn}
                  onClick={() => setShowModificationsModal(true)}
                  appearance="default"
                >
                  Edit
                </Button>
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

          <div className={styles.cleanFormGrid2Col}>
            <div className={styles.rsuiteFormGroup}>
              <label className={styles.label}>How much is your vehicle worth?</label>
              <SelectPicker
                data={vehicleWorthOptions.map((option) => ({ label: option, value: option }))}
                placeholder="Please select"
                value={watch("vehicleDetails.worth") || null}
                onChange={(value) => setValue("vehicleDetails.worth", value || "")}
                className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.worth ? styles.error : ""}`}
                style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
              />
              {errors.vehicleDetails?.worth && (
                <span className={styles.errorMessage}>{errors.vehicleDetails.worth.message}</span>
              )}
            </div>
          </div>
          </div>
        </div>

        {/* Purchase & Ownership Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Purchase & Ownership</h3>
            <p className={styles.sectionDescription}>Details about when you purchased the vehicle and who owns it</p>
          </div>
          <div className={styles.ownershipSection}>
          <div className={styles.cleanFormGrid2Col}>
            <div className={`${styles.dateWithCheckbox} ${haventBoughtYet ? styles.disabled : ''}`}>
              <FormDateInput
                type="date"
                dateLabel="When was the car bought?"
                {...register("vehicleDetails.purchaseDate")}
                value={purchaseDate || ""}
                onChange={(e) => setValue("vehicleDetails.purchaseDate", e.target.value)}
                error={errors.vehicleDetails?.purchaseDate}
                allowPastDates={true}
                reducedPadding={true}
                minDate={new Date(1960, 0, 1)}
                maxDate={new Date()}
                disabled={haventBoughtYet}
              />
              <Button
                type="button"
                className={styles.haventBoughtBtn}
                onClick={(e) => handleHaventBoughtChange({ target: { checked: !haventBoughtYet } })}
                appearance="default"
              >
                I haven't bought it yet
              </Button>
            </div>
            {haventBoughtYet && (
              <div className={styles.rsuiteFormGroup}>
                <label className={styles.label}>Will you be the legal and registered owner?</label>
                <SelectPicker
                  data={yesNoOptions.map((option) => ({ label: option, value: option }))}
                  placeholder="Please select"
                  value={watch("vehicleDetails.legalOwner") || null}
                  onChange={(value) => setValue("vehicleDetails.legalOwner", value || "")}
                  className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.legalOwner ? styles.error : ""}`}
                  style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                />
                {errors.vehicleDetails?.legalOwner && (
                  <span className={styles.errorMessage}>{errors.vehicleDetails.legalOwner.message}</span>
                )}
              </div>
            )}
          </div>

          {legalOwner !== "Yes" && (
            <div className={styles.cleanFormGrid2Col}>
              <div className={styles.ownerFieldWrapper}>
                <div className={styles.rsuiteFormGroup}>
                  <label className={styles.label}>{haventBoughtYet ? "Who will be the owner?" : "Who is the owner?"}</label>
                  <SelectPicker
                    data={ownerOptions.map((option) => ({ label: option, value: option }))}
                    placeholder="Please select"
                    value={watch("vehicleDetails.owner") || null}
                    onChange={(value) => setValue("vehicleDetails.owner", value || "")}
                    className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.owner ? styles.error : ""}`}
                    style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                  />
                  {errors.vehicleDetails?.owner && (
                    <span className={styles.errorMessage}>{errors.vehicleDetails.owner.message}</span>
                  )}
                </div>
                {owner === "Other" && (
                  <div className={styles.rsuiteFormGroup}>
                    <label className={styles.label}>Please specify owner</label>
                    <Input
                      type="text"
                      placeholder="Enter owner details"
                      value={watch("vehicleDetails.ownerOther") || ""}
                      onChange={(value) => setValue("vehicleDetails.ownerOther", value)}
                    />
                    {errors.vehicleDetails?.ownerOther && (
                      <span className={styles.errorMessage}>{errors.vehicleDetails.ownerOther.message}</span>
                    )}
                  </div>
                )}
              </div>
              <div className={styles.keeperFieldWrapper}>
                <div className={styles.rsuiteFormGroup}>
                  <label className={styles.label}>{haventBoughtYet ? "Who will be the registered keeper?" : "Who is the registered keeper?"}</label>
                  <SelectPicker
                    data={keeperOptions.map((option) => ({ label: option, value: option }))}
                    placeholder="Please select"
                    value={watch("vehicleDetails.registeredKeeper") || null}
                    onChange={(value) => setValue("vehicleDetails.registeredKeeper", value || "")}
                    className={`${styles.rsuiteSelect} ${errors.vehicleDetails?.registeredKeeper ? styles.error : ""}`}
                    style={{ width: "100%", minHeight: "5rem", padding: "1.2rem 1.6rem", fontSize: "1.6rem" }}
                  />
                  {errors.vehicleDetails?.registeredKeeper && (
                    <span className={styles.errorMessage}>{errors.vehicleDetails.registeredKeeper.message}</span>
                  )}
                </div>
                {registeredKeeper === "Other" && (
                  <div className={styles.rsuiteFormGroup}>
                    <label className={styles.label}>Please specify registered keeper</label>
                    <Input
                      type="text"
                      placeholder="Enter registered keeper details"
                      value={watch("vehicleDetails.registeredKeeperOther") || ""}
                      onChange={(value) => setValue("vehicleDetails.registeredKeeperOther", value)}
                    />
                    {errors.vehicleDetails?.registeredKeeperOther && (
                      <span className={styles.errorMessage}>{errors.vehicleDetails.registeredKeeperOther.message}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </ComponentWrapper>
    </>
  );
};

export default AnnualVehicleDetailsForm;
