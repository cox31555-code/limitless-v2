"use client";
import React from "react";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import FormDateInput from "@/ui/inputs/FormDateInput";
import styles from "./annualCoverDetails.module.css";

const INSURANCE_LEVELS = [
  {
    id: "comprehensive",
    title: "Comprehensive",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor"/>
      </svg>
    ),
    description: "The full package. Covers: accidental damage, damage caused by fire or theft, loss of your car from theft, accidents caused by you, injuries to other people, and property damage"
  },
  {
    id: "tpft",
    title: "Third Party Fire and Theft",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.0002 20.0002C13.4972 20.0002 14.8542 19.6502 16.0702 18.9472C17.2742 18.2692 18.2693 17.2742 18.9472 16.0702C19.6502 14.8422 20.0002 13.4852 20.0002 12.0002C20.0002 10.5032 19.6502 9.14615 18.9472 7.93016C18.276 6.72108 17.2793 5.72437 16.0702 5.05316C14.8542 4.35016 13.4972 4.00016 12.0002 4.00016C10.5152 4.00016 9.15818 4.35016 7.93018 5.05316C6.7261 5.73098 5.731 6.72608 5.05318 7.93016C4.35018 9.14615 4.00018 10.5032 4.00018 12.0002C4.00018 13.4852 4.35018 14.8422 5.05318 16.0702C5.73767 17.2692 6.73117 18.2627 7.93018 18.9472C9.15818 19.6502 10.5152 20.0002 12.0002 20.0002ZM12.0002 22.0002C10.2386 22.0109 8.50617 21.5507 6.98218 20.6672C5.47046 19.7868 4.21313 18.5291 3.33318 17.0172C2.44978 15.4935 1.98958 13.7614 2.00018 12.0002C2.00018 10.1872 2.44418 8.51516 3.33318 6.98216C4.21097 5.47314 5.4696 4.22106 6.98318 3.35116C8.50323 2.45699 10.2367 1.9902 12.0002 2.00016C13.8132 2.00016 15.4852 2.45016 17.0182 3.35016C18.5319 4.22146 19.7852 5.48164 20.6482 7.00016C21.5502 8.53216 22.0002 10.1992 22.0002 12.0002C22.0002 13.8012 21.5502 15.4742 20.6502 17.0172C19.7766 18.5343 18.5174 19.7936 17.0002 20.6672C15.4832 21.5519 13.7562 22.0123 12.0002 22.0002Z" fill="currentColor"/>
      </svg>
    ),
    description: "Covers damage caused to your car by fire or theft, loss of your car from theft, accidents caused by you, and injuries to other people and property."
  }
];

const AnnualCoverDetailsForm = ({ form }) => {
  const selectedLevel = form.watch("coverDetails.level");
  const startDate = form.watch("coverDetails.startDate");

  const handleLevelChange = (levelId) => {
    form.setValue("coverDetails.level", levelId, { shouldValidate: true });
  };

  const handleDateChange = (e) => {
    form.setValue("coverDetails.startDate", e.target.value, { shouldValidate: true });
  };

  return (
    <ComponentWrapper title="Cover Details">
      <div className={styles.coverContainer}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              What's the minimum level of cover you're looking for?
            </h2>
            <p className={styles.sectionSubtitle}>
              Comprehensive cover can cost less than third party or third party fire and theft
            </p>
          </div>

          <div className={styles.levelsGrid}>
            {INSURANCE_LEVELS.map((level) => (
              <button
                key={level.id}
                type="button"
                onClick={() => handleLevelChange(level.id)}
                className={`${styles.levelCard} ${
                  selectedLevel === level.id ? styles.levelCardActive : styles.levelCardInactive
                }`}
              >
                <div className={styles.levelIconWrapper}>
                  <div className={`${styles.levelIcon} ${
                    selectedLevel === level.id ? styles.levelIconActive : styles.levelIconInactive
                  }`}>
                    {level.icon}
                  </div>
                </div>
                <div className={styles.levelContent}>
                  <h3 className={styles.levelTitle}>{level.title}</h3>
                  <p className={styles.levelDescription}>{level.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              When would you like your cover to start?
            </h2>
            <p className={styles.sectionSubtitle}>
              Select your preferred cover start date
            </p>
          </div>

          <div className={styles.dateSection}>
            <FormDateInput
              type="date"
              dateLabel="Start Date"
              value={startDate || ""}
              onChange={handleDateChange}
              error={form.formState.errors.coverDetails?.startDate}
              minDate={new Date()}
              reducedPadding={true}
            />
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default AnnualCoverDetailsForm;
