"use client";
import React, { useState, useEffect } from "react";
import styles from "./replaceVehicleCarDetails.module.css";

const ReplaceVehicleCarDetails = ({ form, onUpdate, onCancel }) => {
  const { watch, setValue } = form;

  const [localData, setLocalData] = useState({
    alarmImmobiliser: "",
    trackingDevice: "",
    importedVehicle: "",
    driverSide: "",
    seats: "",
  });

  const [showImportInfo, setShowImportInfo] = useState(false);

  useEffect(() => {
    setLocalData({
      alarmImmobiliser: watch("vehicleDetails.alarmImmobiliser") || "Factory Fitted Thatcham Approved Alarm/Immobiliser",
      trackingDevice: watch("vehicleDetails.trackingDevice") || "No",
      importedVehicle: watch("vehicleDetails.importedVehicle") || "No",
      driverSide: watch("vehicleDetails.driverSide") || "Right Hand",
      seats: watch("vehicleDetails.seats") || "5",
    });
  }, [watch]);

  const handleUpdate = () => {
    setValue("vehicleDetails.alarmImmobiliser", localData.alarmImmobiliser, { shouldValidate: true });
    setValue("vehicleDetails.trackingDevice", localData.trackingDevice, { shouldValidate: true });
    setValue("vehicleDetails.importedVehicle", localData.importedVehicle, { shouldValidate: true });
    setValue("vehicleDetails.driverSide", localData.driverSide, { shouldValidate: true });
    setValue("vehicleDetails.seats", localData.seats, { shouldValidate: true });
    onUpdate();
  };

  return (
    <div className={styles.vehicleCard}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Car details - Your car</h2>
      </div>

      <div className={styles.questionsCard}>
        {/* Alarm/Immobiliser Section */}
        <div className={styles.questionGroup}>
          <h3 className={styles.questionTitle}>What type of alarm and/or immobiliser does the car have?</h3>
          <p className={styles.questionDescription}>Check your car's manual if you're unsure.</p>
          
          <div className={styles.radioGroup}>
            {[
              "Factory Fitted Thatcham Approved Alarm/Immobiliser",
              "Factory Fitted Thatcham Approved Alarm",
              "Factory Fitted Non-Thatcham Alarm/Immobiliser",
              "Factory Fitted Non-Thatcham Alarm",
              "Factory Fitted",
              "None",
            ].map((option) => (
              <label key={option} className={styles.radioOption}>
                <input
                  type="radio"
                  checked={localData.alarmImmobiliser === option}
                  onChange={() => setLocalData({ ...localData, alarmImmobiliser: option })}
                  className={styles.radioInput}
                />
                <span className={styles.radioLabel}>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tracking Device Section */}
        <div className={styles.questionGroup}>
          <h3 className={styles.questionTitle}>Is the car fitted with a tracking device?</h3>
          
          <div className={styles.radioGroup}>
            {["Yes", "No"].map((option) => (
              <label key={option} className={styles.radioOption}>
                <input
                  type="radio"
                  checked={localData.trackingDevice === option}
                  onChange={() => setLocalData({ ...localData, trackingDevice: option })}
                  className={styles.radioInput}
                />
                <span className={styles.radioLabel}>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Import Section */}
        <div className={styles.questionGroup}>
          <h3 className={styles.questionTitle}>Is the car an import?</h3>
          <button 
            type="button" 
            className={styles.expandableLink}
            onClick={() => setShowImportInfo(!showImportInfo)}
          >
            What's an import?
          </button>
          
          {showImportInfo && (
            <div className={styles.expandableContent}>
              An import is a vehicle that was manufactured outside the UK and brought into the country. This includes grey imports (vehicles not intended for the UK market) and parallel imports (UK-spec vehicles bought abroad).
            </div>
          )}
          
          <div className={styles.radioGroup}>
            {["Yes", "No"].map((option) => (
              <label key={option} className={styles.radioOption}>
                <input
                  type="radio"
                  checked={localData.importedVehicle === option}
                  onChange={() => setLocalData({ ...localData, importedVehicle: option })}
                  className={styles.radioInput}
                />
                <span className={styles.radioLabel}>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Driver Side Section */}
        <div className={styles.questionGroup}>
          <h3 className={styles.questionTitle}>Is the car left or right-hand drive?</h3>
          <p className={styles.questionDescription}>
            The UK standard is right-hand drive. This means that when you are sat in the vehicle facing the windscreen, the steering wheel is on the right side.
          </p>
          
          <div className={styles.radioGroup}>
            {["Left Hand", "Right Hand"].map((option) => (
              <label key={option} className={styles.radioOption}>
                <input
                  type="radio"
                  checked={localData.driverSide === option}
                  onChange={() => setLocalData({ ...localData, driverSide: option })}
                  className={styles.radioInput}
                />
                <span className={styles.radioLabel}>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Seats Section */}
        <div className={styles.questionGroup}>
          <h3 className={styles.questionTitle}>How many seats are there in the car?</h3>
          <p className={styles.questionDescription}>Count the number of seatbelts if you're unsure.</p>
          
          <div className={styles.inputWrapper}>
            <input
              type="number"
              className={styles.numberInput}
              value={localData.seats}
              onChange={(e) => setLocalData({ ...localData, seats: e.target.value })}
              min="1"
              max="9"
              placeholder="5"
            />
          </div>
        </div>
      </div>

      {/* Button Group */}
      <div className={styles.actionButtons}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={onCancel}
        >
          Back
        </button>
        <button
          type="button"
          className={styles.saveBtn}
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default ReplaceVehicleCarDetails;
