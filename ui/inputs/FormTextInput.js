"use client";

import React from "react";
import styles from "./textInput/textInput.module.css";

const FormTextInput = ({
  label,
  placeholder,
  type = "text",
  reg,
  button,
  error,
  disabled = false,
  inputStyle = {},
  ...rest
}) => {
  return (
    <div className={styles.formInputGroup}>
      {label && <label className={styles.formInputLabel}>{label}</label>}
      <div className={styles.formInputWrapper}>
        <input
          type={type}
          placeholder={placeholder}
          className={`${styles.formInput} ${error ? styles.formInputError : ""} ${disabled ? styles.formInputDisabled : ""}`}
          disabled={disabled}
          style={inputStyle}
          {...rest}
        />
        {button && button}
      </div>
      {error && (
        <span className={styles.formInputErrorMsg}>
          {error.message || error}
        </span>
      )}
    </div>
  );
};

export default FormTextInput;
