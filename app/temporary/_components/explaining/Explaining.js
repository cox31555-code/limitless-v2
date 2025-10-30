"use client";
import React from "react";
import styles from "./explaining.module.css";
import { Plus_Jakarta_Sans, Poppins, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "400"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "400"],
});

const Explaining = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* Illustration */}
            <div className={styles.illustrationWrapper}>
              <svg className={styles.illustration} width="343" height="401" viewBox="0 0 343 401" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="343" height="401" fill="url(#paint0_linear_illus)"/>
                <path d="M137 30H236.596L277.733 63.752V170.732H137V30Z" fill="#000822"/>
                <path d="M137 30H236.596L277.733 63.752V170.732H137V30Z" fill="url(#paint1_linear_illus)"/>
                <path d="M137 30H236.596L277.733 63.752V170.732H137V30Z" fill="url(#paint2_linear_illus)"/>
                <path d="M236.545 63.719L236.543 30L277.789 63.719H236.545Z" fill="#000822"/>
                <path d="M155.113 73.353H203.089" stroke="#000822" strokeWidth="7.89839" strokeLinecap="round"/>
                <path d="M155.113 94.027H232.269" stroke="#000822" strokeWidth="7.89839" strokeLinecap="round"/>
                <rect y="102" width="333" height="299" fill="url(#paint3_linear_illus)" fillOpacity="0.48"/>
                <path d="M233.273 322.932L176.08 322.932L153.779 358.858C151.309 362.838 150 367.428 150 372.112V443.376C150 450.315 155.626 455.941 162.565 455.941L517.323 455.941C524.263 455.941 529.888 450.315 529.888 443.376V372.06C529.888 367.409 528.598 362.849 526.16 358.888L504.029 322.932L455.073 322.932H233.273Z" fill="#000822"/>
                <rect x="168.945" y="408.502" width="85.1592" height="94.8757" rx="18.8479" fill="#000822"/>
                <rect x="426.23" y="408.502" width="85.1592" height="94.8757" rx="18.8479" fill="#000822"/>
                <path d="M212.294 241.35C216.84 231.16 226.955 224.597 238.113 224.597H440.297C451.283 224.597 461.274 230.961 465.919 240.917L504.176 322.932H175.898L212.294 241.35Z" fill="#000822"/>
                <path d="M278.215 418.352H401.674" stroke="#0388FF" strokeWidth="9.42396" strokeLinecap="round"/>
                <rect x="187.223" y="370.739" width="48.6015" height="24.1554" rx="3.52698" fill="#0388FF"/>
                <rect x="444.508" y="370.739" width="48.6015" height="24.1554" rx="3.52698" fill="#0388FF"/>
                <defs>
                  <linearGradient id="paint0_linear_illus" x1="171.5" y1="0" x2="171.5" y2="401" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0388FF" stopOpacity="0"/>
                    <stop offset="1" stopColor="#0388FF"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_illus" x1="88.5849" y1="253.214" x2="228.358" y2="182.553" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.3"/>
                    <stop offset="1" stopColor="#0388FF"/>
                  </linearGradient>
                  <linearGradient id="paint2_linear_illus" x1="88.5849" y1="253.214" x2="228.358" y2="182.553" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.3"/>
                    <stop offset="1" stopColor="#0388FF"/>
                  </linearGradient>
                  <linearGradient id="paint3_linear_illus" x1="166.5" y1="102" x2="166.5" y2="401" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0388FF" stopOpacity="0"/>
                    <stop offset="1" stopColor="#0388FF"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Title & Description */}
            <div className={styles.leftTextContent}>
              <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
                What is temporary vehicle <span>insurance?</span>
              </h2>
              <p className={`${styles.description} ${manrope.className}`}>
                Temporary car insurance is a short-term, flexible policy that provides fully comprehensive cover for driving a vehicle in the UK, ranging from one hour to 28 days. Ideal for situations like borrowing a car, test-driving a new vehicle, or covering a short trip, it offers the same protection as an annual policy without the long-term commitment. With Limitless Cover, young drivers, couriers, and those with convictions can quickly secure affordable insurance tailored to their needs, with instant quotes and hassle-free activation.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            {/* Title & Description */}
            <div className={styles.rightHeader}>
              <h3 className={`${styles.rightTitle} ${plusJakartaSans.className}`}>
                How does temporary vehicle <span>insurance work?</span>
              </h3>
              <p className={`${styles.rightDescription} ${manrope.className}`}>
                Temporary vehicle insurance in the UK is a straightforward way to get short-term coverage for driving needs. To set it up, visit an insurer's website and enter details like your name, driving history, and the vehicle's registration number. Select your coverage period, from one hour to 28 days, and review the instant quote provided. After confirming your details and making payment online, the policy activates instantly, with digital documents sent via email.
              </p>
            </div>

            {/* Steps */}
            <div className={styles.stepsContainer}>
              {[
                {
                  number: "01",
                  title: "Enter your vehicle registration",
                  description: "Don't know the vehicle reg? No problem, narrow down the car by make, model and variant."
                },
                {
                  number: "02",
                  title: "Let us know how long you will need it",
                  description: "Select which date you would like to start and let us know whether you need for an hour or weeks."
                },
                {
                  number: "03",
                  title: "Provide some details about yourself",
                  description: "Let us know some details to help us offer the best quote we can."
                },
                {
                  number: "04",
                  title: "Pay to get insured",
                  description: "Once paid, visit your member portal and collect your insurance documents."
                }
              ].map((step, index) => (
                <div key={index} className={styles.stepBox}>
                  <div className={styles.stepBadge}>
                    <span className={`${styles.stepNumber} ${plusJakartaSans.className}`}>{step.number}</span>
                  </div>
                  <div className={styles.stepText}>
                    <h4 className={`${styles.stepTitle} ${plusJakartaSans.className}`}>{step.title}</h4>
                    <p className={`${styles.stepDesc} ${poppins.className}`}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explaining;
