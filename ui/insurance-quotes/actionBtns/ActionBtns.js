import React from "react";
import Image from "next/image";
import Button from "@/ui/buttons/Button/Button";
import styles from "./actionBtns.module.css";

const ActionBtns = ({
  onBack,
  onNext,
  nextLabel = "Next",
  isSubmitting = false,
  nextType = "button",
}) => {
  const arrowIcon = (
    <Image
      src="/svg/arrow-right.svg"
      alt="arrow-right"
      width={28}
      height={14}
    />
  );

  return (
    <div className={styles.actions}>
      <Button
        variant="secondary"
        type="button"
        onClick={onBack}
        className={styles.back}
      >
        Back
      </Button>
      <Button
        variant="primary"
        type={nextType}
        onClick={nextType === "button" && onNext ? onNext : undefined}
        disabled={isSubmitting}
        isLoading={isSubmitting}
        loadingText="Submitting..."
        icon={arrowIcon}
        iconPosition="right"
        className={styles.next}
      >
        {nextLabel}
      </Button>
    </div>
  );
};

export default ActionBtns;
