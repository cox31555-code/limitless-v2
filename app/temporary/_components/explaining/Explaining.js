import React from "react";
import styles from "./explaining.module.css";
import Image from "next/image";
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
      title: "Enter Details",
      description: "Visit our website and provide your name, driving history, and vehicle registration number.",
      icon: "📝"
    },
    {
      number: "02",
      title: "Select Duration",
      description: "Choose your coverage period - from 1 hour to 28 days based on your needs.",
      icon: "📅"
    },
    {
      number: "03",
      title: "Review & Pay",
      description: "Get an instant quote, confirm your details, and complete payment online securely.",
      icon: "💳"
    },
    {
      number: "04",
      title: "Get Insured",
      description: "Policy activates instantly with digital documents sent straight to your email.",
      icon: "✓"
    }
  ];

  const whyChooseUs = [
    {
      title: "Perfect for Young Drivers",
      description: "Affordable insurance options tailored for drivers aged 17+",
      icon: "🚗"
    },
    {
      title: "Couriers Welcome",
      description: "Specialized coverage for business and delivery driving needs",
      icon: "📦"
    },
    {
      title: "Past Convictions OK",
      description: "We work with drivers with motoring convictions to find suitable cover",
      icon: "🛡️"
    }
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* What is Temporary Vehicle Insurance Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              What is Temporary Vehicle <span>Insurance?</span>
            </h2>
            <p className={`${styles.sectionSubtitle} ${manrope.className}`}>
              A flexible, short-term insurance solution for your driving needs
            </p>
          </div>

          <div className={styles.contentGrid}>
            <div className={styles.mainContent}>
              <p className={`${styles.mainDescription} ${manrope.className}`}>
                Temporary car insurance is a short-term, flexible policy that provides fully comprehensive cover for driving a vehicle in the UK, ranging from one hour to 28 days. Ideal for situations like borrowing a car, test-driving a new vehicle, or covering a short trip, it offers the same protection as an annual policy without the long-term commitment.
              </p>

              <div className={styles.benefitsList}>
                {whatsIncludedPoints.map((point, index) => (
                  <div className={styles.benefitItem} key={index}>
                    <span className={styles.checkmark}>✓</span>
                    <span className={`${styles.benefitText} ${manrope.className}`}>{point}</span>
                  </div>
                ))}
              </div>

              <p className={`${styles.secondaryDescription} ${manrope.className}`}>
                With Limitless Cover, young drivers, couriers, and those with convictions can quickly secure affordable insurance tailored to their needs, with instant quotes and hassle-free activation through our online platform.
              </p>
            </div>

            <div className={styles.imageContainer}>
              <Image
                src="/svg/temp-car.svg"
                alt="temporary car insurance"
                width={400}
                height={350}
                className={styles.sectionImage}
              />
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              How Temporary Insurance <span>Works</span>
            </h2>
            <p className={`${styles.sectionSubtitle} ${manrope.className}`}>
              4 simple steps to get covered in minutes
            </p>
          </div>

          <div className={styles.stepsGrid}>
            {howItWorksSteps.map((step, index) => (
              <div className={styles.stepCard} key={index}>
                <div className={styles.stepNumber}>{step.number}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h4 className={`${styles.stepTitle} ${plusJakartaSans.className}`}>{step.title}</h4>
                <p className={`${styles.stepDescription} ${manrope.className}`}>{step.description}</p>
              </div>
            ))}
          </div>

          <p className={`${styles.processDescription} ${manrope.className}`}>
            Temporary vehicle insurance in the UK is a straightforward way to get short-term coverage. After confirming your details and making payment online, the policy activates instantly with digital documents sent via email. This fully comprehensive cover suits young drivers, couriers, or anyone needing quick insurance without long-term commitments.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              Why Choose <span>Limitless Cover?</span>
            </h2>
          </div>

          <div className={styles.whyGrid}>
            {whyChooseUs.map((reason, index) => (
              <div className={styles.whyCard} key={index}>
                <div className={styles.whyIcon}>{reason.icon}</div>
                <h4 className={`${styles.whyTitle} ${plusJakartaSans.className}`}>{reason.title}</h4>
                <p className={`${styles.whyDescription} ${manrope.className}`}>{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explaining;
