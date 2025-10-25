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
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [dynamicNcbOptions, setDynamicNcbOptions] = useState(ncbOptions);

  // Watch employment status to disable industry and occupation
  const employmentStatus = watch("userDetails.employmentStatus");
  const isRetiredOrUnemployed = employmentStatus === "Retired" || employmentStatus === "Unemployed";
  
  // Watch date of birth to calculate dynamic NCB options
  const dateOfBirth = watch("userDetails.dateOfBirth");

  // Effect to set industry and occupation to N/A when retired or unemployed
  React.useEffect(() => {
    if (isRetiredOrUnemployed) {
      setValue("userDetails.industry", "N/A");
      setValue("userDetails.occupation", "N/A");
    }
  }, [isRetiredOrUnemployed, setValue]);

  // Effect to calculate dynamic NCB options based on date of birth
  React.useEffect(() => {
    if (dateOfBirth) {
      const dob = new Date(dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();
      
      // Calculate exact age
      let exactAge = age;
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        exactAge--;
      }
      
      // Maximum NCB years = current age - 17 (minimum driving age in UK)
      const maxNCBYears = Math.max(0, exactAge - 17);
      
      // Generate NCB options from 0 to maxNCBYears
      const options = [];
      for (let i = 0; i <= Math.min(maxNCBYears, 14); i++) {
        options.push(i.toString());
      }
      
      // Add "15+" only if user can have 15 or more years of NCB
      if (maxNCBYears >= 15) {
        options.push("15+");
      }
      
      setDynamicNcbOptions(options);
      
      // Reset NCB value if current value exceeds maximum
      const currentNCB = watch("carUsage.NCB");
      if (currentNCB) {
        const currentNCBValue = currentNCB === "15+" ? 15 : parseInt(currentNCB);
        if (currentNCBValue > maxNCBYears) {
          setValue("carUsage.NCB", "");
        }
      }
    } else {
      // If no DOB selected, show all options
      setDynamicNcbOptions(ncbOptions);
    }
  }, [dateOfBirth, setValue, watch]);

  const handleFindAddress = async () => {
    const postcode = watch("userDetails.postCode");

    if (!postcode || postcode.trim() === "") {
      alert("Please enter a postcode first");
      return;
    }

    setIsLoadingAddresses(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/insurance/lookup-postcode/${encodeURIComponent(
          postcode.trim()
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to lookup postcode");
      }

      const result = await response.json();

      if (result.status === "success" && result.data.addresses) {
        setAddresses(result.data.addresses);
        setShowAddressDropdown(true);
        // Clear the current address value
        setValue("userDetails.address", "");
      } else {
        alert("No addresses found for this postcode");
      }
    } catch (error) {
      console.error("Error looking up postcode:", error);
      alert("Failed to lookup postcode. Please try again.");
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  return (
    <ComponentWrapper title="Personal Details">
      <div className={`${styles.content} ${styles.personalDetailsContainer}`}>
        {/* Personal Information Section */}
        <div className={styles.personalSection}>
          <Title title="Your Personal Information" />
          <div className={styles.row}>
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

          <div className={styles.row}>
            <FormTextInput
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              {...register("userDetails.email")}
              error={errors.userDetails?.email}
            />
            <FormTextInput
              label="Contact Number"
              placeholder="Enter your contact number"
              {...register("userDetails.phone")}
              error={errors.userDetails?.phone}
            />
          </div>

          <div className={styles.row}>
            <FormTextInput
              label="Postcode"
              placeholder="Enter your postcode"
              {...register("userDetails.postCode")}
              error={errors.userDetails?.postCode}
              button={
                <ConfirmBtn
                  title={isLoadingAddresses ? "Loading..." : "Find Address"}
                  onClick={handleFindAddress}
                  disabled={isLoadingAddresses}
                  type="button"
                />
              }
            />
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
        </div>

        {/* Employment Section */}
        <div className={styles.employmentSection}>
          <Title title="Employment Details" />
          <div className={styles.row}>
            <FormDropdown
              label="Employment Status"
              options={employmentStatusOptions}
              placeholder="Choose Employment Status"
              {...register("userDetails.employmentStatus")}
              error={errors.userDetails?.employmentStatus}
            />
            <FormTextInput
              label="Industry"
              placeholder="Enter your Industry"
              {...register("userDetails.industry")}
              error={errors.userDetails?.industry}
              disabled={isRetiredOrUnemployed}
              value={isRetiredOrUnemployed ? "N/A" : watch("userDetails.industry")}
            />
            <FormAutocomplete
              label="Occupation"
              options={occupationOptions}
              placeholder="Type or select your occupation"
              {...register("userDetails.occupation")}
              error={errors.userDetails?.occupation}
              value={isRetiredOrUnemployed ? "N/A" : watch("userDetails.occupation")}
              onChange={(e) => setValue("userDetails.occupation", e.target.value)}
              disabled={isRetiredOrUnemployed}
            />
          </div>
        </div>
      </div>

      <div className={styles.selections + " " + styles.selectionsContainer}>
        <div className={styles.selections2}>
          <Selection2
            title="Where do you keep your car during the day?"
            description="You can find the 'acquired vehicle on date in the V5C registration document, also known as the log book."
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
        <div className={styles.selections2}>
          <Selection2
            title="Where do you keep your car during the night?"
            description="You can find the 'acquired vehicle on date in the V5C registration document, also known as the log book."
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

      <div className={`${styles.content} ${styles.carUsageContainer}`}>
        <div className={styles.firstSection}>
          <Title title="What do you use the car for?" />
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

        <div className={styles.secondSection}>
          <div className={styles.row}>
            <FormDropdown
              label="License Type"
              options={["Full UK", "Provisional UK", "International", "Other"]}
              placeholder="Select a license type"
              {...register("carUsage.licenseType")}
              error={errors.carUsage?.licenseType}
            />
            <FormDropdown
              label="License Held"
              options={licenseHeldOptions}
              placeholder="Select license held duration"
              {...register("carUsage.licenseHeld")}
              error={errors.carUsage?.licenseHeld}
            />
            <FormTextInput
              label="License No. (Optional)"
              placeholder="Enter license no."
              {...register("carUsage.licenseNumber")}
              error={errors.carUsage?.licenseNumber}
            />
          </div>

          <div className={styles.row}>
            <FormDropdown
              label="No Claims Bonus (NCB) Years"
              options={dynamicNcbOptions}
              placeholder="Select no claims bonus years"
              {...register("carUsage.NCB")}
              error={errors.carUsage?.NCB}
            />
            <FormDropdown
              label="Voluntary Excess"
              options={voluntaryExcessOptions}
              placeholder="Select voluntary excess"
              {...register("carUsage.voluntaryExcess")}
              error={errors.carUsage?.voluntaryExcess}
            />
          </div>
        </div>

        <div className={styles.thirdSection}>
          <div className={styles.yesNo}>
            <p className={styles.yesNoTitle}>
              Do you have any unspent or outstanding criminal convictions?
            </p>
            <YesORNo
              value={watch("carUsage.criminalConvictions")}
              onChange={(value) =>
                setValue("carUsage.criminalConvictions", value)
              }
            />
          </div>

          <div className={styles.yesNo}>
            <p className={styles.yesNoTitle}>
              Do you have any medical conditions that are notifiable to the
              DVLA?
            </p>
            <YesORNo
              value={watch("carUsage.medicalConditions")}
              onChange={(value) =>
                setValue("carUsage.medicalConditions", value)
              }
            />
          </div>

          <div className={styles.yesNo}>
            <p className={styles.yesNoTitle}>
              Have you ever had insurance cancelled, a claim refused, a policy
              voided, or any special terms imposed? Unspent or outstanding
              criminal convictions?
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
