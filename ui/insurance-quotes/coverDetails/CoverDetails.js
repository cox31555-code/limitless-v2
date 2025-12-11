"use client";
import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import styles from "./coverDetails.module.css";
import Selection1 from "@/ui/inputs/selections/selection1/Selection1";
import FormDropdown from "@/ui/inputs/FormDropdown";
import Title from "../title/Title";
import ComponentWrapper from "../componentWrapper/ComponentWrapper";

const DataAndTime = dynamic(() => import("@/ui/inputs/selections/dataAndTime/DataAndTime"), {
  loading: () => <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading date picker...</div>,
  ssr: false,
});
const CoverDetails = () => {
  const [data, setData] = useState({
    type: "days",
    period: 1,
    startDate: "2025-01-01",
    startTime: "10:00",
  });
  return (
    <ComponentWrapper title="Cover Details">
      <div className={styles.content}>
        <div className={styles.inputGroup}>
          <Title title="How long will you need it?" />
          <div className={styles.selectionContainer}>
            <p className={styles.label}>Please select</p>
            <div className={styles.selectionOptions}>
              <Selection1
                noDotMobile
                items={["Days", "Weeks", "Months"]}
                selectedItem={data.type}
                setSelectedItem={(item) => setData({ ...data, type: item })}
                type="checkbox"
              />
              <div className={styles.durationWrapper}>
                <Selection1
                  noDotMobile
                  items={["1", "2", "3", "4", "5", "6", "7"]}
                  selectedItem={data.value}
                  setSelectedItem={(item) => setData({ ...data, value: item })}
                  // type="radio"
                />
                <div className={styles.dropdownOption}>
                  <FormDropdown
                    options={
                      data.type === "Days"
                        ? Array.from({ length: 28 }, (_, i) => (i + 8).toString())
                        : data.type === "Weeks"
                        ? Array.from({ length: 45 }, (_, i) => (i + 8).toString())
                        : Array.from({ length: 5 }, (_, i) => (i + 8).toString())
                    }
                    placeholder="More"
                    value={data.value}
                    onChange={(e) => setData({ ...data, value: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <Title title="When would you like the cover to start?" />
          <DataAndTime
            data={data}
            setData={setData}
            // type="date"
            dateKey="startDate"
            dateLabel="Start Date"
            timeLabel="Start Time"
            timeKey="startTime"
          />
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default CoverDetails;
