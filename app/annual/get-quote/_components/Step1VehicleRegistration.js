"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import styles from "./step1VehicleRegistration.module.css";

const Step1VehicleRegistration = ({ form, onVehicleFound, autoTriggerLookup = false }) => {
  const [isLoadingVehicle, setIsLoadingVehicle] = useState(false);
  const [foundVehicle, setFoundVehicle] = useState(null);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const hasAutoTriggeredRef = useRef(false);

  const { register, formState: { errors }, watch, setValue, setError, clearErrors } = form;

  const registrationNumber = watch("vehicleDetails.registrationNumber");

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

      clearErrors("vehicleDetails.registrationNumber");

      if (onVehicleFound) {
        onVehicleFound(mockVehicleData);
      }

      setIsLoadingVehicle(false);
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
    clearErrors("vehicleDetails.registrationNumber");
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

  if (foundVehicle) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.mainQuestion}>What's your car's registration?</h1>
          <p className={styles.subText}>We can only show you quotes for cars registered in the UK.</p>
        </div>

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
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.mainQuestion}>What's your car's registration?</h1>
        <p className={styles.subText}>We can only show you quotes for cars registered in the UK.</p>
      </div>

      <div className={styles.inputSection}>
        <div className={styles.regInputWrapper}>
          <input
            type="text"
            className={`${styles.regInput} ${errors.vehicleDetails?.registrationNumber ? styles.regInputError : ""}`}
            placeholder="Enter car registration..."
            value={registrationNumber || ""}
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
            disabled={isLoadingVehicle}
            maxLength={8}
          />
          {errors.vehicleDetails?.registrationNumber && (
            <p className={styles.errorText}>{errors.vehicleDetails.registrationNumber.message}</p>
          )}
        </div>

        <button
          type="button"
          className={styles.findBtn}
          onClick={handleFindVehicle}
          disabled={isLoadingVehicle || !registrationNumber?.trim()}
        >
          {isLoadingVehicle ? (
            <>
              <div className={styles.spinner} />
              Searching...
            </>
          ) : (
            "Find my car"
          )}
        </button>
      </div>

      <div className={styles.alternativeOption}>
        <span className={styles.dividerText}>Or</span>
        <button
          type="button"
          className={styles.manualEntryBtn}
          onClick={() => setShowManualEntry(true)}
        >
          enter make and model
        </button>
      </div>

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

      {showManualEntry && (
        <div className={styles.manualEntryNotice}>
          <p>Manual entry feature coming in next step. For now, please use registration lookup.</p>
        </div>
      )}
    </div>
  );
};

export default Step1VehicleRegistration;
