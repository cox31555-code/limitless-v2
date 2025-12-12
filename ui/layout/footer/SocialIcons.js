"use client";

import React from "react";
import { BiLogoTwitter, BiLogoFacebook } from "react-icons/bi";
import styles from "./footer.module.css";

const SocialIcons = ({ shouldApplySpecialStyles }) => {
  return (
    <div className={styles.socialsItems}>
      <div
        className={`${styles.socialsItem} ${
          shouldApplySpecialStyles ? styles["socials-item-black"] : ""
        }`}
      >
        <BiLogoTwitter
          className={`${styles.socialsIcon} ${
            shouldApplySpecialStyles ? styles["socials-icon-black"] : ""
          }`}
          size={18}
        />
      </div>
      <div
        className={`${styles.socialsItem} ${
          shouldApplySpecialStyles ? styles["socials-item-black"] : ""
        }`}
      >
        <BiLogoFacebook
          className={`${styles.socialsIcon} ${
            shouldApplySpecialStyles ? styles["socials-icon-black"] : ""
          }`}
          size={18}
        />
      </div>
    </div>
  );
};

export default SocialIcons;
