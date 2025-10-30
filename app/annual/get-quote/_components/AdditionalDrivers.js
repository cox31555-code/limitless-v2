"use client";
import React from "react";
import FormTextInput from "@/ui/inputs/FormTextInput";
import FormDataAndTime from "@/ui/inputs/FormDataAndTime";
import FormDropdown from "@/ui/inputs/FormDropdown";
import YesORNo from "@/ui/inputs/selections/yesORNo/YesORNo";
import ConfirmBtn from "@/ui/buttons/confirmBtn/ConfirmBtn";
import styles from "@/app/temporary/get-quote/_components/components.module.css";
import {
  employmentStatusOptions,
  licenseHeldOptions,
} from "@/app/temporary/get-quote/data";

const titleOptions = ["Mr", "Mrs", "Miss", "Ms", "Dr", "Mx"];
const relationshipOptions = ["Spouse", "Child", "Parent", "Sibling", "Friend", "Other"];
const relationshipStatusOptions = ["Single", "Married", "Divorced", "Widowed", "In a civil partnership"];
const licenseTypeOptions = [
  "Full UK Car Licence",
  "Provisional UK Car Licence",
  "Full International Licence",
  "Full EU Licence",
  "Full European non-EU Licence",
  "Full UK Car Licence (automatic only)",
];

const AdditionalDrivers = ({ 
  form, 
  drivers = [], 
  onAddDriver, 
  onRemoveDriver,
  onUpdateDriver 
}) => {
  const { watch } = form;

  const handleAddDriver = () => {
    if (drivers.length < 5) {
      onAddDriver();
    }
  };

  return (
    <section className={styles.cleanSection}>
      {drivers && drivers.length > 0 ? (
        <div className={styles.cleanAdditionalDriversContainer}>
          {drivers.map((driver, index) => (
            <div key={index} className={styles.cleanDriverCard}>
              {/* Driver Header with Number and Remove Button */}
              <div className={styles.cleanDriverHeader}>
                <div className={styles.cleanDriverNumberBadge}>
                  Driver {index + 1}
                </div>
                {drivers.length > 1 && (
                  <button
                    type="button"
                    className={styles.cleanRemoveDriverButton}
                    onClick={() => onRemoveDriver(index)}
                    title="Remove this driver"
                  >
                    ✕ Remove
                  </button>
                )}
              </div>

              {/* Personal Information Section */}
              <div className={styles.cleanDriverSection}>
                <h4 className={styles.cleanDriverSectionTitle}>Personal Information</h4>
                
                <div className={styles.cleanFormGrid1Col}>
                  <p className={styles.cleanFormFieldLabel}>Relationship to you</p>
                  <FormDropdown
                    label=""
                    options={relationshipOptions}
                    placeholder="Select relationship"
                    value={watch(`carUsage.additionalDrivers.${index}.relationship`) || ""}
                    onChange={(value) => onUpdateDriver(index, "relationship", value)}
                    inputStyle={{ paddingLeft: "14px" }}
                  />
                </div>

                <div className={styles.cleanFormGrid1Col}>
                  <p className={styles.cleanFormFieldLabel}>Full name</p>
                  <p className={styles.cleanSubLabel}>
                    If you select 'Dr' or 'Mx' as their title, you may see fewer results. A small number of providers are still updating their systems to support these options.
                  </p>
                </div>

                <div className={styles.cleanFormGrid3Col}>
                  <FormDropdown
                    label="Title"
                    options={titleOptions}
                    placeholder="Select..."
                    value={watch(`carUsage.additionalDrivers.${index}.title`) || ""}
                    onChange={(value) => onUpdateDriver(index, "title", value)}
                    inputStyle={{ paddingLeft: "14px" }}
                  />
                  <FormTextInput
                    label="First name"
                    placeholder="First name"
                    value={watch(`carUsage.additionalDrivers.${index}.firstName`) || ""}
                    onChange={(e) => onUpdateDriver(index, "firstName", e.target.value)}
                    inputStyle={{ paddingLeft: "14px" }}
                  />
                  <FormTextInput
                    label="Last name"
                    placeholder="Last name"
                    value={watch(`carUsage.additionalDrivers.${index}.lastName`) || ""}
                    onChange={(e) => onUpdateDriver(index, "lastName", e.target.value)}
                    inputStyle={{ paddingLeft: "14px" }}
                  />
                </div>

                <div className={styles.cleanFormGrid2Col}>
                  <div>
                    <p className={styles.cleanFormFieldLabel}>Date of birth</p>
                    <FormDataAndTime
                      dateLabel=""
                      type="date"
                      allowPastDates={true}
                      isDateOfBirth={true}
                      reducedPadding={true}
                      value={watch(`carUsage.additionalDrivers.${index}.dateOfBirth`) || ""}
                      onChange={(value) => onUpdateDriver(index, "dateOfBirth", value)}
                    />
                  </div>
                  <div>
                    <p className={styles.cleanFormFieldLabel}>Relationship status</p>
                    <FormDropdown
                      label=""
                      options={relationshipStatusOptions}
                      placeholder="Select..."
                      value={watch(`carUsage.additionalDrivers.${index}.relationshipStatus`) || ""}
                      onChange={(value) => onUpdateDriver(index, "relationshipStatus", value)}
                      inputStyle={{ paddingLeft: "14px" }}
                    />
                  </div>
                </div>

                <div className={styles.cleanFormGrid1Col}>
                  <p className={styles.cleanFormFieldLabel}>UK residency</p>
                  <p className={styles.cleanSubLabel}>Have they continuously lived in the UK since birth?</p>
                  <YesORNo
                    value={watch(`carUsage.additionalDrivers.${index}.livedInUKSinceBirth`)}
                    onChange={(value) => onUpdateDriver(index, "livedInUKSinceBirth", value)}
                  />
                </div>

                <div className={styles.cleanFormGrid1Col}>
                  <p className={styles.cleanFormFieldLabel}>Employment status</p>
                  <FormDropdown
                    label=""
                    options={employmentStatusOptions}
                    placeholder="Select..."
                    value={watch(`carUsage.additionalDrivers.${index}.employmentStatus`) || ""}
                    onChange={(value) => onUpdateDriver(index, "employmentStatus", value)}
                    inputStyle={{ paddingLeft: "14px" }}
                  />
                </div>
              </div>

              {/* Driving License Section */}
              <div className={styles.cleanDriverSection}>
                <h4 className={styles.cleanDriverSectionTitle}>Driving License</h4>
                
                <div className={styles.cleanFormGrid1Col}>
                  <p className={styles.cleanFormFieldLabel}>Type of license</p>
                  <p className={styles.cleanSubLabel}>Choose the type of licence at the time this policy starts.</p>
                  <div className={styles.cleanRadioGroup}>
                    {licenseTypeOptions.map((option) => (
                      <label key={option} className={styles.cleanRadioLabel}>
                        <input
                          type="radio"
                          name={`licenseType_${index}`}
                          value={option}
                          checked={watch(`carUsage.additionalDrivers.${index}.licenseType`) === option}
                          onChange={(e) => onUpdateDriver(index, "licenseType", e.target.value)}
                          className={styles.cleanRadioInput}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.cleanFormGrid1Col}>
                  <p className={styles.cleanFormFieldLabel}>How long held</p>
                  <p className={styles.cleanSubLabel}>
                    Round down to the nearest full year. E.g., 6 years and 11 months = 6 years.
                  </p>
                  <FormDropdown
                    label=""
                    options={licenseHeldOptions}
                    placeholder="Select..."
                    value={watch(`carUsage.additionalDrivers.${index}.licenseHeld`) || ""}
                    onChange={(value) => onUpdateDriver(index, "licenseHeld", value)}
                    inputStyle={{ paddingLeft: "14px" }}
                  />
                </div>

                <div className={styles.cleanFormGrid1Col}>
                  <p className={styles.cleanFormFieldLabel}>Other vehicles</p>
                  <p className={styles.cleanSubLabel}>Do they use any other vehicles?</p>
                  <YesORNo
                    value={watch(`carUsage.additionalDrivers.${index}.otherVehicles`)}
                    onChange={(value) => onUpdateDriver(index, "otherVehicles", value)}
                  />
                </div>
              </div>

              {/* Health & Safety Declaration Section */}
              <div className={styles.cleanDriverSection}>
                <h4 className={styles.cleanDriverSectionTitle}>Health & Safety Declaration</h4>
                
                <div className={styles.cleanFormGrid1Col}>
                  <p className={styles.cleanFormFieldLabel}>Medical conditions or disabilities</p>
                  <p className={styles.cleanSubLabel}>
                    Any conditions that need to be reported to the DVLA (or DVA)?
                  </p>
                  <YesORNo
                    value={watch(`carUsage.additionalDrivers.${index}.medicalConditions`)}
                    onChange={(value) => onUpdateDriver(index, "medicalConditions", value)}
                  />
                </div>

                <div className={styles.cleanFormGrid1Col}>
                  <p className={styles.cleanFormFieldLabel}>Insurance history</p>
                  <p className={styles.cleanSubLabel}>
                    Has an insurance provider ever declined, cancelled, or voided their policy or imposed special terms?
                  </p>
                  <YesORNo
                    value={watch(`carUsage.additionalDrivers.${index}.insuranceHistory`)}
                    onChange={(value) => onUpdateDriver(index, "insuranceHistory", value)}
                  />
                </div>

                <div className={styles.cleanFormGrid1Col}>
                  <p className={styles.cleanFormFieldLabel}>Criminal convictions</p>
                  <p className={styles.cleanSubLabel}>
                    Any unspent non-motoring-related criminal convictions?
                  </p>
                  <YesORNo
                    value={watch(`carUsage.additionalDrivers.${index}.criminalConvictions`)}
                    onChange={(value) => onUpdateDriver(index, "criminalConvictions", value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* Add Driver Button */}
      {drivers.length < 5 && (
        <div className={styles.cleanAddDriverButtonContainer}>
          <ConfirmBtn
            title={drivers.length === 0 ? "+ Add Driver" : "+ Add Another Driver"}
            onClick={handleAddDriver}
            type="button"
          />
        </div>
      )}

      {/* Maximum Drivers Reached Message */}
      {drivers.length >= 5 && (
        <div className={styles.cleanMaxDriversMessage}>
          <p>You've added the maximum of 5 drivers.</p>
        </div>
      )}
    </section>
  );
};

export default AdditionalDrivers;
