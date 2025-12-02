import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./selection.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "600"],
});

const Selection2 = ({
  items,
  selectedItem,
  setSelectedItem,
  title,
  description,
  img,
}) => {
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
    <div className={styles.container} ref={containerRef}>
      <div className={styles.header}>
        <div className={styles.imgContainer}>
          <Image src={img} alt={title} width={80} height={106} className={styles.img} />
        </div>
        <div className={styles.headerContent}>
          <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
            {title}
          </h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      
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
      
      <div className={styles.selectionContainer}>
        {items.map((item, index) => (
          <div
            className={`${styles.selectionItem} ${
              selectedItem === item ? styles.selectedItem : ""
            }`}
            key={index}
            onClick={() => handleItemClick(item)}
          >
            <span
              className={`${styles.selectionSpan} ${
                selectedItem === item ? styles.selectedSpan : ""
              }`}
            ></span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Selection2;
