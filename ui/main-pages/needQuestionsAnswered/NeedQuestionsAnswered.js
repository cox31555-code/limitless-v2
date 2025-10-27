"use client";
import React from "react";
import styles from "./needQuestionsAnswered.module.css";
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
    <path d="M476.399 -24.7714L244.478 79.8095V219.251L221.383 196.047L148.767 123.09L108.701 82.8358L244.483 21.5356L340.518 -21.7451L538.497 -111.106C588.772 -133.878 600.909 -200.146 561.916 -239.322L385.523 -416.55C333.53 -468.788 244.478 -431.77 244.478 -357.944V-246.348L0.628817 -136.262L0.628817 -30.6026L96.6639 -73.8834L314.086 -171.881L341.157 -184.074V-289.95L340.513 -289.629V-325.352L476.399 -188.827L416.135 -161.629L416.245 -161.413L159.186 -45.1753L158.971 -45.6068L46.6089 5.12073C44.6761 5.9838 42.8479 6.84689 41.1298 7.82062C17.7103 20.5564 3.64093 43.2231 0.634323 67.3946C-2.26765 90.4927 4.71471 114.88 23.0847 133.336L199.577 310.554C251.57 362.791 340.513 325.773 340.513 251.843V142.188L476.399 80.8883L585 31.9976V-73.8779L476.399 -24.7714Z" fill="url(#paint_nqa_bg)"/>
    <defs>
      <linearGradient id="paint_nqa_bg" x1="292.5" y1="-441" x2="292.5" y2="335" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0168FF"/>
        <stop offset="1" stopColor="#05AFFF" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

const FAQIllustration = () => (
  <div className={styles.faqIllustration}>
    <svg width="469" height="238" viewBox="0 0 469 238" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="358.914" height="121.963" transform="translate(82.0156 78.6177)" fill="url(#paint0_linear_43_360)"/>
      <rect width="317.093" height="107.213" transform="translate(102.926 130.788)" fill="url(#paint1_linear_43_360)"/>
      <rect width="415.043" height="141.036" transform="translate(53.957 25.4131)" fill="url(#paint2_linear_43_360)"/>
      <path d="M210.823 86.833H280.505" stroke="#0388FF" strokeWidth="4.97999" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M210.823 104.263H401.723" stroke="#0388FF" strokeWidth="4.97999" strokeLinecap="round" strokeLinejoin="round"/>
      <rect width="111.989" height="133.933" transform="matrix(0.977885 0.209141 -0.208652 0.97799 71.8633 0)" fill="url(#paint3_linear_43_360)"/>
      <foreignObject x="-17.0252" y="-9.56431" width="219.867" height="234.032">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{backdropFilter: 'blur(24.35px)', clipPath: 'url(#bgblur_0_43_360_clip_path)', height: '100%', width: '100%'}}></div>
      </foreignObject>
      <rect data-figma-bg-blur-radius="48.6932" x="31.668" y="39.1289" width="122.481" height="136.646" fill="#000822"/>
      <path d="M50.9648 64.8193H86.8992" stroke="#0388FF" strokeWidth="3.49907" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M50.9648 78.6182H105.946" stroke="#0388FF" strokeWidth="3.49907" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="41.6841" cy="154.214" rx="41.6841" ry="41.7111" fill="url(#paint4_linear_43_360)"/>
      <ellipse cx="41.6841" cy="154.214" rx="41.6841" ry="41.7111" fill="url(#paint5_linear_43_360)"/>
      <defs>
        <clipPath id="bgblur_0_43_360_clip_path" transform="translate(17.0252 9.56431)">
          <rect x="31.668" y="39.1289" width="122.481" height="136.646"/>
        </clipPath>
        <linearGradient id="paint0_linear_43_360" x1="179.457" y1="61.3118" x2="179.457" y2="220.053" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0388FF" stopOpacity="0"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
        <linearGradient id="paint1_linear_43_360" x1="158.546" y1="53.8967" x2="158.546" y2="193.439" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0388FF" stopOpacity="0"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
        <linearGradient id="paint2_linear_43_360" x1="-139.11" y1="143.56" x2="454.073" y2="-15.1879" gradientUnits="userSpaceOnUse">
          <stop stopColor="#07102D"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
        <linearGradient id="paint3_linear_43_360" x1="32.8294" y1="164.102" x2="-2.11152" y2="18.6103" gradientUnits="userSpaceOnUse">
          <stop stopColor="#07102D"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
        <linearGradient id="paint4_linear_43_360" x1="-28.6804" y1="184.356" x2="54.1413" y2="142.513" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
        <linearGradient id="paint5_linear_43_360" x1="-28.6804" y1="184.356" x2="54.1413" y2="142.513" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
      </defs>
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
      <path d="M105.867 32.5413L96.7755 36.7966C93.5565 38.3033 91.5 41.5365 91.5 45.0907V57.4783C91.5 60.3314 92.8297 63.0215 95.0965 64.7541L103.784 71.3943C106.985 73.8414 111.41 73.9083 114.684 71.5589L124.179 64.7453C126.577 63.0251 127.998 60.2554 127.998 57.305V45.0907C127.998 41.5365 125.942 38.3033 122.723 36.7966L113.631 32.5413C111.171 31.3898 108.327 31.3898 105.867 32.5413Z" fill="url(#paint_service_badge)"/>
      <path d="M103.746 51.1187L107.101 55.7365C107.934 56.882 109.649 56.858 110.449 55.6895L117.667 45.1465" stroke="#000822" strokeWidth="3.01206" strokeLinecap="round"/>
      <defs>
        <linearGradient id="paint_service_badge" x1="78.9438" y1="69.3019" x2="117.854" y2="53.2725" gradientUnits="userSpaceOnUse">
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
      <ellipse cx="21.413" cy="21.4654" rx="21.413" ry="21.4654" fill="url(#paint_support_circle)"/>
      <path d="M13.082 22.2199L17.0197 27.6247C17.7604 28.6414 19.284 28.62 19.9959 27.5829L28.0834 15.8018" stroke="#000822" strokeWidth="2.99392" strokeLinecap="round"/>
      <defs>
        <linearGradient id="paint_support_circle" x1="-14.7331" y1="37.0383" x2="27.8433" y2="15.5666" gradientUnits="userSpaceOnUse">
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

const NeedQuestionsAnswered = () => {
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

export default NeedQuestionsAnswered;
