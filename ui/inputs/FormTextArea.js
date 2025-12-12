import React from "react";
import styles from "./textInput/textInput.module.css";

const FormTextArea = ({ label, placeholder, rows = 5, error, ...props }) => {
  return (
    <div className={styles.formInputGroup}>
      {label && <label className={styles.formInputLabel}>{label}</label>}
      <textarea
        placeholder={placeholder}
        className={`${styles.formInput} ${error ? styles.formInputError : ""}`}
        rows={rows}
        style={{
          minHeight: `${rows * 2.8}rem`,
          resize: 'vertical',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}
        {...props}
      />
      {error && (
        <span className={styles.formInputErrorMsg}>
          {error.message || error}
        </span>
      )}
    </div>
  );
};

export default FormTextArea;
