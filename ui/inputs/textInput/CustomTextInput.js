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
  type = 'text',
  prefix,
  suffix
}) => {
  return (
    <div className={styles.customInputGroup}>
      {label && <label className={styles.customInputLabel}>{label}</label>}
      <div className={styles.customInputWrapper}>
        {prefix && <span className={styles.customInputPrefix}>{prefix}</span>}
        <input
          type={type}
          className={`${styles.customInput} ${error ? styles.customInputError : ''} ${disabled ? styles.customInputDisabled : ''} ${prefix ? styles.customInputWithPrefix : ''} ${suffix ? styles.customInputWithSuffix : ''}`}
          placeholder={placeholder}
          value={value || ''}
          onChange={onChange}
          onKeyPress={onKeyPress}
          disabled={disabled}
          maxLength={maxLength}
        />
        {suffix && <span className={styles.customInputSuffix}>{suffix}</span>}
      </div>
      {error && <span className={styles.customInputErrorMsg}>{error}</span>}
    </div>
  );
};

export default CustomTextInput;
