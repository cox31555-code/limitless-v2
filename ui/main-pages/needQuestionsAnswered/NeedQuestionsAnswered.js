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
    <svg width="316" height="161" viewBox="0 0 316 161" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="358.914" height="121.963" transform="translate(82.0156 78.6177)" fill="url(#paint0_linear_121_219)"/>
      <rect width="317.093" height="107.213" transform="translate(102.926 130.788)" fill="url(#paint1_linear_121_219)"/>
      <rect width="415.043" height="141.036" transform="translate(53.957 25.4131)" fill="url(#paint2_linear_121_219)"/>
      <path d="M210.823 86.833H280.505" stroke="#0388FF" strokeWidth="4.97999" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M210.823 104.263H401.723" stroke="#0388FF" strokeWidth="4.97999" strokeLinecap="round" strokeLinejoin="round"/>
      <rect width="111.989" height="133.933" transform="matrix(0.977885 0.209141 -0.208652 0.97799 71.8633 0)" fill="url(#paint3_linear_121_219)"/>
      <foreignObject x="-17.0252" y="-9.56431" width="219.867" height="234.032">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{backdropFilter: 'blur(24.35px)', clipPath: 'url(#bgblur_0_121_219_clip_path)', height: '100%', width: '100%'}}></div>
      </foreignObject>
      <rect data-figma-bg-blur-radius="48.6932" x="31.668" y="39.1289" width="122.481" height="136.646" fill="#000822"/>
      <path d="M50.9648 64.8193H86.8992" stroke="#0388FF" strokeWidth="3.49907" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M50.9648 78.6182H105.946" stroke="#0388FF" strokeWidth="3.49907" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="41.6841" cy="154.214" rx="41.6841" ry="41.7111" fill="url(#paint4_linear_121_219)"/>
      <ellipse cx="41.6841" cy="154.214" rx="41.6841" ry="41.7111" fill="url(#paint5_linear_121_219)"/>
      <path d="M38.7075 162.53V162.317C38.7324 160.065 38.9819 158.273 39.4558 156.941C39.9297 155.608 40.6032 154.529 41.4762 153.704C42.3492 152.879 43.3968 152.118 44.619 151.423C45.3549 150.998 46.0159 150.497 46.602 149.919C47.1882 149.33 47.6497 148.652 47.9864 147.885C48.3356 147.119 48.5102 146.27 48.5102 145.338C48.5102 144.183 48.2234 143.181 47.6497 142.332C47.076 141.483 46.309 140.828 45.3486 140.369C44.3883 139.909 43.322 139.679 42.1497 139.679C41.127 139.679 40.1417 139.879 39.1939 140.28C38.246 140.681 37.4541 141.312 36.818 142.173C36.182 143.033 35.8141 144.159 35.7143 145.551H31C31.0998 143.546 31.6485 141.831 32.6463 140.404C33.6565 138.977 34.9847 137.887 36.631 137.132C38.2897 136.377 40.1293 136 42.1497 136C44.3447 136 46.2528 136.413 47.8741 137.238C49.5079 138.063 50.7676 139.195 51.6531 140.634C52.551 142.072 53 143.711 53 145.551C53 146.848 52.788 148.021 52.3639 149.07C51.9524 150.12 51.3537 151.057 50.568 151.882C49.7948 152.708 48.8594 153.439 47.7619 154.076C46.6644 154.724 45.7851 155.408 45.1241 156.127C44.4632 156.835 43.983 157.678 43.6837 158.656C43.3844 159.635 43.2222 160.855 43.1973 162.317V162.53H38.7075ZM41.102 173C40.1791 173 39.3872 172.688 38.7262 172.063C38.0652 171.438 37.7347 170.689 37.7347 169.816C37.7347 168.944 38.0652 168.195 38.7262 167.57C39.3872 166.945 40.1791 166.633 41.102 166.633C42.0249 166.633 42.8169 166.945 43.4779 167.57C44.1389 168.195 44.4694 168.944 44.4694 169.816C44.4694 170.394 44.3135 170.925 44.0017 171.408C43.7024 171.892 43.2971 172.281 42.7857 172.576C42.2868 172.859 41.7256 173 41.102 173Z" fill="#000822"/>
      <defs>
        <clipPath id="bgblur_0_121_219_clip_path" transform="translate(17.0252 9.56431)">
          <rect x="31.668" y="39.1289" width="122.481" height="136.646"/>
        </clipPath>
        <linearGradient id="paint0_linear_121_219" x1="179.457" y1="61.3118" x2="179.457" y2="220.053" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0388FF" stopOpacity="0"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
        <linearGradient id="paint1_linear_121_219" x1="158.546" y1="53.8967" x2="158.546" y2="193.439" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0388FF" stopOpacity="0"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
        <linearGradient id="paint2_linear_121_219" x1="-139.11" y1="143.56" x2="454.073" y2="-15.1879" gradientUnits="userSpaceOnUse">
          <stop stopColor="#07102D"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
        <linearGradient id="paint3_linear_121_219" x1="32.8294" y1="164.102" x2="-2.11152" y2="18.6103" gradientUnits="userSpaceOnUse">
          <stop stopColor="#07102D"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
        <linearGradient id="paint4_linear_121_219" x1="-28.6804" y1="184.356" x2="54.1413" y2="142.513" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
        <linearGradient id="paint5_linear_121_219" x1="-28.6804" y1="184.356" x2="54.1413" y2="142.513" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const ServiceIcon = () => (
  <div className={styles.serviceIcon}>
    <svg width="101" height="87" viewBox="0 0 101 87" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="61.3078" height="63.596" fill="url(#paint0_linear_43_380)" fillOpacity="0.48"/>
      <path d="M53.9884 6.70947L89.4345 23.684L53.9884 41.7257L18.5664 23.6851L53.9884 6.70947Z" fill="#049CFF"/>
      <path d="M18.5469 68.9288V23.6689L53.9809 41.7172V87.0001L18.5469 68.9288Z" fill="#049CFF"/>
      <path d="M89.4134 68.9762V23.6689L53.9805 41.7172V86.9983L89.4134 68.9762Z" fill="#049CFF"/>
      <path d="M45.894 73.3171L26.6367 63.9795" stroke="#010619" strokeWidth="3.76508" strokeLinecap="round"/>
      <path d="M78.8669 5.54125L69.7755 9.7966C66.5565 11.3033 64.5 14.5365 64.5 18.0907V30.4783C64.5 33.3314 65.8297 36.0215 68.0965 37.7541L76.7839 44.3943C79.9854 46.8414 84.4103 46.9083 87.6842 44.5589L97.1795 37.7453C99.5766 36.0251 100.998 33.2554 100.998 30.305V18.0907C100.998 14.5365 98.9416 11.3033 95.7226 9.7966L86.6313 5.54126C84.1712 4.38978 81.327 4.38978 78.8669 5.54125Z" fill="url(#paint1_linear_43_380)"/>
      <path d="M78.8669 5.54125L69.7755 9.7966C66.5565 11.3033 64.5 14.5365 64.5 18.0907V30.4783C64.5 33.3314 65.8297 36.0215 68.0965 37.7541L76.7839 44.3943C79.9854 46.8414 84.4103 46.9083 87.6842 44.5589L97.1795 37.7453C99.5766 36.0251 100.998 33.2554 100.998 30.305V18.0907C100.998 14.5365 98.9416 11.3033 95.7226 9.7966L86.6313 5.54126C84.1712 4.38978 81.327 4.38978 78.8669 5.54125Z" fill="url(#paint2_linear_43_380)"/>
      <path d="M76.7461 24.1187L80.1013 28.7365C80.9336 29.882 82.6494 29.858 83.4493 28.6895L90.6672 18.1465" stroke="#000822" strokeWidth="3.01206" strokeLinecap="round"/>
      <defs>
        <linearGradient id="paint0_linear_43_380" x1="30.6539" y1="0" x2="30.6539" y2="63.596" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0388FF" stopOpacity="0"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
        <linearGradient id="paint1_linear_43_380" x1="51.9438" y1="42.3019" x2="90.8542" y2="26.2725" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
        <linearGradient id="paint2_linear_43_380" x1="51.9438" y1="42.3019" x2="90.8542" y2="26.2725" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const SupportIcon = () => (
  <div className={styles.supportIcon}>
    <svg width="119" height="102" viewBox="0 0 119 102" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="51.481" y="8.06152" width="67.5186" height="69.8502" fill="url(#paint0_linear_43_400)" fillOpacity="0.48"/>
      <path d="M53.2989 45.9023C29.527 45.9023 21.9167 67.532 21.083 78.3468H84.9579C84.3099 67.532 77.0709 45.9023 53.2989 45.9023Z" fill="#049CFF"/>
      <path d="M74.147 21.1973C74.147 32.9043 64.6852 42.3947 53.0134 42.3947C41.3417 42.3947 31.8799 32.9043 31.8799 21.1973C31.8799 9.49037 41.3417 0 53.0134 0C64.6852 0 74.147 9.49037 74.147 21.1973Z" fill="#049CFF"/>
      <path d="M101.321 58.6377C105.394 58.6377 108.695 61.9494 108.695 66.0346V87.0771C108.695 91.1623 105.394 94.4741 101.321 94.4741H82.095L78.6803 100.945C77.9536 102.322 75.991 102.334 75.2478 100.966L71.7225 94.4761C71.7221 94.4754 71.7217 94.4748 71.7214 94.4741H67.5556C63.4827 94.4741 60.1809 91.1623 60.1809 87.0771V66.0346C60.1809 61.9494 63.4827 58.6377 67.5556 58.6377H101.321Z" fill="#000822"/>
      <ellipse cx="70.3793" cy="67.9775" rx="2.06117" ry="2.06739" fill="#0388FF"/>
      <ellipse cx="77.8129" cy="67.9775" rx="2.06117" ry="2.06739" fill="#0388FF"/>
      <ellipse cx="85.2623" cy="67.9775" rx="2.06117" ry="2.06739" fill="#0388FF"/>
      <ellipse cx="21.413" cy="29.5269" rx="21.413" ry="21.4654" fill="url(#paint1_linear_43_400)"/>
      <ellipse cx="21.413" cy="29.5269" rx="21.413" ry="21.4654" fill="url(#paint2_linear_43_400)"/>
      <path d="M13.082 30.2199L17.0197 35.6247C17.7604 36.6414 19.284 36.62 19.9959 35.5829L28.0834 23.8018" stroke="#000822" strokeWidth="2.99392" strokeLinecap="round"/>
      <defs>
        <linearGradient id="paint0_linear_43_400" x1="85.2403" y1="8.06152" x2="85.2403" y2="77.9118" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0388FF" stopOpacity="0"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
        <linearGradient id="paint1_linear_43_400" x1="-14.7331" y1="45.0383" x2="27.8433" y2="23.5666" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
        <linearGradient id="paint2_linear_43_400" x1="-14.7331" y1="45.0383" x2="27.8433" y2="23.5666" gradientUnits="userSpaceOnUse">
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
              Have questions? Check our FAQ to see if your question has already been addressed before.
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
            Real Human Customer Support
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
