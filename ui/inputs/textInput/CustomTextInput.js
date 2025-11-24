import React from 'react';
import styles from './textInput.module.css';

const CustomTextInput = ({
  label,
  placeholder,
  value,
  onChange,
  onKeyPress,
  disabled,
  maxLength,
  error,
  type = 'text'
}) => {
  return (
    <div className={styles.customInputGroup}>
      {label && <label className={styles.customInputLabel}>{label}</label>}
      <input
        type={type}
        className={`${styles.customInput} ${error ? styles.customInputError : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        disabled={disabled}
        maxLength={maxLength}
      />
      {error && <span className={styles.customInputErrorMsg}>{error}</span>}
    </div>
  );
};

export default CustomTextInput;
