import React from "react";
import styles from "./guidelines.module.css";
import Image from "next/image";
import NeedHelpSection from "@/ui/layout/NeedHelpSection";

const Guidelines = ({ data }) => {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="106.238px" height="176.262px" viewBox="0 0 106.238 140.262" className={styles.heroBackgroundImage}>
            <style>{`.st0{fill:#FFFFFF;}.st1{fill:#05AFFF;}.st2{fill:#0A0913;}`}</style>
            <path className="st1" d="M86.515,75.233L44.398,94.136v25.204l-4.194-4.194l-13.187-13.187l-7.276-7.276l24.658-11.08l17.44-7.823l35.953-16.152c9.13-4.116,11.334-16.094,4.253-23.175L70.012,4.419C60.57,-5.023,44.398,1.669,44.398,15.012v20.171L0.115,55.081v19.098l17.44-7.823l39.484-17.713l4.916-2.204V27.302l-0.117,0.058v-6.457l24.677,24.677l-10.944,4.916l0.02,0.039l-46.682,21.01l-0.039-0.078L8.464,80.636c-0.351,0.156-0.683,0.312-0.995,0.488c-4.253,2.302-6.808,6.399-7.354,10.768c-0.527,4.175,0.741,8.583,4.077,11.919l32.051,32.032c9.442,9.442,25.594,2.751,25.594-10.612v-19.82l24.677-11.08l19.722-8.837V66.357L86.515,75.233z"/>
          </svg>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.greetingArea}>
            <h1 className={`${styles.greetingTitle} ${plusJakartaSans?.className || ""}`}>
              Optional cover claims
            </h1>
            <p className={styles.greetingSubtitle}>
              Contact the right team for your optional cover claim
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={[
        { label: "Dashboard" },
        { label: "Submit a Claim" },
        { label: "Optional Cover" }
      ]} />

      {/* Content Wrapper */}
      <div className={styles.contentWrapper}>
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>Contact details for optional cover claims</h2>
          <p className={styles.pageSubtitle}>Choose the service below that matches your claim type and contact them directly</p>
        </div>

        <div className={styles.guidelines}>
          {data.map((item, index) => (
            <div className={styles.guideline} key={index}>
              <div className={styles.header}>
                <div className={styles.iconWrapper}>
                  <Image
                    src="/svg/contact-details.svg"
                    alt="contact-details"
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className={styles.headerTitle}>{item.title}</h3>
              </div>
              <div className={styles.content}>
                {item.content.map((text, idx) => (
                  <p className={styles.contentText} key={idx}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <NeedHelpSection />
    </div>
  );
};

export default Guidelines;
