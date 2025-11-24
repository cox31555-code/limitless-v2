import React, { forwardRef } from "react";
import Dropdown from "./dropdown/Dropdown";

const FormDropdown = forwardRef(
  ({ label, options = [], placeholder, error, disabled, onChange, value, ...rest }, ref) => {
    
    const handleChange = (selectedValue) => {
      if (onChange) {
        // Create a synthetic event to match the expected onChange signature
        const syntheticEvent = {
          target: {
            value: selectedValue,
            name: rest.name
          }
        };
        onChange(syntheticEvent);
      }
    };

    return (
      <Dropdown
        label={label}
        selected={value}
        options={options}
        setSelected={handleChange}
        placeholder={placeholder}
        error={error}
        disabled={disabled}
      />
    );
  }
);

FormDropdown.displayName = "FormDropdown";

export default FormDropdown;
