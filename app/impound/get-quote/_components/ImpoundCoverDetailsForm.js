"use client";
import React, { useState } from "react";
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
      <div className={styles.content}>
        <div className={styles.inputWrapper}>
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
                gap: "8px",
                padding: "12px 16px",
                background: startPolicyImmediately ? "#0388ff" : "transparent",
                color: startPolicyImmediately ? "#fff" : "#000822",
                border: "1px solid #0388ff",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                marginTop: "16px",
              }}
            >
              <Image
                src="/svg/check.svg"
                alt="check"
                width={16}
                height={16}
                style={{
                  filter: startPolicyImmediately
                    ? "brightness(0) invert(1)"
                    : "none",
                }}
              />
              Start policy immediately
            </button>
          </div>
        </div>

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
    </ComponentWrapper>
  );
};

export default ImpoundCoverDetailsForm;
