import React from "react";
import styles from "./loadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.spinner}>
      <svg
        className={styles.spinnerSvg}
        viewBox="0 0 136 136"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="fillGradient">
            <stop offset="0%" stopColor="#0270CC" />
          </linearGradient>
          <linearGradient id="darkGradient">
            <stop offset="0%" stopColor="#000822" stopOpacity="1" />
          </linearGradient>
        </defs>
        <g transform="translate(23, 19)">
          <path className={styles.pathFill} d="M9.84562 28.5201V20.0371L0.0507812 24.4543V32.9316L7.76311 29.4579L9.84562 28.5201Z" />
          <path className={styles.pathFill} d="M17.7799 24.9458V16.458L9.84375 20.037L9.84375 28.5199L17.7799 24.9458Z" />
          <path className={styles.pathFill} d="M25.2272 21.5928L17.7812 24.9461V16.4583L19.6399 15.6201L25.2272 21.5928Z" />
          <path className={styles.pathFill} d="M27.353 12.1465L19.6406 15.6194V15.6202L25.228 21.5928L27.404 20.6125V12.1182L27.353 12.1465Z" />
          <path className={styles.pathFill} d="M38.2665 20.2324L37.6797 20.497L43.2588 26.4771C45.7321 25.3601 47.0566 22.9331 46.9932 20.497L38.2665 20.2324Z" />
          <path className={styles.pathFill} d="M30.6367 23.6966L36.0602 29.7212L43.2586 26.4772L37.6794 20.4971L33.4269 22.4142L33.4383 22.4312L30.6367 23.6966Z" />
          <path className={styles.pathFill} d="M30.6387 23.6963L21.7148 27.7272L27.3543 33.6452L36.0622 29.7208L30.6387 23.6963Z" />
          <path className={styles.pathFill} d="M12.7878 31.7585L12.7708 31.7245L8.73047 33.5455L14.1846 39.5785L19.6388 37.1191L27.3511 33.6455L21.7117 27.7275L12.7878 31.7585Z" />
          <path className={styles.pathFill} d="M8.73336 42.0382L14.1875 39.5788L8.73336 33.5459L3.74669 35.7935C3.59369 35.8615 3.44635 35.9295 3.30469 36.0088L8.73336 42.0382Z" />
          <path className={styles.pathFill} d="M11.9496 45.2681L8.73089 42.0381L1.85156 46.0841L5.21249 49.4544L11.9496 45.2681Z" />
          <path className={styles.pathFill} d="M17.7829 51.1212L11.9519 45.2676L5.21484 49.4539L11.9519 56.2098L17.7829 51.1212Z" />
          <path className={styles.pathFill} d="M16.0292 60.3011L11.9492 56.2097L17.7802 51.1211L19.6332 52.9854V62.1801C18.3506 61.9728 17.0935 61.3697 16.0292 60.3011Z" />
          <path className={styles.pathFill} d="M19.6328 62.181C23.0691 62.7365 26.688 60.4511 27.2698 56.6668L19.6328 52.9863V62.181Z" />
          <path className={styles.pathFill} d="M27.3508 50.4842L19.6328 47.3926V52.9856L27.2698 56.666C27.323 56.3203 27.3508 55.962 27.3508 55.5923V50.4842Z" />
          <path className={styles.pathFill} d="M27.3508 46.7921L19.6328 41.7998V47.3928L27.3508 50.4844V46.7921Z" />
          <path className={styles.pathFill} d="M28.9488 37.6035L19.6328 41.7997L27.3508 46.792L36.0613 42.8664L28.9488 37.6035Z" />
          <path className={styles.pathFill} d="M35.5316 34.6387L28.9492 37.6035L36.0617 42.8664L38.2652 41.8734L42.2385 40.088L35.5316 34.6387Z" />
          <path className={styles.pathFill} d="M35.5312 34.639L42.2382 40.0883L46.9915 37.9523V29.458L38.2649 33.3963V33.4077L35.5312 34.639Z" />
          <path className={styles.pathFill} d="M1.85266 46.0837L8.732 42.0377L0.0506627 40.791C-0.181671 42.644 0.37933 44.599 1.85266 46.0837Z" />
          <path className={styles.pathFill} d="M0.0507812 40.7915L8.73211 42.0381L3.30345 36.0088C1.42211 37.0288 0.294448 38.8478 0.0507812 40.7915Z" />
          <path className={styles.pathFill} d="M38.2656 20.2327L46.9923 20.4972C46.9521 18.9537 46.3547 17.4065 45.1393 16.1867L42.2414 13.2783L38.2656 20.2327Z" />
          <path className={styles.pathFill} d="M38.2685 20.2322L32.4805 14.4231L36.1992 7.21094L42.2443 13.2778L38.2695 20.2304L38.2685 20.2322Z" />
          <path className={styles.pathFill} d="M32.4775 14.4231L36.1962 7.211L30.9669 1.96289L27.3516 9.27854L27.3516 9.27856L32.4775 14.4231Z" />
          <path className={styles.pathFill} d="M27.3529 9.27886L30.9683 1.96321C26.792 -2.23012 19.6406 0.739211 19.6406 6.66655L27.3529 9.27886Z" />
          <path className={styles.pathFill} d="M27.353 9.27933V12.1467L19.6406 15.6196V6.66699L27.353 9.27933Z" />
        </g>
        <g className={styles.whiteOverlay} transform="translate(23, 19)">
          <path className={styles.pathWhite} d="M9.84562 28.5201V20.0371L0.0507812 24.4543V32.9316L7.76311 29.4579L9.84562 28.5201Z" />
          <path className={styles.pathWhite} d="M17.7799 24.9458V16.458L9.84375 20.037L9.84375 28.5199L17.7799 24.9458Z" />
          <path className={styles.pathWhite} d="M25.2272 21.5928L17.7812 24.9461V16.4583L19.6399 15.6201L25.2272 21.5928Z" />
          <path className={styles.pathWhite} d="M27.353 12.1465L19.6406 15.6194V15.6202L25.228 21.5928L27.404 20.6125V12.1182L27.353 12.1465Z" />
          <path className={styles.pathWhite} d="M38.2665 20.2324L37.6797 20.497L43.2588 26.4771C45.7321 25.3601 47.0566 22.9331 46.9932 20.497L38.2665 20.2324Z" />
          <path className={styles.pathWhite} d="M30.6367 23.6966L36.0602 29.7212L43.2586 26.4772L37.6794 20.4971L33.4269 22.4142L33.4383 22.4312L30.6367 23.6966Z" />
          <path className={styles.pathWhite} d="M30.6387 23.6963L21.7148 27.7272L27.3543 33.6452L36.0622 29.7208L30.6387 23.6963Z" />
          <path className={styles.pathWhite} d="M12.7878 31.7585L12.7708 31.7245L8.73047 33.5455L14.1846 39.5785L19.6388 37.1191L27.3511 33.6455L21.7117 27.7275L12.7878 31.7585Z" />
          <path className={styles.pathWhite} d="M8.73336 42.0382L14.1875 39.5788L8.73336 33.5459L3.74669 35.7935C3.59369 35.8615 3.44635 35.9295 3.30469 36.0088L8.73336 42.0382Z" />
          <path className={styles.pathWhite} d="M11.9496 45.2681L8.73089 42.0381L1.85156 46.0841L5.21249 49.4544L11.9496 45.2681Z" />
          <path className={styles.pathWhite} d="M17.7829 51.1212L11.9519 45.2676L5.21484 49.4539L11.9519 56.2098L17.7829 51.1212Z" />
          <path className={styles.pathWhite} d="M16.0292 60.3011L11.9492 56.2097L17.7802 51.1211L19.6332 52.9854V62.1801C18.3506 61.9728 17.0935 61.3697 16.0292 60.3011Z" />
          <path className={styles.pathWhite} d="M19.6328 62.181C23.0691 62.7365 26.688 60.4511 27.2698 56.6668L19.6328 52.9863V62.181Z" />
          <path className={styles.pathWhite} d="M27.3508 50.4842L19.6328 47.3926V52.9856L27.2698 56.666C27.323 56.3203 27.3508 55.962 27.3508 55.5923V50.4842Z" />
          <path className={styles.pathWhite} d="M27.3508 46.7921L19.6328 41.7998V47.3928L27.3508 50.4844V46.7921Z" />
          <path className={styles.pathWhite} d="M28.9488 37.6035L19.6328 41.7997L27.3508 46.792L36.0613 42.8664L28.9488 37.6035Z" />
          <path className={styles.pathWhite} d="M35.5316 34.6387L28.9492 37.6035L36.0617 42.8664L38.2652 41.8734L42.2385 40.088L35.5316 34.6387Z" />
          <path className={styles.pathWhite} d="M35.5312 34.639L42.2382 40.0883L46.9915 37.9523V29.458L38.2649 33.3963V33.4077L35.5312 34.639Z" />
          <path className={styles.pathWhite} d="M1.85266 46.0837L8.732 42.0377L0.0506627 40.791C-0.181671 42.644 0.37933 44.599 1.85266 46.0837Z" />
          <path className={styles.pathWhite} d="M0.0507812 40.7915L8.73211 42.0381L3.30345 36.0088C1.42211 37.0288 0.294448 38.8478 0.0507812 40.7915Z" />
          <path className={styles.pathWhite} d="M38.2656 20.2327L46.9923 20.4972C46.9521 18.9537 46.3547 17.4065 45.1393 16.1867L42.2414 13.2783L38.2656 20.2327Z" />
          <path className={styles.pathWhite} d="M38.2685 20.2322L32.4805 14.4231L36.1992 7.21094L42.2443 13.2778L38.2695 20.2304L38.2685 20.2322Z" />
          <path className={styles.pathWhite} d="M32.4775 14.4231L36.1962 7.211L30.9669 1.96289L27.3516 9.27854L27.3516 9.27856L32.4775 14.4231Z" />
          <path className={styles.pathWhite} d="M27.3529 9.27886L30.9683 1.96321C26.792 -2.23012 19.6406 0.739211 19.6406 6.66655L27.3529 9.27886Z" />
          <path className={styles.pathWhite} d="M27.353 9.27933V12.1467L19.6406 15.6196V6.66699L27.353 9.27933Z" />
        </g>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
