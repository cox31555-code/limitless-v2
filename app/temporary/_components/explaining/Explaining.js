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
    <div className={styles.container}>
      <svg className={styles.logoDecor} width="250" height="470" viewBox="0 0 250 470" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M476.899 -4.77139L244.978 99.8095V239.251L221.883 216.047L149.267 143.09L109.201 102.836L244.983 41.5356L341.018 -1.74512L538.997 -91.1061C589.272 -113.878 601.409 -180.146 562.416 -219.322L386.023 -396.55C334.03 -448.788 244.978 -411.77 244.978 -337.944V-226.348L1.12882 -116.262L1.12882 -10.6026L97.1639 -53.8834L314.586 -151.881L341.657 -164.074V-269.95L341.013 -269.629V-305.352L476.899 -168.827L416.635 -141.629L416.745 -141.413L159.686 -25.1753L159.471 -25.6068L47.1089 25.1207C45.1761 25.9838 43.3479 26.8469 41.6298 27.8206C18.2103 40.5564 4.14093 63.2231 1.13432 87.3946C-1.76765 110.493 5.21471 134.88 23.5847 153.336L200.077 330.554C252.07 382.791 341.013 345.773 341.013 271.843V162.188L476.899 100.888L585.5 51.9976V-53.8779L476.899 -4.77139Z" fill="url(#paint0_linear_logo)"/>
        <defs>
          <linearGradient id="paint0_linear_logo" x1="293" y1="-421" x2="293" y2="355" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0168FF"/>
            <stop offset="1" stopColor="#05AFFF" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>

      <div className={styles.content}>
        {/* Left Side Content */}
        <div className={styles.leftContent}>
          <div className={styles.headerSection}>
            <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
              What is temporary vehicle <span>insurance?</span>
            </h2>
            <p className={`${styles.description} ${manrope.className}`}>
              Temporary car insurance is a short-term, flexible policy that provides fully comprehensive cover for driving a vehicle in the UK, ranging from one hour to 28 days. Ideal for situations like borrowing a car, test-driving a new vehicle, or covering a short trip, it offers the same protection as an annual policy without the long-term commitment. With Limitless Cover, young drivers, couriers, and those with convictions can quickly secure affordable insurance tailored to their needs, with instant quotes and hassle-free activation through our online platform.
            </p>
          </div>

          <div className={styles.illustrationSection}>
            <svg className={styles.illustration} width="1338" height="586" viewBox="0 0 1338 586" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="333" width="343" height="585" fill="url(#paint0_linear_illus)" fillOpacity="0.48"/>
              <path d="M523.488 94.3257V126.284" stroke="#0388FF" strokeWidth="8.77134" strokeLinecap="round"/>
              <path d="M489.172 88H557.802" stroke="#0388FF" strokeWidth="8.77134" strokeLinecap="round"/>
              <ellipse cx="519.682" cy="207.735" rx="95.3191" ry="93.4127" fill="#000822"/>
              <path d="M523.487 160.075V212.692L489.172 247.769" stroke="#0388FF" strokeWidth="8.77134" strokeLinecap="round"/>
              <ellipse cx="481.086" cy="246.4" rx="88.0861" ry="86.3244" fill="url(#paint1_linear_illus)"/>
              <rect y="184" width="333" height="401" fill="url(#paint2_linear_illus)" fillOpacity="0.48"/>
              <path d="M233.273 404.932L176.08 404.932L153.779 440.858C151.309 444.838 150 449.428 150 454.112V525.376C150 532.315 155.626 537.941 162.565 537.941L517.323 537.941C524.263 537.941 529.888 532.315 529.888 525.376V454.06C529.888 449.409 528.598 444.849 526.16 440.888L504.029 404.932L455.073 404.932H233.273Z" fill="#000822"/>
              <rect x="168.945" y="490.502" width="85.1592" height="94.8757" rx="18.8479" fill="#000822"/>
              <rect x="426.23" y="490.502" width="85.1592" height="94.8757" rx="18.8479" fill="#000822"/>
              <path d="M212.294 323.35C216.84 313.16 226.955 306.597 238.113 306.597H440.297C451.283 306.597 461.274 312.961 465.919 322.917L504.176 404.932H175.898L212.294 323.35Z" fill="#000822"/>
              <path d="M278.215 500.352H401.674" stroke="#0388FF" strokeWidth="9.42396" strokeLinecap="round"/>
              <rect x="187.223" y="452.739" width="48.6015" height="24.1554" rx="3.52698" fill="#0388FF"/>
              <rect x="444.508" y="452.739" width="48.6015" height="24.1554" rx="3.52698" fill="#0388FF"/>
              <path d="M137 214.272H236.596L277.733 248.024V355.004H137V214.272Z" fill="#000822"/>
              <path d="M137 214.272H236.596L277.733 248.024V355.004H137V214.272Z" fill="url(#paint3_linear_illus)"/>
              <path d="M137 214.272H236.596L277.733 248.024V355.004H137V214.272Z" fill="url(#paint4_linear_illus)"/>
              <path d="M236.545 248.001L236.543 214L277.789 248.001H236.545Z" fill="#000822"/>
              <path d="M155.113 255.635H203.089" stroke="#000822" strokeWidth="7.89839" strokeLinecap="round"/>
              <path d="M155.113 276.309H232.269" stroke="#000822" strokeWidth="7.89839" strokeLinecap="round"/>
              <defs>
                <linearGradient id="paint0_linear_illus" x1="504.5" y1="0" x2="504.5" y2="585" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0388FF" stopOpacity="0"/>
                  <stop offset="1" stopColor="#0388FF"/>
                </linearGradient>
                <linearGradient id="paint1_linear_illus" x1="481.086" y1="160.075" x2="481.086" y2="332.724" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0388FF" stopOpacity="0"/>
                  <stop offset="1" stopColor="#0388FF"/>
                </linearGradient>
                <linearGradient id="paint2_linear_illus" x1="166.5" y1="184" x2="166.5" y2="585" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0388FF" stopOpacity="0"/>
                  <stop offset="1" stopColor="#0388FF"/>
                </linearGradient>
                <linearGradient id="paint3_linear_illus" x1="88.5849" y1="335.486" x2="228.358" y2="264.825" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.3"/>
                  <stop offset="1" stopColor="#0388FF"/>
                </linearGradient>
                <linearGradient id="paint4_linear_illus" x1="88.5849" y1="335.486" x2="228.358" y2="264.825" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.3"/>
                  <stop offset="1" stopColor="#0388FF"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Right Side Card */}
        <div className={styles.rightContent}>
          <div className={styles.card}>
            <div className={styles.cardBackground}>
              <div className={styles.gradientBar1}></div>
              <div className={styles.gradientBar2}></div>
              <div className={styles.gradientBar3}></div>
            </div>

            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
                  How does temporary vehicle <span>insurance work?</span>
                </h3>
                <p className={`${styles.cardSubtitle} ${manrope.className}`}>
                  Temporary vehicle insurance in the UK is a straightforward way to get short-term coverage for driving needs. To set it up, visit an insurer's website and enter details like your name, driving history, and the vehicle's registration number. Select your coverage period, from one hour to 28 days, and review the instant quote provided. After confirming your details and making payment online, the policy activates instantly, with digital documents sent via email. This fully comprehensive cover suits young drivers, couriers, or anyone needing quick insurance, including those with convictions, without long-term commitments.
                </p>
              </div>

              <div className={styles.steps}>
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
                  <div key={index} className={styles.step}>
                    <div className={styles.stepIcon}>
                      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="22" cy="21.9842" rx="22" ry="21.9842" fill="url(#paint0_linear_step)"/>
                        <ellipse cx="22" cy="21.9842" rx="22" ry="21.9842" fill="url(#paint1_linear_step)"/>
                        <defs>
                          <linearGradient id="paint0_linear_step" x1="-15.137" y1="37.8705" x2="28.5503" y2="15.7688" gradientUnits="userSpaceOnUse">
                            <stop stopColor="white" stopOpacity="0.3"/>
                            <stop offset="1" stopColor="#0388FF"/>
                          </linearGradient>
                          <linearGradient id="paint1_linear_step" x1="-15.137" y1="37.8705" x2="28.5503" y2="15.7688" gradientUnits="userSpaceOnUse">
                            <stop stopColor="white" stopOpacity="0.3"/>
                            <stop offset="1" stopColor="#0388FF"/>
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className={`${styles.stepNumber} ${plusJakartaSans.className}`}>{step.number}</span>
                    </div>
                    <div className={styles.stepContent}>
                      <h4 className={`${styles.stepTitle} ${plusJakartaSans.className}`}>{step.title}</h4>
                      <p className={`${styles.stepDescription} ${poppins.className}`}>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explaining;
