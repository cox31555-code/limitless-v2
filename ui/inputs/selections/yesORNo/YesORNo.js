import React from "react";
import styles from "./yesORNo.module.css";
const YesORNo = ({ value, onChange }) => {
  return (
    <div className={styles.container}>
      <p
        className={`${styles.button} ${value === true ? styles.active : ""}`}
        onClick={() => onChange(true)}
      >
        Yes
      </p>
      <p
        className={`${styles.button} ${value === false ? styles.active : ""}`}
        onClick={() => onChange(false)}
      >
        No
      </p>
    </div>
  );
};

export default YesORNo;
