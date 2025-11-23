"use client";

import Image from "next/image";
import styles from "./receiveDocumentsSection.module.css";

export default function ReceiveDocumentsSection() {
  const handleRequestDocuments = () => {
    // TODO: Implement request documents functionality
    alert("Request documents by post functionality coming soon!");
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <Image
          src="/svg/message.svg"
          alt="envelope"
          width={40}
          height={40}
        />
        <h3 className={styles.title}>Receive my policy documents by post</h3>
      </div>

      <p className={styles.description}>
        We've gone paperless; we care about the environment and it's better for
        everyone! But if you wish, you can request below to have your documents
        posted to you to the address listed on your policy.
      </p>

      <button
        onClick={handleRequestDocuments}
        className={styles.requestButton}
      >
        Request documents by post
      </button>
    </div>
  );
}
