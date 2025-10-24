import React from "react";
import TextInput from "./textInput/TextInput";
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
  ...props
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
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      <div className={styles.wrapper}>
        <div className={`${styles.inputContainer} ${error ? styles.error : ""}`}>
          {reg && (
            <span className={styles.inputSpan}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F058fdd9048ee40f580ca41b569bee55c%2Fc3966e857ea74e3ba58cc72094f4df38?format=webp&width=800"
                alt="UK Flag"
                className={styles.ukFlag}
              />
              <span className={styles.gbText}>GB</span>
            </span>
          )}
          <input
            type={type}
            placeholder={placeholder}
            className={`${styles.input} ${error ? styles.error : ""} ${reg ? styles.reg : ""}`}
            value={value}
            onChange={reg ? handleRegistrationChange : onChange}
            {...props}
          />
        </div>
        {button && button}
      </div>
      {error && (
        <span
          className={styles.errorMessage}
          style={{
            color: "#dc3545",
            fontSize: "0.875rem",
            marginTop: "0.25rem",
          }}
        >
          {error.message}
        </span>
      )}
    </div>
  );
};

export default FormTextInput;
