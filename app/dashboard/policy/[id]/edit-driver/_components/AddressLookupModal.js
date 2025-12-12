"use client";

import React, { useState, useCallback } from "react";
import { useError } from "@/contexts/ErrorContext";
import DashboardInput from "./DashboardInput";
import LoadingOverlay from "../../../../../../ui/loadingSpinner/LoadingOverlay";
import styles from "./addressLookupModal.module.css";

const AddressLookupModal = ({ form, isOpen, onClose }) => {
  const { addError } = useError();
  const { watch, setValue } = form;
  const [expandedManualEntry, setExpandedManualEntry] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [foundAddress, setFoundAddress] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleSaveAddress = useCallback(async () => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      // Show modal
      setShowModal(true);
      setIsSubmitting(false);
    } catch (error) {
      addError({
        message: "Failed to save address. Please try again.",
        action: handleSaveAddress,
      });
      setIsSubmitting(false);
    }
  }, [addError]);

  if (!isOpen) return null;

  return (
    <>
      <LoadingOverlay isVisible={isSubmitting} text="Processing request" />
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
                      placeholder="e.g. 123 Main Street"
                      value={watch("userDetails.addressLine1") || ""}
                      onChange={(e) => setValue("userDetails.addressLine1", e.target.value)}
                    />
                  </div>

                  <div className={styles.fieldWrapper}>
                    <label className={styles.fieldLabel}>Address line 2 (optional)</label>
                    <DashboardInput
                      type="text"
                      placeholder="e.g. Apartment 4B"
                      value={watch("userDetails.addressLine2") || ""}
                      onChange={(e) => setValue("userDetails.addressLine2", e.target.value)}
                    />
                  </div>

                  <div className={styles.fieldWrapper}>
                    <label className={styles.fieldLabel}>Address line 3 (optional)</label>
                    <DashboardInput
                      type="text"
                      placeholder="e.g. Building name"
                      value={watch("userDetails.addressLine3") || ""}
                      onChange={(e) => setValue("userDetails.addressLine3", e.target.value)}
                    />
                  </div>

                  <div className={styles.fieldWrapper}>
                    <label className={styles.fieldLabel}>Town/City</label>
                    <DashboardInput
                      type="text"
                      placeholder="e.g. London"
                      value={watch("userDetails.city") || ""}
                      onChange={(e) => setValue("userDetails.city", e.target.value)}
                    />
                  </div>

                  <div className={styles.fieldWrapper}>
                    <label className={styles.fieldLabel}>Postcode</label>
                    <DashboardInput
                      type="text"
                      placeholder="e.g. SW1A 1AA"
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
                    <DashboardInput
                      type="text"
                      placeholder="e.g. 123 or Flat 4B"
                      value={houseNumber || ""}
                      onChange={(e) => {
                        setValue("userDetails.houseNumber", e.target.value);
                      }}
                      disabled={isLoadingAddress}
                    />
                  </div>

                  <div className={styles.fieldWrapper}>
                    <label className={styles.fieldLabel}>Postcode</label>
                    <DashboardInput
                      type="text"
                      placeholder="e.g. SW1A 1AA"
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
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => { setShowModal(false); setIsSubmitting(false); }}>
          <div className={styles.errorModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.errorIconWrapper}>
              <svg className={styles.errorIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className={styles.errorTitle}>Unable to update address</h2>
            <p className={styles.errorMessage}>We encountered an issue while updating your address.</p>
            <p className={styles.errorContact}>Please try again later or contact our support team.</p>
            <div className={styles.errorActions}>
              <button
                className={styles.closeBtn}
                onClick={() => { setShowModal(false); setIsSubmitting(false); }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddressLookupModal;
