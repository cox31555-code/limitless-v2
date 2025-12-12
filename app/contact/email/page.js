import React from "react";
import Link from "next/link";
import styles from "./page.module.css";
import ContactPageHeader from "../_components/ContactPageHeader";
import EmailHero from "./_components/EmailHero";
import EmailContactForm from "./_components/EmailContactForm";

const EmailContactPage = () => {
  return (
    <div>
      <ContactPageHeader />
      <EmailHero />
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbItem}>Home</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <Link href="/contact" className={styles.breadcrumbItem}>Contact</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={`${styles.breadcrumbItem} ${styles.active}`}>Email Support</span>
      </div>
      <EmailContactForm />
    </div>
  );
};

export default EmailContactPage;
