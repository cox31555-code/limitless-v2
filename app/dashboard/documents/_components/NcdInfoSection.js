"use client";

import Image from "next/image";
import styles from "./ncdInfoSection.module.css";

export default function NcdInfoSection() {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <Image
          src="/svg/document-text.svg"
          alt="document"
          width={32}
          height={32}
        />
        <h3 className={styles.title}>How to find proof of your no claims discount (NCD)</h3>
      </div>

      <ul className={styles.list}>
        <li className={styles.listItem}>
          <strong>Still insured by us?</strong> Your NCD will either be in your latest welcome pack or renewal quote. If you've made a claim since receiving those documents, please contact us for your most up-to-date NCD.
        </li>
        <li className={styles.listItem}>
          <strong>No longer insured by us?</strong> Your NCD will be in either of the documents called 'Your policy has been cancelled' or 'Your insurance ends today'.
        </li>
      </ul>
    </div>
  );
}
