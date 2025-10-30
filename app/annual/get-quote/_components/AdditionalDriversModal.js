"use client";
import React from "react";
import FormTextInput from "@/ui/inputs/FormTextInput";
import FormDataAndTime from "@/ui/inputs/FormDataAndTime";
import FormDropdown from "@/ui/inputs/FormDropdown";
import YesORNo from "@/ui/inputs/selections/yesORNo/YesORNo";
import styles from "@/app/temporary/get-quote/_components/components.module.css";
import modalStyles from "./additionalDriversModal.module.css";
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

const AdditionalDriversModal = ({ 
  isOpen, 
  onClose, 
  form, 
  drivers = [], 
  onAddDriver, 
  onRemoveDriver,
  onUpdateDriver 
}) => {
  const { watch } = form;

  if (!isOpen) return null;

  const handleAddDriver = () => {
    if (drivers.length < 5) {
      onAddDriver();
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      <div className={modalStyles.modalOverlay} onClick={onClose} />

      {/* Modal Container */}
      <div className={modalStyles.modalContainer}>
        {/* Modal Header */}
        <div className={modalStyles.modalHeader}>
          <h2 className={modalStyles.modalTitle}>Additional Drivers</h2>
          <p className={modalStyles.modalSubtitle}>Add up to 5 drivers who share the car</p>
          <button
            className={modalStyles.closeButton}
            onClick={onClose}
            type="button"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className={modalStyles.modalContent}>
          {drivers && drivers.length > 0 ? (
            <div className={modalStyles.driversList}>
              {drivers.map((driver, index) => (
                <div key={index} className={modalStyles.driverItem}>
                  {/* Driver Header with Number and Remove Button */}
                  <div className={modalStyles.driverItemHeader}>
                    <div className={modalStyles.driverNumber}>
                      Driver {index + 1}
                    </div>
                    {drivers.length > 1 && (
                      <button
                        type="button"
                        className={modalStyles.removeButton}
                        onClick={() => onRemoveDriver(index)}
                        title="Remove this driver"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Driver Form Fields */}
                  <div className={modalStyles.driverForm}>
                    {/* Personal Information Section */}
                    <div className={modalStyles.formSection}>
                      <h4 className={modalStyles.sectionLabel}>Personal Information</h4>
                      
                      <div className={modalStyles.field}>
                        <FormDropdown
                          label="Relationship"
                          options={relationshipOptions}
                          placeholder="Select relationship"
                          value={watch(`carUsage.additionalDrivers.${index}.relationship`) || ""}
                          onChange={(value) => onUpdateDriver(index, "relationship", value)}
                          inputStyle={{ paddingLeft: "14px" }}
                        />
                      </div>

                      <div className={modalStyles.fieldRow}>
                        <div className={modalStyles.field}>
                          <FormDropdown
                            label="Title"
                            options={titleOptions}
                            placeholder="Select..."
                            value={watch(`carUsage.additionalDrivers.${index}.title`) || ""}
                            onChange={(value) => onUpdateDriver(index, "title", value)}
                            inputStyle={{ paddingLeft: "14px" }}
                          />
                        </div>
                        <div className={modalStyles.field}>
                          <FormTextInput
                            label="First Name"
                            placeholder="First name"
                            value={watch(`carUsage.additionalDrivers.${index}.firstName`) || ""}
                            onChange={(e) => onUpdateDriver(index, "firstName", e.target.value)}
                            inputStyle={{ paddingLeft: "14px" }}
                          />
                        </div>
                        <div className={modalStyles.field}>
                          <FormTextInput
                            label="Last Name"
                            placeholder="Last name"
                            value={watch(`carUsage.additionalDrivers.${index}.lastName`) || ""}
                            onChange={(e) => onUpdateDriver(index, "lastName", e.target.value)}
                            inputStyle={{ paddingLeft: "14px" }}
                          />
                        </div>
                      </div>

                      <div className={modalStyles.fieldRow}>
                        <div className={modalStyles.field}>
                          <FormDataAndTime
                            dateLabel="Date of Birth"
                            type="date"
                            allowPastDates={true}
                            isDateOfBirth={true}
                            reducedPadding={true}
                            value={watch(`carUsage.additionalDrivers.${index}.dateOfBirth`) || ""}
                            onChange={(value) => onUpdateDriver(index, "dateOfBirth", value)}
                          />
                        </div>
                        <div className={modalStyles.field}>
                          <FormDropdown
                            label="Relationship Status"
                            options={relationshipStatusOptions}
                            placeholder="Select..."
                            value={watch(`carUsage.additionalDrivers.${index}.relationshipStatus`) || ""}
                            onChange={(value) => onUpdateDriver(index, "relationshipStatus", value)}
                            inputStyle={{ paddingLeft: "14px" }}
                          />
                        </div>
                      </div>

                      <div className={modalStyles.field}>
                        <p className={modalStyles.fieldLabel}>UK Residency</p>
                        <p className={modalStyles.fieldHelper}>Continuously lived in the UK since birth?</p>
                        <YesORNo
                          value={watch(`carUsage.additionalDrivers.${index}.livedInUKSinceBirth`)}
                          onChange={(value) => onUpdateDriver(index, "livedInUKSinceBirth", value)}
                        />
                      </div>

                      <div className={modalStyles.field}>
                        <FormDropdown
                          label="Employment Status"
                          options={employmentStatusOptions}
                          placeholder="Select..."
                          value={watch(`carUsage.additionalDrivers.${index}.employmentStatus`) || ""}
                          onChange={(value) => onUpdateDriver(index, "employmentStatus", value)}
                          inputStyle={{ paddingLeft: "14px" }}
                        />
                      </div>
                    </div>

                    {/* Driving License Section */}
                    <div className={modalStyles.formSection}>
                      <h4 className={modalStyles.sectionLabel}>Driving License</h4>
                      
                      <div className={modalStyles.field}>
                        <p className={modalStyles.fieldLabel}>Type of License</p>
                        <p className={modalStyles.fieldHelper}>Choose at the time this policy starts</p>
                        <div className={modalStyles.radioGroup}>
                          {licenseTypeOptions.map((option) => (
                            <label key={option} className={modalStyles.radioLabel}>
                              <input
                                type="radio"
                                name={`licenseType_${index}`}
                                value={option}
                                checked={watch(`carUsage.additionalDrivers.${index}.licenseType`) === option}
                                onChange={(e) => onUpdateDriver(index, "licenseType", e.target.value)}
                                className={modalStyles.radioInput}
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className={modalStyles.fieldRow}>
                        <div className={modalStyles.field}>
                          <FormDropdown
                            label="License Held"
                            options={licenseHeldOptions}
                            placeholder="Select..."
                            value={watch(`carUsage.additionalDrivers.${index}.licenseHeld`) || ""}
                            onChange={(value) => onUpdateDriver(index, "licenseHeld", value)}
                            inputStyle={{ paddingLeft: "14px" }}
                          />
                        </div>
                      </div>

                      <div className={modalStyles.field}>
                        <p className={modalStyles.fieldLabel}>Other Vehicles</p>
                        <p className={modalStyles.fieldHelper}>Do they use any other vehicles?</p>
                        <YesORNo
                          value={watch(`carUsage.additionalDrivers.${index}.otherVehicles`)}
                          onChange={(value) => onUpdateDriver(index, "otherVehicles", value)}
                        />
                      </div>
                    </div>

                    {/* Health & Safety Declaration Section */}
                    <div className={modalStyles.formSection}>
                      <h4 className={modalStyles.sectionLabel}>Health & Safety</h4>
                      
                      <div className={modalStyles.field}>
                        <p className={modalStyles.fieldLabel}>Medical Conditions</p>
                        <p className={modalStyles.fieldHelper}>Any conditions reportable to DVLA?</p>
                        <YesORNo
                          value={watch(`carUsage.additionalDrivers.${index}.medicalConditions`)}
                          onChange={(value) => onUpdateDriver(index, "medicalConditions", value)}
                        />
                      </div>

                      <div className={modalStyles.field}>
                        <p className={modalStyles.fieldLabel}>Insurance History</p>
                        <p className={modalStyles.fieldHelper}>Policy declined, cancelled, or voided?</p>
                        <YesORNo
                          value={watch(`carUsage.additionalDrivers.${index}.insuranceHistory`)}
                          onChange={(value) => onUpdateDriver(index, "insuranceHistory", value)}
                        />
                      </div>

                      <div className={modalStyles.field}>
                        <p className={modalStyles.fieldLabel}>Criminal Convictions</p>
                        <p className={modalStyles.fieldHelper}>Unspent non-motoring convictions?</p>
                        <YesORNo
                          value={watch(`carUsage.additionalDrivers.${index}.criminalConvictions`)}
                          onChange={(value) => onUpdateDriver(index, "criminalConvictions", value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={modalStyles.emptyState}>
              <p>No drivers added yet</p>
              <p className={modalStyles.emptyStateHelper}>Click "Add Driver" to add your first additional driver</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className={modalStyles.modalFooter}>
          {drivers.length < 5 && (
            <button
              className={modalStyles.addDriverButton}
              onClick={handleAddDriver}
              type="button"
            >
              + Add Driver
            </button>
          )}
          {drivers.length >= 5 && (
            <p className={modalStyles.maxMessage}>Maximum 5 drivers reached</p>
          )}
          <button
            className={modalStyles.doneButton}
            onClick={onClose}
            type="button"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
};

export default AdditionalDriversModal;
