"use client";

import LoadingOverlay from "@/ui/loadingSpinner/LoadingOverlay";
import styles from "./page.module.css";

export default function LoadPage() {
  return (
    <div className={styles.container}>
      <LoadingOverlay isVisible={true} text="Loading" />
    </div>
  );
}
