"use client";
import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useRef,
} from "react";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import FormTextInput from "@/ui/inputs/FormTextInput";
import FormDropdown from "@/ui/inputs/FormDropdown";
import Title from "@/ui/insurance-quotes/title/Title";
import styles from "./components.module.css";
import ConfirmBtn from "@/ui/buttons/confirmBtn/ConfirmBtn";
import { API_BASE_URL } from "@/utils/config";
import {
  buildVehicleQuery,
  clearDependentFields,
  shouldAutoSelect,
} from "../helperFucntion";
import axios from "axios";
import InputWithData2 from "@/ui/inputs/InputWithData2/InputWithData2";

// Simplified state for vehicle data
const initialState = {
  makes: [],
  error: null,
  // Dynamic options based on backend response
  options: {
    models: [],
    years: [],
    doors: [],
    fuels: [],
    transmissions: [],
  },
  // Current form values for controlled components
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

// Vehicle worth options
const vehicleWorthOptions = [
  "Under £5,000",
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

const VehicleDetailsForm = ({
  form,
  onVehicleDataFound,
  autoTriggerLookup = false,
}) => {
  const [showVehicleDetails, setShowVehicleDetails] = useState(false);
  const [isLoadingVehicleData, setIsLoadingVehicleData] = useState(false);
  const [state, dispatch] = useReducer(vehicleReducer, initialState);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [foundVehicleData, setFoundVehicleData] = useState(null);
  const [showFoundData, setShowFoundData] = useState(false);
  const isAutoSelectingRef = useRef(false);
  const hasAutoTriggeredRef = useRef(false);

  const {
    register,
    formState: { errors },
    watch,
    setValue,
    setError,
    trigger,
    clearErrors,
    reset,
  } = form;

  // Watch all form values
  const selectedMake = watch("vehicleDetails.make");
  const selectedModel = watch("vehicleDetails.model");
  const selectedYear = watch("vehicleDetails.year");
  const selectedDoors = watch("vehicleDetails.doors");
  const selectedFuel = watch("vehicleDetails.fuel");

  const toggleVehicleDetails = () => {
    setShowVehicleDetails(!showVehicleDetails);
  };

  // Handle dropdown value changes
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

  // Fetch makes on component mount
  const fetchMakes = useCallback(async () => {
    try {
      const response = await fetch(`/api/vehicle-models/makes`);
      if (response.ok) {
        const result = await response.json();
        const makes = result.data || [];
        dispatch({ type: "SET_MAKES", payload: makes });

        if (shouldAutoSelect(makes)) {
          setValue("vehicleDetails.make", makes[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching makes:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, [setValue]);

  // Fetch vehicle data from backend
  const fetchVehicleData = useCallback(async () => {
    const queryString = buildVehicleQuery(watch);
    if (!queryString) return;

    try {
      const response = await fetch(
        `/api/vehicle-models/options?${queryString}`
      );

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: Failed to fetch vehicle data`
        );
      }

      const result = await response.json();

      if (result.status === "success") {
        const { options, autoSelect } = result.data;

        const optionsToUpdate = {
          models: options?.models || [],
          years: options?.years || [],
          doors: options?.doors || [],
          fuels: options?.fuel || [],
          transmissions: options?.transmissions || [],
        };

        // Ensure auto-selected values are included in options
        if (autoSelect) {
          const fieldMapping = {
            model: "models",
            year: "years",
            doors: "doors",
            fuel: "fuels",
            transmission: "transmissions",
          };

          Object.entries(autoSelect).forEach(([field, value]) => {
            const optionKey = fieldMapping[field];
            if (optionKey && !optionsToUpdate[optionKey].includes(value)) {
              optionsToUpdate[optionKey].push(value);
            }
          });
        }

        let valuesToUpdate = {};
        let fieldsToTrigger = [];

        if (autoSelect && Object.keys(autoSelect).length > 0) {
          isAutoSelectingRef.current = true;

          Object.entries(autoSelect).forEach(([field, value]) => {
            valuesToUpdate[field] = value;
            fieldsToTrigger.push(`vehicleDetails.${field}`);
          });
        }

        dispatch({
          type: "SET_VEHICLE_DATA",
          payload: {
            values: valuesToUpdate,
            options: optionsToUpdate,
          },
        });

        if (Object.keys(valuesToUpdate).length > 0) {
          Object.entries(valuesToUpdate).forEach(([field, value]) => {
            setValue(`vehicleDetails.${field}`, value, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
          });

          if (fieldsToTrigger.length > 0) {
            trigger(fieldsToTrigger);
          }
        }

        setForceUpdate((prev) => prev + 1);

        if (isAutoSelectingRef.current) {
          setTimeout(() => {
            isAutoSelectingRef.current = false;
          }, 100);
        }
      } else {
        throw new Error(result.message || "Failed to fetch vehicle data");
      }
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, [watch, setValue, trigger]);

  // Track the last query to avoid duplicate requests
  const lastQueryRef = useRef("");

  useEffect(() => {
    fetchMakes();
  }, [fetchMakes]);

  useEffect(() => {
    if (isAutoSelectingRef.current) {
      return;
    }

    // Clear dependent fields when parent changes
    const currentQuery = buildVehicleQuery(watch);
    const previousQuery = lastQueryRef.current;

    if (currentQuery !== previousQuery) {
      const previousParams = new URLSearchParams(previousQuery);
      const currentParams = new URLSearchParams(currentQuery);

      let fieldsToClear = {};
      let shouldClearOptions = false;

      const fieldChanges = [
        {
          param: "make",
          clear: { model: "", year: "", doors: "", fuel: "", transmission: "" },
          clearOptions: true,
        },
        {
          param: "model",
          clear: { year: "", doors: "", fuel: "", transmission: "" },
          clearOptions: false,
        },
        {
          param: "year",
          clear: { doors: "", fuel: "", transmission: "" },
          clearOptions: false,
        },
        {
          param: "doors",
          clear: { fuel: "", transmission: "" },
          clearOptions: false,
        },
        { param: "fuel", clear: { transmission: "" }, clearOptions: false },
      ];

      for (const { param, clear, clearOptions } of fieldChanges) {
        if (previousParams.get(param) !== currentParams.get(param)) {
          clearDependentFields(
            param,
            setValue,
            isAutoSelectingRef,
            clearErrors
          );
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
  }, [
    selectedMake,
    selectedModel,
    selectedYear,
    selectedDoors,
    selectedFuel,
    fetchVehicleData,
    watch,
    setValue,
    clearErrors,
    state.options,
  ]);

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
    try {
      // Use only DVLA endpoint
      const apiUrl = `/api/vehicle-search/dvla/${encodeURIComponent(
        cleanRegNumber
      )}`;

      const response = await axios.get(apiUrl);
      if (response.data.status === "success" && response.data.data) {
        const vehicleData = response.data.data;

        setFoundVehicleData(vehicleData);
        setShowFoundData(true);

        if (onVehicleDataFound) {
          onVehicleDataFound(vehicleData);
        }

        // Populate all vehicle fields from DVLA API data
        setValue("vehicleDetails.apiData", vehicleData);
        setValue(
          "vehicleDetails.registrationNumber",
          vehicleData.registrationNumber || cleanRegNumber
        );
        setValue("vehicleDetails.type", "Car");
        setValue("vehicleDetails.make", vehicleData.make || "");
        setValue("vehicleDetails.model", vehicleData.model || "");
        setValue("vehicleDetails.year", vehicleData.yearOfManufacture || "");
        setValue("vehicleDetails.fuel", vehicleData.fuelType || "");
        setValue("vehicleDetails.transmission", vehicleData.transmission || "");
        setValue("vehicleDetails.colour", vehicleData.colour || "");

        clearErrors("vehicleDetails.registrationNumber");
        clearErrors("vehicleDetails.type");
        clearErrors("vehicleDetails.make");
        clearErrors("vehicleDetails.model");
      }
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      setError("vehicleDetails.registrationNumber", {
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch vehicle data. Please check the registration number.",
      });
    } finally {
      setIsLoadingVehicleData(false);
    }
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

  // Auto-trigger vehicle lookup when registration number is provided from URL
  useEffect(() => {
    if (autoTriggerLookup && !hasAutoTriggeredRef.current) {
      const registrationNumber = watch("vehicleDetails.registrationNumber");
      if (registrationNumber && registrationNumber.trim()) {
        hasAutoTriggeredRef.current = true;
        // Small delay to ensure form is ready
        setTimeout(() => {
          handleFindVehicle();
        }, 500);
      }
    }
  }, [autoTriggerLookup, watch, handleFindVehicle]);

  return (
    <ComponentWrapper title="Vehicle Details">
      <div className={styles.content}>
        <div className={styles.first}>
          {!showFoundData ? (
            <>
              <FormTextInput
                reg={true}
                label="Registration Number"
                placeholder="Enter your Registration number"
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
                button={
                  <ConfirmBtn
                    title={isLoadingVehicleData ? "Loading..." : "Find Vehicle"}
                    onClick={handleFindVehicle}
                    disabled={isLoadingVehicleData}
                    type="button"
                  />
                }
              />
              <button
                type="button"
                className={styles.regBtn}
                onClick={toggleVehicleDetails}
              >
                {`Don't know the reg yet?`}
              </button>
            </>
          ) : (
            <>
              <FormTextInput
                reg={true}
                label="Registration Number"
                placeholder="Enter your Registration number"
                {...register("vehicleDetails.registrationNumber")}
                error={errors.vehicleDetails?.registrationNumber}
                value={watch("vehicleDetails.registrationNumber") || ""}
                disabled={true}
                button={
                  <ConfirmBtn
                    title="Change Vehicle"
                    onClick={handleChangeVehicle}
                    type="button"
                  />
                }
              />
              <button
                type="button"
                className={styles.regBtn}
                onClick={toggleVehicleDetails}
              >
                {`Don't know the reg yet?`}
              </button>
            </>
          )}
          {showFoundData && foundVehicleData && (
            <div className={styles.vehicleDataDisplay}>
              <p className={styles.vehicleDataRow}>
                {foundVehicleData.make + " "} {foundVehicleData.model + " "}
                {foundVehicleData.yearOfManufacture + " "}{" "}
                {foundVehicleData.registrationNumber + " "}
              </p>
              <p className={styles.vehicleDataRow}>
                {foundVehicleData.cylinderCapacity || "N/A"}{" "}
                {foundVehicleData.colour || "N/A"}{" "}
                {foundVehicleData.fuelType || "N/A"}{" "}
                {foundVehicleData.transmission || "N/A"}
              </p>
            </div>
          )}
        </div>

        {/* Vehicle Data Display */}

        {showVehicleDetails && <Title title="What type of vehicle is it?" />}

        <div
          className={`${styles.vehicleDetailsContainer} ${
            showVehicleDetails
              ? styles.vehicleDetailsVisible
              : styles.vehicleDetailsHidden
          }`}
        >
          <div className={styles.rows}>
            <div className={styles.row}>
              <FormDropdown
                label="My Vehicle is a...."
                options={["Car", "Motorcycle", "Truck", "Bus"]}
                placeholder="Choose Vehicle"
                {...register("vehicleDetails.type")}
                error={errors.vehicleDetails?.type}
                disabled={!!foundVehicleData}
              />
            </div>

            {selectedMake && !foundVehicleData && (
              <div className={`${styles.row} ${styles.progressiveRow}`}>
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
              </div>
            )}

            {selectedModel && !foundVehicleData && (
              <div className={`${styles.row} ${styles.progressiveRow}`}>
                <FormDropdown
                  key={`model-${forceUpdate}`}
                  label="Model"
                  options={state.options.models}
                  placeholder="Select Model"
                  disabled={
                    !!foundVehicleData ||
                    !selectedMake ||
                    state.options.models.length === 0
                  }
                  value={state.values.model || selectedModel || ""}
                  onChange={(e) => handleDropdownChange("model", e.target.value)}
                  {...register("vehicleDetails.model")}
                  error={errors.vehicleDetails?.model}
                />
              </div>
            )}

            {selectedYear && !foundVehicleData && (
              <div className={`${styles.row} ${styles.progressiveRow}`}>
                <FormDropdown
                  key={`year-${forceUpdate}`}
                  label="Year"
                  options={state.options.years}
                  placeholder="Select Year"
                  disabled={
                    !!foundVehicleData ||
                    !selectedModel ||
                    state.options.years.length === 0
                  }
                  value={state.values.year || selectedYear || ""}
                  onChange={(e) => handleDropdownChange("year", e.target.value)}
                  {...register("vehicleDetails.year")}
                  error={errors.vehicleDetails?.year}
                />
              </div>
            )}

            {selectedDoors && !foundVehicleData && (
              <div className={`${styles.row} ${styles.progressiveRow}`}>
                <FormDropdown
                  key={`doors-${forceUpdate}`}
                  label="Doors"
                  options={state.options.doors}
                  placeholder="Select Doors"
                  disabled={
                    !!foundVehicleData ||
                    !selectedYear ||
                    state.options.doors.length === 0
                  }
                  value={state.values.doors || selectedDoors || ""}
                  onChange={(e) => handleDropdownChange("doors", e.target.value)}
                  {...register("vehicleDetails.doors")}
                  error={errors.vehicleDetails?.doors}
                />
              </div>
            )}

            {selectedFuel && !foundVehicleData && (
              <div className={`${styles.row} ${styles.progressiveRow}`}>
                <FormDropdown
                  key={`fuel-${forceUpdate}`}
                  label="Fuel Type"
                  options={state.options.fuels}
                  placeholder="Select Fuel Type"
                  disabled={
                    !!foundVehicleData ||
                    !selectedDoors ||
                    state.options.fuels.length === 0
                  }
                  value={state.values.fuel || selectedFuel || ""}
                  onChange={(e) => handleDropdownChange("fuel", e.target.value)}
                  {...register("vehicleDetails.fuel")}
                  error={errors.vehicleDetails?.fuel}
                />
              </div>
            )}

            {watch("vehicleDetails.transmission") && !foundVehicleData && (
              <div className={`${styles.row} ${styles.progressiveRow}`}>
                <FormDropdown
                  key={`transmission-${forceUpdate}`}
                  label="Transmission"
                  options={state.options.transmissions}
                  placeholder="Select Transmission"
                  disabled={
                    !!foundVehicleData ||
                    !selectedFuel ||
                    state.options.transmissions.length === 0
                  }
                  value={
                    state.values.transmission ||
                    watch("vehicleDetails.transmission") ||
                    ""
                  }
                  onChange={(e) =>
                    handleDropdownChange("transmission", e.target.value)
                  }
                  {...register("vehicleDetails.transmission")}
                  error={errors.vehicleDetails?.transmission}
                />
              </div>
            )}

            {watch("vehicleDetails.colour") && !foundVehicleData && (
              <div className={`${styles.row} ${styles.progressiveRow}`}>
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

            {!foundVehicleData && watch("vehicleDetails.colour") && (
              <div className={`${styles.row} ${styles.progressiveRow}`}>
                <FormDropdown
                  label="How much is your vehicle worth?"
                  options={vehicleWorthOptions}
                  placeholder="Choose Price Range"
                  {...register("vehicleDetails.worth")}
                  error={errors.vehicleDetails?.worth}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default VehicleDetailsForm;
