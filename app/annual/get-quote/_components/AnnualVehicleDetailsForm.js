"use client";
import React, { useState, useEffect, useReducer, useCallback, useRef } from "react";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import FormTextInput from "@/ui/inputs/FormTextInput";
import FormDropdown from "@/ui/inputs/FormDropdown";
import FormDateInput from "@/ui/inputs/FormDateInput";
import Title from "@/ui/insurance-quotes/title/Title";
import styles from "./annualVehicle.module.css";
import ConfirmBtn from "@/ui/buttons/confirmBtn/ConfirmBtn";
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
    }, 300);
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
    }
  };

  return (
    <ComponentWrapper title="Vehicle Details">
      <div className={styles.content}>
        {/* Registration Number Section */}
        <div className={styles.registrationSection}>
          {!showFoundData ? (
            <>
              <FormTextInput
                reg={true}
                label="What is your registration number?"
                placeholder="Enter your registration number"
                value={watch("vehicleDetails.registrationNumber") || ""}
                onChange={(e) => {
                  const formattedValue = e.target.value;
                  setValue("vehicleDetails.registrationNumber", formattedValue, {
                    shouldValidate: false,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                }}
                error={errors.vehicleDetails?.registrationNumber}
                disabled={showFoundData}
                button={
                  <ConfirmBtn
                    title={isLoadingVehicleData ? "Loading..." : "Change Vehicle"}
                    onClick={handleFindVehicle}
                    disabled={isLoadingVehicleData}
                    type="button"
                    hideArrow={true}
                    variant="primary"
                  />
                }
              />
              <button type="button" className={styles.regBtn} onClick={toggleVehicleDetails}>
                {`Don't know the reg yet?`}
              </button>
            </>
          ) : (
            <>
              <FormTextInput
                reg={true}
                label="What is your registration number?"
                placeholder="Enter your registration number"
                {...register("vehicleDetails.registrationNumber")}
                error={errors.vehicleDetails?.registrationNumber}
                value={watch("vehicleDetails.registrationNumber") || ""}
                disabled={true}
                button={
                  <ConfirmBtn
                    title="Change Vehicle"
                    onClick={handleChangeVehicle}
                    type="button"
                    hideArrow={true}
                    variant="secondary"
                  />
                }
              />
              <button type="button" className={styles.regBtn} onClick={toggleVehicleDetails}>
                {`Don't know the reg yet?`}
              </button>
            </>
          )}
          {showFoundData && foundVehicleData && (
            <div className={styles.vehicleDataDisplay}>
              <p className={styles.vehicleDataRow}>
                {foundVehicleData.make + " "} {foundVehicleData.model + " "}
                {foundVehicleData.yearOfManufacture + " "} {foundVehicleData.registrationNumber + " "}
              </p>
              <p className={styles.vehicleDataRow}>
                {foundVehicleData.cylinderCapacity || "N/A"} {foundVehicleData.colour || "N/A"}{" "}
                {foundVehicleData.fuelType || "N/A"} {foundVehicleData.transmission || "N/A"}
              </p>
            </div>
          )}
        </div>

        {showVehicleDetails && !foundVehicleData && <Title title="What type of vehicle is it?" />}

        {/* Manual Vehicle Entry */}
        <div
          className={`${styles.vehicleDetailsContainer} ${
            showVehicleDetails && !foundVehicleData ? styles.vehicleDetailsVisible : styles.vehicleDetailsHidden
          }`}
        >
          <div className={styles.rows}>
            {!foundVehicleData && (
              <div className={styles.row}>
                <FormDropdown
                  label="My Vehicle is a...."
                  options={["Car", "Motorcycle", "Truck", "Bus"]}
                  placeholder="Choose Vehicle"
                  {...register("vehicleDetails.type")}
                  error={errors.vehicleDetails?.type}
                  disabled={!!foundVehicleData}
                />
                {watch("vehicleDetails.type") && !foundVehicleData && (
                  <FormDropdown
                    label="Make"
                    options={state.makes}
                    placeholder="Select Make"
                    value={state.values.make || selectedMake || ""}
                    onChange={(e) => handleDropdownChange("make", e.target.value)}
                    {...register("vehicleDetails.make")}
                    error={errors.vehicleDetails?.make}
                    disabled={!!foundVehicleData}
                  />
                )}
              </div>
            )}

            {selectedMake && !foundVehicleData && (
              <div className={`${styles.row} ${styles.progressiveRow}`}>
                <FormDropdown
                  key={`model-${forceUpdate}`}
                  label="Model"
                  options={state.options.models}
                  placeholder="Select Model"
                  disabled={!!foundVehicleData || !selectedMake || state.options.models.length === 0}
                  value={state.values.model || selectedModel || ""}
                  onChange={(e) => handleDropdownChange("model", e.target.value)}
                  {...register("vehicleDetails.model")}
                  error={errors.vehicleDetails?.model}
                />
                <FormDropdown
                  key={`year-${forceUpdate}`}
                  label="Year"
                  options={state.options.years}
                  placeholder="Select Year"
                  disabled={!!foundVehicleData || !selectedMake || state.options.years.length === 0}
                  value={state.values.year || selectedYear || ""}
                  onChange={(e) => handleDropdownChange("year", e.target.value)}
                  {...register("vehicleDetails.year")}
                  error={errors.vehicleDetails?.year}
                />
              </div>
            )}

            {selectedYear && !foundVehicleData && (
              <div className={`${styles.row} ${styles.progressiveRow}`}>
                <FormDropdown
                  key={`doors-${forceUpdate}`}
                  label="Doors"
                  options={state.options.doors}
                  placeholder="Select Doors"
                  disabled={!!foundVehicleData || !selectedYear || state.options.doors.length === 0}
                  value={state.values.doors || selectedDoors || ""}
                  onChange={(e) => handleDropdownChange("doors", e.target.value)}
                  {...register("vehicleDetails.doors")}
                  error={errors.vehicleDetails?.doors}
                />
                <FormDropdown
                  key={`fuel-${forceUpdate}`}
                  label="Fuel Type"
                  options={state.options.fuels}
                  placeholder="Select Fuel Type"
                  disabled={!!foundVehicleData || !selectedYear || state.options.fuels.length === 0}
                  value={state.values.fuel || selectedFuel || ""}
                  onChange={(e) => handleDropdownChange("fuel", e.target.value)}
                  {...register("vehicleDetails.fuel")}
                  error={errors.vehicleDetails?.fuel}
                />
              </div>
            )}

            {selectedFuel && !foundVehicleData && (
              <div className={`${styles.row} ${styles.progressiveRow}`}>
                <FormDropdown
                  key={`transmission-${forceUpdate}`}
                  label="Transmission"
                  options={state.options.transmissions}
                  placeholder="Select Transmission"
                  disabled={!!foundVehicleData || !selectedFuel || state.options.transmissions.length === 0}
                  value={state.values.transmission || watch("vehicleDetails.transmission") || ""}
                  onChange={(e) => handleDropdownChange("transmission", e.target.value)}
                  {...register("vehicleDetails.transmission")}
                  error={errors.vehicleDetails?.transmission}
                />
                <FormDropdown
                  label="Vehicle Color"
                  options={carColors}
                  placeholder="Select Color"
                  {...register("vehicleDetails.colour")}
                  error={errors.vehicleDetails?.colour}
                  disabled={!!foundVehicleData}
                />
              </div>
            )}
          </div>
        </div>

        {/* Additional Vehicle Details Section */}
        <div className={styles.additionalDetailsSection}>
          <div className={styles.row}>
            <FormDropdown
              label="Tracking device"
              options={trackingDeviceOptions}
              placeholder="No"
              {...register("vehicleDetails.trackingDevice")}
              error={errors.vehicleDetails?.trackingDevice}
            />
            <FormDropdown
              label="Alarm / Immobiliser"
              options={alarmImmobiliserOptions}
              placeholder="Thatcham approved immobiliser"
              {...register("vehicleDetails.alarmImmobiliser")}
              error={errors.vehicleDetails?.alarmImmobiliser}
            />
          </div>

          <div className={styles.row}>
            <FormDropdown
              label="Imported vehicle"
              options={yesNoOptions}
              placeholder="No"
              {...register("vehicleDetails.importedVehicle")}
              error={errors.vehicleDetails?.importedVehicle}
            />
            <FormDropdown
              label="Has your vehicle been modified?"
              options={yesNoOptions}
              placeholder="Yes"
              {...register("vehicleDetails.vehicleModified")}
              error={errors.vehicleDetails?.vehicleModified}
            />
          </div>

          <div className={styles.row}>
            <FormDropdown
              label="How much is your vehicle worth?"
              options={vehicleWorthOptions}
              placeholder="£0 - £5,000"
              {...register("vehicleDetails.worth")}
              error={errors.vehicleDetails?.worth}
            />
          </div>
        </div>

        {/* Ownership and Purchase Section */}
        <div className={styles.ownershipSection}>
          <div className={styles.row}>
            <div className={styles.dateWithCheckbox}>
              <FormDateInput
                type="date"
                dateLabel="When was the car bought?"
                {...register("vehicleDetails.purchaseDate")}
                value={purchaseDate || ""}
                onChange={(e) => setValue("vehicleDetails.purchaseDate", e.target.value)}
                error={errors.vehicleDetails?.purchaseDate}
                allowPastDates={true}
                reducedPadding={true}
              />
              <div className={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  id="haventBoughtYet"
                  checked={haventBoughtYet}
                  onChange={handleHaventBoughtChange}
                  className={styles.checkbox}
                />
                <label htmlFor="haventBoughtYet" className={styles.checkboxLabel}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="8" fill="#27A2FF" />
                    <path
                      d="M5.41016 8.68674L6.66366 10.3964C7.11442 11.0112 8.03679 10.9983 8.47009 10.371L11.3899 6.14453"
                      stroke="white"
                      strokeWidth="0.943366"
                      strokeLinecap="round"
                    />
                  </svg>
                  I haven&apos;t bought it yet
                </label>
              </div>
            </div>
            <FormDropdown
              label="Will you be the legal and registered owner?"
              options={yesNoOptions}
              placeholder="Yes"
              {...register("vehicleDetails.legalOwner")}
              error={errors.vehicleDetails?.legalOwner}
            />
          </div>

          <div className={styles.row}>
            <FormDropdown
              label="Who is the owner?"
              options={ownerOptions}
              placeholder="Please select"
              {...register("vehicleDetails.owner")}
              error={errors.vehicleDetails?.owner}
            />
            <FormDropdown
              label="Who is the registered keeper?"
              options={keeperOptions}
              placeholder="Please select"
              {...register("vehicleDetails.registeredKeeper")}
              error={errors.vehicleDetails?.registeredKeeper}
            />
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default AnnualVehicleDetailsForm;
