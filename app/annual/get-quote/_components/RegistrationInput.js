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
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.regInputGroupContainer}>
        <input
          type="text"
          className={`${styles.regCustomInput} ${error ? styles.regCustomInputError : ''}`}
          placeholder="Enter car registration..."
          value={value || ""}
          onChange={onChange}
          onKeyPress={onKeyPress}
          disabled={disabled || isLoading}
          maxLength={8}
        />
        <button
          className={`${styles.findButton} ${(disabled || !value?.trim()) ? styles.findButtonDisabled : ''}`}
          onClick={onButtonClick}
          disabled={disabled || !value?.trim() || isLoading}
          type="button"
        >
          {isLoading ? (
            <>
              <span className={styles.spinner}></span>
              Searching...
            </>
          ) : (
            'Find my car'
          )}
        </button>
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default RegistrationInput;
