"use client";
import React, { useState, useCallback, useRef, useEffect, useReducer } from "react";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import CustomTextInput from "@/ui/inputs/textInput/CustomTextInput";
import RegistrationInput from "./RegistrationInput";
import VehicleModificationsModal from "./VehicleModificationsModal";
import styles from "./step1VehicleRegistration.module.css";

const initialState = {
  makes: [],
  options: {
    models: [],
    years: [],
    doors: [],
    fuels: [],
    transmissions: [],
  },
};

const vehicleReducer = (state, action) => {
  switch (action.type) {
    case "SET_MAKES":
      return { ...state, makes: action.payload };
    case "SET_OPTIONS":
      return { ...state, options: action.payload };
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

const Step1VehicleRegistration = ({ form, onVehicleFound, autoTriggerLookup = false }) => {
  const [isLoadingVehicle, setIsLoadingVehicle] = useState(false);
  const [foundVehicle, setFoundVehicle] = useState(null);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [showModificationsModal, setShowModificationsModal] = useState(false);
  const [state, dispatch] = useReducer(vehicleReducer, initialState);
  const hasAutoTriggeredRef = useRef(false);

  const { register, formState: { errors }, watch, setValue, setError, clearErrors } = form;

  const registrationNumber = watch("vehicleDetails.registrationNumber");
  const selectedType = watch("vehicleDetails.type");
  const selectedMake = watch("vehicleDetails.make");
  const selectedModel = watch("vehicleDetails.model");
  const selectedYear = watch("vehicleDetails.year");
  const selectedDoors = watch("vehicleDetails.doors");
  const selectedFuel = watch("vehicleDetails.fuel");
  const selectedTransmission = watch("vehicleDetails.transmission");
  const selectedColour = watch("vehicleDetails.colour");
  const vehicleModified = watch("vehicleDetails.vehicleModified");
  const vehicleModifications = watch("vehicleDetails.vehicleModifications") || [];

  // Check if all manual entry fields are complete
  const isManualEntryComplete = selectedType && selectedMake && selectedModel && selectedYear && selectedDoors && selectedFuel && selectedTransmission && selectedColour;

  // Fetch makes on component mount
  useEffect(() => {
    const defaultMakes = ["Audi", "BMW", "Ford", "Honda", "Mercedes-Benz", "Toyota", "Volkswagen", "Volvo"];
    dispatch({ type: "SET_MAKES", payload: defaultMakes });
  }, []);

  // Load all options when manual entry is shown
  useEffect(() => {
    if (showManualEntry) {
      const defaultOptions = {
        models: ["Model A", "Model B", "Model C", "Model D", "Model E", "Model F"],
        years: ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"],
        doors: ["2", "3", "4", "5"],
        fuels: ["Petrol", "Diesel", "Hybrid", "Electric", "Petrol Hybrid", "Diesel Hybrid"],
        transmissions: ["Manual", "Automatic", "Semi-Automatic"],
      };
      dispatch({ type: "SET_OPTIONS", payload: defaultOptions });
    }
  }, [showManualEntry]);

  const handleDropdownChange = (field, value) => {
    setValue(`vehicleDetails.${field}`, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleFindVehicle = useCallback(async () => {
    const regNumber = registrationNumber?.trim();

    if (!regNumber) {
      setError("vehicleDetails.registrationNumber", {
        message: "Please enter a registration number",
      });
      return;
    }

    const cleanRegNumber = regNumber.toUpperCase();
    setIsLoadingVehicle(true);

    setTimeout(() => {
      const mockVehicleData = {
        registrationNumber: cleanRegNumber,
        make: "Toyota",
        model: "Corolla",
        yearOfManufacture: "2023",
        fuelType: "Petrol",
        transmission: "Automatic",
        colour: "Silver",
      };

      setFoundVehicle(mockVehicleData);
      setValue("vehicleDetails.apiData", mockVehicleData);
      setValue("vehicleDetails.registrationNumber", cleanRegNumber);
      setValue("vehicleDetails.type", "Car");
      setValue("vehicleDetails.make", mockVehicleData.make);
      setValue("vehicleDetails.model", mockVehicleData.model);
      setValue("vehicleDetails.year", mockVehicleData.yearOfManufacture);
      setValue("vehicleDetails.fuel", mockVehicleData.fuelType);
      setValue("vehicleDetails.transmission", mockVehicleData.transmission);
      setValue("vehicleDetails.colour", mockVehicleData.colour);
      setValue("vehicleDetails.estimatedValue", "4560");
      setValue("vehicleDetails.carValue", "4560");

      clearErrors("vehicleDetails.registrationNumber");

      if (onVehicleFound) {
        onVehicleFound(mockVehicleData);
      }

      setIsLoadingVehicle(false);
      setShowManualEntry(false);
    }, 2000);
  }, [registrationNumber, setValue, setError, clearErrors, onVehicleFound]);

  useEffect(() => {
    if (autoTriggerLookup && !hasAutoTriggeredRef.current) {
      const regNumber = watch("vehicleDetails.registrationNumber");
      if (regNumber && regNumber.trim()) {
        hasAutoTriggeredRef.current = true;
        setTimeout(() => {
          handleFindVehicle();
        }, 500);
      }
    }
  }, [autoTriggerLookup, watch, handleFindVehicle]);

  const handleChangeVehicle = () => {
    setFoundVehicle(null);
    setValue("vehicleDetails.registrationNumber", "");
    setValue("vehicleDetails.apiData", null);
    setValue("vehicleDetails.type", "");
    setValue("vehicleDetails.make", "");
    setValue("vehicleDetails.model", "");
    setValue("vehicleDetails.year", "");
    setValue("vehicleDetails.fuel", "");
    setValue("vehicleDetails.transmission", "");
    setValue("vehicleDetails.colour", "");
    setValue("vehicleDetails.doors", "");
    clearErrors("vehicleDetails.registrationNumber");
    setShowManualEntry(false);
    if (onVehicleFound) {
      onVehicleFound(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleFindVehicle();
    }
  };

  const handleModificationsConfirm = (selected) => {
    setValue("vehicleDetails.vehicleModifications", selected, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setShowModificationsModal(false);
  };

  const handleRemoveModification = (modification) => {
    const updatedModifications = vehicleModifications.filter((mod) => mod !== modification);
    setValue("vehicleDetails.vehicleModifications", updatedModifications, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const VehicleDetailsSection = () => (
    <div className={styles.vehicleQuestionsWrapper}>
      <div className={styles.detailsSection}>
        <div className={styles.detailsSectionHeader}>
          <h3 className={styles.detailsSectionTitle}>Car details</h3>
          <button
            type="button"
            className={styles.changeLink}
            onClick={handleChangeVehicle}
          >
            Change
          </button>
        </div>

        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Alarm/Immobiliser</span>
            <span className={styles.detailValue}>
              {watch("vehicleDetails.alarmImmobiliser") || "Factory Fitted Thatcham Approved Alarm/Immobiliser"}
            </span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Tracking device</span>
            <span className={styles.detailValue}>
              {watch("vehicleDetails.trackingDevice") || "No"}
            </span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Import</span>
            <span className={styles.detailValue}>
              {watch("vehicleDetails.importedVehicle") || "No"}
            </span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Driver side</span>
            <span className={styles.detailValue}>Right Hand</span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Seats</span>
            <span className={styles.detailValue}>
              {watch("vehicleDetails.doors") === "2" ? "2" : "5"}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.modificationSection}>
        <h3 className={styles.modificationQuestion}>Has the car been modified in any way?</h3>
        <p className={styles.modificationHelper}>
          Modifications are changes to the car's original specification. These can be mechanical, or cosmetic changes inside or outside the car.
        </p>

        <div className={styles.radioGroup}>
          <label className={styles.radioOption}>
            <input
              type="radio"
              {...register("vehicleDetails.vehicleModified")}
              value="Yes"
              className={styles.radioInput}
            />
            <span className={styles.radioLabel}>Yes</span>
          </label>

          <label className={styles.radioOption}>
            <input
              type="radio"
              {...register("vehicleDetails.vehicleModified")}
              value="No"
              className={styles.radioInput}
            />
            <span className={styles.radioLabel}>No</span>
          </label>
        </div>

        <button type="button" className={styles.helpLink}>
          How can I find out if my car's been modified?
        </button>
      </div>

      {vehicleModified === "Yes" && (
        <div className={styles.modificationsSection}>
          <h3 className={styles.modificationsHeading}>Your car modifications</h3>

          {vehicleModifications.length > 0 && (
            <div className={styles.modificationsTagsList}>
              {vehicleModifications.map((mod) => (
                <div key={mod} className={styles.modificationCard}>
                  <span className={styles.modificationName}>{mod}</span>
                  <div className={styles.modificationActions}>
                    <button
                      type="button"
                      className={styles.removeTextBtn}
                      onClick={() => handleRemoveModification(mod)}
                      aria-label={`Remove ${mod}`}
                    >
                      Remove
                    </button>
                    <button
                      type="button"
                      className={styles.changeModificationBtn}
                      onClick={() => setShowModificationsModal(true)}
                    >
                      Change modification
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            className={styles.addModificationBtn}
            onClick={() => setShowModificationsModal(true)}
          >
            Add another modification
          </button>
        </div>
      )}
    </div>
  );

  if (foundVehicle || (showManualEntry && isManualEntryComplete)) {
    return (
      <div className={styles.container}>
        <div className={styles.stepTitle}>
          <h2 className={styles.stepTitleText}>Car details - Your car</h2>
        </div>
        <div className={styles.header}>
          <h1 className={styles.mainQuestion}>What's your car's registration?</h1>
          <p className={styles.subText}>We can only show you quotes for cars registered in the UK.</p>
        </div>

        {foundVehicle && (
          <div className={styles.foundVehicleCard}>
            <div className={styles.foundVehicleIcon}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="#e8f5ff"/>
                <path d="M18 24L22 28L30 20" stroke="#0388ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.foundVehicleInfo}>
              <h3 className={styles.foundVehicleTitle}>Vehicle Found</h3>
              <p className={styles.foundVehicleDetails}>
                {foundVehicle.make} {foundVehicle.model} ({foundVehicle.yearOfManufacture})
              </p>
              <p className={styles.foundVehicleReg}>{foundVehicle.registrationNumber}</p>
            </div>
            <button
              type="button"
              className={styles.changeVehicleBtn}
              onClick={handleChangeVehicle}
            >
              Change
            </button>
          </div>
        )}

        <VehicleDetailsSection />

        <div className={styles.infoBox}>
          <div className={styles.infoIcon}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="#0388ff"/>
              <path d="M10 4C7.79 4 6 5.79 6 8H8C8 6.9 8.9 6 10 6C11.1 6 12 6.9 12 8C12 10 9 9.75 9 13H11C11 10.75 14 10.5 14 8C14 5.79 12.21 4 10 4Z" fill="#0388ff"/>
              <circle cx="10" cy="16" r="1" fill="#0388ff"/>
            </svg>
          </div>
          <div className={styles.infoContent}>
            <h4 className={styles.infoTitle}>Honesty's the best policy</h4>
            <p className={styles.infoText}>
              It's important you answer all questions honestly. Take care that the information you disclose throughout
              the quote is accurate and complete to the best of your knowledge. If you don't do this, your insurance
              provider could increase your premium, cancel your policy, treat it as if it never existed, refuse a
              claim or not pay the claim in full.
            </p>
          </div>
        </div>

        <VehicleModificationsModal
          isOpen={showModificationsModal}
          onClose={() => setShowModificationsModal(false)}
          onConfirm={handleModificationsConfirm}
          selectedModifications={vehicleModifications}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Car details - Your car</h2>
      </div>
      <div className={styles.header}>
        <h1 className={styles.mainQuestion}>What's your car's registration?</h1>
        <p className={styles.subText}>We can only show you quotes for cars registered in the UK.</p>
      </div>

      {!showManualEntry && (
        <>
          <div className={styles.inputSection}>
            <div className={styles.regInputWrapper}>
              <RegistrationInput
                label="Registration Number"
                value={registrationNumber}
                onChange={(e) => {
                  const formatted = e.target.value.toUpperCase();
                  setValue("vehicleDetails.registrationNumber", formatted, {
                    shouldValidate: false,
                    shouldDirty: true,
                  });
                  if (errors.vehicleDetails?.registrationNumber) {
                    clearErrors("vehicleDetails.registrationNumber");
                  }
                }}
                onKeyPress={handleKeyPress}
                onButtonClick={handleFindVehicle}
                disabled={isLoadingVehicle}
                isLoading={isLoadingVehicle}
                error={errors.vehicleDetails?.registrationNumber?.message}
              />
            </div>
          </div>

          <div className={styles.alternativeOption}>
            <p className={styles.dividerText}>Or</p>
            <button
              type="button"
              className={styles.manualEntryBtn}
              onClick={() => setShowManualEntry(true)}
            >
              Enter make and model
            </button>
          </div>
        </>
      )}

      {showManualEntry && (
        <div className={styles.manualEntrySection}>
          <div className={styles.manualEntryHeader}>
            <h3 className={styles.manualEntryTitle}>Enter Vehicle Details</h3>
            <button
              type="button"
              className={styles.backToRegBtn}
              onClick={() => setShowManualEntry(false)}
            >
              Back to registration lookup
            </button>
          </div>
          <p className={styles.manualEntryHelper}>
            Please complete each field in order to unlock the next selection.
          </p>

          <div className={styles.manualEntryForm}>
            <div className={styles.formRow}>
              <Dropdown
                label="Vehicle Type"
                selected={selectedType || ""}
                options={["Car", "Motorcycle", "Van"]}
                setSelected={(value) => handleDropdownChange("type", value)}
                placeholder="Select vehicle type"
                disabled={false}
              />
              <Dropdown
                label="Make"
                selected={selectedMake || ""}
                options={state.makes}
                setSelected={(value) => handleDropdownChange("make", value)}
                placeholder="Select make"
                disabled={!selectedType}
                showSearch={true}
              />
            </div>

            <div className={styles.formRow}>
              <Dropdown
                label="Model"
                selected={selectedModel || ""}
                options={state.options.models}
                setSelected={(value) => handleDropdownChange("model", value)}
                placeholder="Select model"
                disabled={!selectedMake}
                showSearch={true}
              />
              <Dropdown
                label="Year"
                selected={selectedYear || ""}
                options={state.options.years}
                setSelected={(value) => handleDropdownChange("year", value)}
                placeholder="Select year"
                disabled={!selectedModel}
                showSearch={true}
              />
            </div>

            <div className={styles.formRow}>
              <Dropdown
                label="Doors"
                selected={selectedDoors || ""}
                options={state.options.doors}
                setSelected={(value) => handleDropdownChange("doors", value)}
                placeholder="Select doors"
                disabled={!selectedYear}
              />
              <Dropdown
                label="Fuel Type"
                selected={selectedFuel || ""}
                options={state.options.fuels}
                setSelected={(value) => handleDropdownChange("fuel", value)}
                placeholder="Select fuel type"
                disabled={!selectedDoors}
              />
            </div>

            <div className={styles.formRow}>
              <Dropdown
                label="Transmission"
                selected={watch("vehicleDetails.transmission") || ""}
                options={state.options.transmissions}
                setSelected={(value) => handleDropdownChange("transmission", value)}
                placeholder="Select transmission"
                disabled={!selectedFuel}
              />
              <Dropdown
                label="Colour"
                selected={watch("vehicleDetails.colour") || ""}
                options={carColors}
                setSelected={(value) => handleDropdownChange("colour", value)}
                placeholder="Select colour"
                disabled={!watch("vehicleDetails.transmission")}
                showSearch={true}
              />
            </div>
          </div>
        </div>
      )}

      <div className={styles.infoBox}>
        <div className={styles.infoIcon}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="#0388ff"/>
            <path d="M10 4C7.79 4 6 5.79 6 8H8C8 6.9 8.9 6 10 6C11.1 6 12 6.9 12 8C12 10 9 9.75 9 13H11C11 10.75 14 10.5 14 8C14 5.79 12.21 4 10 4Z" fill="#0388ff"/>
            <circle cx="10" cy="16" r="1" fill="#0388ff"/>
          </svg>
        </div>
        <div className={styles.infoContent}>
          <h4 className={styles.infoTitle}>Honesty's the best policy</h4>
          <p className={styles.infoText}>
            It's important you answer all questions honestly. Take care that the information you disclose throughout 
            the quote is accurate and complete to the best of your knowledge. If you don't do this, your insurance 
            provider could increase your premium, cancel your policy, treat it as if it never existed, refuse a 
            claim or not pay the claim in full.
          </p>
        </div>
      </div>

      <VehicleModificationsModal
        isOpen={showModificationsModal}
        onClose={() => setShowModificationsModal(false)}
        onConfirm={handleModificationsConfirm}
        selectedModifications={vehicleModifications}
      />
    </div>
  );
};

export default Step1VehicleRegistration;
