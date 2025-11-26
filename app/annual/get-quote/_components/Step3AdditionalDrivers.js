"use client";
import React from "react";
import styles from "./step3AdditionalDrivers.module.css";

const Step3AdditionalDrivers = ({
  additionaDrivers = [],
  onAddDriver = () => {},
  onRemoveDriver = () => {},
  onEditDriver = () => {},
  hasAdditionalDrivers = null,
  onHasAdditionalDriversChange = () => {}
}) => {
  const handleRemoveDriver = (index) => {
    onRemoveDriver(index);
  };

  const handleEditDriver = (index) => {
    onEditDriver(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Your policy - Additional drivers</h2>
      </div>

      <div className={styles.contentWrapper}>
        {/* Main Question Section */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>Do you want to add any additional drivers?</h3>
            <p className={styles.subText}>You can add up to 5 additional drivers. Include any drivers who share the car for business use.</p>
          </div>

          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="hasAdditionalDrivers"
                value="Yes"
                checked={hasAdditionalDrivers === true || hasAdditionalDrivers === "Yes"}
                onChange={() => onHasAdditionalDriversChange(true)}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Yes</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                name="hasAdditionalDrivers"
                value="No"
                checked={hasAdditionalDrivers === false || hasAdditionalDrivers === "No"}
                onChange={() => onHasAdditionalDriversChange(false)}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>No</span>
            </label>
          </div>
        </div>

        {/* Your Additional Drivers Section */}
        {(hasAdditionalDrivers === true || hasAdditionalDrivers === "Yes") && (
          <div className={styles.driversSection}>
            <div className={styles.driversHeader}>
              <h3 className={styles.driversTitle}>Your additional drivers</h3>
              <button
                type="button"
                className={styles.addDriverBtn}
                onClick={onAddDriver}
                disabled={additionaDrivers.length >= 5}
              >
                Add a driver
              </button>
            </div>

            {additionaDrivers.length > 0 && (
              <div className={styles.driversList}>
                {additionaDrivers.map((driver, index) => (
                  <div key={index} className={styles.driverCard}>
                    <div className={styles.driverInfo}>
                      <p className={styles.driverName}>
                        {driver.firstName && driver.lastName
                          ? `${driver.firstName} ${driver.lastName}`
                          : `Driver ${index + 1}`}
                      </p>
                      {driver.dateOfBirth && (
                        <p className={styles.driverDetail}>
                          <span className={styles.label}>Date of birth:</span> {driver.dateOfBirth}
                        </p>
                      )}
                      {driver.relationship && (
                        <p className={styles.driverDetail}>
                          <span className={styles.label}>Relationship:</span> {driver.relationship}
                        </p>
                      )}
                    </div>
                    <div className={styles.buttonGroup}>
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => handleRemoveDriver(index)}
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        className={styles.editButton}
                        onClick={() => handleEditDriver(index)}
                      >
                        Edit details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {additionaDrivers.length >= 5 && (
              <div className={styles.maxDriversMessage}>
                <span className={styles.maxDriversIcon}>✓</span>
                <span>You have reached the maximum of 5 additional drivers</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Step3AdditionalDrivers;
