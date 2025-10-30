"use client";
import React, { useState, useEffect } from "react";
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
  const [expandedTile, setExpandedTile] = useState({});
  const [expandedDriver, setExpandedDriver] = useState({});

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
    setExpandedTile(prev => ({
      ...prev,
      [driverIndex]: prev[driverIndex] === tileKey ? null : tileKey
    }));
  };

  const isTileExpanded = (driverIndex, tileKey) => {
    return expandedTile[driverIndex] === tileKey;
  };

  const getTileOrder = () => ['about', 'employment', 'usage', 'driving', 'declarations'];

  const isTileDisabled = (driverIndex, tileKey) => {
    const tiles = getTileOrder();
    const currentTileIndex = tiles.indexOf(tileKey);

    if (currentTileIndex === 0) return false; // First tile is always enabled

    const previousTileKey = tiles[currentTileIndex - 1];
    return !checkTileCompletion(driverIndex, previousTileKey);
  };

  const checkTileCompletion = (driverIndex, tileKey) => {
    const driver = drivers[driverIndex];
    if (!driver) return false;

    const requiredFields = {
      about: ['firstName', 'lastName', 'dateOfBirth', 'livedInUKSinceBirth'],
      employment: ['employmentStatus', 'occupation', 'industry'],
      usage: ['otherVehicles'],
      driving: ['licenseType', 'licenseHeld', 'NCB'],
      declarations: ['criminalConvictions', 'medicalConditions', 'insuranceCancelledOrClaimRefusedOrPolicyVoided']
    };

    const fieldsToCheck = requiredFields[tileKey] || [];
    return fieldsToCheck.every(field => {
      const value = driver[field];
      return value !== null && value !== undefined && value !== '';
    });
  };

  const autoExpandNextTile = (driverIndex) => {
    const tiles = ['about', 'employment', 'usage', 'driving', 'declarations'];
    const currentExpanded = expandedTile[driverIndex];
    const currentIndex = tiles.indexOf(currentExpanded);

    if (currentIndex !== -1 && currentIndex < tiles.length - 1) {
      const nextTile = tiles[currentIndex + 1];
      if (checkTileCompletion(driverIndex, currentExpanded)) {
        setExpandedTile(prev => ({
          ...prev,
          [driverIndex]: nextTile
        }));
      }
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      setExpandedTile(prev => {
        const updated = { ...prev };
        drivers.forEach((_, index) => {
          if (!(index in updated)) {
            updated[index] = 'about';
          }
        });
        return updated;
      });
    }
  }, [isOpen, drivers.length]);

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
    <div className={modalStyles.modalOverlay} onClick={onClose}>
      <div className={modalStyles.modalContainer} onClick={e => e.stopPropagation()}>
        <div className={modalStyles.modalHeader}>
          <h2 className={modalStyles.modalTitle}>Add Additional Drivers</h2>
          <p className={modalStyles.modalSubtitle}>Complete the details for each driver</p>
          <button className={modalStyles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={modalStyles.modalContent}>
          <div className={modalStyles.driversList}>
            {drivers.map((driver, index) => (
              <div key={index} className={modalStyles.driverItem}>
                <button type="button" className={`${modalStyles.driverHeader} ${isDriverExpanded(index) ? modalStyles.expanded : ''}`} onClick={() => toggleDriver(index)}>
                  <span className={modalStyles.driverNumber}>Driver {index + 1}</span>
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
                </button>

                {isDriverExpanded(index) && (
                <div className={modalStyles.driverFormContent}>
                  {/* About You Section */}
                  <div className={`${modalStyles.formSection} ${isTileDisabled(index, 'about') ? modalStyles.disabled : ''}`}>
                    <button type="button" className={`${modalStyles.tileHeader} ${isTileExpanded(index, 'about') ? modalStyles.expanded : ''} ${isTileDisabled(index, 'about') ? modalStyles.disabled : ''}`} onClick={() => !isTileDisabled(index, 'about') && toggleTile(index, 'about')}>
                      <h4 className={modalStyles.sectionLabel}>About You</h4>
                      <span className={modalStyles.expandIcon}>+</span>
                    </button>
                    {isTileExpanded(index, 'about') && <>
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
                          <FormDataAndTime dateLabel="Date of Birth" type="date" allowPastDates={true} isDateOfBirth={true} maxDate={new Date(new Date().getFullYear() - 16, new Date().getMonth(), new Date().getDate())} defaultYear={2009} reducedPadding={true} value={watch(`carUsage.additionalDrivers.${index}.dateOfBirth`) || ""} onChange={(value) => onUpdateDriver(index, "dateOfBirth", value)} />
                        </div>
                      </div>
                      <div className={modalStyles.field}>
                        <label className={modalStyles.inputLabel}>Lived in UK since birth?</label>
                        <YesORNo value={watch(`carUsage.additionalDrivers.${index}.livedInUKSinceBirth`)} onChange={(value) => onUpdateDriver(index, "livedInUKSinceBirth", value)} />
                      </div>
                    </>}
                  </div>

                  {/* Employment Section */}
                  <div className={`${modalStyles.formSection} ${isTileDisabled(index, 'employment') ? modalStyles.disabled : ''}`}>
                    <button type="button" className={`${modalStyles.tileHeader} ${isTileExpanded(index, 'employment') ? modalStyles.expanded : ''} ${isTileDisabled(index, 'employment') ? modalStyles.disabled : ''}`} onClick={() => !isTileDisabled(index, 'employment') && toggleTile(index, 'employment')}>
                      <h4 className={modalStyles.sectionLabel}>Your Employment</h4>
                      <span className={modalStyles.expandIcon}>+</span>
                    </button>
                    {isTileExpanded(index, 'employment') && <>
                      <div className={modalStyles.fieldRow2Col}>
                        <div className={modalStyles.field}>
                          <FormDropdown label="Employment Status" options={employmentStatusOptions} placeholder="Select status" value={watch(`carUsage.additionalDrivers.${index}.employmentStatus`) || ""} onChange={(value) => onUpdateDriver(index, "employmentStatus", value)} inputStyle={{ paddingLeft: "14px" }} />
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
                  <div className={`${modalStyles.formSection} ${isTileDisabled(index, 'usage') ? modalStyles.disabled : ''}`}>
                    <button type="button" className={`${modalStyles.tileHeader} ${isTileExpanded(index, 'usage') ? modalStyles.expanded : ''} ${isTileDisabled(index, 'usage') ? modalStyles.disabled : ''}`} onClick={() => !isTileDisabled(index, 'usage') && toggleTile(index, 'usage')}>
                      <h4 className={modalStyles.sectionLabel}>Usage Details</h4>
                      <span className={modalStyles.expandIcon}>+</span>
                    </button>
                    {isTileExpanded(index, 'usage') && <>
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
                  <div className={`${modalStyles.formSection} ${isTileDisabled(index, 'driving') ? modalStyles.disabled : ''}`}>
                    <button type="button" className={`${modalStyles.tileHeader} ${isTileExpanded(index, 'driving') ? modalStyles.expanded : ''} ${isTileDisabled(index, 'driving') ? modalStyles.disabled : ''}`} onClick={() => !isTileDisabled(index, 'driving') && toggleTile(index, 'driving')}>
                      <h4 className={modalStyles.sectionLabel}>Driving Record</h4>
                      <span className={modalStyles.expandIcon}>+</span>
                    </button>
                    {isTileExpanded(index, 'driving') && <>
                      <div className={modalStyles.fieldRow3Col}>
                        <div className={modalStyles.field}>
                          <FormDropdown label="License Type" options={["Full UK", "Provisional UK", "International", "Other"]} placeholder="Select type" value={watch(`carUsage.additionalDrivers.${index}.licenseType`) || ""} onChange={(value) => onUpdateDriver(index, "licenseType", value)} inputStyle={{ paddingLeft: "14px" }} />
                        </div>
                        <div className={modalStyles.field}>
                          <FormDropdown label="License Held" options={licenseHeldOptions} placeholder="Select duration" value={watch(`carUsage.additionalDrivers.${index}.licenseHeld`) || ""} onChange={(value) => onUpdateDriver(index, "licenseHeld", value)} inputStyle={{ paddingLeft: "14px" }} />
                        </div>
                        <div className={modalStyles.field}>
                          <FormTextInput label="License Number" placeholder="Optional" value={watch(`carUsage.additionalDrivers.${index}.licenseNumber`) || ""} onChange={(e) => onUpdateDriver(index, "licenseNumber", e.target.value)} inputStyle={{ paddingLeft: "14px" }} />
                        </div>
                      </div>
                      <div className={modalStyles.field}>
                        <FormDropdown label="No Claims Bonus" options={dynamicDriverNcbOptions[index] || ncbOptions} placeholder="Select years" value={watch(`carUsage.additionalDrivers.${index}.NCB`) || ""} onChange={(value) => onUpdateDriver(index, "NCB", value)} inputStyle={{ paddingLeft: "14px" }} />
                      </div>
                      <div className={modalStyles.field}>
                        <label className={modalStyles.inputLabel}>Additional Driving Qualifications?</label>
                        <YesORNo value={watch(`carUsage.additionalDrivers.${index}.hasAdditionalQualifications`)} onChange={(value) => onUpdateDriver(index, "hasAdditionalQualifications", value)} />
                      </div>
                      {watch(`carUsage.additionalDrivers.${index}.hasAdditionalQualifications`) && (<>
                        <div className={modalStyles.field}>
                          <FormDropdown label="Qualification Type" options={additionalQualificationsOptions} placeholder="Select type" value={watch(`carUsage.additionalDrivers.${index}.additionalQualificationType`) || ""} onChange={(value) => onUpdateDriver(index, "additionalQualificationType", value)} inputStyle={{ paddingLeft: "14px" }} />
                        </div>
                        <div className={modalStyles.fieldRow2Col}>
                          <div className={modalStyles.field}>
                            <FormDropdown label="Month" options={monthOptions} placeholder="Select month" value={watch(`carUsage.additionalDrivers.${index}.qualificationMonth`) || ""} onChange={(value) => onUpdateDriver(index, "qualificationMonth", value)} inputStyle={{ paddingLeft: "14px" }} />
                          </div>
                          <div className={modalStyles.field}>
                            <FormDropdown label="Year" options={yearOptions} placeholder="Select year" value={watch(`carUsage.additionalDrivers.${index}.qualificationYear`) || ""} onChange={(value) => onUpdateDriver(index, "qualificationYear", value)} inputStyle={{ paddingLeft: "14px" }} />
                          </div>
                        </div>
                      </>)}
                    </>}
                  </div>

                  {/* Declarations Section */}
                  <div className={modalStyles.formSection}>
                    <button type="button" className={`${modalStyles.tileHeader} ${isTileExpanded(index, 'declarations') ? modalStyles.expanded : ''}`} onClick={() => toggleTile(index, 'declarations')}>
                      <h4 className={modalStyles.sectionLabel}>Declarations</h4>
                      <span className={modalStyles.expandIcon}>+</span>
                    </button>
                    {isTileExpanded(index, 'declarations') && <>
                      <div className={modalStyles.field}>
                        <label className={modalStyles.inputLabel}>Criminal Convictions?</label>
                        <YesORNo value={watch(`carUsage.additionalDrivers.${index}.criminalConvictions`)} onChange={(value) => onUpdateDriver(index, "criminalConvictions", value)} />
                      </div>
                      <div className={modalStyles.field}>
                        <label className={modalStyles.inputLabel}>Medical Conditions?</label>
                        <YesORNo value={watch(`carUsage.additionalDrivers.${index}.medicalConditions`)} onChange={(value) => onUpdateDriver(index, "medicalConditions", value)} />
                      </div>
                      <div className={modalStyles.field}>
                        <label className={modalStyles.inputLabel}>Insurance History?</label>
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

        <div className={modalStyles.modalFooter}>
          <button className={modalStyles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={modalStyles.doneButton} onClick={onClose} type="button">
            Save Drivers
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDriversModal;
