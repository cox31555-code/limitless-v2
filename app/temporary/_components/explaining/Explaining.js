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
    <path d="M35 40C45 30 65 30 75 40" fill="none" stroke="#0388FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M25 60C35 70 55 70 65 60" fill="none" stroke="#0388FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M75 40L72 45M75 40L80 43" stroke="#0388FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M25 60L28 55M25 60L20 57" stroke="#0388FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ComprehensiveIcon = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="20" fill="none" stroke="#0388FF" strokeWidth="2.5" />
    <path d="M40 50L48 58L60 40" stroke="#0388FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TimeIcon = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="20" fill="none" stroke="#0388FF" strokeWidth="2.5" />
    <path d="M50 45V50M50 50L58 58" stroke="#0388FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="100" height="100" viewBox="0 0 60 70" fill="none" preserveAspectRatio="xMidYMid meet">
    <path d="M30 12L50 22V45C50 60 30 68 30 68C30 68 10 60 10 45V22L30 12Z" fill="none" stroke="#0388FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NoCommitmentIcon = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    <path d="M35 60L50 45L65 60" fill="none" stroke="#0388FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M50 45V70" stroke="#0388FF" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const QuoteIcon = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="20" fill="none" stroke="#0388FF" strokeWidth="2.5" />
    <path d="M42 48L50 54L58 48" stroke="#0388FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EnterDetailsIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="38" fill="#0388FF" fillOpacity="0.08" stroke="#0388FF" strokeWidth="1.5" />
    <rect x="20" y="18" width="40" height="44" rx="4" fill="none" stroke="#0388FF" strokeWidth="2.5" />
    <path d="M26 28H54" stroke="#0388FF" strokeWidth="2" strokeLinecap="round" />
    <path d="M26 36H54" stroke="#0388FF" strokeWidth="2" strokeLinecap="round" />
    <path d="M26 44H38" stroke="#0388FF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SelectDurationIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="38" fill="#0388FF" fillOpacity="0.08" stroke="#0388FF" strokeWidth="1.5" />
    <rect x="22" y="20" width="36" height="40" rx="3" fill="none" stroke="#0388FF" strokeWidth="2.5" />
    <circle cx="40" cy="40" r="12" fill="none" stroke="#0388FF" strokeWidth="2.5" />
    <path d="M40 28V40M40 40L48 48" stroke="#0388FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ReviewPayIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="38" fill="#0388FF" fillOpacity="0.08" stroke="#0388FF" strokeWidth="1.5" />
    <path d="M24 32C24 28.6863 26.6863 26 30 26H50C53.3137 26 56 28.6863 56 32V56C56 59.3137 53.3137 62 50 62H30C26.6863 62 24 59.3137 24 56V32Z" fill="none" stroke="#0388FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="40" cy="44" r="8" fill="none" stroke="#0388FF" strokeWidth="2" />
    <path d="M40 40V44V48" stroke="#0388FF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PolicyActiveIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="38" fill="#0388FF" fillOpacity="0.08" stroke="#0388FF" strokeWidth="1.5" />
    <path d="M28 40L36 50L52 28" stroke="#0388FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M24 35C24 28.37 29.37 23 36 23H56C62.63 23 68 28.37 68 35V55C68 61.63 62.63 67 56 67H36C29.37 67 24 61.63 24 55V35Z" fill="none" stroke="#0388FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
      icon: "enterdetails",
    },
    {
      number: "02",
      title: "Select Duration",
      description: "Choose your coverage period from 1 hour to 28 days based on your specific needs.",
      icon: "selectduration",
    },
    {
      number: "03",
      title: "Review & Pay",
      description: "Get an instant quote, review your details, and complete secure payment online.",
      icon: "reviewpay",
    },
    {
      number: "04",
      title: "Policy Active",
      description: "Your policy activates immediately with digital documents sent directly to your email.",
      icon: "policyactive",
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
      case "enterdetails":
        return <EnterDetailsIcon />;
      case "selectduration":
        return <SelectDurationIcon />;
      case "reviewpay":
        return <ReviewPayIcon />;
      case "policyactive":
        return <PolicyActiveIcon />;
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

        <div className={styles.timelineWrapper}>
          {howItWorksSteps.map((step, index) => (
            <div key={index} className={styles.stepWrapper}>
              <div className={styles.stepCard}>
                <div className={styles.stepIconContainer}>
                  {getIcon(step.icon)}
                </div>
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
