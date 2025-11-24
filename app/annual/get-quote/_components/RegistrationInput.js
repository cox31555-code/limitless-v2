import React from 'react';
import styles from './step1VehicleRegistration.module.css';

const RegistrationInput = ({
  value,
  onChange,
  onKeyPress,
  onButtonClick,
  disabled,
  isLoading,
  error,
  label
}) => {
  return (
    <div className={styles.rsuiteFormGroup}>
      <label className={styles.label}>{label || 'Registration Number'}</label>
      <div className={styles.regInputGroupContainer}>
        <input
          type="text"
          className={`${styles.regCustomInput} ${error ? styles.regCustomInputError : ''}`}
          placeholder="Enter car registration..."
          value={value || ""}
          onChange={onChange}
          onKeyPress={onKeyPress}
          disabled={disabled}
          maxLength={8}
        />
        <button
          className={styles.findButton}
          onClick={onButtonClick}
          disabled={disabled || !value?.trim()}
        >
          {isLoading ? 'Searching...' : 'Find my car'}
        </button>
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default RegistrationInput;
