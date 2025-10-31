import React from "react";
import styles from "./coverDetails.module.css";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import InputWithData2 from "@/ui/inputs/InputWithData2/InputWithData2";

const CoverDetails = ({ data }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <ComponentWrapper title="Cover Details" icon={{ width: 62, height: 62 }} isPaymentPage={true}>
      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>How long will you need it?</h3>
          <div className={styles.sectionContent}>
            <InputWithData2
              item={{
                label: "Duration",
                value: data?.impoundType === "Impound Insurance"
                  ? "30 Days"
                  : (data?.period || 0) + " " + (data?.type || "Days"),
              }}
            />
          </div>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>When would you like the cover to start?</h3>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              <InputWithData2
                item={{
                  label: "Date",
                  value: formatDate(data?.startDate) || "N/A",
                }}
              />
              <InputWithData2
                item={{
                  label: "Start Time",
                  value: data?.startTime || "N/A",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default CoverDetails;
