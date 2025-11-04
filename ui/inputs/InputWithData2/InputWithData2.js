import React from "react";
import Image from "next/image";
import styles from "./inputWithData2.module.css";

const InputWithData2 = ({ item, button }) => {
  return (
    <div className={styles.item}>
      <p className={styles.label}>{item.label}</p>
      <div className={styles.wrapper}>
        <div
          className={styles.value}
        >
          {item.value}
        </div>
        {button && button}
      </div>
    </div>
  );
};

export default InputWithData2;
