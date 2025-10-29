import React from "react";
import styles from "./selection.module.css";
const Selection3 = ({ options, selectedItem, setSelectedItem }) => {
  return (
    <div className={styles.container}>
      {options.map((option, index) => (
        <div
          key={index}
          className={`${styles.option} ${
            selectedItem === option.title ? styles.selected : ""
          }`}
          onClick={() => setSelectedItem(option.title)}
        >
          <span
            className={`${styles.selectionSpan} ${
              selectedItem === option.title ? styles.selectedSpan : ""
            }`}
          ></span>

          <div className={styles.optionContent}>
            <h4 className={styles.title}>{option.title}</h4>
            <p className={styles.description}>{option.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Selection3;
