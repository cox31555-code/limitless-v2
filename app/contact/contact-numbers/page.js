import React from "react";
import Link from "next/link";
import ContactPageHeader from "../_components/ContactPageHeader";
import styles from "./page.module.css";
import ContactNumbersHero from "./_components/ContactNumbersHero";
import ContactNumbersAccordion from "./_components/ContactNumbersAccordion";
import DashboardFooter from "@/ui/dashboard/footer/DashboardFooter";

const ContactNumbersPage = () => {
  return (
    <div>
      <ContactPageHeader />
      <ContactNumbersHero />
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbItem}>Home</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <Link href="/contact" className={styles.breadcrumbItem}>Contact</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={`${styles.breadcrumbItem} ${styles.active}`}>Opening Hours & Contact Numbers</span>
      </div>
      <ContactNumbersAccordion />
      <DashboardFooter />
    </div>
  );
};

export default ContactNumbersPage;
