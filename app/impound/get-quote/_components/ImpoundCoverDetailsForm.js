"use client";
import React, { useState, useEffect } from "react";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import FormDataAndTime from "@/ui/inputs/FormDataAndTime";
import Title from "@/ui/insurance-quotes/title/Title";
import Selection4 from "@/ui/inputs/selections/selection4/Selection4";
import Image from "next/image";
import styles from "@/app/temporary/get-quote/_components/components.module.css";

const impoundTypeOptions = [
  "Impound Insurance",
  "Under 21 Impound Insurance",
  "Impounded Van Insurance",
  "Banned driver impound insurance",
  "Provisional Impound Insurance",
  "Named Driver Impound Insurance",
];

const ImpoundCoverDetailsForm = ({ form }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const [startPolicyImmediately, setStartPolicyImmediately] = useState(false);

  const selectedImpoundType = watch("coverDetails.impoundType");
  const startDate = watch("coverDetails.startDate");
  const startTime = watch("coverDetails.startTime");
  const coverType = watch("coverDetails.type");
  const coverPeriod = watch("coverDetails.period");

  // Auto-select 30 Days on mount
  useEffect(() => {
    if (!coverType || coverType !== "Days" || coverPeriod !== 30) {
      setValue("coverDetails.type", "Days");
      setValue("coverDetails.period", 30);
    }
  }, []);

  const handleImpoundTypeSelect = (type) => {
    setValue("coverDetails.impoundType", type, { shouldValidate: true });
  };

  const handleStartImmediately = () => {
    if (!startPolicyImmediately) {
      // Set to current date and time
      const now = new Date();
      const currentDate = now.toISOString().split("T")[0];
      const currentTime = now.toTimeString().slice(0, 5);

      setValue("coverDetails.startDate", currentDate, { shouldValidate: true });
      setValue("coverDetails.startTime", currentTime, { shouldValidate: true });
    }
    setStartPolicyImmediately(!startPolicyImmediately);
  };

  return (
    <ComponentWrapper title="Cover Details">
      <div className={styles.formContent}>
        <div className={styles.formSection}>
          <div className={styles.inputGroup}>
            <Title title="How Long Will You Need It?" />
            <p style={{ color: "#5a6b7d", fontSize: "1.4rem", margin: "0 0 1.6rem 0" }}>
              Select your preferred coverage duration
            </p>
            <div
              style={{
                display: "flex",
                gap: "1.2rem",
                marginBottom: "2.4rem",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                style={{
                  padding: "1.2rem 2.4rem",
                  borderRadius: "8px",
                  border: "2px solid #0388ff",
                  background: "#0388ff",
                  color: "#fff",
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  cursor: "not-allowed",
                  opacity: 1,
                }}
                disabled
              >
                30 Days
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <Title title="When would you like the cover to start?" />

            {!startPolicyImmediately && (
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <FormDataAndTime
                    type="date"
                    dateLabel="Start Date"
                    name="coverDetails.startDate"
                    value={startDate}
                    onChange={(e) =>
                      setValue("coverDetails.startDate", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                    error={errors.coverDetails?.startDate}
                    forceShowAbove={true}
                  />
                </div>
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <FormDataAndTime
                    type="time"
                    timeLabel="Start Time"
                    name="coverDetails.startTime"
                    value={startTime}
                    onChange={(e) =>
                      setValue("coverDetails.startTime", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                    error={errors.coverDetails?.startTime}
                    forceShowAbove={true}
                  />
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleStartImmediately}
              className={styles.startButton}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                padding: "1rem 1.4rem",
                background: "transparent",
                color: "#5a6b7d",
                border: "1.5px solid rgba(3, 136, 255, 0.2)",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "1.2rem",
                fontWeight: "500",
                marginTop: "1.6rem",
                transition: "all 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(3, 136, 255, 0.4)";
                e.currentTarget.style.color = "#000822";
                e.currentTarget.style.backgroundColor = "rgba(3, 136, 255, 0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(3, 136, 255, 0.2)";
                e.currentTarget.style.color = "#5a6b7d";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <Image
                src="/svg/check.svg"
                alt="check"
                width={16}
                height={16}
                style={{
                  opacity: startPolicyImmediately ? 1 : 0.5,
                  filter: "brightness(0.6)",
                }}
              />
              Start policy immediately
            </button>
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.inputGroup}>
            <Title title="Which type of impound insurance?" />
            <div className={styles.selectionContainer}>
              <p className={styles.label}>Please select</p>
              <Selection4
                options={impoundTypeOptions}
                selectedItem={selectedImpoundType}
                setSelectedItem={handleImpoundTypeSelect}
              />
              {errors.coverDetails?.impoundType && (
                <span className={styles.errorMessage}>
                  {errors.coverDetails.impoundType.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default ImpoundCoverDetailsForm;
