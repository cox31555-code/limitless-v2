"use client";
import React, { useState, useEffect, useCallback } from "react";
import FormTextInput from "@/ui/inputs/FormTextInput";
import FormDropdown from "@/ui/inputs/FormDropdown";
import FormDataAndTime from "@/ui/inputs/FormDataAndTime";
import FormAutocomplete from "@/ui/inputs/FormAutocomplete";
import YesORNo from "@/ui/inputs/selections/yesORNo/YesORNo";
import modalStyles from "./additionalDriversModal.module.css";
import {
  employmentStatusOptions,
  licenseHeldOptions,
  occupationOptions,
  industryOptions,
  otherVehiclesOptions,
  additionalQualificationsOptions,
  monthOptions,
  yearOptions,
  ncbOptions,
  carUsageOptions,
  keepingCarDuringDayOptions,
  keepingCarDuringNightOptions,
} from "@/app/temporary/get-quote/data";

const AdditionalDriversModal = ({
  isOpen,
  onClose,
  form,
  drivers = [],
  onAddDriver,
  onRemoveDriver,
  onUpdateDriver
}) => {
  const { watch, setValue } = form;
  const [driverAddresses, setDriverAddresses] = useState({});
  const [driverLoadingStates, setDriverLoadingStates] = useState({});
  const [dynamicDriverNcbOptions, setDynamicDriverNcbOptions] = useState({});
  const [expandedTiles, setExpandedTiles] = useState({});
  const [expandedDriver, setExpandedDriver] = useState({});
  const [validationError, setValidationError] = useState("");

  const toggleDriver = (driverIndex) => {
    setExpandedDriver(prev => ({
      ...prev,
      [driverIndex]: !prev[driverIndex]
    }));
  };

  const isDriverExpanded = (driverIndex) => {
    return expandedDriver[driverIndex] !== false;
  };

  const toggleTile = (driverIndex, tileKey) => {
    setExpandedTiles(prev => {
      const driverTiles = prev[driverIndex] ? new Set(prev[driverIndex]) : new Set(['about']);
      if (driverTiles.has(tileKey)) {
        driverTiles.delete(tileKey);
      } else {
        driverTiles.add(tileKey);
      }
      return { ...prev, [driverIndex]: driverTiles };
    });
  };

  const isTileExpanded = (driverIndex, tileKey) => {
    const driverTiles = expandedTiles[driverIndex];
    return driverTiles && driverTiles.has ? driverTiles.has(tileKey) : false;
  };

  const checkTileCompletion = (driverIndex, tileKey) => {
    const driver = drivers[driverIndex];
    if (!driver) return false;

    const requiredFields = {
      about: ['firstName', 'lastName', 'dateOfBirth', 'livedInUKSinceBirth'],
      employment: ['employmentStatus', 'occupation', 'industry'],
      usage: ['otherVehicles'],
      driving: ['licenseType', 'licenseHeld', 'hasAdditionalQualifications'],
      declarations: ['criminalConvictions', 'medicalConditions', 'insuranceCancelledOrClaimRefusedOrPolicyVoided']
    };

    const fieldsToCheck = requiredFields[tileKey] || [];
    return fieldsToCheck.every(field => {
      const value = driver[field];
      return value !== null && value !== undefined && value !== '';
    });
  };


  useEffect(() => {
    drivers.forEach((_, index) => {
      // Initialize expanded tiles with 'about' as first tile
      if (!expandedTiles[index]) {
        setExpandedTiles(prev => ({ ...prev, [index]: new Set(['about']) }));
      }
      // Auto-expand drivers that are newly added or become available
      if (!isDriverDisabled(index)) {
        setExpandedDriver(prev => ({ ...prev, [index]: true }));
      }
    });
    setValidationError("");
  }, [drivers.length, isOpen]);

  const isDriverComplete = (driver) => {
    const requiredFields = [
      'firstName',
      'lastName',
      'dateOfBirth',
      'livedInUKSinceBirth',
      'employmentStatus',
      'occupation',
      'industry',
      'otherVehicles',
      'licenseType',
      'licenseHeld',
      'hasAdditionalQualifications',
      'criminalConvictions',
      'medicalConditions',
      'insuranceCancelledOrClaimRefusedOrPolicyVoided'
    ];

    return requiredFields.every(field => {
      const value = driver[field];
      return value !== null && value !== undefined && value !== '';
    });
  };

  const validateAllDrivers = () => {
    if (drivers.length === 0) {
      return true;
    }

    const incompleteDriverIndex = drivers.findIndex(driver => !isDriverComplete(driver));

    if (incompleteDriverIndex !== -1) {
      const driverName = drivers[incompleteDriverIndex].firstName && drivers[incompleteDriverIndex].lastName
        ? `${drivers[incompleteDriverIndex].firstName} ${drivers[incompleteDriverIndex].lastName}`
        : `Driver ${incompleteDriverIndex + 1}`;
      setValidationError(`Please complete all details for ${driverName} before saving.`);
      return false;
    }

    return true;
  };

  const handleSaveDrivers = () => {
    if (validateAllDrivers()) {
      setValidationError("");
      onClose();
    }
  };

  const handleCancel = () => {
    setValidationError("");
    onClose();
  };



  const getTileOrder = () => ['about', 'employment', 'usage', 'driving', 'declarations'];


  const getTileLabel = (tileKey) => {
    const labels = {
      about: 'About You',
      employment: 'Your Employment',
      usage: 'Usage Details',
      driving: 'Driving Record',
      declarations: 'Declarations'
    };
    return labels[tileKey] || tileKey;
  };

  const getPreviousTileLabel = (tileKey) => {
    const tiles = getTileOrder();
    const currentIndex = tiles.indexOf(tileKey);
    if (currentIndex <= 0) return null;
    const previousKey = tiles[currentIndex - 1];
    return getTileLabel(previousKey);
  };

  const isTileDisabled = (driverIndex, tileKey) => {
    const tiles = getTileOrder();
    const currentTileIndex = tiles.indexOf(tileKey);

    if (currentTileIndex === 0) return false; // First tile is always enabled

    const previousTileKey = tiles[currentTileIndex - 1];
    return !checkTileCompletion(driverIndex, previousTileKey);
  };

  const isDriverDisabled = (driverIndex) => {
    if (driverIndex === 0) return false; // First driver is always enabled
    const previousDriver = drivers[driverIndex - 1];
    return !isDriverComplete(previousDriver);
  };


  // Auto-expand next tile when current tile is completed
  useEffect(() => {
    drivers.forEach((_, driverIndex) => {
      const tiles = getTileOrder();
      tiles.forEach((tileKey, tileIndex) => {
        const isComplete = checkTileCompletion(driverIndex, tileKey);
        const isCurrentlyExpanded = isTileExpanded(driverIndex, tileKey);

        if (isComplete && isCurrentlyExpanded && tileIndex < tiles.length - 1) {
          const nextTileKey = tiles[tileIndex + 1];
          const isNextTileExpanded = isTileExpanded(driverIndex, nextTileKey);

          // Auto-expand next tile if not already expanded and not disabled
          if (!isNextTileExpanded && !isTileDisabled(driverIndex, nextTileKey)) {
            setTimeout(() => {
              setExpandedTiles(prev => {
                const driverTiles = prev[driverIndex] ? new Set(prev[driverIndex]) : new Set();
                driverTiles.add(nextTileKey);
                return { ...prev, [driverIndex]: driverTiles };
              });
            }, 300);
          }
        }
      });
    });
  }, [drivers]);

  useEffect(() => {
    drivers.forEach((driver, index) => {
      const dateOfBirth = watch(`carUsage.additionalDrivers.${index}.dateOfBirth`);
      if (dateOfBirth) {
        const birthYear = new Date(dateOfBirth).getFullYear();
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;

        const ncbOptionsForAge = ncbOptions.filter((option) => {
          if (age >= 75) return option !== "20+ years" && option !== "18+ years";
          if (age >= 70) return option !== "20+ years";
          return true;
        });

        setDynamicDriverNcbOptions(prev => ({
          ...prev,
          [index]: ncbOptionsForAge
        }));
      }
    });
  }, [drivers, watch]);

  useEffect(() => {
    drivers.forEach((driver, index) => {
      const isDisabledStatus = ["Retired", "Unemployed", "Student", "Houseperson"].includes(driver.employmentStatus);
      if (isDisabledStatus) {
        if (driver.industry !== "N/A") {
          onUpdateDriver(index, "industry", "N/A");
        }
        if (driver.occupation !== "N/A") {
          onUpdateDriver(index, "occupation", "N/A");
        }
      } else {
        if (driver.industry === "N/A") {
          onUpdateDriver(index, "industry", "");
        }
        if (driver.occupation === "N/A") {
          onUpdateDriver(index, "occupation", "");
        }
      }
    });
  }, [drivers, onUpdateDriver]);

  const handleFindAddress = async (index) => {
    const postcode = watch(`carUsage.additionalDrivers.${index}.postCode`);
    if (!postcode) return;

    setDriverLoadingStates(prev => ({ ...prev, [index]: true }));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/vehicle-search/postcode?postcode=${postcode}`
      );
      const data = await response.json();
      setDriverAddresses(prev => ({ ...prev, [index]: data?.addresses || [] }));
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setDriverLoadingStates(prev => ({ ...prev, [index]: false }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className={modalStyles.modalOverlay}>
      <div className={modalStyles.modalContainer}>
        <div className={modalStyles.modalHeader}>
          <h2 className={modalStyles.modalTitle}>Add Additional Drivers</h2>
          <p className={modalStyles.modalSubtitle}>Complete the details for each driver</p>
        </div>

        <div className={modalStyles.modalContent}>
          <div className={modalStyles.driversList}>
            {drivers.map((driver, index) => (
              <div key={index} className={modalStyles.driverItem}>
                <div className={`${modalStyles.driverHeader} ${isDriverExpanded(index) ? modalStyles.expanded : ''} ${isDriverDisabled(index) ? modalStyles.disabled : ''}`} onClick={() => !isDriverDisabled(index) && toggleDriver(index)} role="button" tabIndex={isDriverDisabled(index) ? -1 : 0}>
                  <span className={modalStyles.driverNumber}>
                    {driver.firstName && driver.lastName ? `${driver.firstName} ${driver.lastName}` : `Driver ${index + 1}`}
                  </span>
                  <div className={modalStyles.driverHeaderActions}>
                    <span className={modalStyles.expandIcon}>+</span>
                    <button
                      type="button"
                      className={modalStyles.removeButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveDriver(index);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {isDriverExpanded(index) && isDriverDisabled(index) && (
                  <div className={modalStyles.errorMessage}>
                    <span className={modalStyles.errorIcon}>!</span>
                    <span>Complete Driver {index} details first</span>
                  </div>
                )}

                {isDriverExpanded(index) && !isDriverDisabled(index) && (
                <div className={modalStyles.driverFormContent}>
                  {/* About You Section */}
                  <div className={`${modalStyles.formSection} ${isTileExpanded(index, 'about') ? modalStyles.expanded : ''} ${isTileDisabled(index, 'about') ? modalStyles.disabled : ''}`}>
                    <button type="button" className={`${modalStyles.tileHeader} ${isTileExpanded(index, 'about') ? modalStyles.expanded : ''} ${isTileDisabled(index, 'about') ? modalStyles.disabled : ''}`} onClick={() => toggleTile(index, 'about')}>
                      <h4 className={modalStyles.sectionLabel}>About You</h4>
                      <span className={modalStyles.expandIcon}>+</span>
                    </button>
                    {isTileExpanded(index, 'about') && isTileDisabled(index, 'about') && (
                      <div className={modalStyles.errorMessage}>
                        <span className={modalStyles.errorIcon}>!</span>
                        <span>Complete {getPreviousTileLabel('about')} first</span>
                      </div>
                    )}
                    {isTileExpanded(index, 'about') && !isTileDisabled(index, 'about') && <>
                      <div className={modalStyles.fieldRow2Col}>
                        <div className={modalStyles.field}>
                          <FormTextInput label="First Name" placeholder="Enter first name" value={watch(`carUsage.additionalDrivers.${index}.firstName`) || ""} onChange={(e) => onUpdateDriver(index, "firstName", e.target.value)} inputStyle={{ paddingLeft: "14px" }} />
                        </div>
                        <div className={modalStyles.field}>
                          <FormTextInput label="Last Name" placeholder="Enter last name" value={watch(`carUsage.additionalDrivers.${index}.lastName`) || ""} onChange={(e) => onUpdateDriver(index, "lastName", e.target.value)} inputStyle={{ paddingLeft: "14px" }} />
                        </div>
                      </div>
                      <div className={modalStyles.fieldRow2Col}>
                        <div className={modalStyles.field}>
                          <FormDataAndTime
                            dateLabel="Date of Birth"
                            type="date"
                            allowPastDates={true}
                            isDateOfBirth={true}
                            maxDate={new Date(new Date().getFullYear() - 16, new Date().getMonth(), new Date().getDate())}
                            defaultYear={2009}
                            reducedPadding={true}
                            value={watch(`carUsage.additionalDrivers.${index}.dateOfBirth`) || ""}
                            onChange={(e) => onUpdateDriver(index, "dateOfBirth", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className={modalStyles.field}>
                        <label className={modalStyles.inputLabel}>Lived in UK since birth?</label>
                        <YesORNo value={watch(`carUsage.additionalDrivers.${index}.livedInUKSinceBirth`)} onChange={(value) => onUpdateDriver(index, "livedInUKSinceBirth", value)} />
                      </div>
                    </>}
                  </div>

                  {/* Employment Section */}
                  <div className={`${modalStyles.formSection} ${isTileExpanded(index, 'employment') ? modalStyles.expanded : ''} ${isTileDisabled(index, 'employment') ? modalStyles.disabled : ''}`}>
                    <button type="button" className={`${modalStyles.tileHeader} ${isTileExpanded(index, 'employment') ? modalStyles.expanded : ''} ${isTileDisabled(index, 'employment') ? modalStyles.disabled : ''}`} onClick={() => toggleTile(index, 'employment')}>
                      <h4 className={modalStyles.sectionLabel}>Your Employment</h4>
                      <span className={modalStyles.expandIcon}>+</span>
                    </button>
                    {isTileExpanded(index, 'employment') && isTileDisabled(index, 'employment') && (
                      <div className={modalStyles.errorMessage}>
                        <span className={modalStyles.errorIcon}>!</span>
                        <span>Complete {getPreviousTileLabel('employment')} first</span>
                      </div>
                    )}
                    {isTileExpanded(index, 'employment') && !isTileDisabled(index, 'employment') && <>
                      <div className={modalStyles.fieldRow2Col}>
                        <div className={modalStyles.field}>
                          <FormDropdown label="Employment Status" options={employmentStatusOptions} placeholder="Select status" value={watch(`carUsage.additionalDrivers.${index}.employmentStatus`) || ""} onChange={(e) => onUpdateDriver(index, "employmentStatus", e.target.value)} inputStyle={{ paddingLeft: "14px" }} />
                        </div>
                        <div className={modalStyles.field}>
                          <FormAutocomplete label="Occupation" options={occupationOptions} placeholder="Type your occupation..." value={watch(`carUsage.additionalDrivers.${index}.occupation`) || ""} onChange={(e) => { const value = typeof e === "string" ? e : (e?.target?.value || ""); onUpdateDriver(index, "occupation", value); }} disabled={["Retired", "Unemployed", "Student", "Houseperson"].includes(watch(`carUsage.additionalDrivers.${index}.employmentStatus`))} inputStyle={{ paddingLeft: "14px" }} />
                        </div>
                      </div>
                      <div className={modalStyles.field}>
                        <FormAutocomplete label="Industry" options={industryOptions} placeholder="Type your industry..." value={watch(`carUsage.additionalDrivers.${index}.industry`) || ""} onChange={(e) => { const value = typeof e === "string" ? e : (e?.target?.value || ""); onUpdateDriver(index, "industry", value); }} disabled={["Retired", "Unemployed", "Student", "Houseperson"].includes(watch(`carUsage.additionalDrivers.${index}.employmentStatus`))} inputStyle={{ paddingLeft: "14px" }} />
                      </div>
                    </>}
                  </div>

                  {/* Usage Details Section */}
                  <div className={`${modalStyles.formSection} ${isTileExpanded(index, 'usage') ? modalStyles.expanded : ''} ${isTileDisabled(index, 'usage') ? modalStyles.disabled : ''}`}>
                    <button type="button" className={`${modalStyles.tileHeader} ${isTileExpanded(index, 'usage') ? modalStyles.expanded : ''} ${isTileDisabled(index, 'usage') ? modalStyles.disabled : ''}`} onClick={() => toggleTile(index, 'usage')}>
                      <h4 className={modalStyles.sectionLabel}>Usage Details</h4>
                      <span className={modalStyles.expandIcon}>+</span>
                    </button>
                    {isTileExpanded(index, 'usage') && isTileDisabled(index, 'usage') && (
                      <div className={modalStyles.errorMessage}>
                        <span className={modalStyles.errorIcon}>!</span>
                        <span>Complete {getPreviousTileLabel('usage')} first</span>
                      </div>
                    )}
                    {isTileExpanded(index, 'usage') && !isTileDisabled(index, 'usage') && <>
                      <div className={modalStyles.field}>
                        <label className={modalStyles.inputLabel}>Other Vehicles?</label>
                        <YesORNo value={watch(`carUsage.additionalDrivers.${index}.otherVehicles`)} onChange={(value) => onUpdateDriver(index, "otherVehicles", value)} />
                      </div>
                      {watch(`carUsage.additionalDrivers.${index}.otherVehicles`) && (
                        <div className={modalStyles.field}>
                          <FormDropdown label="What other vehicles?" options={otherVehiclesOptions} placeholder="Select vehicle type" value={watch(`carUsage.additionalDrivers.${index}.otherVehiclesType`) || ""} onChange={(value) => onUpdateDriver(index, "otherVehiclesType", value)} inputStyle={{ paddingLeft: "14px" }} />
                        </div>
                      )}
                    </>}
                  </div>

                  {/* Driving Record Section */}
                  <div className={`${modalStyles.formSection} ${isTileExpanded(index, 'driving') ? modalStyles.expanded : ''} ${isTileDisabled(index, 'driving') ? modalStyles.disabled : ''}`}>
                    <button type="button" className={`${modalStyles.tileHeader} ${isTileExpanded(index, 'driving') ? modalStyles.expanded : ''} ${isTileDisabled(index, 'driving') ? modalStyles.disabled : ''}`} onClick={() => toggleTile(index, 'driving')}>
                      <h4 className={modalStyles.sectionLabel}>Driving Record</h4>
                      <span className={modalStyles.expandIcon}>+</span>
                    </button>
                    {isTileExpanded(index, 'driving') && isTileDisabled(index, 'driving') && (
                      <div className={modalStyles.errorMessage}>
                        <span className={modalStyles.errorIcon}>!</span>
                        <span>Complete {getPreviousTileLabel('driving')} first</span>
                      </div>
                    )}
                    {isTileExpanded(index, 'driving') && !isTileDisabled(index, 'driving') && <>
                      <div className={modalStyles.fieldRow3Col}>
                        <div className={modalStyles.field}>
                          <FormDropdown label="License Type" options={["Full UK", "Provisional UK", "International", "Other"]} placeholder="Select type" value={watch(`carUsage.additionalDrivers.${index}.licenseType`) || ""} onChange={(e) => onUpdateDriver(index, "licenseType", e.target.value)} inputStyle={{ paddingLeft: "14px" }} />
                        </div>
                        <div className={modalStyles.field}>
                          <FormDropdown label="License Held" options={licenseHeldOptions} placeholder="Select duration" value={watch(`carUsage.additionalDrivers.${index}.licenseHeld`) || ""} onChange={(e) => onUpdateDriver(index, "licenseHeld", e.target.value)} inputStyle={{ paddingLeft: "14px" }} />
                        </div>
                        <div className={modalStyles.field}>
                          <FormTextInput label="License Number" placeholder="Optional" value={watch(`carUsage.additionalDrivers.${index}.licenseNumber`) || ""} onChange={(e) => onUpdateDriver(index, "licenseNumber", e.target.value)} inputStyle={{ paddingLeft: "14px" }} />
                        </div>
                      </div>
                      <div className={modalStyles.field}>
                        <label className={modalStyles.inputLabel}>Additional Driving Qualifications?</label>
                        <YesORNo value={watch(`carUsage.additionalDrivers.${index}.hasAdditionalQualifications`)} onChange={(value) => onUpdateDriver(index, "hasAdditionalQualifications", value)} />
                      </div>
                      {watch(`carUsage.additionalDrivers.${index}.hasAdditionalQualifications`) && (<>
                        <div className={modalStyles.field}>
                          <FormDropdown label="Qualification Type" options={additionalQualificationsOptions} placeholder="Select type" value={watch(`carUsage.additionalDrivers.${index}.additionalQualificationType`) || ""} onChange={(e) => onUpdateDriver(index, "additionalQualificationType", e.target.value)} inputStyle={{ paddingLeft: "14px" }} />
                        </div>
                        <div className={modalStyles.fieldRow2Col}>
                          <div className={modalStyles.field}>
                            <FormDropdown label="Month" options={monthOptions} placeholder="Select month" value={watch(`carUsage.additionalDrivers.${index}.qualificationMonth`) || ""} onChange={(e) => onUpdateDriver(index, "qualificationMonth", e.target.value)} inputStyle={{ paddingLeft: "14px" }} />
                          </div>
                          <div className={modalStyles.field}>
                            <FormDropdown label="Year" options={yearOptions} placeholder="Select year" value={watch(`carUsage.additionalDrivers.${index}.qualificationYear`) || ""} onChange={(e) => onUpdateDriver(index, "qualificationYear", e.target.value)} inputStyle={{ paddingLeft: "14px" }} />
                          </div>
                        </div>
                      </>)}
                    </>}
                  </div>

                  {/* Declarations Section */}
                  <div className={`${modalStyles.formSection} ${isTileExpanded(index, 'declarations') ? modalStyles.expanded : ''} ${isTileDisabled(index, 'declarations') ? modalStyles.disabled : ''}`}>
                    <button type="button" className={`${modalStyles.tileHeader} ${isTileExpanded(index, 'declarations') ? modalStyles.expanded : ''} ${isTileDisabled(index, 'declarations') ? modalStyles.disabled : ''}`} onClick={() => toggleTile(index, 'declarations')}>
                      <h4 className={modalStyles.sectionLabel}>Declarations</h4>
                      <span className={modalStyles.expandIcon}>+</span>
                    </button>
                    {isTileExpanded(index, 'declarations') && isTileDisabled(index, 'declarations') && (
                      <div className={modalStyles.errorMessage}>
                        <span className={modalStyles.errorIcon}>!</span>
                        <span>Complete {getPreviousTileLabel('declarations')} first</span>
                      </div>
                    )}
                    {isTileExpanded(index, 'declarations') && !isTileDisabled(index, 'declarations') && <>
                      <div className={modalStyles.field}>
                        <label className={modalStyles.inputLabel}>Do you have any unspent or outstanding criminal convictions?</label>
                        <YesORNo value={watch(`carUsage.additionalDrivers.${index}.criminalConvictions`)} onChange={(value) => onUpdateDriver(index, "criminalConvictions", value)} />
                      </div>
                      <div className={modalStyles.field}>
                        <label className={modalStyles.inputLabel}>Do you have any medical conditions that are notifiable to the DVLA?</label>
                        <YesORNo value={watch(`carUsage.additionalDrivers.${index}.medicalConditions`)} onChange={(value) => onUpdateDriver(index, "medicalConditions", value)} />
                      </div>
                      <div className={modalStyles.field}>
                        <label className={modalStyles.inputLabel}>Have you ever had insurance cancelled, a claim refused, a policy voided, or any special terms imposed?</label>
                        <YesORNo value={watch(`carUsage.additionalDrivers.${index}.insuranceCancelledOrClaimRefusedOrPolicyVoided`)} onChange={(value) => onUpdateDriver(index, "insuranceCancelledOrClaimRefusedOrPolicyVoided", value)} />
                      </div>
                    </>}
                  </div>
                </div>
                )}
              </div>
            ))}

            <button type="button" className={modalStyles.addButton} onClick={onAddDriver}>
              + Add Another Driver
            </button>
          </div>
        </div>

        {validationError && (
          <div className={modalStyles.validationErrorBox}>
            <span className={modalStyles.errorIcon}>!</span>
            <span>{validationError}</span>
          </div>
        )}

        <div className={modalStyles.modalFooter}>
          <button className={modalStyles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
          <button className={modalStyles.doneButton} onClick={handleSaveDrivers} type="button">
            Save Drivers
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDriversModal;
