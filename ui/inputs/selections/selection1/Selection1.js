import React, { useState, useEffect, useRef } from "react";
import styles from "./selection.module.css";

const Selection1 = ({ items, selectedItem, setSelectedItem, type, style , noDotMobile}) => {
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

  const handleItemClick = (item) => {
    if (isMobile) {
      // On mobile, trigger the hidden native select
      const nativeSelect = containerRef.current?.querySelector('select');
      if (nativeSelect) {
        nativeSelect.focus();
        nativeSelect.click();
      }
    } else {
      setSelectedItem(item);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.selectionContainer} ${
        style === "dark" ? styles.dark : ""
      }`}
    >
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
          {items.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      )}
      
      {items.map((item, index) => (
        <div
          style={{
            boxShadow: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
            ].includes(item)
              ? "none"
              : "",
          }}
          className={`${styles.selectionItem} ${
            style === "dark" && selectedItem === item
              ? styles.darkSelectedItem
              : selectedItem === item
              ? styles.selectedItem
              : ""
          } ${style === "dark" ? styles.darkItem : ""}`}
          key={index}
          onClick={() => handleItemClick(item)}
        >
          {type === "checkbox" ? (
            <span
              className={`${styles.selectionSpan} ${
                selectedItem === item ? styles.selectedSpan : ""
              } ${style === "dark" ? styles.darkSpan : ""} ${noDotMobile ? styles.noDotMobile : ""}`}
            ></span>
          ) : (
            ""
          )}
          {item}
        </div>
      ))}
    </div>
  );
};

export default Selection1;
