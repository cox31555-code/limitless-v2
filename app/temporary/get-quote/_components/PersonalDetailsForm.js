"use client";
import React, { useState } from "react";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import FormTextInput from "@/ui/inputs/FormTextInput";
import FormDataAndTime from "@/ui/inputs/FormDataAndTime";
import FormDropdown from "@/ui/inputs/FormDropdown";
import FormAutocomplete from "@/ui/inputs/FormAutocomplete";
import Selection2 from "@/ui/inputs/selections/selection2/Selection2";
import Selection3 from "@/ui/inputs/selections/selection3/Selection3";
import YesORNo from "@/ui/inputs/selections/yesORNo/YesORNo";
import ConvictionModal from "./ConvictionModal";
import styles from "./components.module.css";
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
  studentTypeOptions,
  voluntaryExcessOptions,
} from "../data";

const PersonalDetailsForm = ({ form }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const [dynamicNcbOptions, setDynamicNcbOptions] = useState(ncbOptions);
  const [isConvictionModalOpen, setIsConvictionModalOpen] = useState(false);
  const [convictions, setConvictions] = useState([]);
  const [editingConvictionIndex, setEditingConvictionIndex] = useState(null);

  const employmentStatus = watch("userDetails.employmentStatus");
  const isStudent = employmentStatus === "Student";
  const isIndustryOccupationDisabled = ["Retired", "Unemployed", "Houseperson"].includes(employmentStatus);
  const isRetiredOrUnemployed = isIndustryOccupationDisabled;
  const dateOfBirth = watch("userDetails.dateOfBirth");

  React.useEffect(() => {
    if (isRetiredOrUnemployed) {
      setValue("userDetails.industry", "N/A");
      setValue("userDetails.occupation", "N/A");
    } else if (isStudent) {
      setValue("userDetails.industry", "");
      setValue("userDetails.occupation", "");
    } else {
      const currentIndustry = watch("userDetails.industry");
      const currentOccupation = watch("userDetails.occupation");

      if (currentIndustry === "N/A") {
        setValue("userDetails.industry", "");
      }
      if (currentOccupation === "N/A") {
        setValue("userDetails.occupation", "");
      }
    }
  }, [isRetiredOrUnemployed, isStudent, setValue, watch]);

  React.useEffect(() => {
    if (dateOfBirth) {
      const dob = new Date(dateOfBirth);
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
      
      setDynamicNcbOptions(options);
      
      const currentNCB = watch("carUsage.NCB");
      if (currentNCB) {
        const currentNCBValue = currentNCB === "15+" ? 15 : parseInt(currentNCB);
        if (currentNCBValue > maxNCBYears) {
          setValue("carUsage.NCB", "");
        }
      }
    } else {
      setDynamicNcbOptions(ncbOptions);
    }
  }, [dateOfBirth, setValue, watch]);

  return (
    <ComponentWrapper title="Personal Details">
      <div className={styles.cleanFormContent}>
        
        {/* About You Section */}
        <section className={styles.cleanSection}>
          <h3 className={styles.cleanSectionTitle} data-section="1">About You</h3>
          
          <div className={styles.cleanFormGrid2Col}>
            <FormTextInput
              label="First Name"
              placeholder="Enter your first name"
              {...register("userDetails.firstName")}
              error={errors.userDetails?.firstName}
              inputStyle={{ paddingLeft: "14px" }}
            />
            <FormTextInput
              label="Last Name"
              placeholder="Enter your last name"
              {...register("userDetails.surname")}
              error={errors.userDetails?.surname}
              inputStyle={{ paddingLeft: "14px" }}
            />
          </div>

          <div className={styles.cleanFormGrid2Col}>
            <FormDataAndTime
              dateLabel="Date of Birth"
              type="date"
              allowPastDates={true}
              isDateOfBirth={true}
              maxDate={new Date(new Date().getFullYear() - 16, new Date().getMonth(), new Date().getDate())}
              defaultYear={2009}
              reducedPadding={true}
              {...register("userDetails.dateOfBirth")}
              value={watch("userDetails.dateOfBirth")}
              error={errors.userDetails?.dateOfBirth}
            />
            <FormTextInput
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              {...register("userDetails.email")}
              error={errors.userDetails?.email}
              inputStyle={{ paddingLeft: "14px" }}
            />
          </div>

          <div className={styles.cleanFormGrid1Col}>
            <FormTextInput
              label="Phone Number"
              placeholder="Enter your phone number"
              {...register("userDetails.phone")}
              error={errors.userDetails?.phone}
              inputStyle={{ paddingLeft: "14px" }}
            />
          </div>
        </section>


        {/* Employment Section */}
        <section className={styles.cleanSection}>
          <h3 className={styles.cleanSectionTitle} data-section="3">Your Employment</h3>

          <div className={styles.cleanFormGrid2Col}>
            <FormDropdown
              label="Employment Status"
              options={employmentStatusOptions}
              placeholder="Select employment status"
              {...register("userDetails.employmentStatus")}
              error={errors.userDetails?.employmentStatus}
              inputStyle={{ paddingLeft: "14px" }}
            />
            {isStudent ? (
              <FormDropdown
                label="Type of Student"
                options={studentTypeOptions}
                placeholder="Select student type"
                {...register("userDetails.occupation")}
                error={errors.userDetails?.occupation}
                inputStyle={{ paddingLeft: "14px" }}
              />
            ) : (
              <FormAutocomplete
                label="Occupation"
                options={occupationOptions}
                placeholder="Type your occupation..."
                value={isRetiredOrUnemployed ? "N/A" : (watch("userDetails.occupation") || "")}
                onChange={(e) => {
                  const value = typeof e === "string" ? e : (e?.target?.value || "");
                  setValue("userDetails.occupation", value);
                }}
                disabled={isRetiredOrUnemployed}
                inputStyle={{ paddingLeft: "14px" }}
              />
            )}
          </div>

          {!isStudent && (
            <div className={styles.cleanFormGrid1Col}>
              <FormAutocomplete
                label="Industry"
                options={industryOptions}
                placeholder="Type your industry..."
                value={isRetiredOrUnemployed ? "N/A" : (watch("userDetails.industry") || "")}
                onChange={(e) => {
                  const value = typeof e === "string" ? e : (e?.target?.value || "");
                  setValue("userDetails.industry", value);
                }}
                disabled={isRetiredOrUnemployed}
                inputStyle={{ paddingLeft: "14px" }}
              />
            </div>
          )}
        </section>

        {/* Car Parking Section */}
        <section className={styles.cleanSection}>
          <h3 className={styles.cleanSectionTitle} data-section="4">Parking & Storage</h3>
          
          <div className={styles.cleanFormGrid2Col}>
            <div className={styles.cleanSelectionCard}>
              <Selection2
                title="Where do you keep your car during the day?"
                description="Select where your car is typically parked during daytime hours."
                items={keepingCarDuringDayOptions}
                img={{ src: "/svg/day.svg", alt: "sun", width: 79, height: 106 }}
                selectedItem={watch("carUsage.keepingCarDuringDay")}
                setSelectedItem={(item) =>
                  setValue("carUsage.keepingCarDuringDay", item)
                }
              />
              {errors.carUsage?.keepingCarDuringDay && (
                <span className={styles.cleanError}>
                  {errors.carUsage.keepingCarDuringDay.message}
                </span>
              )}
            </div>
            
            <div className={styles.cleanSelectionCard}>
              <Selection2
                title="Where do you keep your car during the night?"
                description="Select where your car is typically parked during nighttime hours."
                items={keepingCarDuringNightOptions}
                img={{ src: "/svg/night.svg", alt: "moon", width: 79, height: 106 }}
                selectedItem={watch("carUsage.keepingCarDuringNight")}
                setSelectedItem={(item) =>
                  setValue("carUsage.keepingCarDuringNight", item)
                }
              />
              {errors.carUsage?.keepingCarDuringNight && (
                <span className={styles.cleanError}>
                  {errors.carUsage.keepingCarDuringNight.message}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Car Usage Section */}
        <section className={styles.cleanSection}>
          <h3 className={styles.cleanSectionTitle} data-section="5">Usage Details</h3>

          <div className={styles.cleanFormGrid1Col}>
            <p className={styles.cleanLabel}>What do you use the car for?</p>
            <div className={styles.cleanSelections3}>
              <Selection3
                options={carUsageOptions}
                selectedItem={watch("carUsage.usageType")}
                setSelectedItem={(item) => setValue("carUsage.usageType", item)}
              />
              {errors.carUsage?.usageType && (
                <span className={styles.cleanError}>
                  {errors.carUsage.usageType.message}
                </span>
              )}
            </div>
          </div>

          <div className={`${styles.cleanFormGrid1Col} ${styles.cleanFormGrid1ColWithTopGap}`}>
            <p className={styles.cleanLabel}>Do you use any other vehicles?</p>
            <YesORNo
              value={watch("carUsage.otherVehicles")}
              onChange={(value) =>
                setValue("carUsage.otherVehicles", value)
              }
            />
          </div>

          {watch("carUsage.otherVehicles") && (
            <div className={`${styles.cleanFormGrid1Col} ${styles.cleanFormGrid1ColWithTopPadding}`}>
              <p className={styles.cleanLabel}>What other vehicles do you have use of?</p>
              <p className={styles.cleanSubLabel}>Select the most applicable option.</p>
              <FormDropdown
                label=""
                options={otherVehiclesOptions}
                placeholder="Select vehicle type"
                {...register("carUsage.otherVehiclesType")}
                error={errors.carUsage?.otherVehiclesType}
                inputStyle={{ paddingLeft: "14px" }}
              />
            </div>
          )}
        </section>

        {/* Your Driving Record Section */}
        <section className={styles.cleanSection}>
          <h3 className={styles.cleanSectionTitle} data-section="6">Your Driving Record</h3>
          
          <div className={styles.cleanFormGrid3Col}>
            <FormDropdown
              label="License Type"
              options={["Full UK", "Provisional UK", "International", "Other"]}
              placeholder="Select license type"
              {...register("carUsage.licenseType")}
              error={errors.carUsage?.licenseType}
              inputStyle={{ paddingLeft: "14px" }}
            />
            <FormDropdown
              label="License Held"
              options={licenseHeldOptions}
              placeholder="Select how long held"
              {...register("carUsage.licenseHeld")}
              error={errors.carUsage?.licenseHeld}
              inputStyle={{ paddingLeft: "14px" }}
            />
            <FormTextInput
              label="License Number (Optional)"
              placeholder="Enter license number"
              {...register("carUsage.licenseNumber")}
              error={errors.carUsage?.licenseNumber}
              inputStyle={{ paddingLeft: "14px" }}
            />
          </div>

          <div className={styles.cleanFormGrid2Col}>
            <FormDropdown
              label="No Claims Bonus"
              options={dynamicNcbOptions}
              placeholder="Select NCB years"
              {...register("carUsage.NCB")}
              error={errors.carUsage?.NCB}
              inputStyle={{ paddingLeft: "14px" }}
            />
            <FormDropdown
              label="Voluntary Excess"
              options={voluntaryExcessOptions}
              placeholder="Select excess amount"
              {...register("carUsage.voluntaryExcess")}
              error={errors.carUsage?.voluntaryExcess}
              inputStyle={{ paddingLeft: "14px" }}
            />
          </div>
        </section>

        {/* Declarations Section */}
        <section className={styles.cleanSection}>
          <h3 className={styles.cleanSectionTitle} data-section="7">Important Declarations</h3>
          
          <div className={styles.cleanDeclarationsContainer}>
            <div className={styles.cleanDeclarationItem}>
              <p className={styles.cleanDeclarationQuestion}>
                Have you had any driving related convictions, endorsements, penalties, disqualifications or bans in the past 5 years?
              </p>
              <YesORNo
                value={watch("carUsage.criminalConvictions")}
                onChange={(value) =>
                  setValue("carUsage.criminalConvictions", value)
                }
              />
              {errors.carUsage?.criminalConvictions && (
                <span className={styles.cleanError}>
                  {errors.carUsage.criminalConvictions.message}
                </span>
              )}

              {watch("carUsage.criminalConvictions") === true && (
                <div style={{ marginTop: "16px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingConvictionIndex(null);
                        setIsConvictionModalOpen(true);
                      }}
                      style={{
                        padding: "10px 16px",
                        backgroundColor: "#0388ff",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#0270cc")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "#0388ff")}
                    >
                      Add Conviction
                    </button>

                    {convictions.map((conviction, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setEditingConvictionIndex(index);
                          setIsConvictionModalOpen(true);
                        }}
                        style={{
                          padding: "8px 14px",
                          backgroundColor: "#e8f4ff",
                          color: "#0388ff",
                          border: "1px solid #0388ff",
                          borderRadius: "6px",
                          fontSize: "13px",
                          fontWeight: "500",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          maxWidth: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#d4ebf7";
                          e.target.style.borderColor = "#0270cc";
                          e.target.style.color = "#0270cc";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#e8f4ff";
                          e.target.style.borderColor = "#0388ff";
                          e.target.style.color = "#0388ff";
                        }}
                        title={`Click to edit: ${conviction.type}`}
                      >
                        {conviction.type}
                      </button>
                    ))}
                  </div>
                  {watch("carUsage.criminalConvictions") === true && convictions.length === 0 && (
                    <div style={{ marginTop: "12px", padding: "10px 12px", backgroundColor: "#fee2e2", border: "1px solid #fca5a5", borderRadius: "8px", color: "#dc2626", fontSize: "13px", fontWeight: "500" }}>
                      Please add at least one conviction
                    </div>
                  )}
                </div>
              )}
            </div>

            <ConvictionModal
              isOpen={isConvictionModalOpen}
              onClose={() => {
                setIsConvictionModalOpen(false);
                setEditingConvictionIndex(null);
              }}
              editingConviction={editingConvictionIndex !== null ? convictions[editingConvictionIndex] : null}
              editingIndex={editingConvictionIndex}
              onAdd={(conviction, indexToUpdate, isDelete) => {
                if (isDelete && indexToUpdate !== null) {
                  const updatedConvictions = convictions.filter((_, i) => i !== indexToUpdate);
                  setConvictions(updatedConvictions);
                } else if (indexToUpdate !== null) {
                  const updatedConvictions = [...convictions];
                  updatedConvictions[indexToUpdate] = conviction;
                  setConvictions(updatedConvictions);
                } else {
                  setConvictions([...convictions, conviction]);
                }
                setIsConvictionModalOpen(false);
                setEditingConvictionIndex(null);
              }}
            />

            <div className={styles.cleanDeclarationItem}>
              <p className={styles.cleanDeclarationQuestion}>
                Do you have any medical conditions that are notifiable to the DVLA?
              </p>
              <YesORNo
                value={watch("carUsage.medicalConditions")}
                onChange={(value) => {
                  setValue("carUsage.medicalConditions", value);
                  if (!value) {
                    setValue("carUsage.dvlaConditionType", null);
                  }
                }}
              />
              {errors.carUsage?.medicalConditions && (
                <span className={styles.cleanError}>
                  {errors.carUsage.medicalConditions.message}
                </span>
              )}

              {watch("carUsage.medicalConditions") === true && (
                <div className={styles.cleanDeclarationItem} style={{ marginTop: "16px" }}>
                  <FormDropdown
                    label="Select DVLA status"
                    options={[
                      "DVLA aware - No restrictions",
                      "DVLA aware - 1 year restricted Licence",
                      "DVLA aware - 2 year restricted Licence",
                      "DVLA aware - 3 year restricted Licence",
                      "DVLA aware - 5 year restricted Licence",
                      "DVLA unaware"
                    ]}
                    placeholder="Please select"
                    {...register("carUsage.dvlaConditionType")}
                    error={errors.carUsage?.dvlaConditionType}
                    inputStyle={{ paddingLeft: "14px" }}
                  />
                </div>
              )}
            </div>

            <div className={styles.cleanDeclarationItem}>
              <p className={styles.cleanDeclarationQuestion}>
                Have you ever had insurance cancelled, a claim refused, a policy voided, or any special terms imposed?
              </p>
              <YesORNo
                value={watch(
                  "carUsage.insuranceCancelledOrClaimRefusedOrPolicyVoided"
                )}
                onChange={(value) =>
                  setValue(
                    "carUsage.insuranceCancelledOrClaimRefusedOrPolicyVoided",
                    value
                  )
                }
              />
              {errors.carUsage?.insuranceCancelledOrClaimRefusedOrPolicyVoided && (
                <span className={styles.cleanError}>
                  {errors.carUsage.insuranceCancelledOrClaimRefusedOrPolicyVoided.message}
                </span>
              )}
            </div>
          </div>
        </section>
      </div>
    </ComponentWrapper>
  );
};

export default PersonalDetailsForm;
