import Image from "next/image";
import React from "react";
import styles from "./coverStart.module.css";

const CoverStart = ({ startDate, startTime, endDate, endTime }) => {
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return dateString;
    }
  };

  const formattedStartDate = formatDate(startDate);
  const formattedStartTime = startTime || "00:00";
  const formattedEndDate = formatDate(endDate);
  const formattedEndTime = endTime || "00:00";

  return (
    <div className={styles.container}>
      <div className={`${styles.first} ${plusJakartaSans.className}`}>
        <Image
          className={styles.icon}
          src="/svg/cover-start.svg"
          alt="cover-start"
          width={68}
          height={94}
        />
        <p>
          Cover start <span>date & time</span>
        </p>
      </div>
      <div className={styles.second}>
        <div className={styles.start}>
          <Image
            className={styles.startIcon}
            src="/svg/start.svg"
            alt="start"
            width={28}
            height={38}
          />
          <div className={styles.text}>
            <p className={styles.title}>Start</p>
            <p className={styles.date}>{formattedStartDate}</p>
            <p className={styles.time}>{formattedStartTime}</p>
          </div>
        </div>
        <div className={styles.center}>
          <Image
            src="/svg/blue-head.svg"
            alt="blue-head"
            width={43}
            height={43}
            className={styles.blue}
          />
        </div>
        <div className={styles.start}>
          <Image
            className={styles.startIcon}
            src="/svg/end.svg"
            alt="end"
            width={29}
            height={32}
          />
          <div className={styles.text}>
            <p className={styles.title}>End</p>
            <p className={styles.date}>{formattedEndDate}</p>
            <p className={styles.time}>{formattedEndTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverStart;
