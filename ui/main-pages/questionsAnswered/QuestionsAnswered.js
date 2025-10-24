"use client";
import React from "react";
import styles from "./questionsAnswered.module.css";
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

const ProtectedNoClaimsIcon = () => (
  <svg width="122" height="119" viewBox="0 0 122 119" fill="none">
    <rect width="64.7046" height="70.2762" fill="url(#paint0_linear_protected)" fillOpacity="0.48" />
    <path d="M14 0.347656H58.7073L77.173 15.4984V73.5938H14V0.347656Z" fill="#049CFF" />
    <path d="M58.6882 15.4861L58.6875 0.223438L77.202 15.4861H58.6882Z" fill="#07102D" />
    <path d="M22.8828 17.4961H46.8799" stroke="#07102D" strokeWidth="3.30359" strokeLinecap="round" />
    <path d="M22.8828 24.8789H37.0439" stroke="#07102D" strokeWidth="3.30359" strokeLinecap="round" />
    <ellipse cx="106.719" cy="105.419" rx="28.9219" ry="28.8587" fill="#0388FF" />
    <path d="M99.7422 112.403L113.701 98.4355" stroke="#000822" strokeWidth="4.17079" strokeLinecap="round" />
    <path d="M113.7 112.404L99.7422 98.4365" stroke="#000822" strokeWidth="4.17079" strokeLinecap="round" />
    <defs>
      <linearGradient id="paint0_linear_protected" x1="32.3523" y1="0" x2="32.3523" y2="70.2762" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0388FF" stopOpacity="0" />
        <stop offset="1" stopColor="#0388FF" />
      </linearGradient>
    </defs>
  </svg>
);

const GuaranteedReplacementIcon = () => (
  <svg width="98" height="90" viewBox="0 0 98 90" fill="none">
    <rect x="46.4609" y="8.29688" width="51.0764" height="81.6311" fill="url(#paint0_linear_replacement)" fillOpacity="0.48" />
    <path d="M28.9703 52.625L19.0266 52.625L15.1492 58.8713C14.7198 59.5632 14.4922 60.3613 14.4922 61.1757V73.5659C14.4922 74.7725 15.4703 75.7506 16.6768 75.7506L78.3567 75.7506C79.5632 75.7506 80.5413 74.7725 80.5413 73.5659V61.1667C80.5413 60.358 80.3169 59.5652 79.893 58.8765L76.0454 52.625L67.5335 52.625H28.9703Z" fill="#049CFF" />
    <rect x="17.7891" y="67.5" width="14.8062" height="16.4955" rx="3.27698" fill="#049CFF" />
    <rect x="62.5156" y="67.5" width="14.8062" height="16.4955" rx="3.27698" fill="#049CFF" />
    <path d="M25.3279 38.4362C26.1184 36.6645 27.8769 35.5234 29.817 35.5234H64.9696C66.8796 35.5234 68.6168 36.63 69.4242 38.361L76.0757 52.6204H19L25.3279 38.4362Z" fill="#049CFF" />
    <path d="M36.7812 69.2109H58.2465" stroke="#000822" strokeWidth="1.63849" strokeLinecap="round" />
    <rect x="20.9609" y="60.9297" width="8.45008" height="4.19977" rx="0.613217" fill="#000822" />
    <rect x="65.6953" y="60.9297" width="8.45008" height="4.19977" rx="0.613217" fill="#000822" />
    <ellipse cx="22.0507" cy="22.0349" rx="22.0507" ry="22.0349" fill="#0388FF" />
    <path d="M32.1797 20.5312C32.1797 18.0018 31.2666 15.5573 29.6082 13.6473C27.9499 11.7373 25.6578 10.4902 23.1533 10.1352C20.6489 9.78017 18.1005 10.3412 15.9767 11.715C13.8528 13.0889 12.2963 15.1833 11.5933 17.6131L13.5081 18.1671C14.0777 16.1986 15.3387 14.5018 17.0593 13.3887C18.78 12.2757 20.8446 11.8212 22.8736 12.1088C24.9026 12.3964 26.7595 13.4068 28.1031 14.9542C29.4466 16.5016 30.1864 18.482 30.1864 20.5312H32.1797Z" stroke="#000822" strokeWidth="2" />
    <path d="M27.4141 18.7734L30.0794 20.9057C30.5985 21.321 31.336 21.321 31.8551 20.9057L34.5204 18.7734" stroke="#000822" strokeWidth="2" />
    <path d="M12.1797 23.5312C12.1797 26.0607 13.0928 28.5052 14.7512 30.4152C16.4095 32.3252 18.7016 33.5723 21.206 33.9273C23.7105 34.2823 26.2589 33.7213 28.3827 32.3475C30.5066 30.9736 32.0631 28.8792 32.766 26.4494L30.8401 25.8922C30.2714 27.858 29.0121 29.5525 27.2938 30.664C25.5755 31.7756 23.5136 32.2295 21.4874 31.9423C19.4612 31.655 17.6068 30.646 16.2651 29.1007C14.9234 27.5554 14.1846 25.5777 14.1846 23.5312H12.1797Z" stroke="#000822" strokeWidth="2" />
    <path d="M16.6719 25.0703L14.0065 22.938C13.4875 22.5228 12.7499 22.5228 12.2308 22.938L9.5655 25.0703" stroke="#000822" strokeWidth="2" />
    <defs>
      <linearGradient id="paint0_linear_replacement" x1="71.9991" y1="8.29687" x2="71.9991" y2="89.9279" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0388FF" stopOpacity="0" />
        <stop offset="1" stopColor="#0388FF" />
      </linearGradient>
    </defs>
  </svg>
);

const HireVehicleIcon = () => (
  <svg width="132" height="113" viewBox="0 0 132 113" fill="none">
    <rect width="61.3788" height="66.6641" fill="url(#paint0_linear_hire)" fillOpacity="0.48" />
    <path d="M12.7656 0H55.175L72.6913 14.372V69.4813H12.7656V0Z" fill="#049CFF" />
    <path d="M22.7344 29.9668C22.9588 27.0769 25.0071 21.2969 31.4054 21.2969C37.8037 21.2969 39.7521 27.0769 39.9265 29.9668" stroke="#000822" strokeWidth="2.50172" strokeLinecap="round" />
    <path d="M31.3223 8.62604C34.4426 8.62604 36.9716 11.155 36.9717 14.2744C36.9717 17.3939 34.4427 19.9229 31.3223 19.9229C28.2019 19.9228 25.6729 17.3939 25.6729 14.2744C25.6729 11.155 28.202 8.62604 31.3223 8.62604Z" stroke="#000822" strokeWidth="2.50172" />
    <path d="M55.1569 14.3609L55.1562 -0.117188L72.7192 14.3609H55.1569Z" fill="#0388FF" />
    <path d="M20.4766 54.25H40.905" stroke="#000822" strokeWidth="2.95334" strokeLinecap="round" />
    <path d="M20.4766 61.4922H53.3305" stroke="#000822" strokeWidth="2.95334" strokeLinecap="round" />
    <ellipse cx="81.223" cy="48.7047" rx="24.9414" ry="24.9234" fill="#0388FF" />
    <path d="M71.5156 49.5068L75.879 55.4777C76.852 56.8086 78.848 56.7806 79.783 55.4229L88.989 42.0547" stroke="#000822" strokeWidth="3.93069" strokeLinecap="round" />
    <defs>
      <linearGradient id="paint0_linear_hire" x1="30.6894" y1="0" x2="30.6894" y2="66.6641" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0388FF" stopOpacity="0" />
        <stop offset="1" stopColor="#0388FF" />
      </linearGradient>
    </defs>
  </svg>
);

const ArrowIcon = () => (
  <svg width="27" height="28" viewBox="0 0 27 28" fill="none">
    <path
      d="M9.95312 22.7669L17.2313 15.3155C18.0908 14.4355 18.0908 12.9955 17.2313 12.1155L9.95312 4.66406"
      stroke="white"
      strokeWidth="1.63724"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const servicesData = [
  {
    title: "Protected No Claims",
    description: "Get started quickly and easily with our streamlined application process.",
    icon: "protected",
  },
  {
    title: "Guaranteed Replacement Car",
    description: "Get started quickly and easily with our streamlined application process.",
    icon: "replacement",
  },
  {
    title: "Hire Vehicle cover",
    description: "Get started quickly and easily with our streamlined application process.",
    icon: "hire",
  },
];

const getIcon = (type) => {
  switch (type) {
    case "protected":
      return <ProtectedNoClaimsIcon />;
    case "replacement":
      return <GuaranteedReplacementIcon />;
    case "hire":
      return <HireVehicleIcon />;
    default:
      return null;
  }
};

const QuestionsAnswered = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h2 className={`${styles.header} ${plusJakartaSans.className}`}>
          Need <span>more?</span>
        </h2>
        <p className={`${styles.subtitle} ${poppins.className}`}>
          Create your perfect car insurance package with our optional services.
        </p>
      </div>

      <div className={styles.wrapper}>
        {servicesData.map((service, index) => (
          <div key={index} className={styles.question}>
            <div className={styles.iconContainer}>{getIcon(service.icon)}</div>
            <div className={styles.contentContainer}>
              <div className={styles.content}>
                <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
                  {service.title}
                </h3>
                <p className={`${styles.description} ${manrope.className}`}>
                  {service.description}
                </p>
              </div>
              <div className={styles.iconWrapper}>
                <ArrowIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsAnswered;
