"use client";
import React from "react";
import styles from "./step3AdditionalDrivers.module.css";

const Step3AdditionalDrivers = ({
  form,
  additionalDrivers,
  additionaDrivers,
  onAdd,
  onAddDriver,
  onRemove,
  onRemoveDriver,
  onEdit,
  onEditDriver,
  onNext,
  onBack,
  hasAdditionalDrivers,
  onHasAdditionalDriversChange
}) => {
  // Prop resolution: support both old and new prop names
  const drivers = additionalDrivers || additionaDrivers || [];
  const handleAdd = onAdd || onAddDriver || (() => {});
  const handleRemove = onRemove || onRemoveDriver || (() => {});
  const handleEdit = onEdit || onEditDriver || (() => {});
  
  // Get current value from form if available, otherwise use prop
  const currentHasDrivers = form?.watch?.('carUsage.hasAdditionalDrivers') ?? hasAdditionalDrivers;

  // Handle Yes/No selection with form integration and auto-navigation
  const handleHasDriversChange = (value) => {
    // Update form if available
    if (form?.setValue) {
      form.setValue('carUsage.hasAdditionalDrivers', value, { shouldValidate: true });
    }
    
    // Call prop handler if provided
    if (onHasAdditionalDriversChange) {
      onHasAdditionalDriversChange(value);
    }
    
    // Auto-navigate to next substep if user selects "No"
    if (value === false && onNext) {
      // Small delay to ensure state updates
      setTimeout(() => {
        onNext();
      }, 100);
    }
  };

  const handleRemoveDriverClick = (index) => {
    handleRemove(index);
  };

  const handleEditDriverClick = (index) => {
    handleEdit(index);
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
                checked={currentHasDrivers === true || currentHasDrivers === "Yes"}
                onChange={() => handleHasDriversChange(true)}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Yes</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                name="hasAdditionalDrivers"
                value="No"
                checked={currentHasDrivers === false || currentHasDrivers === "No"}
                onChange={() => handleHasDriversChange(false)}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>No</span>
            </label>
          </div>
        </div>

        {/* Your Additional Drivers Section */}
        {(currentHasDrivers === true || currentHasDrivers === "Yes") && (
          <div className={styles.driversSection}>
            <div className={styles.driversHeader}>
              <h3 className={styles.driversTitle}>Your additional drivers</h3>
              <button
                type="button"
                className={styles.addDriverBtn}
                onClick={handleAdd}
                disabled={drivers.length >= 5}
              >
                Add a driver
              </button>
            </div>

            {drivers.length > 0 && (
              <div className={styles.driversList}>
                {drivers.map((driver, index) => (
                  <div key={index} className={styles.driverCard}>
                    {/* Header with Driver Name and Remove Button */}
                    <div className={styles.cardHeader}>
                      <div className={styles.driverHeading}>
                        <h3 className={styles.cardTitle}>
                          {driver.firstName && driver.lastName
                            ? `${driver.firstName} ${driver.lastName}`
                            : `Driver ${index + 1}`}
                          <span className={styles.driverNumber}> (Driver {index + 1})</span>
                          {driver.relationship && (
                            <span className={styles.cardSubtitle}>, {driver.relationship}</span>
                          )}
                          {driver.dateOfBirth && (
                            <span className={styles.cardSubtitle}> ({driver.dateOfBirth})</span>
                          )}
                        </h3>
                      </div>
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => handleRemoveDriverClick(index)}
                      >
                        Remove driver
                      </button>
                    </div>

                    {/* About Them Section */}
                    <div className={styles.section}>
                      <div className={styles.sectionHeader}>
                        <h4 className={styles.sectionTitle}>About them</h4>
                        <button
                          type="button"
                          className={styles.changeButton}
                          onClick={() => handleEditDriverClick(index)}
                        >
                          Change
                        </button>
                      </div>
                      <div className={styles.sectionContent}>
                        {driver.firstName && (
                          <div className={styles.row}>
                            <span className={styles.label}>Name</span>
                            <span className={styles.value}>{driver.firstName} {driver.lastName}</span>
                          </div>
                        )}
                        {driver.dateOfBirth && (
                          <div className={styles.row}>
                            <span className={styles.label}>Date of birth</span>
                            <span className={styles.value}>{driver.dateOfBirth}</span>
                          </div>
                        )}
                        {driver.relationshipStatus && (
                          <div className={styles.row}>
                            <span className={styles.label}>Relationship status</span>
                            <span className={styles.value}>{driver.relationshipStatus}</span>
                          </div>
                        )}
                        {driver.livedInUKSinceBirth && (
                          <div className={styles.row}>
                            <span className={styles.label}>Lived in the UK</span>
                            <span className={styles.value}>{driver.livedInUKSinceBirth === 'Yes' ? 'Since birth' : driver.livedInUKSinceBirth}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Their Employment Section */}
                    {driver.employmentStatus && (
                      <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                          <h4 className={styles.sectionTitle}>Their employment</h4>
                          <button
                            type="button"
                            className={styles.changeButton}
                            onClick={() => handleEditDriverClick(index)}
                          >
                            Change
                          </button>
                        </div>
                        <div className={styles.sectionContent}>
                          <div className={styles.row}>
                            <span className={styles.label}>Employment status</span>
                            <span className={styles.value}>{driver.employmentStatus}</span>
                          </div>
                          {driver.occupation && (
                            <div className={styles.row}>
                              <span className={styles.label}>Occupation</span>
                              <span className={styles.value}>{driver.occupation}</span>
                            </div>
                          )}
                          {driver.industry && (
                            <div className={styles.row}>
                              <span className={styles.label}>Industry</span>
                              <span className={styles.value}>{driver.industry}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Their Licence Section */}
                    {driver.licenseType && (
                      <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                          <h4 className={styles.sectionTitle}>Their licence</h4>
                          <button
                            type="button"
                            className={styles.changeButton}
                            onClick={() => handleEditDriverClick(index)}
                          >
                            Change
                          </button>
                        </div>
                        <div className={styles.sectionContent}>
                          <div className={styles.row}>
                            <span className={styles.label}>Licence type</span>
                            <span className={styles.value}>{driver.licenseType}</span>
                          </div>
                          {driver.licenseHeld && (
                            <div className={styles.row}>
                              <span className={styles.label}>Licence held for</span>
                              <span className={styles.value}>{driver.licenseHeld}</span>
                            </div>
                          )}
                          <div className={styles.row}>
                            <span className={styles.label}>Driving licence number</span>
                            <span className={styles.value}>
                              {driver.licenseNumberFirst || driver.licenseNumberNI ? `${driver.licenseNumberFirst || driver.licenseNumberNI}` : 'NOT PROVIDED'}
                            </span>
                          </div>
                          {driver.otherVehicles && (
                            <div className={styles.row}>
                              <span className={styles.label}>Access to other vehicles</span>
                              <span className={styles.value}>{driver.otherVehicles}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Licence Restrictions Section */}
                    <div className={styles.section}>
                      <div className={styles.sectionHeader}>
                        <h4 className={styles.sectionTitle}>Licence restrictions</h4>
                        <button
                          type="button"
                          className={styles.changeButton}
                          onClick={() => handleEditDriverClick(index)}
                        >
                          Change
                        </button>
                      </div>
                      <div className={styles.sectionContent}>
                        {driver.medicalConditions && (
                          <div className={styles.row}>
                            <span className={styles.label}>DVLA reportable conditions</span>
                            <span className={styles.value}>
                              {driver.medicalConditions === 'Yes' ? (driver.dvlaConditionType || 'Yes') : 'No'}
                            </span>
                          </div>
                        )}
                        {driver.insuranceCancelledOrClaimRefusedOrPolicyVoided && (
                          <div className={styles.row}>
                            <span className={styles.label}>Had insurance denied before</span>
                            <span className={styles.value}>{driver.insuranceCancelledOrClaimRefusedOrPolicyVoided}</span>
                          </div>
                        )}
                        {driver.criminalConvictions && (
                          <div className={styles.row}>
                            <span className={styles.label}>Unspent non-motoring convictions</span>
                            <span className={styles.value}>{driver.criminalConvictions}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Claims in the last 5 years */}
                    {driver.claims && (
                      <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                          <h4 className={styles.sectionTitle}>Claims in the last 5 years</h4>
                          <button
                            type="button"
                            className={styles.changeButton}
                            onClick={() => handleEditDriverClick(index)}
                          >
                            Change
                          </button>
                        </div>
                        <div className={styles.sectionContent}>
                          {driver.claims.length > 0 ? (
                            driver.claims.map((claim, claimIndex) => (
                              <div key={claimIndex} className={styles.listItem}>
                                {claim.incidentType && <p>{claim.incidentType}</p>}
                              </div>
                            ))
                          ) : (
                            <p className={styles.none}>None</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Motoring convictions in the last 5 years */}
                    {driver.convictions && (
                      <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                          <h4 className={styles.sectionTitle}>Motoring convictions in the last 5 years</h4>
                          <button
                            type="button"
                            className={styles.changeButton}
                            onClick={() => handleEditDriverClick(index)}
                          >
                            Change
                          </button>
                        </div>
                        <div className={styles.sectionContent}>
                          {driver.convictions.length > 0 ? (
                            driver.convictions.map((conviction, convictionIndex) => (
                              <div key={convictionIndex} className={styles.listItem}>
                                {conviction.convictionType && <p>{conviction.convictionType}</p>}
                              </div>
                            ))
                          ) : (
                            <p className={styles.none}>None</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {drivers.length >= 5 && (
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
