import React, { forwardRef } from "react";
import Image from "next/image";
import styles from "./dropdown/dropdown.module.css";

const FormDropdown = forwardRef(
  ({ label, options, placeholder, error, disabled, inputStyle = {}, ...rest }, ref) => {
    return (
      <div className={styles.container}>
        {label && <p className={styles.label}>{label}</p>}
        <div className={`${styles.selectWrapper} ${error ? styles.error : ""} ${disabled ? styles.disabled : ""}`}>
          <select
            ref={ref}
            className={`${styles.select} ${error ? styles.error : ""}`}
            disabled={disabled}
            style={inputStyle}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className={styles.arrowContainer}>
            <Image
              src="/svg/arrow-down.svg"
              alt="arrow-down"
              width={24}
              height={24}
              className={styles.arrowDown}
            />
          </div>
        </div>
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);

FormDropdown.displayName = "FormDropdown";

export default FormDropdown;
