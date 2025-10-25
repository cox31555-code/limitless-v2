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
import ConfirmBtn from "@/ui/buttons/confirmBtn/ConfirmBtn";
import Title from "@/ui/insurance-quotes/title/Title";
import { API_BASE_URL } from "@/utils/config";
import styles from "./components.module.css";
import {
  carUsageOptions,
  employmentStatusOptions,
  keepingCarDuringDayOptions,
  keepingCarDuringNightOptions,
  licenseHeldOptions,
  ncbOptions,
  occupationOptions,
  voluntaryExcessOptions,
} from "../data";

const PersonalDetailsForm = ({ form }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const [addresses, setAddresses] = useState([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const [dynamicNcbOptions, setDynamicNcbOptions] = useState(ncbOptions);

  // Watch employment status to disable industry and occupation
  const employmentStatus = watch("userDetails.employmentStatus");
  const isRetiredOrUnemployed = employmentStatus === "Retired" || employmentStatus === "Unemployed";
  
  // Watch date of birth to calculate dynamic NCB options
  const dateOfBirth = watch("userDetails.dateOfBirth");

  React.useEffect(() => {
    if (isRetiredOrUnemployed) {
      setValue("userDetails.industry", "N/A");
      setValue("userDetails.occupation", "N/A");
    }
  }, [isRetiredOrUnemployed, setValue]);

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

  const handleFindAddress = async () => {
    const postcode = watch("userDetails.postCode");
    if (!postcode) return;

    setIsLoadingAddresses(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/vehicle-search/postcode/${postcode}`
      );
      if (!response.ok) {
        setAddresses([]);
        return;
      }
      const data = await response.json();
      setAddresses(data.addresses || []);
      setShowAddressDropdown(data.addresses?.length > 0);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setAddresses([]);
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  const [showAddressDropdown, setShowAddressDropdown] = useState(false);

  return (
    <ComponentWrapper title="Personal Details">
      <div className={styles.formContent}>
        
        {/* Personal Information Section */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Your Details</h3>
          
          <div className={styles.formRow}>
            <FormTextInput
              label="First Name"
              placeholder="Enter your first name"
              {...register("userDetails.firstName")}
              error={errors.userDetails?.firstName}
            />
            <FormTextInput
              label="Last Name"
              placeholder="Enter your last name"
              {...register("userDetails.surname")}
              error={errors.userDetails?.surname}
            />
            <FormDataAndTime
              dateLabel="Date of Birth"
              type="date"
              allowPastDates={true}
              {...register("userDetails.dateOfBirth")}
              value={watch("userDetails.dateOfBirth")}
              error={errors.userDetails?.dateOfBirth}
            />
          </div>

          <div className={styles.formRow}>
            <FormTextInput
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              {...register("userDetails.email")}
              error={errors.userDetails?.email}
            />
            <FormTextInput
              label="Phone Number"
              placeholder="Enter your phone number"
              {...register("userDetails.phone")}
              error={errors.userDetails?.phone}
            />
          </div>
        </div>

        {/* Address Section */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Address</h3>
          
          <div className={styles.postcodeRow}>
            <FormTextInput
              label="Postcode"
              placeholder="Enter your postcode"
              {...register("userDetails.postCode")}
              error={errors.userDetails?.postCode}
            />
            <div className={styles.findAddressButton}>
              <ConfirmBtn
                title={isLoadingAddresses ? "Loading..." : "Find Address"}
                onClick={handleFindAddress}
                disabled={isLoadingAddresses}
                type="button"
              />
            </div>
          </div>

          {showAddressDropdown && (
            <div className={styles.formRow}>
              <FormDropdown
                label="Address"
                options={addresses}
                placeholder={
                  addresses.length > 0
                    ? "Select your address"
                    : "No addresses found"
                }
                {...register("userDetails.address")}
                error={errors.userDetails?.address}
              />
            </div>
          )}
        </div>

        {/* Employment Section */}
        <div className={styles.formSection}>
          <Title title="Employment" />
          
          <div className={styles.formRow}>
            <FormDropdown
              label="Employment Status"
              options={employmentStatusOptions}
              placeholder="Select employment status"
              {...register("userDetails.employmentStatus")}
              error={errors.userDetails?.employmentStatus}
            />
            <FormTextInput
              label="Industry"
              placeholder="Enter your industry"
              {...register("userDetails.industry")}
              error={errors.userDetails?.industry}
              disabled={isRetiredOrUnemployed}
              value={isRetiredOrUnemployed ? "N/A" : watch("userDetails.industry")}
            />
            <FormAutocomplete
              label="Occupation"
              options={occupationOptions}
              placeholder="Select your occupation"
              {...register("userDetails.occupation")}
              error={errors.userDetails?.occupation}
              value={isRetiredOrUnemployed ? "N/A" : watch("userDetails.occupation")}
              onChange={(e) => setValue("userDetails.occupation", e.target.value)}
              disabled={isRetiredOrUnemployed}
            />
          </div>
        </div>

        {/* Car Parking Section */}
        <div className={styles.formSection}>
          <Title title="Car Parking" />
          
          <div className={styles.parkingGrid}>
            <div className={styles.parkingCard}>
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
                <span className={styles.error}>
                  {errors.carUsage.keepingCarDuringDay.message}
                </span>
              )}
            </div>
            
            <div className={styles.parkingCard}>
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
                <span className={styles.error}>
                  {errors.carUsage.keepingCarDuringNight.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Car Usage Section */}
        <div className={styles.formSection}>
          <Title title="Car Usage" />
          
          <div className={styles.usageTypeWrapper}>
            <p className={styles.usageLabel}>What do you use the car for?</p>
            <div className={styles.selections3}>
              <Selection3
                options={carUsageOptions}
                selectedItem={watch("carUsage.usageType")}
                setSelectedItem={(item) => setValue("carUsage.usageType", item)}
              />
              {errors.carUsage?.usageType && (
                <span className={styles.error}>
                  {errors.carUsage.usageType.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* License & Claims Section */}
        <div className={styles.formSection}>
          <Title title="License & Claims" />
          
          <div className={styles.formRow}>
            <FormDropdown
              label="License Type"
              options={["Full UK", "Provisional UK", "International", "Other"]}
              placeholder="Select license type"
              {...register("carUsage.licenseType")}
              error={errors.carUsage?.licenseType}
            />
            <FormDropdown
              label="License Held"
              options={licenseHeldOptions}
              placeholder="Select how long held"
              {...register("carUsage.licenseHeld")}
              error={errors.carUsage?.licenseHeld}
            />
            <FormTextInput
              label="License Number (Optional)"
              placeholder="Enter license number"
              {...register("carUsage.licenseNumber")}
              error={errors.carUsage?.licenseNumber}
            />
          </div>

          <div className={styles.formRow}>
            <FormDropdown
              label="No Claims Bonus"
              options={dynamicNcbOptions}
              placeholder="Select NCB years"
              {...register("carUsage.NCB")}
              error={errors.carUsage?.NCB}
            />
            <FormDropdown
              label="Voluntary Excess"
              options={voluntaryExcessOptions}
              placeholder="Select excess amount"
              {...register("carUsage.voluntaryExcess")}
              error={errors.carUsage?.voluntaryExcess}
            />
          </div>
        </div>

        {/* Declarations Section */}
        <div className={styles.formSection}>
          <Title title="Declarations" />
          
          <div className={styles.declarationItem}>
            <p className={styles.declarationQuestion}>
              Do you have any unspent or outstanding criminal convictions?
            </p>
            <YesORNo
              value={watch("carUsage.criminalConvictions")}
              onChange={(value) =>
                setValue("carUsage.criminalConvictions", value)
              }
            />
          </div>

          <div className={styles.declarationItem}>
            <p className={styles.declarationQuestion}>
              Do you have any medical conditions that are notifiable to the DVLA?
            </p>
            <YesORNo
              value={watch("carUsage.medicalConditions")}
              onChange={(value) =>
                setValue("carUsage.medicalConditions", value)
              }
            />
          </div>

          <div className={styles.declarationItem}>
            <p className={styles.declarationQuestion}>
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
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default PersonalDetailsForm;
