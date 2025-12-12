"use client";

import React from 'react';
import styles from './dashboardInput.module.css';

const DashboardInput = ({
  placeholder,
  value,
  onChange,
  disabled,
  maxLength,
  error,
  type = 'text'
}) => {
  return (
    <input
      type={type}
      className={`${styles.input} ${error ? styles.inputError : ''} ${disabled ? styles.inputDisabled : ''}`}
      placeholder={placeholder}
      value={value || ''}
      onChange={onChange}
      disabled={disabled}
      maxLength={maxLength}
    />
  );
};

export default DashboardInput;
