import styles from "./page.module.css";
import Form from "./_components/form/Form";
import React, { Suspense } from "react";

export const metadata = {
  title: "Login | Limitless Cover",
};

const LoginPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.darkBackground} />
      
      <div className={styles.mainContainer}>
        <div className={styles.leftSection}>
          <div className={styles.gradientOverlay} />
          <svg 
            className={styles.logo} 
            width="180" 
            height="185" 
            viewBox="0 0 180 185" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Limitless Cover Logo"
          >
            <rect width="180" height="185" rx="21.1893" fill="#0388FF" />
            <path 
              d="M118.292 96.5994L82.6119 112.637L82.6119 134.02L79.0589 130.462L67.8873 119.274L61.7233 113.101L82.6128 103.701L97.3874 97.0635L127.846 83.3599C135.58 79.8678 137.447 69.7056 131.449 63.698L104.311 36.5199C96.3123 28.5092 82.6119 34.186 82.6119 45.5072V62.6205L45.0967 79.5022V95.7052L59.8714 89.068L93.321 74.0401L97.4857 72.1702V55.9341L97.3866 55.9834V50.5052L118.292 71.4414L109.021 75.6122L109.038 75.6453L69.4901 93.4704L69.4571 93.4043L52.1706 101.183C51.8732 101.316 51.592 101.448 51.3277 101.597C47.7247 103.55 45.5601 107.026 45.0976 110.733C44.6511 114.275 45.7253 118.015 48.5515 120.845L75.7041 148.022C83.7031 156.032 97.3866 150.356 97.3866 139.018V122.203L118.292 112.802L135 105.305V89.0689L118.292 96.5994Z" 
              fill="#FEFEFE" 
            />
          </svg>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.illustrationContainer}>
            <svg 
              className={styles.illustration}
              viewBox="0 0 782 622" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Limitless Cover Package Illustration"
            >
              <g opacity="0.58">
                <rect opacity="0.4" x="-116" y="527.497" width="166.403" height="561.727" transform="rotate(-90 -116 527.497)" fill="url(#paint0_linear_1695_5918)"/>
                <rect opacity="0.36" x="73.3789" y="194.703" width="166.403" height="372.348" transform="rotate(-90 73.3789 194.703)" fill="url(#paint1_linear_1695_5918)"/>
                <rect opacity="0.34" x="-39.6602" y="361.096" width="166.403" height="485.384" transform="rotate(-90 -39.6602 361.096)" fill="url(#paint2_linear_1695_5918)"/>
              </g>
              <path d="M490.848 157.14L690.175 252.051L490.848 352.929L291.656 252.057L490.848 157.14Z" fill="#000822"/>
              <path d="M490.848 157.14L690.175 252.051L490.848 352.929L291.656 252.057L490.848 157.14Z" fill="url(#paint3_linear_1695_5918)"/>
              <g filter="url(#filter0_f_1695_5918)">
                <path d="M564.977 547.444L528.238 74.2998L460.336 74.2998L417.272 547.444L564.977 547.444Z" fill="url(#paint4_linear_1695_5918)"/>
              </g>
              <path d="M291.555 505.045V251.979L490.817 352.894V606.088L291.555 505.045Z" fill="#000822"/>
              <path d="M345.808 508.928L313.992 493.589" stroke="#0388FF" strokeWidth="6.1296" strokeLinecap="round"/>
              <path d="M690.077 505.31V251.979L490.82 352.894V606.078L690.077 505.31Z" fill="#000822"/>
              <path d="M490.916 352.865L291.587 251.991L253 370.104L450.163 475.799L490.916 352.865Z" fill="url(#paint5_linear_1695_5918)"/>
              <path d="M490.828 352.895L689.915 251.917L729.246 370.105L532.084 475.8L490.828 352.895Z" fill="#000822"/>
              <path d="M490.828 352.895L689.915 251.917L729.246 370.105L532.084 475.8L490.828 352.895Z" fill="url(#paint6_linear_1695_5918)"/>
              <path d="M610 380.603H731.678L781.935 421.838V569.671H610L610 380.603Z" fill="url(#paint7_linear_1695_5918)"/>
              <path d="M610 380.603H731.678L781.935 421.838V569.671H610L610 380.603Z" fill="url(#paint8_linear_1695_5918)"/>
              <path d="M731.611 421.84L731.609 380.3L782 421.84H731.611Z" fill="#000822"/>
              <path d="M637.289 528.872L647.378 542.677C649.43 545.486 653.641 545.427 655.613 542.562L676.579 512.112" stroke="#000822" strokeWidth="8" strokeLinecap="round"/>
              <rect x="410" y="74.2998" width="180" height="185" rx="21.1893" fill="#0388FF"/>
              <path d="M528.292 170.899L492.612 186.937V208.32L489.059 204.762L477.887 193.574L471.723 187.401L492.613 178L507.387 171.363L537.846 157.66C545.58 154.168 547.447 144.005 541.449 137.998L514.311 110.82C506.312 102.809 492.612 108.486 492.612 119.807V136.92L455.097 153.802V170.005L469.871 163.368L503.321 148.34L507.486 146.47V130.234L507.387 130.283V124.805L528.292 145.741L519.021 149.912L519.038 149.945L479.49 167.77L479.457 167.704L462.171 175.483C461.873 175.616 461.592 175.748 461.328 175.897C457.725 177.85 455.56 181.326 455.098 185.033C454.651 188.575 455.725 192.315 458.551 195.145L485.704 222.321C493.703 230.332 507.387 224.655 507.387 213.318V196.503L528.292 187.102L545 179.605V163.369L528.292 170.899Z" fill="#FEFEFE"/>
              <defs>
                <filter id="filter0_f_1695_5918" x="342.973" y="-0.000198364" width="296.303" height="621.745" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feGaussianBlur stdDeviation="37.15" result="effect1_foregroundBlur_1695_5918"/>
                </filter>
                <linearGradient id="paint0_linear_1695_5918" x1="-32.7987" y1="527.497" x2="-32.7987" y2="1089.22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0388FF" stopOpacity="0"/>
                  <stop offset="0.6" stopColor="#0388FF"/>
                </linearGradient>
                <linearGradient id="paint1_linear_1695_5918" x1="156.58" y1="194.703" x2="156.58" y2="567.051" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0388FF" stopOpacity="0"/>
                  <stop offset="0.6" stopColor="#0388FF"/>
                </linearGradient>
                <linearGradient id="paint2_linear_1695_5918" x1="43.5412" y1="361.096" x2="43.5412" y2="698.533" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0388FF" stopOpacity="0"/>
                  <stop offset="1" stopColor="#0388FF"/>
                </linearGradient>
                <linearGradient id="paint3_linear_1695_5918" x1="490.916" y1="311.462" x2="490.916" y2="-15.3031" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0388FF" stopOpacity="0"/>
                  <stop offset="1" stopColor="#0388FF" stopOpacity="0.46"/>
                </linearGradient>
                <linearGradient id="paint4_linear_1695_5918" x1="491.124" y1="547.444" x2="491.124" y2="74.2998" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0388FF"/>
                  <stop offset="1" stopColor="#000822"/>
                </linearGradient>
                <linearGradient id="paint5_linear_1695_5918" x1="253" y1="363.895" x2="524.74" y2="381.596" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#07102D"/>
                  <stop offset="1" stopColor="#0388FF"/>
                </linearGradient>
                <linearGradient id="paint6_linear_1695_5918" x1="729.246" y1="363.859" x2="456.936" y2="381.628" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#07102D"/>
                  <stop offset="1" stopColor="#0388FF"/>
                </linearGradient>
                <linearGradient id="paint7_linear_1695_5918" x1="550.851" y1="545.825" x2="721.614" y2="459.497" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#27A2FF"/>
                  <stop offset="1" stopColor="#0388FF"/>
                </linearGradient>
                <linearGradient id="paint8_linear_1695_5918" x1="550.851" y1="545.825" x2="721.614" y2="459.497" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#27A2FF"/>
                  <stop offset="1" stopColor="#0388FF"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
