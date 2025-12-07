"use client";

import React from 'react';
import styles from './dashboardInput.module.css';

const DashboardInput = ({
  label,
  placeholder,
  value,
  onChange,
  disabled,
  maxLength,
  error,
  type = 'text'
}) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        className={`${styles.input} ${error ? styles.inputError : ''} ${disabled ? styles.inputDisabled : ''}`}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        disabled={disabled}
        maxLength={maxLength}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default DashboardInput;
