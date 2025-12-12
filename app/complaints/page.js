import React from "react";
import Link from "next/link";
import styles from "./page.module.css";
import ContactPageHeader from "@/app/contact/_components/ContactPageHeader";
import ComplaintsHero from "./_components/ComplaintsHero";
import { content } from "./data";
import LastUpdated from "@/ui/company-pages/lastUpdated/LastUpdated";
import ListItem from "@/ui/company-pages/listItem/listItem";

export const metadata = {
  title: "Complaints | Limitless Cover",
};

const page = () => {
  const menuItems = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Cookies Policy", href: "/cookies-policy" },
    { label: "Complaints", href: "/complaints" },
  ];

  return (
    <div>
      <ContactPageHeader />
      <ComplaintsHero />
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbItem}>Home</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={`${styles.breadcrumbItem} ${styles.active}`}>Complaints</span>
      </div>

      <nav className={styles.policyNav}>
        <div className={styles.policyNavContent}>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`${styles.policyLink} ${
                item.href === "/complaints" ? styles.activePolicyLink : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className={styles.contentSection}>
        <div className={styles.container}>
          {content.map((item, index) => (
            <div key={index} className={styles.content}>
              {item.type === "lastUpdate" && <LastUpdated data={item.value} />}
              {item.type === "list" && <ListItem data={item.value} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
