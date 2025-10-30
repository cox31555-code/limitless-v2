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
  weight: ["400"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "400"],
});

const Explaining = () => {
  return (
    <div className={styles.wrapper}>
      {/* First Section - What is temporary vehicle insurance */}
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Illustration SVG */}
          <svg className={styles.illustration} width="1202" height="467" viewBox="0 0 1202 467" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="265.512" width="273.487" height="466.442" fill="url(#paint0_linear_1640_5327)" fillOpacity="0.48"/>
            <path d="M417.398 75.2095V100.691" stroke="#0388FF" strokeWidth="8.77134" strokeLinecap="round"/>
            <path d="M390.035 70.1656H444.756" stroke="#0388FF" strokeWidth="8.77134" strokeLinecap="round"/>
            <ellipse cx="414.361" cy="165.635" rx="76.0014" ry="74.4814" fill="#000822"/>
            <path d="M417.396 127.634V169.587L390.035 197.555" stroke="#0388FF" strokeWidth="8.77134" strokeLinecap="round"/>
            <ellipse cx="383.59" cy="196.464" rx="70.2343" ry="68.8297" fill="url(#paint1_linear_1640_5327)"/>
            <rect y="146.71" width="265.513" height="319.732" fill="url(#paint2_linear_1640_5327)" fillOpacity="0.48"/>
            <path d="M185.998 322.867L140.396 322.867L123.381 350.279C120.91 354.258 119.602 358.849 119.602 363.533V416.355C119.602 423.295 125.227 428.921 132.167 428.921L409.935 428.92C416.875 428.92 422.501 423.295 422.501 416.355V363.481C422.501 358.83 421.21 354.27 418.772 350.309L401.882 322.867L362.847 322.867H185.998Z" fill="#000822"/>
            <rect x="134.707" y="391.096" width="67.9006" height="75.648" rx="18.8479" fill="#000822"/>
            <rect x="339.848" y="391.096" width="67.9006" height="75.648" rx="18.8479" fill="#000822"/>
            <path d="M167.755 261.214C172.301 251.024 182.416 244.461 193.574 244.461H347.415C358.401 244.461 368.393 250.825 373.037 260.781L401.998 322.867H140.25L167.755 261.214Z" fill="#000822"/>
            <path d="M221.832 398.949H320.271" stroke="#0388FF" strokeWidth="9.42396" strokeLinecap="round"/>
            <rect x="149.281" y="360.986" width="38.7518" height="19.26" rx="3.52698" fill="#0388FF"/>
            <rect x="354.422" y="360.986" width="38.7518" height="19.26" rx="3.52698" fill="#0388FF"/>
            <path d="M109.234 170.847H188.646L221.446 197.759V283.058H109.234V170.847Z" fill="#000822"/>
            <path d="M109.234 170.847H188.646L221.446 197.759V283.058H109.234V170.847Z" fill="url(#paint3_linear_1640_5327)"/>
            <path d="M109.234 170.847H188.646L221.446 197.759V283.058H109.234V170.847Z" fill="url(#paint4_linear_1640_5327)"/>
            <path d="M188.607 197.741L188.605 170.63L221.492 197.741H188.607Z" fill="#000822"/>
            <path d="M123.676 203.827H161.928" stroke="#000822" strokeWidth="7.89839" strokeLinecap="round"/>
            <path d="M123.676 220.311H185.195" stroke="#000822" strokeWidth="7.89839" strokeLinecap="round"/>
            <defs>
              <linearGradient id="paint0_linear_1640_5327" x1="402.255" y1="0" x2="402.255" y2="466.442" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0388FF" stopOpacity="0"/>
                <stop offset="1" stopColor="#0388FF"/>
              </linearGradient>
              <linearGradient id="paint1_linear_1640_5327" x1="383.59" y1="127.634" x2="383.59" y2="265.293" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0388FF" stopOpacity="0"/>
                <stop offset="1" stopColor="#0388FF"/>
              </linearGradient>
              <linearGradient id="paint2_linear_1640_5327" x1="132.757" y1="146.71" x2="132.757" y2="466.442" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0388FF" stopOpacity="0"/>
                <stop offset="1" stopColor="#0388FF"/>
              </linearGradient>
              <linearGradient id="paint3_linear_1640_5327" x1="70.6312" y1="267.496" x2="182.078" y2="211.155" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" stopOpacity="0.3"/>
                <stop offset="1" stopColor="#0388FF"/>
              </linearGradient>
              <linearGradient id="paint4_linear_1640_5327" x1="70.6312" y1="267.496" x2="182.078" y2="211.155" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" stopOpacity="0.3"/>
                <stop offset="1" stopColor="#0388FF"/>
              </linearGradient>
            </defs>
          </svg>

          {/* Text content */}
          <div className={styles.textContent}>
            <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
              What is temporary vehicle <span>insurance?</span>
            </h2>
            <p className={`${styles.description} ${manrope.className}`}>
              Temporary car insurance is a short-term, flexible policy that provides fully comprehensive cover for driving a vehicle in the UK, ranging from one hour to 28 days. Ideal for situations like borrowing a car, test-driving a new vehicle, or covering a short trip, it offers the same protection as an annual policy without the long-term commitment. With Limitless Cover, young drivers, couriers, and those with convictions can quickly secure affordable insurance tailored to their needs, with instant quotes and hassle-free activation through our online platform.
            </p>
          </div>
        </div>

        {/* Original Limitless Logo SVG */}
        <svg className={styles.logo} width="250" height="470" viewBox="0 0 250 470" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M476.899 -4.77139L244.978 99.8095V239.251L221.883 216.047L149.267 143.09L109.201 102.836L244.983 41.5356L341.018 -1.74512L538.997 -91.1061C589.272 -113.878 601.409 -180.146 562.416 -219.322L386.023 -396.55C334.03 -448.788 244.978 -411.77 244.978 -337.944V-226.348L1.12882 -116.262L1.12882 -10.6026L97.1639 -53.8834L314.586 -151.881L341.657 -164.074V-269.95L341.013 -269.629V-305.352L476.899 -168.827L416.635 -141.629L416.745 -141.413L159.686 -25.1753L159.471 -25.6068L47.1089 25.1207C45.1761 25.9838 43.3479 26.8469 41.6298 27.8206C18.2103 40.5564 4.14093 63.2231 1.13432 87.3946C-1.76765 110.493 5.21471 134.88 23.5847 153.336L200.077 330.554C252.07 382.791 341.013 345.773 341.013 271.843V162.188L476.899 100.888L585.5 51.9976V-53.8779L476.899 -4.77139Z" fill="url(#paint0_linear_167_6418)"/>
          <defs>
            <linearGradient id="paint0_linear_167_6418" x1="293" y1="-421" x2="293" y2="355" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0168FF"/>
              <stop offset="1" stopColor="#05AFFF" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Second Section - How does temporary vehicle insurance work */}
      <div className={styles.howCard}>
        {/* Gradient bars background */}
        <div className={styles.gradientBars}>
          <div className={styles.bar1}></div>
          <div className={styles.bar2}></div>
          <div className={styles.bar3}></div>
        </div>

        <div className={styles.howContent}>
          <div className={styles.leftColumn}>
            <h2 className={`${styles.howTitle} ${plusJakartaSans.className}`}>
              How does temporary vehicle <span>insurance work?</span>
            </h2>
            <p className={`${styles.howDescription} ${manrope.className}`}>
              Temporary vehicle insurance in the UK is a straightforward way to get short-term coverage for driving needs. To set it up, visit an insurer's website and enter details like your name, driving history, and the vehicle's registration number. Select your coverage period, from one hour to 28 days, and review the instant quote provided. After confirming your details and making payment online, the policy activates instantly, with digital documents sent via email. This fully comprehensive cover suits young drivers, couriers, or anyone needing quick insurance, including those with convictions, without long-term commitments.
            </p>
          </div>

          <div className={styles.stepsColumn}>
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
  );
};

export default Explaining;
