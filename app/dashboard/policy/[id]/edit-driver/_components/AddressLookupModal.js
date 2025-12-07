"use client";

import React, { useState } from "react";
import DashboardInput from "./DashboardInput";
import styles from "./addressLookupModal.module.css";

const AddressLookupModal = ({ form, isOpen, onClose }) => {
  const { watch, setValue } = form;
  const [expandedManualEntry, setExpandedManualEntry] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [foundAddress, setFoundAddress] = useState(null);

  const houseNumber = watch("userDetails.houseNumber");
  const postcode = watch("userDetails.postcode");
  const addressLine1 = watch("userDetails.addressLine1");

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

  const handleSaveAddress = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Change Address</h3>
          <button 
            className={styles.closeBtn} 
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.addressGroup}>
            {expandedManualEntry ? (
              <>
                <div className={styles.fieldWrapper}>
                  <label className={styles.fieldLabel}>Address line 1</label>
                  <DashboardInput
                    type="text"
                    placeholder=""
                    value={watch("userDetails.addressLine1") || ""}
                    onChange={(e) => setValue("userDetails.addressLine1", e.target.value)}
                  />
                </div>

                <div className={styles.fieldWrapper}>
                  <label className={styles.fieldLabel}>Address line 2 (optional)</label>
                  <DashboardInput
                    type="text"
                    placeholder=""
                    value={watch("userDetails.addressLine2") || ""}
                    onChange={(e) => setValue("userDetails.addressLine2", e.target.value)}
                  />
                </div>

                <div className={styles.fieldWrapper}>
                  <label className={styles.fieldLabel}>Address line 3 (optional)</label>
                  <DashboardInput
                    type="text"
                    placeholder=""
                    value={watch("userDetails.addressLine3") || ""}
                    onChange={(e) => setValue("userDetails.addressLine3", e.target.value)}
                  />
                </div>

                <div className={styles.fieldWrapper}>
                  <label className={styles.fieldLabel}>Town/City</label>
                  <DashboardInput
                    type="text"
                    placeholder=""
                    value={watch("userDetails.city") || ""}
                    onChange={(e) => setValue("userDetails.city", e.target.value)}
                  />
                </div>

                <div className={styles.fieldWrapper}>
                  <label className={styles.fieldLabel}>Postcode</label>
                  <DashboardInput
                    type="text"
                    placeholder=""
                    value={watch("userDetails.manualPostcode") || ""}
                    onChange={(e) => setValue("userDetails.manualPostcode", e.target.value)}
                  />
                </div>

                <div className={styles.orSection}>
                  <div className={styles.orDivider}>
                    <span>Or</span>
                  </div>

                  <button
                    type="button"
                    className={styles.switchBtn}
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
                  className={styles.changeLink}
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
                    className={styles.switchBtn}
                    onClick={() => setExpandedManualEntry(true)}
                  >
                    Enter the full address yourself
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.saveBtn}
            onClick={handleSaveAddress}
          >
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressLookupModal;
