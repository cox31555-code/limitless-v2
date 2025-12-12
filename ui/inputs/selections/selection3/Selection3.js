import React, { useState, useEffect, useRef } from "react";
import styles from "./selection.module.css";

const Selection3 = ({ options, selectedItem, setSelectedItem }) => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

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

  const handleOptionClick = (option) => {
    if (isMobile) {
      // On mobile, trigger the hidden native select
      const nativeSelect = containerRef.current?.querySelector('select');
      if (nativeSelect) {
        nativeSelect.focus();
        nativeSelect.click();
      }
    } else {
      setSelectedItem(option.title);
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Hidden native select for mobile */}
      {isMobile && (
        <select
          className={styles.hiddenNativeSelect}
          value={selectedItem || ""}
          onChange={handleNativeChange}
          style={{ colorScheme: 'dark' }}
        >
          <option value="" disabled>
            Select an option...
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.title}>
              {option.title}
            </option>
          ))}
        </select>
      )}
      
      {options.map((option, index) => (
        <div
          key={index}
          className={`${styles.option} ${
            selectedItem === option.title ? styles.selected : ""
          }`}
          onClick={() => handleOptionClick(option)}
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
