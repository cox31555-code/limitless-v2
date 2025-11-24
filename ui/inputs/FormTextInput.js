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
  value,
  onChange,
  disabled = false,
  inputStyle = {},
  ...rest
}) => {
  const handleRegistrationChange = (e) => {
    let val = e.target.value.toUpperCase().replace(/\s/g, '');

    if (val.length > 7) {
      val = val.slice(0, 7);
    }

    if (val.length > 4) {
      val = val.slice(0, 4) + ' ' + val.slice(4);
    }

    const newEvent = {
      ...e,
      target: {
        ...e.target,
        value: val
      }
    };

    if (onChange) {
      onChange(newEvent);
    }
  };

  return (
    <div className={styles.formInputGroup}>
      {label && <label className={styles.formInputLabel}>{label}</label>}
      <div className={styles.formInputWrapper}>
        <input
          type={type}
          placeholder={placeholder}
          className={`${styles.formInput} ${error ? styles.formInputError : ""} ${disabled ? styles.formInputDisabled : ""}`}
          value={value || ''}
          onChange={reg ? handleRegistrationChange : onChange}
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
