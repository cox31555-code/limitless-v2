import React from "react";
import styles from "./insuranceTypes.module.css";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const CheckIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="12" fill="#ECF0FE" />
    <path
      d="M7.42969 11.9245L9.67756 14.9866C10.2259 15.7336 11.3468 15.7178 11.8739 14.9558L16.6904 7.99219"
      stroke="#07102D"
      strokeWidth="1.67832"
      strokeLinecap="round"
    />
  </svg>
);

const insuranceData = [
  {
    title: "Losses from damage to third party cars.",
    icon: "thirdPartyCar",
    features: [
      "Cover for damage to third party vehicles and property",
      "Fire damage",
      "Protected against fire, lightning, and explosion",
    ],
  },
  {
    title: "Losses from damage to third party property.",
    icon: "thirdPartyProperty",
    features: [
      "Theft cover",
      "Protected against vehicle theft",
      "Legal assistance",
    ],
  },
  {
    title: "Third party medical expenses.",
    icon: "medicalExpenses",
    features: [
      "Motor legal protection included",
      "European coverage",
      "Drive across Europe with cover",
    ],
  },
  {
    title: "Damage to your car because of attempted theft, for example smashed windows.",
    icon: "attemptedTheft",
    features: [
      "24/7 support",
      "Round-the-clock breakdown and claims support",
      "Comprehensive protection",
    ],
  },
  {
    title: "Accidental and non-accidental fire",
    icon: "fire",
    features: [
      "Fire damage",
      "Protected against fire, lightning, and explosion",
      "Complete peace of mind",
    ],
  },
  {
    title: "Optimal for older vehicles",
    icon: "olderVehicles",
    features: [
      "Cost-effective coverage",
      "Tailored for mature vehicles",
      "Affordable annual protection",
    ],
  },
];

const ThirdPartyCarIcon = () => (
  <div className={styles.iconWrapper}>
    <div className={styles.gradientBar}></div>
    <svg width="96" height="92" viewBox="0 0 96 92" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.7937 17.4746L4.63321 17.4746L0.67137 23.8571C0.232536 24.564 0 25.3795 0 26.2116V38.8719C0 40.1048 0.999423 41.1042 2.23227 41.1042L65.2563 41.1042C66.4891 41.1042 67.4885 40.1047 67.4885 38.8719V26.2024C67.4885 25.3761 67.2592 24.566 66.8261 23.8623L62.8946 17.4746L54.1973 17.4746H14.7937Z" fill="#000822"/>
      <rect x="3.36523" y="32.6777" width="15.1288" height="16.855" rx="3.3484" fill="#000822"/>
      <rect x="49.0723" y="32.6777" width="15.1288" height="16.855" rx="3.3484" fill="#000822"/>
      <path d="M11.0674 2.97628C11.875 1.16595 13.6719 0 15.6543 0H51.573C53.5247 0 55.2996 1.13063 56.1247 2.89937L62.9212 17.4696H4.60156L11.0674 2.97628Z" fill="#000822"/>
      <path d="M22.7773 34.4258H44.7104" stroke="#0388FF" strokeWidth="1.6742" strokeLinecap="round"/>
      <rect x="7" y="54" width="9" height="4" rx="0.627" fill="#0388FF"/>
      <rect x="52" y="54" width="9" height="4" rx="0.627" fill="#0388FF"/>
    </svg>
    <svg className={styles.xCircle} width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="22.5109" cy="22.4617" rx="22.5109" ry="22.4617" fill="url(#paint0_linear_x)" />
      <path d="M17.0801 27.8907L27.9446 17.0195" stroke="#000822" strokeWidth="3.24626" strokeLinecap="round"/>
      <path d="M27.9442 27.8906L17.0801 17.019" stroke="#000822" strokeWidth="3.24626" strokeLinecap="round"/>
      <defs>
        <linearGradient id="paint0_linear_x" x1="-15.4884" y1="38.6931" x2="29.1865" y2="16.0585" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const ThirdPartyPropertyIcon = () => (
  <div className={styles.iconWrapper}>
    <rect x="0" y="48.25" width="64.7046" height="70.2762" fill="url(#paint0_linear_property)" fillOpacity="0.48"/>
    <path d="M41 31.1016H85.7073L104.173 46.2523V104.348H41V31.1016Z" fill="#000822"/>
    <path d="M85.6843 46.2392L85.6836 30.9766L104.198 46.2392H85.6843Z" fill="#0388FF"/>
    <path d="M49.8809 48.25H73.8779" stroke="#0388FF" strokeWidth="3.30359" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M49.8809 55.6328H64.042" stroke="#0388FF" strokeWidth="3.30359" strokeLinecap="round" strokeLinejoin="round"/>
    <ellipse className={styles.xCircle2} cx="117.223" cy="89.6673" rx="28.9219" ry="28.8587" fill="url(#paint1_linear_property)"/>
    <path d="M110.244 96.6508L124.203 82.6836" stroke="#000822" strokeWidth="4.17079" strokeLinecap="round"/>
    <path d="M124.202 96.6523L110.244 82.6846" stroke="#000822" strokeWidth="4.17079" strokeLinecap="round"/>
    <defs>
      <linearGradient id="paint0_linear_property" x1="59.3523" y1="48.25" x2="59.3523" y2="118.526" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0388FF" stopOpacity="0"/>
        <stop offset="1" stopColor="#0388FF"/>
      </linearGradient>
      <linearGradient id="paint1_linear_property" x1="68.4013" y1="110.521" x2="125.8" y2="81.4405" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" stopOpacity="0.3"/>
        <stop offset="1" stopColor="#0388FF"/>
      </linearGradient>
    </defs>
  </div>
);

const MedicalExpensesIcon = () => (
  <div className={styles.iconWrapper}>
    <rect width="58.3685" height="73.4591" fill="url(#paint0_linear_medical)" fillOpacity="0.48"/>
    <rect x="11.9414" y="32.8008" width="75.1211" height="54.2269" fill="#000822"/>
    <path d="M22.8398 58.9785H45.1697" stroke="#0388FF" strokeWidth="5.05925"/>
    <path d="M34 47.8105V70.1404" stroke="#0388FF" strokeWidth="5.05925"/>
    <ellipse className={styles.checkCircle} cx="82.4288" cy="39.8489" rx="24.0597" ry="24.0071" fill="url(#paint1_linear_medical)"/>
    <path d="M74.4062 39.7415L78.3309 45.1114C79.2816 46.4122 81.232 46.3849 82.1459 45.0579L90.5476 32.8574" stroke="#000822" strokeWidth="4.85981" strokeLinecap="round"/>
    <defs>
      <linearGradient id="paint0_linear_medical" x1="29.1842" y1="0" x2="29.1842" y2="73.4591" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0388FF" stopOpacity="0"/>
        <stop offset="1" stopColor="#0388FF"/>
      </linearGradient>
      <linearGradient id="paint1_linear_medical" x1="41.815" y1="57.1971" x2="89.5638" y2="33.0052" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" stopOpacity="0.3"/>
        <stop offset="1" stopColor="#0388FF"/>
      </linearGradient>
    </defs>
  </div>
);

const AttemptedTheftIcon = () => (
  <div className={styles.iconWrapper}>
    <div className={styles.gradientBars}>
      <div className={styles.bar1}></div>
      <div className={styles.bar2}></div>
    </div>
    <svg width="89" height="92" viewBox="0 0 89 92" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.0714 16.6172L4.40699 16.6172L0.638591 22.688C0.221182 23.3605 0 24.1362 0 24.9276V36.9698C0 38.1424 0.950626 39.0931 2.12328 39.0931L62.0702 39.093C63.2428 39.093 64.1934 38.1424 64.1934 36.9698V24.9189C64.1934 24.1329 63.9753 23.3624 63.5633 22.693L59.8238 16.6172L51.5511 16.6172H14.0714Z" fill="#000822"/>
      <rect x="3.20117" y="31.0703" width="14.3902" height="16.0321" rx="3.18492" fill="#000822"/>
      <rect x="46.6777" y="31.0703" width="14.3902" height="16.0321" rx="3.18492" fill="#000822"/>
      <path d="M10.5252 2.83097C11.2934 1.10902 13.0025 0 14.888 0H49.053C50.9094 0 52.5978 1.07543 53.3825 2.75781L59.8472 16.6166H4.375L10.5252 2.83097Z" fill="#000822"/>
      <path d="M21.666 32.7422H42.5281" stroke="#0388FF" strokeWidth="1.59246" strokeLinecap="round"/>
      <path d="M17.1274 3.33789L19.8911 8.12695L15.6523 12.3657L24.9928 17.7584" stroke="#0388FF" strokeWidth="3"/>
      <rect x="6" y="25" width="8" height="4" rx="0.596" fill="#0388FF"/>
      <rect x="50" y="25" width="8" height="4" rx="0.596" fill="#0388FF"/>
    </svg>
    <svg className={styles.warningTriangle} width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5548 0L31.1097 27.0163H0L15.5548 0Z" fill="url(#paint0_linear_warning)"/>
      <path d="M15.4941 11.0527V17.9854" stroke="black" strokeWidth="1.93043" strokeLinecap="round"/>
      <circle cx="15.4934" cy="21.4876" r="1.16923" fill="black"/>
      <defs>
        <linearGradient id="paint0_linear_warning" x1="-10.7024" y1="23.2695" x2="18.2726" y2="6.40195" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const FireIcon = () => (
  <div className={styles.iconWrapper}>
    <div className={styles.gradientBars}>
      <div className={styles.bar1}></div>
      <div className={styles.bar2}></div>
    </div>
    <svg width="89" height="92" viewBox="0 0 89 92" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.0594 16.6035L4.40324 16.6035L0.638048 22.6692C0.220994 23.3411 0 24.1161 0 24.9069V36.9388C0 38.1105 0.949818 39.0603 2.12147 39.0603L62.0173 39.0602C63.189 39.0602 64.1388 38.1104 64.1388 36.9388V24.8981C64.1388 24.1128 63.9209 23.3429 63.5093 22.6742L59.7729 16.6035L51.5072 16.6035H14.0594Z" fill="#000822"/>
      <rect x="3.19922" y="31.0488" width="14.3779" height="16.0184" rx="3.18221" fill="#000822"/>
      <rect x="46.6387" y="31.0488" width="14.3779" height="16.0184" rx="3.18221" fill="#000822"/>
      <path d="M10.518 2.82856C11.2855 1.10808 12.9932 0 14.8771 0H49.0131C50.8679 0 52.5548 1.07451 53.3389 2.75546L59.798 16.6025H4.37305L10.518 2.82856Z" fill="#000822"/>
      <path d="M21.6484 32.7129H42.4928" stroke="#0388FF" strokeWidth="1.5911" strokeLinecap="round"/>
      <rect x="6" y="25" width="8" height="4" rx="0.595" fill="#0388FF"/>
      <rect x="50" y="25" width="8" height="4" rx="0.595" fill="#0388FF"/>
    </svg>
    <svg className={styles.flame} width="23" height="36" viewBox="0 0 23 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.13397 14.2088C8.85589 9.94096 9.1867 1.68882 8.13397 0C10.7062 3.75557 13.1315 12.4906 14.4695 16.8962C14.7364 17.7752 15.7744 17.9009 16.0777 17.0339C17.0746 14.1842 17.0309 10.1742 17.0909 8.53838C21.9258 15.2565 28.4406 31.7344 13.7091 34.8071C2.87561 37.0667 -2.13147 27.4229 0.84842 20.6731C2.0354 17.9844 2.87613 12.6899 2.8764 9.31134C5.57931 14.9123 7.23156 19.5436 8.13397 14.2088Z" fill="url(#paint0_linear_fire)"/>
      <defs>
        <linearGradient id="paint0_linear_fire" x1="-8.19035" y1="30.3392" x2="17.6349" y2="21.6662" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#0388FF"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const OlderVehiclesIcon = () => (
  <div className={styles.iconWrapper}>
    <rect x="27.2734" y="40.5469" width="61.3049" height="75.7613" fill="url(#paint0_linear_older)" fillOpacity="0.48"/>
    <path d="M27 83.7496V88.9195C27 90.5764 28.3431 91.9195 30 91.9195H148.032C149.671 91.9195 151 90.5906 151 88.9514V75.4004C151 73.5066 149.672 71.8723 147.818 71.485L131.719 68.1214C130.96 67.9627 130.286 67.5299 129.825 66.9056C122.477 56.9427 110.834 51.0625 98.4543 51.0625H87.937C75.9653 51.0625 64.5356 56.0534 56.3981 64.8342L54.4273 66.9608C53.8731 67.5588 53.1654 67.9931 52.3812 68.2164L34.987 73.1703C30.2602 74.5165 27 78.8349 27 83.7496Z" fill="#000822"/>
    <ellipse cx="60.7811" cy="91.9123" rx="11.0018" ry="11.6936" fill="#000822"/>
    <ellipse cx="122.76" cy="91.9123" rx="11.0018" ry="11.6936" fill="#000822"/>
    <ellipse className={styles.recycleCircle} cx="110.559" cy="47.0893" rx="22.5586" ry="22.5424" fill="url(#paint1_linear_older)"/>
    <path d="M120.324 45.3125C120.324 42.783 119.411 40.3386 117.753 38.4286C116.094 36.5186 113.802 35.2714 111.298 34.9164C108.793 34.5614 106.245 35.1224 104.121 36.4963C101.997 37.8702 100.441 39.9646 99.7379 42.3944L101.653 42.9484C102.222 40.9798 103.483 39.283 105.204 38.17C106.924 37.0569 108.989 36.6024 111.018 36.89C113.047 37.1776 114.904 38.188 116.248 39.7354C117.591 41.2828 118.331 43.2632 118.331 45.3125H120.324Z" stroke="#000822" strokeWidth="2"/>
    <path d="M115.559 43.5547L118.224 45.687C118.743 46.1022 119.481 46.1022 120 45.687L122.665 43.5547" stroke="#000822" strokeWidth="2"/>
    <path d="M100.324 48.3125C100.324 50.842 101.237 53.2864 102.896 55.1964C104.554 57.1064 106.846 58.3536 109.351 58.7086C111.855 59.0636 114.403 58.5026 116.527 57.1287C118.651 55.7548 120.208 53.6604 120.911 51.2306L118.985 50.6734C118.416 52.6393 117.157 54.3338 115.438 55.4453C113.72 56.5568 111.658 57.0107 109.632 56.7235C107.606 56.4363 105.751 55.4273 104.41 53.882C103.068 52.3367 102.329 50.359 102.329 48.3125H100.324Z" stroke="#000822" strokeWidth="2"/>
    <path d="M104.816 49.8516L102.151 47.7193C101.632 47.304 100.894 47.304 100.375 47.7193L97.71 49.8516" stroke="#000822" strokeWidth="2"/>
    <defs>
      <linearGradient id="paint0_linear_older" x1="57.9259" y1="40.5469" x2="57.9259" y2="116.308" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0388FF" stopOpacity="0"/>
        <stop offset="1" stopColor="#0388FF"/>
      </linearGradient>
      <linearGradient id="paint1_linear_older" x1="72.4787" y1="63.379" x2="117.275" y2="40.7161" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" stopOpacity="0.3"/>
        <stop offset="1" stopColor="#0388FF"/>
      </linearGradient>
    </defs>
  </div>
);

const getIcon = (type) => {
  switch (type) {
    case "thirdPartyCar":
      return <ThirdPartyCarIcon />;
    case "thirdPartyProperty":
      return <ThirdPartyPropertyIcon />;
    case "medicalExpenses":
      return <MedicalExpensesIcon />;
    case "attemptedTheft":
      return <AttemptedTheftIcon />;
    case "fire":
      return <FireIcon />;
    case "olderVehicles":
      return <OlderVehiclesIcon />;
    default:
      return null;
  }
};

const InsuranceTypes = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h2 className={`${styles.heading} ${plusJakartaSans.className}`}>
          Comprehensive <span className={styles.highlight}>Third Party Coverage</span>
        </h2>
        <p className={`${styles.subtitle} ${poppins.className}`}>
          Complete protection for third party incidents and more
        </p>
      </div>

      <div className={styles.grid}>
        {insuranceData.map((insurance, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.iconContainer}>{getIcon(insurance.icon)}</div>

            <div className={styles.content}>
              <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
                {insurance.title}
              </h3>

              <ul className={`${styles.featureList} ${poppins.className}`}>
                {insurance.features.map((feature, idx) => (
                  <li key={idx} className={styles.feature}>
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsuranceTypes;
