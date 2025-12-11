"use client";

import React from "react";
import styles from "./button.module.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon = null,
  iconPosition = "right",
  disabled = false,
  isLoading = false,
  loadingText = "Loading...",
  className = "",
  type = "button",
  ...props
}) => {
  const baseClass = styles.button;
  const variantClass = styles[variant] || "";
  const sizeClass = styles[size] || "";
  const loadingClass = isLoading ? styles.loading : "";

  const buttonClasses = `${baseClass} ${variantClass} ${sizeClass} ${loadingClass} ${className}`.trim();

  const content = (
    <>
      {icon && iconPosition === "left" && <span className={styles.iconLeft}>{icon}</span>}
      <span className={styles.content}>{isLoading ? loadingText : children}</span>
      {icon && iconPosition === "right" && <span className={styles.iconRight}>{icon}</span>}
    </>
  );

  return (
    <button
      className={buttonClasses}
      type={type}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
