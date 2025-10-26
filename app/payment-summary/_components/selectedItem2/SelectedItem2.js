import React from "react";
import styles from "./selectedItem2.module.css";
import { FaCheck } from "react-icons/fa6";

const SelectedItem2 = ({ option }) => {
  return (
    <div className={styles.container}>
      <div className={styles.option}>
        <div className={styles.checkIcon}>
          <FaCheck className={styles.icon} />
        </div>

        <div className={styles.optionContent}>
          <h4 className={styles.title}>{option.title}</h4>
          <p className={styles.description}>{option.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SelectedItem2;
