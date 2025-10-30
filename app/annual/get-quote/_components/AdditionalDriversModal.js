"use client";
import React, { useState } from "react";
import FormTextInput from "@/ui/inputs/FormTextInput";
import FormDataAndTime from "@/ui/inputs/FormDataAndTime";
import FormDropdown from "@/ui/inputs/FormDropdown";
import FormAutocomplete from "@/ui/inputs/FormAutocomplete";
import Selection2 from "@/ui/inputs/selections/selection2/Selection2";
import Selection3 from "@/ui/inputs/selections/selection3/Selection3";
import YesORNo from "@/ui/inputs/selections/yesORNo/YesORNo";
import ConfirmBtn from "@/ui/buttons/confirmBtn/ConfirmBtn";
import styles from "@/app/temporary/get-quote/_components/components.module.css";
import modalStyles from "./additionalDriversModal.module.css";
import { API_BASE_URL } from "@/utils/config";
import {
  carUsageOptions,
  employmentStatusOptions,
  industryOptions,
  keepingCarDuringDayOptions,
  keepingCarDuringNightOptions,
  licenseHeldOptions,
  ncbOptions,
  occupationOptions,
  otherVehiclesOptions,
  voluntaryExcessOptions,
  additionalQualificationsOptions,
  monthOptions,
  yearOptions,
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

  React.useEffect(() => {
    drivers.forEach((driver, index) => {
      if (driver.dateOfBirth) {
        const dob = new Date(driver.dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();

        let exactAge = age;
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          exactAge--;
        }

        const maxNCBYears = Math.max(0, exactAge - 17);
        const options = [];

        for (let i = 0; i <= Math.min(maxNCBYears, 14); i++) {
          options.push(i.toString());
        }

        if (maxNCBYears >= 15) {
          options.push("15+");
        }

        setDynamicDriverNcbOptions(prev => ({ ...prev, [index]: options }));
      }
    });
  }, [drivers]);

  React.useEffect(() => {
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

  if (!isOpen) return null;

  const handleAddDriver = () => {
    if (drivers.length < 5) {
      onAddDriver();
    }
  };

  const handleFindAddress = async (driverIndex) => {
    const postcode = watch(`carUsage.additionalDrivers.${driverIndex}.postCode`);
    if (!postcode) return;

    setDriverLoadingStates(prev => ({ ...prev, [driverIndex]: true }));
    try {
      const response = await fetch(
        `${API_BASE_URL}/vehicle-search/postcode/${postcode}`
      );
      if (!response.ok) {
        setDriverAddresses(prev => ({ ...prev, [driverIndex]: [] }));
        return;
      }
      const data = await response.json();
      setDriverAddresses(prev => ({ ...prev, [driverIndex]: data.addresses || [] }));
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setDriverAddresses(prev => ({ ...prev, [driverIndex]: [] }));
    } finally {
      setDriverLoadingStates(prev => ({ ...prev, [driverIndex]: false }));
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
          <p className={modalStyles.modalSubtitle}>Complete details for each driver</p>
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
                  {/* Driver Header */}
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

                  {/* Driver Form Content */}
                  <div className={modalStyles.driverFormContent}>
                    {/* About You Section */}
                    <div className={modalStyles.formSection}>
                      <h4 className={modalStyles.sectionLabel}>About You</h4>
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
                        <p className={modalStyles.fieldLabel}>Lived in UK since birth?</p>
                        <p className={modalStyles.fieldHelper}>Continuously, without breaks of 6+ months</p>
                        <YesORNo value={watch(`carUsage.additionalDrivers.${index}.livedInUKSinceBirth`)} onChange={(value) => onUpdateDriver(index, "livedInUKSinceBirth", value)} />
                      </div>
                    </div>

                    {/* Employment Section */}
                    <div className={modalStyles.formSection}>
                      <h4 className={modalStyles.sectionLabel}>Your Employment</h4>
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
                    </div>

                    {/* Usage Details Section */}
                    <div className={modalStyles.formSection}>
                      <h4 className={modalStyles.sectionLabel}>Usage Details</h4>
                      <div className={modalStyles.field}>
                        <p className={modalStyles.fieldLabel}>Other Vehicles?</p>
                        <YesORNo value={watch(`carUsage.additionalDrivers.${index}.otherVehicles`)} onChange={(value) => onUpdateDriver(index, "otherVehicles", value)} />
                      </div>
                      {watch(`carUsage.additionalDrivers.${index}.otherVehicles`) && (
                        <div className={modalStyles.field}>
                          <FormDropdown label="What other vehicles?" options={otherVehiclesOptions} placeholder="Select vehicle type" value={watch(`carUsage.additionalDrivers.${index}.otherVehiclesType`) || ""} onChange={(value) => onUpdateDriver(index, "otherVehiclesType", value)} inputStyle={{ paddingLeft: "14px" }} />
                        </div>
                      )}
                    </div>

                    {/* Driving Record Section */}
                    <div className={modalStyles.formSection}>
                      <h4 className={modalStyles.sectionLabel}>Driving Record</h4>
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
                        <p className={modalStyles.fieldLabel}>Additional Driving Qualifications?</p>
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
                    </div>

                    {/* Declarations Section */}
                    <div className={modalStyles.formSection}>
                      <h4 className={modalStyles.sectionLabel}>Declarations</h4>
                      <div className={modalStyles.field}>
                        <p className={modalStyles.fieldLabel}>Criminal Convictions?</p>
                        <p className={modalStyles.fieldHelper}>Any unspent or outstanding?</p>
                        <YesORNo value={watch(`carUsage.additionalDrivers.${index}.criminalConvictions`)} onChange={(value) => onUpdateDriver(index, "criminalConvictions", value)} />
                      </div>
                      <div className={modalStyles.field}>
                        <p className={modalStyles.fieldLabel}>Medical Conditions?</p>
                        <p className={modalStyles.fieldHelper}>Notifiable to DVLA?</p>
                        <YesORNo value={watch(`carUsage.additionalDrivers.${index}.medicalConditions`)} onChange={(value) => onUpdateDriver(index, "medicalConditions", value)} />
                      </div>
                      <div className={modalStyles.field}>
                        <p className={modalStyles.fieldLabel}>Insurance History?</p>
                        <p className={modalStyles.fieldHelper}>Cancelled, refused, voided, or special terms?</p>
                        <YesORNo value={watch(`carUsage.additionalDrivers.${index}.insuranceCancelledOrClaimRefusedOrPolicyVoided`)} onChange={(value) => onUpdateDriver(index, "insuranceCancelledOrClaimRefusedOrPolicyVoided", value)} />
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
