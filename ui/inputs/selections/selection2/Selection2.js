import React, { useState, useEffect } from "react";
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
      <div className={styles.container}>
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
        <select
          className={styles.nativeSelect}
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
      </div>
    );
  }

  return (
    <div className={styles.container}>
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
      <div className={styles.selectionContainer}>
        {items.map((item, index) => (
          <div
            className={`${styles.selectionItem} ${
              selectedItem === item ? styles.selectedItem : ""
            }`}
            key={index}
            onClick={() => setSelectedItem(item)}
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
