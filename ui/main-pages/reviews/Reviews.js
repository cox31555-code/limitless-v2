"use client";
import React, { memo } from "react";
import styles from "./reviews.module.css";
import { Jost, Poppins, Roboto } from "next/font/google";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const StarIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" fill="#00B67A"/>
    <path d="M10 13.6761L13.0417 12.8616L14.3125 17L10 13.6761ZM17 8.32704H11.6458L10 3L8.35417 8.32704H3L7.33334 11.6289L5.6875 16.956L10.0208 13.6541L12.6875 11.6289L17 8.32704Z" fill="white"/>
  </svg>
));

const LargeStarIcon = memo(() => (
  <svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="33" height="34" fill="#219653"/>
    <path d="M16.5 24.3522L22.5833 22.7233L25.125 31L16.5 24.3522ZM30.5 13.6541H19.7917L16.5 3L13.2083 13.6541H2.5L11.1667 20.2579L7.875 30.9119L16.5417 24.3082L21.875 20.2579L30.5 13.6541Z" fill="white"/>
  </svg>
));

const HalfStarIcon = memo(() => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'relative' }}>
    <rect width="34" height="34" fill="url(#halfStarGradient)"/>
    <defs>
      <linearGradient id="halfStarGradient" x1="0" y1="0" x2="34" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#219653"/>
        <stop offset="50%" stopColor="#219653"/>
        <stop offset="50%" stopColor="#D9D9D9"/>
        <stop offset="100%" stopColor="#D9D9D9"/>
      </linearGradient>
    </defs>
    <path d="M17 24.3522L23.0833 22.7233L25.625 31L17 24.3522ZM31 13.6541H20.2917L17 3L13.7083 13.6541H3L11.6667 20.2579L8.375 30.9119L17.0417 24.3082L22.375 20.2579L31 13.6541Z" fill="white"/>
  </svg>
));

const TrustpilotLogo = memo(() => (
  <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.6792 18.3019L18.1887 16.9057L20.4906 24L12.6792 18.3019ZM25.3585 9.13208H15.6604L12.6792 0L9.69811 9.13208H0L7.84906 14.7925L4.86792 23.9245L12.717 18.2641L17.5472 14.7925L25.3585 9.13208Z" fill="#00B67A"/>
  </svg>
));

const LeftArrowIcon = memo(() => (
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.7402 13.4789H4.53011M4.53011 13.4789C4.53011 13.4789 9.4084 10.2707 10.3997 7.60938M4.53011 13.4789C4.53011 13.4789 8.8427 16.4935 10.3997 19.3485" stroke="#1B1464" strokeWidth="2.17391" strokeLinecap="square"/>
  </svg>
));

const RightArrowIcon = memo(() => (
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.34766 13.4789H21.5578M21.5578 13.4789C21.5578 13.4789 16.6795 10.2707 15.6882 7.60938M21.5578 13.4789C21.5578 13.4789 17.2452 16.4935 15.6882 19.3485" stroke="#E9E9EA" strokeWidth="2.17391" strokeLinecap="square"/>
  </svg>
));

const reviewsData = [
  {
    id: 1,
    title: "Best on the market",
    text: "I love this product because the support is great. Please ...",
    name: "Worldtraveler",
    timestamp: "2 days ago",
  },
  {
    id: 2,
    title: "Best on the market",
    text: "I love this product because the support is great. Please ...",
    name: "Worldtraveler",
    timestamp: "2 days ago",
  },
  {
    id: 3,
    title: "Best on the market",
    text: "I love this product because the support is great. Please ...",
    name: "Worldtraveler",
    timestamp: "2 days ago",
  },
];

const ReviewCard = memo(({ review }) => (
  <div className={styles.reviewCard}>
    <div className={styles.rating}>
      <div className={styles.stars}>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </div>
      <div className={`${styles.timestamp} ${roboto.className}`}>
        {review.timestamp}
      </div>
    </div>
    <div className={`${styles.reviewTitle} ${poppins.className}`}>
      {review.title}
    </div>
    <div className={`${styles.reviewText} ${poppins.className}`}>
      {review.text}
    </div>
    <div className={styles.divider}></div>
    <div className={`${styles.username} ${poppins.className}`}>
      {review.name}
    </div>
  </div>
));

const Reviews = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={`${styles.title} ${poppins.className}`}>
            Trustpilot Reviews
          </h2>
          <div className={styles.navigation}>
            <button className={styles.navButton} aria-label="Previous review">
              <LeftArrowIcon />
            </button>
            <button className={`${styles.navButton} ${styles.navButtonActive}`} aria-label="Next review">
              <RightArrowIcon />
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.summaryCard}>
            <div className={`${styles.excellent} ${jost.className}`}>
              Excellent
            </div>
            <div className={styles.largeStars}>
              <LargeStarIcon />
              <LargeStarIcon />
              <LargeStarIcon />
              <LargeStarIcon />
              <HalfStarIcon />
            </div>
            <div className={`${styles.reviewsCount} ${poppins.className}`}>
              1,593 reviews on
            </div>
            <div className={styles.trustpilotBadge}>
              <TrustpilotLogo />
              <span className={`${styles.trustpilotText} ${roboto.className}`}>Trustpilot</span>
            </div>
          </div>

          <div className={styles.reviewsContainer}>
            {reviewsData.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Reviews);
