import Image from "next/image";
import React from "react";
import Button from "@/ui/buttons/Button/Button";
import styles from "./confirmBtn.module.css";

const ConfirmBtn = ({
  title,
  onClick,
  style,
  type = "submit",
  disabled = false,
  hideArrow = false,
  variant = "primary",
  ...props
}) => {
  const icon = !hideArrow ? (
    <Image
      src="/svg/arrow-right.svg"
      alt="arrow-right"
      width={28}
      height={14}
      className={styles.arrowRight}
    />
  ) : null;

  return (
    <Button
      variant={variant}
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={style}
      icon={icon}
      iconPosition="right"
      className={styles.confirmBtn}
      {...props}
    >
      {title}
    </Button>
  );
};

export default ConfirmBtn;
