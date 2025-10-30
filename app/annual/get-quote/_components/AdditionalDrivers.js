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
  const { register, formState: { errors }, watch, setValue } = form;

  const handleAddDriver = () => {
    if (drivers.length < 5) {
      onAddDriver();
    }
  };

  return (
    <section className={styles.cleanSection}>
      <h3 className={styles.cleanSectionTitle} data-section="additional-drivers">
        Additional Drivers
      </h3>

      {drivers && drivers.length > 0 ? (
        <div className={styles.cleanAdditionalDriversContainer}>
          {drivers.map((driver, index) => (
            <div key={index} className={styles.cleanDriverCard}>
              <div className={styles.cleanDriverHeader}>
                <h4 className={styles.cleanDriverTitle}>Driver {index + 1}</h4>
                {drivers.length > 1 && (
                  <button
                    type="button"
                    className={styles.cleanRemoveDriverButton}
                    onClick={() => onRemoveDriver(index)}
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Relationship */}
              <div className={styles.cleanFormGrid1Col}>
                <p className={styles.cleanFormFieldLabel}>What's their relationship to you?</p>
                <FormDropdown
                  label=""
                  options={relationshipOptions}
                  placeholder="Select relationship"
                  value={watch(`carUsage.additionalDrivers.${index}.relationship`) || ""}
                  onChange={(value) => onUpdateDriver(index, "relationship", value)}
                  inputStyle={{ paddingLeft: "14px" }}
                />
                {errors.carUsage?.additionalDrivers?.[index]?.relationship && (
                  <span className={styles.cleanError}>
                    {errors.carUsage.additionalDrivers[index].relationship.message}
                  </span>
                )}
              </div>

              {/* Name Section */}
              <div className={styles.cleanFormGrid1Col}>
                <p className={styles.cleanFormFieldLabel}>What's their name?</p>
                <p className={styles.cleanSubLabel}>
                  If you select 'Dr' or 'Mx' as their title, you may see fewer results. A small number of providers are still updating their systems to support these options. We're working closely with them to ensure complete availability.
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
                  placeholder="Enter first name"
                  value={watch(`carUsage.additionalDrivers.${index}.firstName`) || ""}
                  onChange={(e) => onUpdateDriver(index, "firstName", e.target.value)}
                  inputStyle={{ paddingLeft: "14px" }}
                />
                <FormTextInput
                  label="Last name"
                  placeholder="Enter last name"
                  value={watch(`carUsage.additionalDrivers.${index}.lastName`) || ""}
                  onChange={(e) => onUpdateDriver(index, "lastName", e.target.value)}
                  inputStyle={{ paddingLeft: "14px" }}
                />
              </div>

              {/* Date of Birth */}
              <div className={styles.cleanFormGrid1Col}>
                <p className={styles.cleanFormFieldLabel}>What's their date of birth?</p>
              </div>

              <div className={styles.cleanFormGrid1Col}>
                <FormDataAndTime
                  dateLabel=""
                  type="date"
                  allowPastDates={true}
                  isDateOfBirth={true}
                  reducedPadding={true}
                  value={watch(`carUsage.additionalDrivers.${index}.dateOfBirth`) || ""}
                  onChange={(value) => onUpdateDriver(index, "dateOfBirth", value)}
                />
                {errors.carUsage?.additionalDrivers?.[index]?.dateOfBirth && (
                  <span className={styles.cleanError}>
                    {errors.carUsage.additionalDrivers[index].dateOfBirth.message}
                  </span>
                )}
              </div>

              {/* Relationship Status */}
              <div className={styles.cleanFormGrid1Col}>
                <p className={styles.cleanFormFieldLabel}>What's their relationship status?</p>
                <FormDropdown
                  label=""
                  options={relationshipStatusOptions}
                  placeholder="Please select..."
                  value={watch(`carUsage.additionalDrivers.${index}.relationshipStatus`) || ""}
                  onChange={(value) => onUpdateDriver(index, "relationshipStatus", value)}
                  inputStyle={{ paddingLeft: "14px" }}
                />
                {errors.carUsage?.additionalDrivers?.[index]?.relationshipStatus && (
                  <span className={styles.cleanError}>
                    {errors.carUsage.additionalDrivers[index].relationshipStatus.message}
                  </span>
                )}
              </div>

              {/* UK Residency */}
              <div className={styles.cleanFormGrid1Col}>
                <p className={styles.cleanFormFieldLabel}>Have they continuously lived in the UK since birth?</p>
                <p className={styles.cleanSubLabel}>
                  Insurance providers need to know how long they've lived in the UK on a continuous basis, without any breaks lasting 6 months or longer.
                </p>
                <YesORNo
                  value={watch(`carUsage.additionalDrivers.${index}.livedInUKSinceBirth`)}
                  onChange={(value) => onUpdateDriver(index, "livedInUKSinceBirth", value)}
                />
              </div>

              {/* Employment Status */}
              <div className={styles.cleanFormGrid1Col}>
                <p className={styles.cleanFormFieldLabel}>What's their employment status?</p>
                <FormDropdown
                  label=""
                  options={employmentStatusOptions}
                  placeholder="Please select..."
                  value={watch(`carUsage.additionalDrivers.${index}.employmentStatus`) || ""}
                  onChange={(value) => onUpdateDriver(index, "employmentStatus", value)}
                  inputStyle={{ paddingLeft: "14px" }}
                />
                {errors.carUsage?.additionalDrivers?.[index]?.employmentStatus && (
                  <span className={styles.cleanError}>
                    {errors.carUsage.additionalDrivers[index].employmentStatus.message}
                  </span>
                )}
              </div>

              {/* License Type */}
              <div className={styles.cleanFormGrid1Col}>
                <p className={styles.cleanFormFieldLabel}>What type of driving licence do they have?</p>
                <p className={styles.cleanSubLabel}>
                  Choose the type of licence they'll have at the time this policy starts.
                </p>
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
                {errors.carUsage?.additionalDrivers?.[index]?.licenseType && (
                  <span className={styles.cleanError}>
                    {errors.carUsage.additionalDrivers[index].licenseType.message}
                  </span>
                )}
              </div>

              {/* License Held */}
              <div className={styles.cleanFormGrid1Col}>
                <p className={styles.cleanFormFieldLabel}>How long have they held this licence?</p>
                <p className={styles.cleanSubLabel}>
                  Round down to the nearest full year they've held their driving licence for. So, if they passed their driving test 6 years and 11 months ago, your answer will be 6 years.
                </p>
                <FormDropdown
                  label=""
                  options={licenseHeldOptions}
                  placeholder="Please select..."
                  value={watch(`carUsage.additionalDrivers.${index}.licenseHeld`) || ""}
                  onChange={(value) => onUpdateDriver(index, "licenseHeld", value)}
                  inputStyle={{ paddingLeft: "14px" }}
                />
                {errors.carUsage?.additionalDrivers?.[index]?.licenseHeld && (
                  <span className={styles.cleanError}>
                    {errors.carUsage.additionalDrivers[index].licenseHeld.message}
                  </span>
                )}
              </div>

              {/* Other Vehicles */}
              <div className={styles.cleanFormGrid1Col}>
                <p className={styles.cleanFormFieldLabel}>Do they use any other vehicles?</p>
                <YesORNo
                  value={watch(`carUsage.additionalDrivers.${index}.otherVehicles`)}
                  onChange={(value) => onUpdateDriver(index, "otherVehicles", value)}
                />
              </div>

              {/* Medical Conditions */}
              <div className={styles.cleanFormGrid1Col}>
                <p className={styles.cleanFormFieldLabel}>
                  Do they have any medical conditions or disabilities that need to be reported to the DVLA (or DVA)?
                </p>
                <p className={styles.cleanSubLabel}>
                  The DVLA (or DVA) and insurance providers need to know about any medical conditions, disabilities or licence conditions that may affect their ability to drive.
                </p>
                <YesORNo
                  value={watch(`carUsage.additionalDrivers.${index}.medicalConditions`)}
                  onChange={(value) => onUpdateDriver(index, "medicalConditions", value)}
                />
              </div>

              {/* Insurance History */}
              <div className={styles.cleanFormGrid1Col}>
                <p className={styles.cleanFormFieldLabel}>
                  Has an insurance provider ever declined, cancelled, or voided their policy or imposed special terms?
                </p>
                <YesORNo
                  value={watch(`carUsage.additionalDrivers.${index}.insuranceHistory`)}
                  onChange={(value) => onUpdateDriver(index, "insuranceHistory", value)}
                />
              </div>

              {/* Criminal Convictions */}
              <div className={styles.cleanFormGrid1Col}>
                <p className={styles.cleanFormFieldLabel}>
                  Have they got any unspent non-motoring-related criminal convictions?
                </p>
                <YesORNo
                  value={watch(`carUsage.additionalDrivers.${index}.criminalConvictions`)}
                  onChange={(value) => onUpdateDriver(index, "criminalConvictions", value)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {drivers.length < 5 && (
        <div className={styles.cleanAddDriverButtonContainer}>
          <ConfirmBtn
            title={drivers.length === 0 ? "Add Driver" : "Add Another Driver"}
            onClick={handleAddDriver}
            type="button"
          />
        </div>
      )}
    </section>
  );
};

export default AdditionalDrivers;
