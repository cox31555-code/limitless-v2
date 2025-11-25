"use client";
import React, { useState, useEffect } from "react";
import styles from "./vehicleModificationsModal.module.css";

const MODIFICATION_OPTIONS = [
  "Lowered suspension",
  "Raised suspension",
  "Engine tuning/remapping",
  "Turbocharger/supercharger added",
  "Exhaust system modification",
  "Alloy wheels",
  "Body kit/spoilers",
  "Custom paintwork",
  "Interior modification",
  "Tinted windows",
  "Security system upgrade",
  "Sound system upgrade",
  "Lighting modification",
  "Tow hitch/towing preparation",
  "LPG/Gas conversion",
  "Other modification",
];

const VehicleModificationsModal = ({ isOpen, onClose, onConfirm, selectedModifications = [] }) => {
  const [selected, setSelected] = useState(selectedModifications);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSelected(selectedModifications);
  }, [selectedModifications, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleToggle = (modification) => {
    setSelected((prev) =>
      prev.includes(modification)
        ? prev.filter((item) => item !== modification)
        : [...prev, modification]
    );
  };

  const handleConfirm = () => {
    onConfirm(selected);
    setSearchQuery("");
  };

  const handleClear = () => {
    setSelected([]);
  };

  const handleClose = () => {
    setSearchQuery("");
    onClose();
  };

  const filteredModifications = MODIFICATION_OPTIONS.filter((mod) =>
    mod.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div 
        className={styles.modalContent} 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modifications-modal-title"
      >
        <div className={styles.modalHeader}>
          <div className={styles.headerContent}>
            <h2 id="modifications-modal-title">Vehicle Modifications</h2>
            {selected.length > 0 && (
              <p className={styles.selectedCount}>{selected.length} selected</p>
            )}
          </div>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Close modal">
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.formSection}>
            <label className={styles.formLabel}>Select all modifications that apply to your vehicle</label>
            <p className={styles.helperText}>
              Choose from the list below. You can search for specific modifications or scroll through all options.
            </p>
          </div>

          <div className={styles.searchSection}>
            <div className={styles.searchInputWrapper}>
              <input
                type="text"
                placeholder="Search modifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                aria-label="Search modifications"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className={styles.clearSearchBtn}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <div className={styles.modificationsListContainer}>
            {filteredModifications.length > 0 ? (
              <div className={styles.modificationsList}>
                {filteredModifications.map((modification) => (
                  <label key={modification} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selected.includes(modification)}
                      onChange={() => handleToggle(modification)}
                      className={styles.checkbox}
                      aria-label={modification}
                    />
                    <span className={styles.checkboxText}>{modification}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <p>No modifications found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button 
            type="button" 
            className={styles.clearBtn} 
            onClick={handleClear}
            disabled={selected.length === 0}
          >
            Clear All
          </button>
          <div className={styles.actionButtons}>
            <button type="button" className={styles.cancelBtn} onClick={handleClose}>
              Cancel
            </button>
            <button type="button" className={styles.confirmBtn} onClick={handleConfirm}>
              Confirm {selected.length > 0 && `(${selected.length})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleModificationsModal;
