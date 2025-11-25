"use client";
import React, { useState, useEffect } from "react";
import styles from "./vehicleModificationsModal.module.css";

const MODIFICATION_CATEGORIES = [
  {
    category: "Wheels, Tyres & Suspension",
    options: [
      "Alloy wheels",
      "Different tyre size",
      "Wider tyres",
      "Low-profile tyres",
      "Lowered suspension",
      "Raised suspension",
      "Uprated shocks",
      "Uprated springs",
      "Adjustable suspension (air or hydraulic)",
      "Anti-roll bars / sway bars",
    ],
  },
  {
    category: "Engine & Performance",
    options: [
      "ECU remap / chip tuning",
      "Turbo added or upgraded",
      "Supercharger added or upgraded",
      "Engine swap",
      "Performance camshafts",
      "Performance pistons",
      "Nitrous oxide system",
      "Fuel system upgrades",
      "Performance clutch",
      "Lightweight flywheel",
      "Limited-slip differential",
      "Drivetrain modifications",
    ],
  },
  {
    category: "Intake & Exhaust",
    options: [
      "High-flow air filter",
      "Induction kit / cold air intake",
      "Sports exhaust",
      "Aftermarket exhaust system",
      "De-cat pipe",
      "Straight pipe",
      "Loud exhaust modifications",
    ],
  },
  {
    category: "Brakes & Handling",
    options: [
      "Uprated brake pads",
      "Uprated brake discs",
      "Big brake kit",
      "Strut braces",
      "Chassis bracing",
      "Quick-ratio steering rack",
    ],
  },
  {
    category: "Bodywork & Exterior Styling",
    options: [
      "Body kit",
      "Bumpers modified or replaced",
      "Side skirts",
      "Wide-arch kit",
      "Spoilers",
      "Wings",
      "Splitters",
      "Diffusers",
      "Bonnet vents or scoops",
      "Custom grille",
      "Tow bar",
      "Permanent roof racks",
      "Roof boxes (permanent fit)",
    ],
  },
  {
    category: "Paint, Wraps, Graphics & Glass",
    options: [
      "Full respray",
      "Custom paint colour",
      "Two-tone paint",
      "Vinyl wrap",
      "Full body wrap",
      "Partial wrap",
      "Decals and stickers",
      "Graphics or logos",
      "Racing stripes",
      "Tinted windows (aftermarket)",
      "Tinted headlights",
      "Tinted tail lights",
      "Smoked lights",
      "Privacy glass added aftermarket",
    ],
  },
  {
    category: "Lights",
    options: [
      "Aftermarket headlights",
      "LED headlight kit",
      "HID headlight kit",
      "Daytime running lights added",
      "Under-body neon lights",
      "Underglow lighting",
      "Additional spotlights",
      "Light bars",
    ],
  },
  {
    category: "Interior, Seats & Controls",
    options: [
      "Bucket seats",
      "Sports seats",
      "Re-trimmed interior",
      "Custom upholstery",
      "Harnesses",
      "Aftermarket steering wheel",
      "Short-shifter",
      "Gear lever modifications",
      "Custom pedals",
      "Pedal extensions",
    ],
  },
  {
    category: "Tech, Audio, Security & Convenience",
    options: [
      "Upgraded speaker system",
      "Subwoofer installation",
      "Aftermarket head unit",
      "Aftermarket infotainment",
      "Dashcam hardwired",
      "Alarm upgrade",
      "Aftermarket immobiliser",
      "Tracking device",
      "Tracker/telemetry device",
      "Parking sensors added",
      "Reversing camera added",
    ],
  },
  {
    category: "Towing & Practical Additions",
    options: [
      "Tow bar installation",
      "Permanent bike rack",
      "Rear carriers",
      "Winch",
      "Bull bars",
      "Nudge bars",
    ],
  },
  {
    category: "Accessibility / Disability Adaptations",
    options: [
      "Hand controls for brake/accelerator",
      "Left-foot accelerator",
      "Altered pedals",
      "Extended pedals",
      "Wheelchair ramp",
      "Wheelchair lift",
      "Swivel seats",
      "Hoists",
      "Steering aids",
      "Reduced-effort steering",
    ],
  },
  {
    category: "Other Modifications",
    options: [
      "De-badging",
      "Re-badging",
      "Van to camper conversion",
      "Commercial use conversion",
      "Dog transport conversion",
      "Taxi conversion fittings",
      "Roll cage",
      "Half cage",
      "Removal of rear seats",
      "Additional gauges",
      "Boost gauges",
      "AFR gauges",
      "Battery relocation",
      "Boot build (audio or equipment)",
    ],
  },
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

  const getFilteredCategories = () => {
    if (!searchQuery) return MODIFICATION_CATEGORIES;

    const query = searchQuery.toLowerCase();
    return MODIFICATION_CATEGORIES.map((cat) => ({
      ...cat,
      options: cat.options.filter((opt) => opt.toLowerCase().includes(query)),
    })).filter((cat) => cat.options.length > 0);
  };

  const filteredCategories = getFilteredCategories();
  const hasResults = filteredCategories.length > 0;

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
        <div className={styles.modalBody}>
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

          <div className={styles.bodyContent}>
            <div className={styles.formSection}>
              <label className={styles.formLabel}>Select all modifications that apply to your vehicle</label>
              <p className={styles.helperText}>
                Choose from the categories below. You can search for specific modifications or browse by category.
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
            {hasResults ? (
              <div className={styles.categoriesList}>
                {filteredCategories.map((categoryData) => (
                  <div key={categoryData.category} className={styles.categorySection}>
                    <h3 className={styles.categoryHeader}>{categoryData.category}</h3>
                    <div className={styles.categoryOptions}>
                      {categoryData.options.map((modification) => (
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
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <p>No modifications found matching "{searchQuery}"</p>
              </div>
            )}
            </div>
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
