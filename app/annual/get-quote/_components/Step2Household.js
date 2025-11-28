"use client";
import React, { useState } from "react";
import CustomTextInput from "@/ui/inputs/textInput/CustomTextInput";
import styles from "./step2Household.module.css";

const Step2Household = ({ form }) => {
  const { register, formState: { errors }, watch, setValue } = form;

  const houseNumber = watch("userDetails.houseNumber");
  const postcode = watch("userDetails.postcode");
  const ownsHome = watch("userDetails.ownsHome");
  const childrenUnder16 = watch("userDetails.childrenUnder16");
  const livedInUKSinceBirth = watch("userDetails.livedInUKSinceBirth");
  const [expandedWhyAsking, setExpandedWhyAsking] = useState(false);
  const [expandedManualEntry, setExpandedManualEntry] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [foundAddress, setFoundAddress] = useState(null);

  const handleFindAddress = () => {
    const trimmedPostcode = postcode?.trim();

    if (!trimmedPostcode) {
      return;
    }

    setIsLoadingAddress(true);

    // Simulate API call
    setTimeout(() => {
      const mockAddress = {
        line1: "2 Kings Road",
        line2: "Waltham Cross",
        postcode: trimmedPostcode.toUpperCase(),
      };

      setFoundAddress(mockAddress);
      setValue("userDetails.addressLine1", mockAddress.line1);
      setValue("userDetails.addressLine2", mockAddress.line2);
      setValue("userDetails.manualPostcode", mockAddress.postcode);
      setIsLoadingAddress(false);
    }, 1500);
  };

  const handleChangeAddress = () => {
    setFoundAddress(null);
    setValue("userDetails.houseNumber", "");
    setValue("userDetails.postcode", "");
    setValue("userDetails.addressLine1", "");
    setValue("userDetails.addressLine2", "");
    setValue("userDetails.addressLine3", "");
    setValue("userDetails.city", "");
    setValue("userDetails.manualPostcode", "");
  };

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Your details - Your household</h2>
      </div>

      <div className={styles.contentWrapper}>
        {/* Address Section */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>What's your address?</h3>
          </div>

          <div className={styles.addressGroup}>
            {expandedManualEntry ? (
              <>
                <div className={styles.fieldWrapper}>
                  <label className={styles.fieldLabel}>Address line 1</label>
                  <CustomTextInput
                    type="text"
                    placeholder=""
                    value={watch("userDetails.addressLine1") || ""}
                    onChange={(e) => setValue("userDetails.addressLine1", e.target.value)}
                    error={errors?.userDetails?.addressLine1?.message}
                  />
                </div>

                <div className={styles.fieldWrapper}>
                  <label className={styles.fieldLabel}>Address line 2 (optional)</label>
                  <CustomTextInput
                    type="text"
                    placeholder=""
                    value={watch("userDetails.addressLine2") || ""}
                    onChange={(e) => setValue("userDetails.addressLine2", e.target.value)}
                  />
                </div>

                <div className={styles.fieldWrapper}>
                  <label className={styles.fieldLabel}>Address line 3 (optional)</label>
                  <CustomTextInput
                    type="text"
                    placeholder=""
                    value={watch("userDetails.addressLine3") || ""}
                    onChange={(e) => setValue("userDetails.addressLine3", e.target.value)}
                  />
                </div>

                <div className={styles.fieldWrapper}>
                  <label className={styles.fieldLabel}>Town/City</label>
                  <CustomTextInput
                    type="text"
                    placeholder=""
                    value={watch("userDetails.city") || ""}
                    onChange={(e) => setValue("userDetails.city", e.target.value)}
                    error={errors?.userDetails?.city?.message}
                  />
                </div>

                <div className={styles.fieldWrapper}>
                  <label className={styles.fieldLabel}>Postcode</label>
                  <CustomTextInput
                    type="text"
                    placeholder=""
                    value={watch("userDetails.manualPostcode") || ""}
                    onChange={(e) => setValue("userDetails.manualPostcode", e.target.value)}
                    error={errors?.userDetails?.manualPostcode?.message}
                  />
                </div>

                <div className={styles.orSection}>
                  <div className={styles.orDivider}>
                    <span>Or</span>
                  </div>

                  <button
                    type="button"
                    className={styles.expandableLink}
                    onClick={() => setExpandedManualEntry(false)}
                  >
                    Use address lookup
                  </button>
                </div>
              </>
            ) : foundAddress ? (
              <>
                <div className={styles.foundAddressCard}>
                  <div className={styles.foundAddressInfo}>
                    <h4 className={styles.foundAddressTitle}>Your address</h4>
                    <p className={styles.foundAddressDetails}>
                      {foundAddress.line1}
                    </p>
                    <p className={styles.foundAddressDetails}>
                      {foundAddress.line2}
                    </p>
                    <p className={styles.foundAddressDetails}>
                      {foundAddress.postcode}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.changeAddressLink}
                  onClick={handleChangeAddress}
                >
                  Change address
                </button>
              </>
            ) : (
              <>
                <div className={styles.fieldWrapper}>
                  <label className={styles.fieldLabel}>House number or name (optional)</label>
                  <CustomTextInput
                    type="text"
                    placeholder=""
                    value={houseNumber || ""}
                    onChange={(e) => {
                      setValue("userDetails.houseNumber", e.target.value);
                    }}
                    disabled={isLoadingAddress}
                  />
                </div>

                <div className={styles.fieldWrapper}>
                  <label className={styles.fieldLabel}>Postcode</label>
                  <CustomTextInput
                    type="text"
                    placeholder=""
                    value={postcode || ""}
                    onChange={(e) => {
                      setValue("userDetails.postcode", e.target.value);
                    }}
                    disabled={isLoadingAddress}
                  />
                </div>

                <button
                  type="button"
                  className={styles.findAddressBtn}
                  onClick={handleFindAddress}
                  disabled={!postcode?.trim() || isLoadingAddress}
                >
                  {isLoadingAddress ? (
                    <>
                      <span className={styles.spinner}></span>
                      Searching...
                    </>
                  ) : (
                    'Find address'
                  )}
                </button>

                <div className={styles.orSection}>
                  <div className={styles.orDivider}>
                    <span>Or</span>
                  </div>

                  <button
                    type="button"
                    className={styles.expandableLink}
                    onClick={() => setExpandedManualEntry(true)}
                  >
                    Enter the full address yourself
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Home Ownership Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>Do you own your home?</h3>

          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("userDetails.ownsHome")}
                value="Yes"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Yes</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("userDetails.ownsHome")}
                value="No"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>No</span>
            </label>
          </div>
        </div>

        {/* Children Section */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>Do any children under the age of 16 live with you?</h3>

          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("userDetails.childrenUnder16")}
                value="Yes"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Yes</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("userDetails.childrenUnder16")}
                value="No"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>No</span>
            </label>
          </div>

          <button
            type="button"
            className={`${styles.expandableLink} ${styles.withIcon}`}
            onClick={() => setExpandedWhyAsking(!expandedWhyAsking)}
          >
            <span className={styles.expandableIcon}>
              {expandedWhyAsking ? '▼' : '▶'}
            </span>
            Why are we asking?
          </button>

          {expandedWhyAsking && (
            <p className={styles.expandableContent}>
              Insurance providers may adjust pricing based on household composition and other factors.
            </p>
          )}
        </div>

        {/* UK Residency Section */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>Have you continuously lived in the UK since birth?</h3>
            <p className={styles.subText}>
              Insurance providers need to know how long you've lived in the UK on a continuous basis, without any breaks lasting 6 months or longer.
            </p>
          </div>

          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("userDetails.livedInUKSinceBirth")}
                value="Yes"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>Yes</span>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                {...register("userDetails.livedInUKSinceBirth")}
                value="No"
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>No</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2Household;
