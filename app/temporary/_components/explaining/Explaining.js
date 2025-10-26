import React from "react";
import styles from "./explaining.module.css";
import { Plus_Jakarta_Sans, Poppins, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
});

const FlexibilityIcon = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="45" fill="#0388FF" fillOpacity="0.1" />
    <path d="M35 45L45 55L65 35" stroke="#0388FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ComprehensiveIcon = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="45" fill="#0388FF" fillOpacity="0.1" />
    <path d="M35 50L45 60L70 30" stroke="#0388FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="50" cy="50" r="42" stroke="#0388FF" strokeWidth="2" opacity="0.3" />
  </svg>
);

const TimeIcon = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="45" fill="#0388FF" fillOpacity="0.1" />
    <circle cx="50" cy="50" r="35" stroke="#0388FF" strokeWidth="2.5" />
    <path d="M50 35V50L62 62" stroke="#0388FF" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="45" fill="#0388FF" fillOpacity="0.1" />
    <path d="M50 25L70 35V55C70 70 50 80 50 80C50 80 30 70 30 55V35L50 25Z" stroke="#0388FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NoCommitmentIcon = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="45" fill="#0388FF" fillOpacity="0.1" />
    <path d="M35 50L50 65L75 35" stroke="#0388FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const QuoteIcon = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="45" fill="#0388FF" fillOpacity="0.1" />
    <path d="M40 55H35C33.8954 55 33 55.8954 33 57V63C33 64.1046 33.8954 65 35 65H40" stroke="#0388FF" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M65 55H60C58.8954 55 58 55.8954 58 57V63C58 64.1046 58.8954 65 60 65H65" stroke="#0388FF" strokeWidth="2.5" strokeLinecap="round" />
    <text x="50" y="60" textAnchor="middle" fill="#0388FF" fontSize="20" fontWeight="bold" opacity="0.6">£</text>
  </svg>
);


const Explaining = () => {
  const keyFeatures = [
    {
      title: "Short-term, flexible policy",
      description: "Choose coverage from 1 hour to 28 days tailored to your needs",
      icon: "flexibility",
    },
    {
      title: "Fully comprehensive cover",
      description: "Same level of protection as our annual insurance policies",
      icon: "comprehensive",
    },
    {
      title: "1 hour to 28 days duration",
      description: "Flexible options for all your temporary coverage requirements",
      icon: "time",
    },
    {
      title: "Same protection as annual policy",
      description: "Full comprehensive coverage with identical benefits",
      icon: "shield",
    },
    {
      title: "No long-term commitment",
      description: "Pay only for the coverage period you actually need",
      icon: "nocommitment",
    },
    {
      title: "Instant quotes available",
      description: "Get an immediate quote and activate your policy instantly",
      icon: "quote",
    },
  ];

  const howItWorksSteps = [
    {
      number: "01",
      title: "Enter Your Details",
      description: "Provide your name, driving history, and vehicle registration number through our simple online form.",
    },
    {
      number: "02",
      title: "Select Duration",
      description: "Choose your coverage period from 1 hour to 28 days based on your specific needs.",
    },
    {
      number: "03",
      title: "Review & Pay",
      description: "Get an instant quote, review your details, and complete secure payment online.",
    },
    {
      number: "04",
      title: "Policy Active",
      description: "Your policy activates immediately with digital documents sent directly to your email.",
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "flexibility":
        return <FlexibilityIcon />;
      case "comprehensive":
        return <ComprehensiveIcon />;
      case "time":
        return <TimeIcon />;
      case "shield":
        return <ShieldIcon />;
      case "nocommitment":
        return <NoCommitmentIcon />;
      case "quote":
        return <QuoteIcon />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.mainContainer}>
      {/* What is Temporary Insurance Section */}
      <div className={styles.section}>
        <div className={styles.headerSection}>
          <h2 className={`${styles.header} ${plusJakartaSans.className}`}>
            What is <span>Temporary Insurance?</span>
          </h2>
          <p className={`${styles.subtitle} ${poppins.className}`}>
            Temporary car insurance is a short-term, flexible policy that provides fully comprehensive cover for driving a vehicle in the UK, ranging from one hour to 28 days.
          </p>
        </div>

        <div className={styles.wrapper}>
          {keyFeatures.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconContainer}>{getIcon(feature.icon)}</div>
              <div className={styles.contentContainer}>
                <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
                  {feature.title}
                </h3>
                <p className={`${styles.description} ${manrope.className}`}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className={`${styles.concludingText} ${manrope.className}`}>
          With Limitless Cover, young drivers, couriers, and those with convictions can quickly secure affordable insurance tailored to their needs, with instant quotes and hassle-free activation.
        </p>
      </div>

      {/* How It Works Section */}
      <div className={styles.section}>
        <div className={styles.headerSection}>
          <h2 className={`${styles.header} ${plusJakartaSans.className}`}>
            How It <span>Works</span>
          </h2>
          <p className={`${styles.subtitle} ${poppins.className}`}>
            Getting temporary car insurance is straightforward and quick.
          </p>
        </div>

        <div className={styles.wrapper}>
          {howItWorksSteps.map((step, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.contentContainer}>
                <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
                  {step.title}
                </h3>
                <p className={`${styles.description} ${manrope.className}`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className={`${styles.concludingText} ${manrope.className}`}>
          Temporary vehicle insurance in the UK is straightforward. After confirming your details and making payment, your policy activates instantly with digital documents sent via email. This fully comprehensive cover suits young drivers, couriers, or anyone needing quick insurance without long-term commitments.
        </p>
      </div>
    </div>
  );
};

export default Explaining;
