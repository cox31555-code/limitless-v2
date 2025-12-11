"use client";
import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import styles from "./coverDetails.module.css";
import Selection1 from "@/ui/inputs/selections/selection1/Selection1";
import Title from "../title/Title";
import ComponentWrapper from "../componentWrapper/ComponentWrapper";
import Selection4 from "@/ui/inputs/selections/selection4/Selection4";
import Image from "next/image";
import InputWithData2 from "@/ui/inputs/InputWithData2/InputWithData2";

const DataAndTime = dynamic(() => import("@/ui/inputs/selections/dataAndTime/DataAndTime"), {
  loading: () => <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading date picker...</div>,
  ssr: false,
});
const ImpoundCoverDetails = () => {
  const [data, setData] = useState({
    type: "days",
    period: 1,
    startDate: "2025-01-01",
    startTime: "10:00",
  });
  const [startPolicyImmediately, setStartPolicyImmediately] = useState(false);

  return (
    <ComponentWrapper title="Cover Details">
      <div className={styles.content}>
        <div className={styles.inputWrapper}>
          <div className={styles.inputGroup}>
            <Title title="When would you like the cover to start?" />
            {startPolicyImmediately ? (
              <div className={styles.row}>
                <InputWithData2
                  item={{
                    label: "Start Date",
                    type: "date",
                    value: "2025-01-01",
                  }}
                />
                <InputWithData2
                  item={{
                    label: "Start Time",
                    type: "time",
                    value: "10:00",
                  }}
                />
              </div>
            ) : (
              <DataAndTime
                data={data}
                setData={setData}
                // type="date"
                dateKey="startDate"
                dateLabel="Start Date"
                timeLabel="Start Time"
                timeKey="startTime"
              />
            )}
            <button
              onClick={() => setStartPolicyImmediately(!startPolicyImmediately)}
              className={styles.startButton}
            >
              <Image
                src="/svg/check.svg"
                alt="calendar"
                width={16}
                height={16}
              />{" "}
              Start policy immediately
            </button>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <Title title="Which type of impound insurance?" />
          <div className={styles.selectionContainer}>
            <p className={styles.label}>Please select</p>
            <Selection4
              options={[
                "Impound Insurance ",
                "Under 21 Impound Insurance ",
                "Impounded Van Insurance ",
                "Banned driver impound insurance",
                "Provisional Impound Insurance ",
                "Named Driver Impound Insurance ",
              ]}
              selectedItem={data.type}
              setSelectedItem={(item) => setData({ ...data, type: item })}
            />
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default ImpoundCoverDetails;
