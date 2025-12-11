"use client";

import React from "react";
import Link from "next/link";
import Button from "@/ui/buttons/Button/Button";
import styles from "./dashboardActions.module.css";

const DashboardActions = ({
  backHref,
  onCancel,
  cancelText = "Cancel",
  backText = "Back",
  confirmMessage = "Are you sure you want to cancel? This action cannot be undone.",
}) => {
  const handleCancel = () => {
    if (window.confirm(confirmMessage)) {
      onCancel?.();
    }
  };

  return (
    <div className={styles.actions}>
      <Link href={backHref} className={styles.backLink}>
        <Button variant="ghost" className={styles.backButton}>
          {backText}
        </Button>
      </Link>
      <Button
        variant="danger"
        onClick={handleCancel}
        className={styles.cancelButton}
      >
        {cancelText}
      </Button>
    </div>
  );
};

export default DashboardActions;
