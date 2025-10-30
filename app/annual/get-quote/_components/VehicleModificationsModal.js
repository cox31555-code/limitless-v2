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

  useEffect(() => {
    setSelected(selectedModifications);
  }, [selectedModifications, isOpen]);

  const handleToggle = (modification) => {
    setSelected((prev) =>
      prev.includes(modification)
        ? prev.filter((item) => item !== modification)
        : [...prev, modification]
    );
  };

  const handleConfirm = () => {
    onConfirm(selected);
  };

  const handleClear = () => {
    setSelected([]);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h3 className={styles.title}>Vehicle Modifications</h3>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <p className={styles.subtitle}>Select all modifications that apply to your vehicle:</p>
          <div className={styles.modificationsList}>
            {MODIFICATION_OPTIONS.map((modification) => (
              <label key={modification} className={styles.modificationItem}>
                <input
                  type="checkbox"
                  checked={selected.includes(modification)}
                  onChange={() => handleToggle(modification)}
                  className={styles.checkbox}
                />
                <span className={styles.label}>{modification}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.clearBtn} onClick={handleClear} type="button">
            Clear Selection
          </button>
          <div className={styles.actionButtons}>
            <button className={styles.cancelBtn} onClick={onClose} type="button">
              Cancel
            </button>
            <button className={styles.confirmBtn} onClick={handleConfirm} type="button">
              Confirm ({selected.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleModificationsModal;
