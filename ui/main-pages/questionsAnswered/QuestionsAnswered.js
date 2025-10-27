"use client";
import React from "react";
import styles from "./questionsAnswered.module.css";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import { useRouter } from "next/navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "400"],
});

const BackgroundShape = () => (
  <svg className={styles.backgroundShape} width="353" height="335" viewBox="0 0 353 335" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M476.399 -24.7714L244.478 79.8095V219.251L221.383 196.047L148.767 123.09L108.701 82.8358L244.483 21.5356L340.518 -21.7451L538.497 -111.106C588.772 -133.878 600.909 -200.146 561.916 -239.322L385.523 -416.55C333.53 -468.788 244.478 -431.77 244.478 -357.944V-246.348L0.628817 -136.262L0.628817 -30.6026L96.6639 -73.8834L314.086 -171.881L341.157 -184.074V-289.95L340.513 -289.629V-325.352L476.399 -188.827L416.135 -161.629L416.245 -161.413L159.186 -45.1753L158.971 -45.6068L46.6089 5.12073C44.6761 5.9838 42.8479 6.84689 41.1298 7.82062C17.7103 20.5564 3.64093 43.2231 0.634323 67.3946C-2.26765 90.4927 4.71471 114.88 23.0847 133.336L199.577 310.554C251.57 362.791 340.513 325.773 340.513 251.843V142.188L476.399 80.8883L585 31.9976V-73.8779L476.399 -24.7714Z" fill="url(#paint0_linear_bg)"/>
    <defs>
      <linearGradient id="paint0_linear_bg" x1="292.5" y1="-441" x2="292.5" y2="335" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0168FF"/>
        <stop offset="1" stopColor="#05AFFF" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

const FAQIllustration = () => (
  <div className={styles.faqIllustration}>
    <div className={styles.gradientBox1}></div>
    <div className={styles.gradientBox2}></div>
    <svg className={styles.documentCard} width="416" height="142" viewBox="0 0 416 142" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="415.043" height="141.036" fill="url(#paint0_linear_doc)"/>
      <path d="M156.866 61.4199H226.548" stroke="#0388FF" strokeWidth="4.97999" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M156.866 78.8496H347.766" stroke="#0388FF" strokeWidth="4.97999" strokeLinecap="round" strokeLinejoin="round"/>
      <defs>
        <linearGradient id="paint0_linear_doc" x1="-139.11" y1="143.56" x2="454.073" y2="-15.1879" gradientUnits="userSpaceOnUse">
          <stop stopColor="#07102D"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
      </defs>
    </svg>
    <div className={styles.smallDocWrapper}>
      <div className={styles.smallDocBg}></div>
      <svg className={styles.smallDoc} width="123" height="137" viewBox="0 0 123 137" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="122.481" height="136.646" fill="#000822"/>
        <path d="M19.2969 25.6904H55.2312" stroke="#0388FF" strokeWidth="3.49907" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19.2969 39.4893H74.2776" stroke="#0388FF" strokeWidth="3.49907" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <svg className={styles.questionCircle} width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="41.6841" cy="41.7111" rx="41.6841" ry="41.7111" fill="url(#paint0_linear_circle)"/>
      <defs>
        <linearGradient id="paint0_linear_circle" x1="-28.6804" y1="71.8527" x2="54.1413" y2="30.0099" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
      </defs>
    </svg>
    <svg className={styles.questionMark} width="22" height="37" viewBox="0 0 22 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.70748 26.5296V26.3174C7.73243 24.0653 7.98186 22.2731 8.45578 20.9407C8.9297 19.6083 9.60317 18.5295 10.4762 17.7041C11.3492 16.8787 12.3968 16.1182 13.619 15.4226C14.3549 14.9981 15.0159 14.497 15.602 13.9192C16.1882 13.3297 16.6497 12.6517 16.9864 11.8853C17.3356 11.1189 17.5102 10.2699 17.5102 9.33843C17.5102 8.18292 17.2234 7.18069 16.6497 6.33174C16.076 5.48279 15.309 4.82839 14.3486 4.36855C13.3883 3.9087 12.322 3.67878 11.1497 3.67878C10.127 3.67878 9.14172 3.87922 8.19388 4.28011C7.24603 4.68101 6.45408 5.31182 5.81803 6.17256C5.18197 7.0333 4.81406 8.15934 4.71429 9.55067H0C0.0997733 7.54621 0.648526 5.83063 1.64626 4.40392C2.65646 2.97722 3.98469 1.88655 5.63095 1.13193C7.28968 0.37731 9.12925 0 11.1497 0C13.3447 0 15.2528 0.412683 16.8741 1.23805C18.5079 2.06342 19.7676 3.19535 20.6531 4.63384C21.551 6.07234 22 7.71128 22 9.55067C22 10.8477 21.788 12.0209 21.3639 13.0703C20.9524 14.1197 20.3537 15.057 19.568 15.8824C18.7948 16.7078 17.8594 17.4388 16.7619 18.0755C15.6644 18.724 14.7851 19.4079 14.1241 20.1271C13.4632 20.8346 12.983 21.6777 12.6837 22.6563C12.3844 23.635 12.2222 24.8553 12.1973 26.3174V26.5296H7.70748ZM10.102 37C9.17914 37 8.38719 36.6875 7.72619 36.0626C7.06519 35.4377 6.73469 34.689 6.73469 33.8164C6.73469 32.9439 7.06519 32.1952 7.72619 31.5703C8.38719 30.9453 9.17914 30.6329 10.102 30.6329C11.0249 30.6329 11.8169 30.9453 12.4779 31.5703C13.1389 32.1952 13.4694 32.9439 13.4694 33.8164C13.4694 34.3942 13.3135 34.9248 13.0017 35.4082C12.7024 35.8916 12.2971 36.2808 11.7857 36.5755C11.2868 36.8585 10.7256 37 10.102 37Z" fill="#000822"/>
    </svg>
  </div>
);

const ServiceIcon = () => (
  <div className={styles.serviceIcon}>
    <div className={styles.serviceGradient}></div>
    <svg width="90" height="114" viewBox="0 0 90 114" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M80.9884 33.7095L116.435 50.684L80.9884 68.7257L45.5664 50.6851L80.9884 33.7095Z" fill="#049CFF"/>
      <path d="M45.5469 95.9288V50.6689L80.9809 68.7172V114L45.5469 95.9288Z" fill="#049CFF"/>
      <path d="M116.413 95.9762V50.6689L80.9805 68.7172V113.998L116.413 95.9762Z" fill="#049CFF"/>
      <path d="M72.894 100.317L53.6367 90.9795" stroke="#010619" strokeWidth="3.76508" strokeLinecap="round"/>
    </svg>
    <svg className={styles.checkBadge} width="37" height="42" viewBox="0 0 37 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M105.867 32.5413L96.7755 36.7966C93.5565 38.3033 91.5 41.5365 91.5 45.0907V57.4783C91.5 60.3314 92.8297 63.0215 95.0965 64.7541L103.784 71.3943C106.985 73.8414 111.41 73.9083 114.684 71.5589L124.179 64.7453C126.577 63.0251 127.998 60.2554 127.998 57.305V45.0907C127.998 41.5365 125.942 38.3033 122.723 36.7966L113.631 32.5413C111.171 31.3898 108.327 31.3898 105.867 32.5413Z" fill="url(#paint0_linear_badge)"/>
      <path d="M103.746 51.1187L107.101 55.7365C107.934 56.882 109.649 56.858 110.449 55.6895L117.667 45.1465" stroke="#000822" strokeWidth="3.01206" strokeLinecap="round"/>
      <defs>
        <linearGradient id="paint0_linear_badge" x1="78.9438" y1="69.3019" x2="117.854" y2="53.2725" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const SupportIcon = () => (
  <div className={styles.supportIcon}>
    <div className={styles.supportGradient}></div>
    <svg width="111" height="112" viewBox="0 0 111 112" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M79.2989 79.9023C55.527 79.9023 47.9167 101.532 47.083 112.347H110.958C110.31 101.532 103.071 79.9023 79.2989 79.9023Z" fill="#049CFF"/>
      <path d="M100.147 55.1973C100.147 66.9043 90.6852 76.3947 79.0134 76.3947C67.3417 76.3947 57.8799 66.9043 57.8799 55.1973C57.8799 43.4904 67.3417 34 79.0134 34C90.6852 34 100.147 43.4904 100.147 55.1973Z" fill="#049CFF"/>
      <path d="M127.321 92.6377C131.394 92.6377 134.695 95.9494 134.695 100.035V121.077C134.695 125.162 131.394 128.474 127.321 128.474H108.095L104.68 134.945C103.954 136.322 101.991 136.334 101.248 134.966L97.7225 128.476H93.5556C89.4827 128.474 86.1809 125.162 86.1809 121.077V100.035C86.1809 95.9494 89.4827 92.6377 93.5556 92.6377H127.321Z" fill="#000822"/>
      <ellipse cx="96.3793" cy="101.978" rx="2.06117" ry="2.06739" fill="#0388FF"/>
      <ellipse cx="103.813" cy="101.978" rx="2.06117" ry="2.06739" fill="#0388FF"/>
      <ellipse cx="111.262" cy="101.978" rx="2.06117" ry="2.06739" fill="#0388FF"/>
    </svg>
    <svg className={styles.checkCircle} width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="21.413" cy="21.4654" rx="21.413" ry="21.4654" fill="url(#paint0_linear_support)"/>
      <path d="M13.082 22.2199L17.0197 27.6247C17.7604 28.6414 19.284 28.62 19.9959 27.5829L28.0834 15.8018" stroke="#000822" strokeWidth="2.99392" strokeLinecap="round"/>
      <defs>
        <linearGradient id="paint0_linear_support" x1="-14.7331" y1="37.0383" x2="27.8433" y2="15.5666" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const ArrowIcon = () => (
  <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.95 22.766L17.228 15.3145C18.0874 14.4345 18.0874 12.9945 17.228 12.1145L9.95 4.66309" stroke="white" strokeWidth="1.63724" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const QuestionsAnswered = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <BackgroundShape />
      
      <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
        Need Questions <span>Answered?</span>
      </h2>

      <div className={styles.cardsGrid}>
        <div className={styles.faqCard}>
          <button 
            className={styles.arrowButton}
            onClick={() => router.push('/FAQ')}
            aria-label="View FAQ"
          >
            <ArrowIcon />
          </button>
          
          <div className={styles.cardContent}>
            <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
              Frequently Asked Questions
            </h3>
            <p className={`${styles.cardDescription} ${manrope.className}`}>
              Have questions? Check our FAQ to see if your question has  already been addressed before.
            </p>
          </div>

          <FAQIllustration />
        </div>

        <div className={styles.serviceCard}>
          <ServiceIcon />
          
          <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
            Learn More About Our Services
          </h3>
          <p className={`${styles.cardDescription} ${manrope.className}`}>
            Buying insurance can be a stressful experience! Feel free to read our documentation and guides on each insurance we provide to make your decision simpler.
          </p>

          <button 
            className={styles.arrowButton}
            onClick={() => router.push('/about-us')}
            aria-label="Learn more"
          >
            <ArrowIcon />
          </button>
        </div>

        <div className={styles.supportCard}>
          <SupportIcon />
          
          <h3 className={`${styles.cardTitle} ${plusJakartaSans.className}`}>
            Real Human  Customer  Support
          </h3>
          <p className={`${styles.cardDescription} ${manrope.className}`}>
            Can't find your question? Feel free to email our support team and we will get back to you as soon as possible.
          </p>

          <button 
            className={styles.arrowButton}
            onClick={() => router.push('/contact')}
            aria-label="Contact support"
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsAnswered;
