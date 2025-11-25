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
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

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
    <div className={styles.overlay} onClick={handleClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modifications-modal-title"
      >
        {/* Header */}
        <div className={styles.header}>
          <h3 id="modifications-modal-title" className={styles.title}>Vehicle Modifications</h3>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Close modal">
            ×
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <p className={styles.subtitle}>Select all modifications that apply to your vehicle:</p>

          {/* Search Input */}
          <div className={styles.searchContainer}>
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

          <div className={styles.modificationsList}>
            {filteredModifications.length > 0 ? (
              filteredModifications.map((modification, index) => (
                <label
                  key={modification}
                  className={styles.modificationItem}
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(modification)}
                    onChange={() => handleToggle(modification)}
                    className={styles.checkbox}
                    aria-label={modification}
                  />
                  <span className={styles.label}>{modification}</span>
                </label>
              ))
            ) : (
              <p className={styles.noResults}>No modifications found matching "{searchQuery}"</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.clearBtn} onClick={handleClear} type="button">
            Clear Selection
          </button>
          <div className={styles.actionButtons}>
            <button className={styles.cancelBtn} onClick={handleClose} type="button">
              Cancel
            </button>
            <button
              className={styles.confirmBtn}
              onClick={handleConfirm}
              type="button"
              data-has-selection={selected.length > 0}
            >
              Confirm ({selected.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleModificationsModal;
