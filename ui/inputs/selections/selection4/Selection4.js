import React, { useState, useEffect } from "react";
import styles from "./selection.module.css";

const Selection3 = ({ options, selectedItem, setSelectedItem }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNativeChange = (e) => {
    setSelectedItem(e.target.value);
  };

  if (isMobile) {
    return (
      <select
        className={styles.nativeSelect}
        value={selectedItem || ""}
        onChange={handleNativeChange}
        style={{ colorScheme: 'dark' }}
      >
        <option value="" disabled>
          Select an option...
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div className={styles.container}>
      {options.map((option, index) => (
        <div
          key={index}
          className={styles.option}
          onClick={() => setSelectedItem(option)}
        >
          <span
            className={`${styles.selectionSpan} ${
              selectedItem === option ? styles.selectedSpan : ""
            }`}
          ></span>

          <h4 className={styles.title}>{option}</h4>
        </div>
      ))}
    </div>
  );
};

export default Selection3;
