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
    title: "Car insurance",
    icon: "car",
    description: "Fully comprehensive cover",
    features: [
      "From just 80p per day",
      "Flexible annual or short-term cover",
      "Build your No Claims Bonus",
    ],
  },
  {
    title: "Van insurance",
    icon: "van",
    description: "Business & personal use",
    features: [
      "Quick quotes and instant cover",
      "Flexible cover options",
      "Competitive premiums",
    ],
  },
  {
    title: "Young driver insurance",
    icon: "young",
    description: "Fair rates for new drivers",
    features: [
      "No night-time restrictions",
      "Competitive premiums",
      "Earn your No Claims Bonus",
    ],
  },
  {
    title: "Learner driver insurance",
    icon: "learner",
    description: "Insure while learning",
    features: [
      "From just 80p per day",
      "Cover any supervising vehicle",
      "Build your bonus early",
    ],
  },
  {
    title: "Motorcycle insurance",
    icon: "motorcycle",
    description: "Flexible two-wheeler cover",
    features: [
      "From just 80p per day",
      "Short or long-term policies",
      "Fast claim processing",
    ],
  },
  {
    title: "Convicted driver insurance",
    icon: "convicted",
    description: "Fair cover for all drivers",
    features: [
      "All convictions considered",
      "No exclusions or penalties",
      "Quick and easy quotes",
    ],
  },
];

const LearnerIcon = () => (
  <div className={styles.iconWrapper}>
    <div className={styles.gradientBars}>
      <div className={`${styles.bar} ${styles.bar1}`}></div>
      <div className={`${styles.bar} ${styles.bar2}`}></div>
      <div className={`${styles.bar} ${styles.bar3}`}></div>
    </div>
    <svg
      width="65"
      height="80"
      viewBox="0 0 65 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.lBadge}
    >
      <path
        d="M28.866 1.75194L5.13579 12.8149C2.00286 14.2755 0 17.419 0 20.8757V51.2909C0 54.0678 1.29699 56.6852 3.50641 58.3673L26.3736 75.7763C29.4774 78.1392 33.7587 78.2038 36.9323 75.9355L61.5256 58.3582C63.8616 56.6886 65.2478 53.9939 65.2478 51.1226V20.8757C65.2478 17.419 63.245 14.2755 60.112 12.8149L36.3819 1.75194C33.9997 0.641363 31.2482 0.641364 28.866 1.75194Z"
        fill="#000822"
      />
      <path
        d="M23.6016 51.4636V22.8672H29.5511V46.2817H41.6422V51.4636H23.6016Z"
        fill="#0388FF"
      />
    </svg>
  </div>
);

const YoungDriverIcon = () => (
  <svg
    width="138"
    height="146"
    viewBox="0 0 138 146"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="58.5078"
      width="66.4209"
      height="106.07"
      fill="url(#paint0_linear_young)"
      fillOpacity="0.48"
    />
    <rect y="39.6953" width="103.795" height="66.3719" fill="#000822" />
    <path
      d="M57.9141 72.5391H88.22"
      stroke="#0388FF"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <path
      d="M57.9141 64.1641H76.7582"
      stroke="#0388FF"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <path
      d="M57.9141 81.2578H76.7582"
      stroke="#0388FF"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <path
      d="M41.2119 61.1279V70.4639C41.2119 74.7049 37.7742 78.1434 33.5332 78.1436H28.3252C23.6816 78.1436 19.9171 74.3789 19.917 69.7354V61.1279H41.2119Z"
      stroke="#0388FF"
      strokeWidth="2.6"
    />
    <path
      d="M31.1496 62.1308C27.88 60.1813 25.311 61.3185 23.427 62.1308L19.4971 69.6083C16.8014 63.5168 20.0187 51.5206 33.0625 53.6081C43.0984 55.2142 42.8343 65.371 41.5844 69.6083C41.5844 67.0344 38.4881 63.3698 37.6475 61.8045C36.3721 62.762 34.4191 64.0803 31.1496 62.1308Z"
      fill="#000822"
      stroke="#0388FF"
      strokeWidth="2.6"
    />
    <path
      d="M46.5851 92.3965C46.5851 84.9245 40.5278 78.8672 33.0557 78.8672H28.0684C20.5964 78.8672 14.5391 84.9245 14.5391 92.3965"
      stroke="#0388FF"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <ellipse cx="110.195" cy="118.206" rx="27.5622" ry="27.5424" fill="#0388FF" />
    <path
      d="M99.4688 119.102L104.164 125.526C105.301 127.082 107.634 127.05 108.727 125.462L118.778 110.867"
      stroke="#000822"
      strokeWidth="4.5956"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_young"
        x1="91.7183"
        y1="0"
        x2="91.7183"
        y2="106.07"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0388FF" stopOpacity="0" />
        <stop offset="1" stopColor="#0388FF" />
      </linearGradient>
    </defs>
  </svg>
);

const ConvictedIcon = () => (
  <svg
    width="114"
    height="121"
    viewBox="0 0 114 121"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="64.7046"
      height="70.2762"
      fill="url(#paint0_linear_convicted)"
      fillOpacity="0.48"
    />
    <path
      d="M32.3594 27.6328H77.0666L95.5321 42.7836V100.879H32.3594V27.6328Z"
      fill="#000822"
    />
    <path
      d="M77.0476 42.7704L77.0469 27.5078L95.5614 42.7704H77.0476Z"
      fill="#0388FF"
    />
    <path
      d="M40.4922 47.3516H62.0275"
      stroke="#0388FF"
      strokeWidth="3.11337"
      strokeLinecap="round"
    />
    <path
      d="M40.4922 54.9844H75.1263"
      stroke="#0388FF"
      strokeWidth="3.11337"
      strokeLinecap="round"
    />
    <path
      d="M82.3941 60.1317L69.3925 66.1625C64.8987 68.2469 62.0234 72.7502 62.0234 77.7038V95.0221C62.0234 99.0053 63.8889 102.759 67.064 105.164L79.4913 114.577C83.9215 117.933 90.0172 118.025 94.5463 114.804L108.122 105.15C111.478 102.763 113.472 98.8995 113.472 94.7814V77.7038C113.472 72.7502 110.596 68.2469 106.103 66.1625L93.1011 60.1317C89.7058 58.5568 85.7894 58.5568 82.3941 60.1317Z"
      fill="#000822"
    />
    <path
      d="M79.2812 86.1395L84.053 92.6478C85.2101 94.226 87.5779 94.1927 88.6902 92.5826L98.9047 77.7969"
      stroke="#0388FF"
      strokeWidth="4.67468"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_convicted"
        x1="32.3523"
        y1="0"
        x2="32.3523"
        y2="70.2762"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0388FF" stopOpacity="0" />
        <stop offset="1" stopColor="#0388FF" />
      </linearGradient>
    </defs>
  </svg>
);

const MotorcycleIcon = () => (
  <div className={styles.motorcycleWrapper}>
    <svg
      width="96"
      height="101"
      viewBox="0 0 96 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="64.7046"
        height="70.2762"
        fill="url(#paint0_linear_motorcycle)"
        fillOpacity="0.48"
      />
      <path
        d="M32.3594 27.6328H77.0666L95.5321 42.7836V100.879H32.3594V27.6328Z"
        fill="#000822"
      />
      <path
        d="M77.0476 42.7704L77.0469 27.5078L95.5614 42.7704H77.0476Z"
        fill="#0388FF"
      />
      <path
        d="M40.4922 47.3516H62.0275"
        stroke="#0388FF"
        strokeWidth="3.11337"
        strokeLinecap="round"
      />
      <path
        d="M40.4922 54.9844H75.1263"
        stroke="#0388FF"
        strokeWidth="3.11337"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_motorcycle"
          x1="32.3523"
          y1="0"
          x2="32.3523"
          y2="70.2762"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0388FF" stopOpacity="0" />
          <stop offset="1" stopColor="#0388FF" />
        </linearGradient>
      </defs>
    </svg>
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.checkBadge}
    >
      <ellipse cx="24.8661" cy="24.8118" rx="24.8661" ry="24.8118" fill="#0388FF" />
      <path
        d="M16.6406 24.2567L20.4336 29.4464C21.3524 30.7036 23.2374 30.6771 24.1206 29.3947L32.2405 17.6035"
        stroke="#000822"
        strokeWidth="3.71276"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

const CarIcon = () => (
  <div className={styles.carWrapper}>
    <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.carCheck}
    >
      <ellipse cx="22.2674" cy="22.2514" rx="22.2674" ry="22.2514" fill="#0388FF" />
      <path
        d="M13.6016 22.9657L17.3946 28.1554C18.3134 29.4126 20.1984 29.3861 21.0815 28.1037L29.2014 16.3125"
        stroke="#000822"
        strokeWidth="3.71276"
        strokeLinecap="round"
      />
    </svg>
    <svg
      width="93"
      height="68"
      viewBox="0 0 93 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.carVehicle}
    >
      <path
        d="M20.2981 23.9766L6.35714 23.9766L0.921175 32.7338C0.319058 33.7038 0 34.8228 0 35.9645V53.3354C0 55.027 1.37128 56.3983 3.06284 56.3983L89.5369 56.3982C91.2285 56.3982 92.5998 55.0269 92.5998 53.3354V35.9518C92.5998 34.8181 92.2851 33.7065 91.6908 32.741L86.2965 23.9766L74.363 23.9766H20.2981Z"
        fill="#000822"
      />
      <rect x="4.61719" y="44.8359" width="20.758" height="23.1265" rx="4.59428" fill="#000822" />
      <rect x="67.3281" y="44.8359" width="20.758" height="23.1265" rx="4.59428" fill="#000822" />
      <path
        d="M15.1842 4.0837C16.2923 1.59978 18.7578 0 21.4777 0H70.761C73.4389 0 75.8744 1.55132 77.0064 3.97817L86.3317 23.9697H6.3125L15.1842 4.0837Z"
        fill="#000822"
      />
      <path
        d="M31.25 47.2344H61.3439"
        stroke="#0388FF"
        strokeWidth="2.29714"
        strokeLinecap="round"
      />
      <ellipse cx="15.1172" cy="57.3359" rx="6" ry="3" fill="#0388FF" />
      <ellipse cx="77.3281" cy="57.3359" rx="6" ry="3" fill="#0388FF" />
    </svg>
    <div className={styles.gradientEffect}></div>
  </div>
);

const VanIcon = () => (
  <svg
    width="137"
    height="100"
    viewBox="0 0 137 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      y="8.90625"
      width="67.7737"
      height="90.16"
      fill="url(#paint0_linear_van)"
      fillOpacity="0.48"
    />
    <path
      d="M15.7112 60.699L15.711 84.463C15.711 86.0771 17.0194 87.3856 18.6335 87.3856H124.219C125.833 87.3856 127.142 86.0771 127.142 84.4631L127.142 54.1929L127.142 37.8134C127.142 35.3923 125.179 33.4297 122.758 33.4297H99.1484H52.7611C51.5843 33.4297 50.457 33.9028 49.6326 34.7426L37.6991 46.9C37.3304 47.2756 36.897 47.5818 36.4197 47.8038L18.6684 56.0618C16.8647 56.9009 15.7112 58.7097 15.7112 60.699Z"
      fill="#000822"
    />
    <ellipse cx="40.3874" cy="87.3889" rx="10.8327" ry="11.5139" fill="#000822" />
    <ellipse cx="102.473" cy="87.3889" rx="10.8327" ry="11.5139" fill="#000822" />
    <path
      d="M40.3906 58.3125L127.149 58.3125"
      stroke="#0388FF"
      strokeWidth="3.45013"
    />
    <path
      d="M71.4297 87.3828L71.4297 33.4269"
      stroke="#0388FF"
      strokeWidth="3.45013"
    />
    <ellipse cx="113.311" cy="23.1924" rx="23.2091" ry="23.1924" fill="#0388FF" />
    <path
      d="M104.281 23.9423L108.235 29.3516C109.192 30.6619 111.157 30.6343 112.078 29.2976L120.541 17.0078"
      stroke="#000822"
      strokeWidth="3.86977"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_van"
        x1="33.8868"
        y1="8.90625"
        x2="33.8868"
        y2="99.0662"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0388FF" stopOpacity="0" />
        <stop offset="1" stopColor="#0388FF" />
      </linearGradient>
    </defs>
  </svg>
);

const getIcon = (type) => {
  switch (type) {
    case "learner":
      return <LearnerIcon />;
    case "young":
      return <YoungDriverIcon />;
    case "convicted":
      return <ConvictedIcon />;
    case "motorcycle":
      return <MotorcycleIcon />;
    case "car":
      return <CarIcon />;
    case "van":
      return <VanIcon />;
    default:
      return null;
  }
};

const InsuranceTypes = () => {
  return (
    <div className={styles.container}>
      <h2 className={`${styles.heading} ${plusJakartaSans.className}`}>
        Type of motor <span className={styles.highlight}>insurance we offer</span>
      </h2>

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
