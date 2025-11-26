"use client";
import React, { useState, useEffect } from "react";
import styles from "./carDetailsEditModal.module.css";

const CarDetailsEditModal = ({ isOpen, onClose, onUpdate, form }) => {
  const { register, watch, setValue } = form;

  const [localData, setLocalData] = useState({
    alarmImmobiliser: "",
    trackingDevice: "",
    importedVehicle: "",
    driverSide: "",
    seats: "",
  });

  useEffect(() => {
    if (isOpen) {
      setLocalData({
        alarmImmobiliser: watch("vehicleDetails.alarmImmobiliser") || "Factory Fitted Thatcham Approved Alarm/Immobiliser",
        trackingDevice: watch("vehicleDetails.trackingDevice") || "No",
        importedVehicle: watch("vehicleDetails.importedVehicle") || "No",
        driverSide: watch("vehicleDetails.driverSide") || "Right Hand",
        seats: watch("vehicleDetails.seats") || "5",
      });
    }
  }, [isOpen, watch]);

  const handleUpdate = () => {
    setValue("vehicleDetails.alarmImmobiliser", localData.alarmImmobiliser, { shouldValidate: true });
    setValue("vehicleDetails.trackingDevice", localData.trackingDevice, { shouldValidate: true });
    setValue("vehicleDetails.importedVehicle", localData.importedVehicle, { shouldValidate: true });
    setValue("vehicleDetails.driverSide", localData.driverSide, { shouldValidate: true });
    setValue("vehicleDetails.seats", localData.seats, { shouldValidate: true });
    onUpdate();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Car details</h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.section}>
            <h3 className={styles.questionTitle}>What type of alarm and/or immobiliser does the car have?</h3>
            <p className={styles.helperText}>Check your car's manual if you're unsure.</p>
            
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

          <div className={styles.section}>
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

          <div className={styles.section}>
            <h3 className={styles.questionTitle}>Is the car an import?</h3>
            <button type="button" className={styles.helpLink}>
              What's an import?
            </button>
            
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

          <div className={styles.section}>
            <h3 className={styles.questionTitle}>Is the car left or right-hand drive?</h3>
            <p className={styles.helperText}>
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

          <div className={styles.section}>
            <h3 className={styles.questionTitle}>How many seats are there in the car?</h3>
            <p className={styles.helperText}>Count the number of seatbelts if you're unsure.</p>
            
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

        <div className={styles.modalFooter}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.updateBtn}
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default CarDetailsEditModal;
