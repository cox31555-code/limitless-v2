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
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.checkIcon}
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
    title: "Learner driver insurance",
    icon: "learner",
    features: [
      "Cover from only 80p* a day.",
      "Cover on your own car.",
      "Start earning your No Claims Bonus.",
    ],
  },
  {
    title: "Young driver insurance",
    icon: "young",
    features: [
      "Cover on your own car.",
      "No night-time curfews.",
      "Start earning your No Claims Bonus.",
    ],
  },
  {
    title: "Convicted insurance",
    icon: "convicted",
    features: [
      "Competitive rates.",
      "Cover for drivers with convictions.",
      "All motoring convictions considered.",
    ],
  },
  {
    title: "Motorcycle insurance",
    icon: "motorcycle",
    features: [
      "Cover from only 80p* a day.",
      "Cover on your own car.",
      "Start earning your No Claims Bonus.",
    ],
  },
  {
    title: "Car insurance",
    icon: "car",
    features: [
      "Cover on your own car.",
      "No night-time curfews.",
      "Start earning your No Claims Bonus.",
    ],
  },
  {
    title: "Van insurance",
    icon: "van",
    features: [
      "Competitive rates.",
      "Cover for drivers with convictions.",
      "All motoring convictions considered.",
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
    width="118"
    height="157"
    viewBox="0 0 118 157"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.convictedSvg}
  >
    <rect
      width="71.6083"
      height="114.445"
      fill="url(#paint0_linear_convicted)"
      fillOpacity="0.48"
    />
    <path
      d="M24.4355 40.4395H81.1987L104.643 59.6758V120.647H24.4355V40.4395Z"
      fill="#000822"
    />
    <path
      d="M81.1689 59.6596L81.168 40.2812L104.675 59.6596H81.1689Z"
      fill="#0388FF"
    />
    <path
      d="M117.491 95.0623L115.88 98.6337C113.305 104.348 112.973 110.822 114.952 116.769C119.024 129.009 113.402 142.373 101.805 148.021L96.8411 150.439C93.6641 151.987 90.6108 153.775 87.708 155.79L87.1294 156.195C84.0546 154.015 80.8065 152.09 77.4177 150.439L72.454 148.021C60.8569 142.373 55.2352 129.009 59.307 116.769C61.2855 110.822 60.9542 104.348 58.3783 98.6337L56.7676 95.0623L62.384 89.125C69.8255 92.8772 78.5695 93.0429 86.1476 89.5748L87.1294 89.125L88.1112 89.5748C95.6892 93.0429 104.433 92.8772 111.875 89.125L117.491 95.0623Z"
      fill="url(#paint1_linear_convicted)"
    />
    <path
      d="M117.491 95.0623L115.88 98.6337C113.305 104.348 112.973 110.822 114.952 116.769C119.024 129.009 113.402 142.373 101.805 148.021L96.8411 150.439C93.6641 151.987 90.6108 153.775 87.708 155.79L87.1294 156.195C84.0546 154.015 80.8065 152.09 77.4177 150.439L72.454 148.021C60.8569 142.373 55.2352 129.009 59.307 116.769C61.2855 110.822 60.9542 104.348 58.3783 98.6337L56.7676 95.0623L62.384 89.125C69.8255 92.8772 78.5695 93.0429 86.1476 89.5748L87.1294 89.125L88.1112 89.5748C95.6892 93.0429 104.433 92.8772 111.875 89.125L117.491 95.0623Z"
      fill="url(#paint2_linear_convicted)"
    />
    <path
      d="M86.6791 107.833L89.6062 116.909L99.1427 116.888L91.4153 122.477L94.382 131.54L86.6791 125.918L78.9763 131.54L81.943 122.477L74.2156 116.888L83.752 116.909L86.6791 107.833Z"
      fill="#000822"
    />
    <path
      d="M47.4824 56.4658V66.2759"
      stroke="#0388FF"
      strokeWidth="2.7"
      strokeLinecap="round"
    />
    <circle cx="47.483" cy="70.6852" r="1.44198" fill="#0388FF" />
    <circle
      cx="47.483"
      cy="63.2838"
      r="13.9358"
      stroke="#0388FF"
      strokeWidth="2.7"
    />
    <defs>
      <linearGradient
        id="paint0_linear_convicted"
        x1="35.8041"
        y1="0"
        x2="35.8041"
        y2="114.445"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0388FF" stopOpacity="0" />
        <stop offset="1" stopColor="#0388FF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_convicted"
        x1="35.5714"
        y1="153.112"
        x2="100.523"
        y2="126.111"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.3" />
        <stop offset="1" stopColor="#0388FF" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_convicted"
        x1="35.8773"
        y1="146.894"
        x2="98.4848"
        y2="118.238"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.3" />
        <stop offset="1" stopColor="#0388FF" />
      </linearGradient>
    </defs>
  </svg>
);

const MotorcycleIcon = () => (
  <svg
    width="138"
    height="102"
    viewBox="0 0 138 102"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect y="1.02832" width="64.7046" height="70.2762" fill="url(#paint0_linear_1683_5706)" fillOpacity="0.48"/>
    <path d="M80.6657 42.3146H131.567C133.814 42.3146 135.635 44.1356 135.635 46.3819C135.635 48.6282 133.814 50.4492 131.567 50.4492H113.907C113.244 50.4492 112.589 50.6011 111.993 50.8934L102.734 55.436C101.561 56.0116 100.557 56.8815 99.8204 57.9607L86.6299 77.2819C85.2213 79.3453 82.8842 80.5795 80.3859 80.5795H71.7183C68.0544 80.5795 64.9179 77.9524 64.2752 74.3453L62.0917 62.091C61.4348 58.4045 58.1784 55.7543 54.4354 55.8599L38.3286 56.3142L41.8892 42.3146L42.6547 39.4124C43.5081 36.1772 46.3865 33.8877 49.7308 33.784L60.9934 33.4348C62.3994 33.3913 63.7897 33.7408 65.0079 34.4441L76.8856 41.3017C78.0349 41.9653 79.3386 42.3146 80.6657 42.3146Z" fill="#000822"/>
    <circle cx="33.1193" cy="77.6018" r="15.3792" stroke="#000822" strokeWidth="6.48033"/>
    <mask id="path-4-inside-1_1683_5706" fill="white">
      <path d="M8.95467 61.8401C10.5013 58.8389 12.6238 56.1716 15.2012 53.9906C17.7786 51.8096 20.7604 50.1577 23.9762 49.129C27.192 48.1004 30.579 47.7153 33.9436 47.9956C37.3083 48.2759 40.5848 49.2162 43.5861 50.7628L40.5517 56.6513C38.3237 55.5033 35.8914 54.8052 33.3937 54.5971C30.8959 54.3891 28.3816 54.675 25.9944 55.4386C23.6071 56.2022 21.3937 57.4285 19.4804 59.0475C17.567 60.6666 15.9914 62.6466 14.8433 64.8746L8.95467 61.8401Z"/>
    </mask>
    <path d="M8.95467 61.8401C10.5013 58.8389 12.6238 56.1716 15.2012 53.9906C17.7786 51.8096 20.7604 50.1577 23.9762 49.129C27.192 48.1004 30.579 47.7153 33.9436 47.9956C37.3083 48.2759 40.5848 49.2162 43.5861 50.7628L40.5517 56.6513C38.3237 55.5033 35.8914 54.8052 33.3937 54.5971C30.8959 54.3891 28.3816 54.675 25.9944 55.4386C23.6071 56.2022 21.3937 57.4285 19.4804 59.0475C17.567 60.6666 15.9914 62.6466 14.8433 64.8746L8.95467 61.8401Z" stroke="#000822" strokeWidth="12.9607" mask="url(#path-4-inside-1_1683_5706)"/>
    <circle cx="117.457" cy="76.2718" r="16.7113" stroke="#000822" strokeWidth="6.48033"/>
    <rect x="75.2988" y="73.6045" width="43.9466" height="6.9866" rx="3.4933" fill="#000822"/>
    <path d="M32.2571 79.6844C30.3935 79.1851 29.2876 77.2696 29.7869 75.406L44.9911 18.6635L51.7396 20.4717L36.5355 77.2143C36.0361 79.0778 34.1206 80.1837 32.2571 79.6844Z" fill="#000822"/>
    <path d="M44.9453 18.6621H59.6125C61.5418 18.6621 63.1058 20.2261 63.1058 22.1554C63.1058 24.0847 61.5418 25.6487 59.6125 25.6487H44.9453V18.6621Z" fill="#000822"/>
    <path d="M27.9102 33.0465C27.9102 31.541 29.4115 30.4973 30.8226 31.0216L42.0553 35.1953V43.7989H30.0703C28.8773 43.7989 27.9102 42.8318 27.9102 41.6388V33.0465Z" fill="#000822"/>
    <ellipse cx="110.768" cy="24.8118" rx="24.8661" ry="24.8118" fill="url(#paint1_linear_1683_5706)"/>
    <ellipse cx="110.768" cy="24.8118" rx="24.8661" ry="24.8118" fill="url(#paint2_linear_1683_5706)"/>
    <path d="M102.541 24.2577L106.334 29.4474C107.253 30.7046 109.138 30.6781 110.021 29.3957L118.141 17.6045" stroke="#000822" strokeWidth="3.71276" strokeLinecap="round"/>
    <defs>
      <linearGradient id="paint0_linear_1683_5706" x1="32.3523" y1="1.02832" x2="32.3523" y2="71.3045" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0388FF" stopOpacity="0"/>
        <stop offset="1" stopColor="#0388FF"/>
      </linearGradient>
      <linearGradient id="paint1_linear_1683_5706" x1="68.7934" y1="42.7415" x2="118.143" y2="17.7387" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" stopOpacity="0.3"/>
        <stop offset="1" stopColor="#0388FF"/>
      </linearGradient>
      <linearGradient id="paint2_linear_1683_5706" x1="68.7934" y1="42.7415" x2="118.143" y2="17.7387" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" stopOpacity="0.3"/>
        <stop offset="1" stopColor="#0388FF"/>
      </linearGradient>
    </defs>
  </svg>
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
    <div className={styles.gradientEffect}></div>
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
      <div className={styles.headerWrapper}>
        <h2 className={`${styles.heading} ${plusJakartaSans.className}`}>
          Type of motor <span className={styles.highlight}>insurance we offer</span>
        </h2>
        <p className={`${styles.subtitle} ${poppins.className}`}>
          Choose the right cover for your vehicle and budget
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
