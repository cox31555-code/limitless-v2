import React from "react";
import Link from "next/link";
import ContactPageHeader from "./_components/ContactPageHeader";
import ContactHeroSection from "./_components/ContactHeroSection";
import AccountOptionsSection from "./_components/AccountOptionsSection";
import ContactInformation from "./_components/ContactInformation";
import EmailUsSection from "./_components/EmailUsSection";
import QuickLinksSection from "./_components/QuickLinksSection";
import FAQPreview from "./_components/FAQPreview";
import styles from "./page.module.css";

const ContactPage = () => {
  return (
    <div>
      <ContactPageHeader />
      <ContactHeroSection />
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbItem}>Home</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={`${styles.breadcrumbItem} ${styles.active}`}>Contact</span>
      </div>
      <AccountOptionsSection />
      <EmailUsSection />
      <ContactInformation />
      <QuickLinksSection />
      <FAQPreview />
    </div>
  );
};

export default ContactPage;
