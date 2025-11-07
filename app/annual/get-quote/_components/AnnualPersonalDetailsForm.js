"use client";
import React, { useState, useEffect, useCallback } from "react";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import FormTextInput from "@/ui/inputs/FormTextInput";
import FormDataAndTime from "@/ui/inputs/FormDataAndTime";
import FormDropdown from "@/ui/inputs/FormDropdown";
import FormAutocomplete from "@/ui/inputs/FormAutocomplete";
import Selection2 from "@/ui/inputs/selections/selection2/Selection2";
import Selection3 from "@/ui/inputs/selections/selection3/Selection3";
import YesORNo from "@/ui/inputs/selections/yesORNo/YesORNo";
import AdditionalDriversModal from "./AdditionalDriversModal";
import styles from "@/app/temporary/get-quote/_components/components.module.css";
import modalButtonStyles from "./additionalDriversModal.module.css";
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

const AnnualPersonalDetailsForm = ({ form }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const [dynamicNcbOptions, setDynamicNcbOptions] = useState(ncbOptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedTiles, setExpandedTiles] = useState(new Set(['about']));

  // Watch all form values early to use in dependencies and trigger re-evaluation
  const firstName = watch("userDetails.firstName");
  const surname = watch("userDetails.surname");
  const dateOfBirth = watch("userDetails.dateOfBirth");
  const userEmail = watch("userDetails.email");
  const userPhone = watch("userDetails.phone");
  const postCode = watch("userDetails.postCode");
  const address = watch("userDetails.address");
  const employmentStatus = watch("userDetails.employmentStatus");
  const industry = watch("userDetails.industry");
  const occupation = watch("userDetails.occupation");
  const keepingCarDuringDay = watch("carUsage.keepingCarDuringDay");
  const keepingCarDuringNight = watch("carUsage.keepingCarDuringNight");
  const usageType = watch("carUsage.usageType");
  const licenseType = watch("carUsage.licenseType");
  const licenseHeld = watch("carUsage.licenseHeld");
  const ncb = watch("carUsage.NCB");
  const ownsHome = watch("carUsage.ownsHome");
  const childrenUnder16 = watch("carUsage.childrenUnder16");
  const livedInUKSinceBirth = watch("carUsage.livedInUKSinceBirth");
  const criminalConvictions = watch("carUsage.criminalConvictions");
  const medicalConditions = watch("carUsage.medicalConditions");
  const insuranceCancelledStatus = watch("carUsage.insuranceCancelledOrClaimRefusedOrPolicyVoided");
  const additionalDrivers = watch("carUsage.additionalDrivers") || [];
  const hasAdditionalDrivers = watch("carUsage.hasAdditionalDrivers");
  const isIndustryOccupationDisabled = ["Retired", "Unemployed", "Student", "Houseperson"].includes(employmentStatus);
  const isRetiredOrUnemployed = isIndustryOccupationDisabled;

  const getTileOrder = () => ['about', 'location', 'employment', 'parking', 'usage', 'driving', 'additional', 'declarations', 'additionalDrivers'];

  const getTileLabel = (tileKey) => {
    const labels = {
      about: 'Your Details',
      location: 'Location',
      employment: 'Employment',
      parking: 'Car Parking',
      usage: 'Car Usage',
      driving: 'Driving Record',
      additional: 'Additional Information',
      declarations: 'Declarations',
      additionalDrivers: 'Additional Drivers'
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

  const toggleTile = (tileKey) => {
    setExpandedTiles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tileKey)) {
        newSet.delete(tileKey);
      } else {
        newSet.add(tileKey);
      }
      return newSet;
    });
  };

  const isTileExpanded = (tileKey) => {
    return expandedTiles.has(tileKey);
  };

  // Debounced auto-expand on form changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const tiles = getTileOrder();
      for (let i = 0; i < tiles.length; i++) {
        const isComplete = checkTileCompletion(tiles[i]);

        if (!isComplete) {
          // Found the first incomplete tile
          if (i === 0) {
            // First tile is always expanded
            setExpandedTiles(prev => new Set(prev).add(tiles[i]));
          } else {
            // Check if previous tile is complete
            const previousTile = tiles[i - 1];
            const isPrevComplete = checkTileCompletion(previousTile);

            if (isPrevComplete) {
              // Auto-expand the next tile since previous is complete
              setExpandedTiles(prev => new Set(prev).add(tiles[i]));
            }
          }
          break;
        }
      }

      // Special handling for Additional Drivers tile - auto-expand when declarations are complete
      const declarationsComplete = checkTileCompletion('declarations');
      if (declarationsComplete && !isTileDisabled('additionalDrivers')) {
        setExpandedTiles(prev => new Set(prev).add('additionalDrivers'));
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [
    firstName, surname, dateOfBirth, userEmail, userPhone, postCode, address, employmentStatus, industry, occupation,
    keepingCarDuringDay, keepingCarDuringNight, usageType, licenseType, licenseHeld, ncb,
    ownsHome, childrenUnder16, livedInUKSinceBirth, criminalConvictions, medicalConditions, insuranceCancelledStatus,
    additionalDrivers, hasAdditionalDrivers
  ]);

  const checkTileCompletion = (tileKey) => {
    const requiredFields = {
      about: ['userDetails.firstName', 'userDetails.surname', 'userDetails.dateOfBirth', 'userDetails.email', 'userDetails.phone'],
      location: ['userDetails.postCode', 'userDetails.address'],
      employment: ['userDetails.employmentStatus', 'userDetails.occupation', 'userDetails.industry'],
      parking: ['carUsage.keepingCarDuringDay', 'carUsage.keepingCarDuringNight'],
      usage: ['carUsage.usageType'],
      driving: ['carUsage.licenseType', 'carUsage.licenseHeld', 'carUsage.NCB'],
      additional: ['carUsage.ownsHome', 'carUsage.childrenUnder16', 'carUsage.livedInUKSinceBirth'],
      declarations: ['carUsage.criminalConvictions', 'carUsage.medicalConditions', 'carUsage.insuranceCancelledOrClaimRefusedOrPolicyVoided'],
      additionalDrivers: []
    };

    const fieldsToCheck = requiredFields[tileKey] || [];
    return fieldsToCheck.every(field => {
      const value = watch(field);
      return value !== null && value !== undefined && value !== '';
    });
  };

  const isTileDisabled = (tileKey) => {
    const tiles = getTileOrder();
    const currentTileIndex = tiles.indexOf(tileKey);

    if (currentTileIndex === 0) return false;

    const previousTileKey = tiles[currentTileIndex - 1];
    return !checkTileCompletion(previousTileKey);
  };


  const handleAddDriver = () => {
    const newDriver = {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      phone: "",
      postCode: "",
      address: "",
      employmentStatus: "",
      industry: "",
      occupation: "",
      keepingCarDuringDay: "",
      keepingCarDuringNight: "",
      usageType: "",
      otherVehicles: null,
      otherVehiclesType: "",
      licenseType: "",
      licenseHeld: "",
      licenseNumber: "",
      NCB: "",
      voluntaryExcess: "",
      hasAdditionalQualifications: null,
      additionalQualificationType: "",
      qualificationMonth: "",
      qualificationYear: "",
      ownsHome: null,
      childrenUnder16: null,
      livedInUKSinceBirth: null,
      criminalConvictions: null,
      medicalConditions: null,
      insuranceCancelledOrClaimRefusedOrPolicyVoided: null,
    };
    setValue("carUsage.additionalDrivers", [...additionalDrivers, newDriver]);
  };

  const handleRemoveDriver = (index) => {
    const updatedDrivers = additionalDrivers.filter((_, i) => i !== index);
    setValue("carUsage.additionalDrivers", updatedDrivers);
  };

  const handleUpdateDriver = (index, field, value) => {
    const updatedDrivers = [...additionalDrivers];
    updatedDrivers[index] = { ...updatedDrivers[index], [field]: value };
    setValue("carUsage.additionalDrivers", updatedDrivers);
  };

  React.useEffect(() => {
    if (isRetiredOrUnemployed) {
      setValue("userDetails.industry", "N/A");
      setValue("userDetails.occupation", "N/A");
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
  }, [isRetiredOrUnemployed, setValue, watch]);

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

  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const handleFindAddress = () => {
    setIsLoadingAddress(true);
    setTimeout(() => {
      setValue("userDetails.address", "2 KINGS ROAD");
      setIsLoadingAddress(false);
    }, 3000);
  };

  const isDriverComplete = (driver) => {
    if (!driver) return false;

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

  const completeDrivers = additionalDrivers.filter(driver => isDriverComplete(driver));

  return (
    <>
      <ComponentWrapper title="Personal Details">
      <div className={styles.cleanFormContent}>
        
        {/* About You Section */}
        <section className={`${modalButtonStyles.formSection} ${isTileDisabled('about') ? modalButtonStyles.disabled : ''}`}>
          <button
            type="button"
            className={`${modalButtonStyles.tileHeader} ${isTileExpanded('about') ? modalButtonStyles.expanded : ''} ${isTileDisabled('about') ? modalButtonStyles.disabled : ''}`}
            onClick={() => toggleTile('about')}
          >
            <h3 className={modalButtonStyles.sectionLabel}>About You</h3>
            <span className={modalButtonStyles.expandIcon}>+</span>
          </button>
          {isTileExpanded('about') && isTileDisabled('about') && (
            <div className={modalButtonStyles.errorMessage}>
              <span className={modalButtonStyles.errorIcon}>!</span>
              <span>Complete {getPreviousTileLabel('about')} first</span>
            </div>
          )}
          {isTileExpanded('about') && !isTileDisabled('about') && <>

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
          </>}
        </section>

        {/* Where You Live Section */}
        <section className={`${modalButtonStyles.formSection} ${isTileDisabled('location') ? modalButtonStyles.disabled : ''}`}>
          <button
            type="button"
            className={`${modalButtonStyles.tileHeader} ${isTileExpanded('location') ? modalButtonStyles.expanded : ''} ${isTileDisabled('location') ? modalButtonStyles.disabled : ''}`}
            onClick={() => toggleTile('location')}
          >
            <h3 className={modalButtonStyles.sectionLabel}>Where You Live</h3>
            <span className={modalButtonStyles.expandIcon}>+</span>
          </button>
          {isTileExpanded('location') && isTileDisabled('location') && (
            <div className={modalButtonStyles.errorMessage}>
              <span className={modalButtonStyles.errorIcon}>!</span>
              <span>Complete {getPreviousTileLabel('location')} first</span>
            </div>
          )}
          {isTileExpanded('location') && !isTileDisabled('location') && <>

          <div className={styles.cleanPostcodeRow}>
            <FormTextInput
              label="Postcode"
              placeholder="Enter your postcode"
              {...register("userDetails.postCode")}
              error={errors.userDetails?.postCode}
              disabled={isLoadingAddress}
              inputStyle={{ paddingLeft: "14px" }}
            />
            <button
              className={styles.findAddressButton}
              onClick={handleFindAddress}
              type="button"
              disabled={isLoadingAddress}
            >
              {isLoadingAddress ? "Searching..." : "Find Address"}
            </button>
          </div>

          <div className={styles.cleanFormGrid1Col}>
            <FormDropdown
              label="Select address"
              options={["2 KINGS ROAD"]}
              placeholder="Select your address"
              {...register("userDetails.address")}
              error={errors.userDetails?.address}
              disabled={!address}
              inputStyle={{ paddingLeft: "14px" }}
            />
            </div>
          </>}
        </section>

        {/* Employment Section */}
        <section className={`${modalButtonStyles.formSection} ${isTileDisabled('employment') ? modalButtonStyles.disabled : ''}`}>
          <button
            type="button"
            className={`${modalButtonStyles.tileHeader} ${isTileExpanded('employment') ? modalButtonStyles.expanded : ''} ${isTileDisabled('employment') ? modalButtonStyles.disabled : ''}`}
            onClick={() => toggleTile('employment')}
          >
            <h3 className={modalButtonStyles.sectionLabel}>Your Employment</h3>
            <span className={modalButtonStyles.expandIcon}>+</span>
          </button>
          {isTileExpanded('employment') && isTileDisabled('employment') && (
            <div className={modalButtonStyles.errorMessage}>
              <span className={modalButtonStyles.errorIcon}>!</span>
              <span>Complete {getPreviousTileLabel('employment')} first</span>
            </div>
          )}
          {isTileExpanded('employment') && !isTileDisabled('employment') && <>

          <div className={styles.cleanFormGrid2Col}>
            <FormDropdown
              label="Employment Status"
              options={employmentStatusOptions}
              placeholder="Select employment status"
              {...register("userDetails.employmentStatus")}
              error={errors.userDetails?.employmentStatus}
              inputStyle={{ paddingLeft: "14px" }}
            />
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
          </div>

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
          </>}
        </section>

        {/* Car Parking Section */}
        <section className={`${modalButtonStyles.formSection} ${isTileDisabled('parking') ? modalButtonStyles.disabled : ''}`}>
          <button
            type="button"
            className={`${modalButtonStyles.tileHeader} ${isTileExpanded('parking') ? modalButtonStyles.expanded : ''} ${isTileDisabled('parking') ? modalButtonStyles.disabled : ''}`}
            onClick={() => toggleTile('parking')}
          >
            <h3 className={modalButtonStyles.sectionLabel}>Parking & Storage</h3>
            <span className={modalButtonStyles.expandIcon}>+</span>
          </button>
          {isTileExpanded('parking') && isTileDisabled('parking') && (
            <div className={modalButtonStyles.errorMessage}>
              <span className={modalButtonStyles.errorIcon}>!</span>
              <span>Complete {getPreviousTileLabel('parking')} first</span>
            </div>
          )}
          {isTileExpanded('parking') && !isTileDisabled('parking') && <>

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
          </>}
        </section>

        {/* Car Usage Section */}
        <section className={`${modalButtonStyles.formSection} ${isTileDisabled('usage') ? modalButtonStyles.disabled : ''}`}>
          <button
            type="button"
            className={`${modalButtonStyles.tileHeader} ${isTileExpanded('usage') ? modalButtonStyles.expanded : ''} ${isTileDisabled('usage') ? modalButtonStyles.disabled : ''}`}
            onClick={() => toggleTile('usage')}
          >
            <h3 className={modalButtonStyles.sectionLabel}>Usage Details</h3>
            <span className={modalButtonStyles.expandIcon}>+</span>
          </button>
          {isTileExpanded('usage') && isTileDisabled('usage') && (
            <div className={modalButtonStyles.errorMessage}>
              <span className={modalButtonStyles.errorIcon}>!</span>
              <span>Complete {getPreviousTileLabel('usage')} first</span>
            </div>
          )}
          {isTileExpanded('usage') && !isTileDisabled('usage') && <>

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
          </>}
        </section>

        {/* Your Driving Record Section */}
        <section className={`${modalButtonStyles.formSection} ${isTileDisabled('driving') ? modalButtonStyles.disabled : ''}`}>
          <button
            type="button"
            className={`${modalButtonStyles.tileHeader} ${isTileExpanded('driving') ? modalButtonStyles.expanded : ''} ${isTileDisabled('driving') ? modalButtonStyles.disabled : ''}`}
            onClick={() => toggleTile('driving')}
          >
            <h3 className={modalButtonStyles.sectionLabel}>Your Driving Record</h3>
            <span className={modalButtonStyles.expandIcon}>+</span>
          </button>
          {isTileExpanded('driving') && isTileDisabled('driving') && (
            <div className={modalButtonStyles.errorMessage}>
              <span className={modalButtonStyles.errorIcon}>!</span>
              <span>Complete {getPreviousTileLabel('driving')} first</span>
            </div>
          )}
          {isTileExpanded('driving') && !isTileDisabled('driving') && <>

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

          <div className={`${styles.cleanFormGrid1Col} ${styles.cleanFormGrid1ColWithTopGap}`}>
            <p className={styles.cleanFormFieldLabel}>Have you passed any additional driving qualifications?</p>
            <p className={styles.cleanSubLabel}>Some insurance providers may offer a discount if you have an additional driving qualification.</p>
            <YesORNo
              value={watch("carUsage.hasAdditionalQualifications")}
              onChange={(value) =>
                setValue("carUsage.hasAdditionalQualifications", value)
              }
            />
          </div>

          {watch("carUsage.hasAdditionalQualifications") && (
            <>
              <div className={`${styles.cleanFormGrid1Col} ${styles.cleanFormGrid1ColWithTopPadding}`}>
                <p className={styles.cleanFormFieldLabel}>What type of driving qualification do you have?</p>
                <FormDropdown
                  label=""
                  options={additionalQualificationsOptions}
                  placeholder="Select qualification type"
                  {...register("carUsage.additionalQualificationType")}
                  error={errors.carUsage?.additionalQualificationType}
                  inputStyle={{ paddingLeft: "14px" }}
                />
              </div>

              <div className={styles.cleanFormGrid2Col}>
                <FormDropdown
                  label="Month"
                  options={monthOptions}
                  placeholder="Select month"
                  {...register("carUsage.qualificationMonth")}
                  error={errors.carUsage?.qualificationMonth}
                  inputStyle={{ paddingLeft: "14px" }}
                />
                <FormDropdown
                  label="Year"
                  options={yearOptions}
                  placeholder="Select year"
                  {...register("carUsage.qualificationYear")}
                  error={errors.carUsage?.qualificationYear}
                  inputStyle={{ paddingLeft: "14px" }}
                />
              </div>
            </>
          )}
          </>}
        </section>

        {/* Additional Information Section */}
        <section className={`${modalButtonStyles.formSection} ${isTileDisabled('additional') ? modalButtonStyles.disabled : ''}`}>
          <button
            type="button"
            className={`${modalButtonStyles.tileHeader} ${isTileExpanded('additional') ? modalButtonStyles.expanded : ''} ${isTileDisabled('additional') ? modalButtonStyles.disabled : ''}`}
            onClick={() => toggleTile('additional')}
          >
            <h3 className={modalButtonStyles.sectionLabel}>Additional Information</h3>
            <span className={modalButtonStyles.expandIcon}>+</span>
          </button>
          {isTileExpanded('additional') && isTileDisabled('additional') && (
            <div className={modalButtonStyles.errorMessage}>
              <span className={modalButtonStyles.errorIcon}>!</span>
              <span>Complete {getPreviousTileLabel('additional')} first</span>
            </div>
          )}
          {isTileExpanded('additional') && !isTileDisabled('additional') && <>

          <div className={styles.cleanAdditionalInfoContainer}>
            <div className={styles.cleanFormGrid1Col}>
              <p className={styles.cleanFormFieldLabel}>Do you own your home?</p>
              <YesORNo
                value={watch("carUsage.ownsHome")}
                onChange={(value) =>
                  setValue("carUsage.ownsHome", value)
                }
              />
            </div>

            <div className={styles.cleanFormGrid1Col}>
              <p className={styles.cleanFormFieldLabel}>Do any children under the age of 16 live with you?</p>
              <YesORNo
                value={watch("carUsage.childrenUnder16")}
                onChange={(value) =>
                  setValue("carUsage.childrenUnder16", value)
                }
              />
            </div>

            <div className={styles.cleanFormGrid1Col}>
              <p className={styles.cleanFormFieldLabel}>Have you continuously lived in the UK since birth?</p>
              <p className={styles.cleanSubLabel}>Insurance providers need to know how long you've lived in the UK on a continuous basis, without any breaks lasting 6 months or longer.</p>
              <YesORNo
                value={watch("carUsage.livedInUKSinceBirth")}
                onChange={(value) =>
                  setValue("carUsage.livedInUKSinceBirth", value)
                }
              />
            </div>
          </div>
          </>}
        </section>

        {/* Declarations Section */}
        <section className={`${modalButtonStyles.formSection} ${isTileDisabled('declarations') ? modalButtonStyles.disabled : ''}`}>
          <button
            type="button"
            className={`${modalButtonStyles.tileHeader} ${isTileExpanded('declarations') ? modalButtonStyles.expanded : ''} ${isTileDisabled('declarations') ? modalButtonStyles.disabled : ''}`}
            onClick={() => toggleTile('declarations')}
          >
            <h3 className={modalButtonStyles.sectionLabel}>Important Declarations</h3>
            <span className={modalButtonStyles.expandIcon}>+</span>
          </button>
          {isTileExpanded('declarations') && isTileDisabled('declarations') && (
            <div className={modalButtonStyles.errorMessage}>
              <span className={modalButtonStyles.errorIcon}>!</span>
              <span>Complete {getPreviousTileLabel('declarations')} first</span>
            </div>
          )}
          {isTileExpanded('declarations') && !isTileDisabled('declarations') && <>

          <div className={styles.cleanDeclarationsContainer}>
            <div className={styles.cleanDeclarationItem}>
              <p className={styles.cleanDeclarationQuestion}>
                Do you have any unspent or outstanding criminal convictions?
              </p>
              <YesORNo
                value={watch("carUsage.criminalConvictions")}
                onChange={(value) =>
                  setValue("carUsage.criminalConvictions", value)
                }
              />
            </div>

            <div className={styles.cleanDeclarationItem}>
              <p className={styles.cleanDeclarationQuestion}>
                Do you have any medical conditions that are notifiable to the DVLA?
              </p>
              <YesORNo
                value={watch("carUsage.medicalConditions")}
                onChange={(value) =>
                  setValue("carUsage.medicalConditions", value)
                }
              />
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
            </div>
          </div>
          </>}
        </section>

        {/* Additional Drivers Section */}
        <section className={`${modalButtonStyles.formSection} ${isTileDisabled('additionalDrivers') ? modalButtonStyles.disabled : ''}`}>
          <button
            type="button"
            className={`${modalButtonStyles.tileHeader} ${isTileExpanded('additionalDrivers') ? modalButtonStyles.expanded : ''} ${isTileDisabled('additionalDrivers') ? modalButtonStyles.disabled : ''}`}
            onClick={() => toggleTile('additionalDrivers')}
          >
            <h3 className={modalButtonStyles.sectionLabel}>Additional Drivers</h3>
            <span className={modalButtonStyles.expandIcon}>+</span>
          </button>
          {isTileExpanded('additionalDrivers') && isTileDisabled('additionalDrivers') && (
            <div className={modalButtonStyles.errorMessage}>
              <span className={modalButtonStyles.errorIcon}>!</span>
              <span>Complete {getPreviousTileLabel('additionalDrivers')} first</span>
            </div>
          )}
          {isTileExpanded('additionalDrivers') && !isTileDisabled('additionalDrivers') && <>

          <div className={styles.cleanAdditionalInfoContainer}>
            <div className={styles.cleanFormGrid1Col}>
              <p className={styles.cleanFormFieldLabel}>Additional Drivers</p>
              <p className={styles.cleanSubLabel}>Do you want to add any additional drivers? You can add up to 5 additional drivers. Include any drivers who share the car for business use.</p>
              <YesORNo
                value={watch("carUsage.hasAdditionalDrivers")}
                onChange={(value) => {
                  setValue("carUsage.hasAdditionalDrivers", value);
                  if (!value) {
                    setValue("carUsage.additionalDrivers", []);
                  }
                }}
              />

              {hasAdditionalDrivers && (
                <div className={modalButtonStyles.driversButtonContainer}>
                  {completeDrivers.length > 0 && (
                    <div className={modalButtonStyles.driverButtonsList}>
                      {completeDrivers.map((driver, index) => (
                        <button
                          key={index}
                          type="button"
                          className={modalButtonStyles.driverNameButton}
                          onClick={() => setIsModalOpen(true)}
                          title="Click to edit driver"
                        >
                          {driver.firstName && driver.lastName ? `${driver.firstName} ${driver.lastName}` : `Driver`}
                        </button>
                      ))}
                    </div>
                  )}
                  {completeDrivers.length < 5 && (
                    <button
                      type="button"
                      className={modalButtonStyles.openModalButton}
                      onClick={() => setIsModalOpen(true)}
                    >
                      + Add {completeDrivers.length === 0 ? 'Drivers' : 'Another Driver'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          </>}
        </section>
      </div>
    </ComponentWrapper>

      {/* Additional Drivers Modal - Rendered outside ComponentWrapper */}
      {isModalOpen && (
        <AdditionalDriversModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          form={form}
          drivers={additionalDrivers}
          onAddDriver={handleAddDriver}
          onRemoveDriver={handleRemoveDriver}
          onUpdateDriver={handleUpdateDriver}
        />
      )}
    </>
  );
};

export default AnnualPersonalDetailsForm;
