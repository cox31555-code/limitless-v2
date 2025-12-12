import React from "react";
import Link from "next/link";
import styles from "./page.module.css";
import ContactPageHeader from "@/app/contact/_components/ContactPageHeader";
import FAQHero from "./_components/FAQHero";
import QuestionsGroup from "./_components/questionsGroup/QuestionsGroup";
import { data } from "./data";

export const metadata = {
  title: "Frequently Asked Questions | Limitless Cover",
};

const Page = () => {
  return (
    <div>
      <ContactPageHeader />
      <FAQHero />
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbItem}>Home</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={`${styles.breadcrumbItem} ${styles.active}`}>FAQ</span>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.intro}>
            <h2 className={styles.introTitle}>How Can We Help You?</h2>
            <p className={styles.introText}>
              Find answers to the most common questions about our insurance services, policies, and coverage options.
            </p>
          </div>

          <div className={styles.wrapper}>
            {data.map((item) => (
              <QuestionsGroup
                key={item.title}
                title={item.title}
                questions={item.questions}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
