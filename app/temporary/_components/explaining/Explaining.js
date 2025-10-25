import React from "react";
import styles from "./explaining.module.css";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "600"],
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "400"],
});

const Explaining = () => {
  const whatsIncludedPoints = [
    "Short-term, flexible policy",
    "Fully comprehensive cover",
    "1 hour to 28 days duration",
    "Same protection as annual policy",
    "No long-term commitment",
    "Instant quotes available"
  ];

  const howItWorksSteps = [
    {
      number: "01",
      title: "Enter Your Details",
      description: "Provide your name, driving history, and vehicle registration number through our simple online form."
    },
    {
      number: "02",
      title: "Select Duration",
      description: "Choose your coverage period from 1 hour to 28 days based on your specific needs."
    },
    {
      number: "03",
      title: "Review & Pay",
      description: "Get an instant quote, review your details, and complete secure payment online."
    },
    {
      number: "04",
      title: "Policy Active",
      description: "Your policy activates immediately with digital documents sent directly to your email."
    }
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* What is Temporary Vehicle Insurance Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              What is <span>Temporary Insurance?</span>
            </h2>
          </div>

          <div className={styles.contentWrapper}>
            <div className={styles.mainContent}>
              <p className={`${styles.description} ${manrope.className}`}>
                Temporary car insurance is a short-term, flexible policy that provides fully comprehensive cover for driving a vehicle in the UK, ranging from one hour to 28 days.
              </p>

              <div className={styles.keyFeatures}>
                <p className={`${styles.featureHeader} ${plusJakartaSans.className}`}>Key Features:</p>
                <ul className={styles.featuresList}>
                  {whatsIncludedPoints.map((point, index) => (
                    <li key={index} className={`${styles.featureItem} ${manrope.className}`}>
                      <span className={styles.bullet}>→</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <p className={`${styles.concludingText} ${manrope.className}`}>
                With Limitless Cover, young drivers, couriers, and those with convictions can quickly secure affordable insurance tailored to their needs, with instant quotes and hassle-free activation.
              </p>
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              How It <span>Works</span>
            </h2>
          </div>

          <div className={styles.stepsGrid}>
            {howItWorksSteps.map((step, index) => (
              <div className={styles.stepCard} key={index}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepNumber}>{step.number}</div>
                  <h4 className={`${styles.stepTitle} ${plusJakartaSans.className}`}>{step.title}</h4>
                </div>
                <p className={`${styles.stepDescription} ${manrope.className}`}>{step.description}</p>
              </div>
            ))}
          </div>

          <div className={styles.processNote}>
            <p className={`${manrope.className}`}>
              Temporary vehicle insurance in the UK is straightforward. After confirming your details and making payment, your policy activates instantly with digital documents sent via email. This fully comprehensive cover suits young drivers, couriers, or anyone needing quick insurance without long-term commitments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explaining;
