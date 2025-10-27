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
    <rect width="33" height="34" fill="#00B67A"/>
    <path d="M16.5 24.3522L22.5833 22.7233L25.125 31L16.5 24.3522ZM30.5 13.6541H19.7917L16.5 3L13.2083 13.6541H2.5L11.1667 20.2579L7.875 30.9119L16.5417 24.3082L21.875 20.2579L30.5 13.6541Z" fill="white"/>
  </svg>
));

const HalfStarIcon = memo(() => (
  <div style={{ width: '33px', height: '34px', padding: '3px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexShrink: 0, background: 'linear-gradient(90deg, #00B67A 0%, #00B67A 50%, #D9D9D9 50%, #D9D9D9 100%)', position: 'relative' }}>
    <svg width="100%" height="100%" viewBox="0 0 28 28" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0 }}>
      <path d="M14 21.3522L20.0833 19.7233L22.625 28L14 21.3522ZM28 10.6541H17.2917L14 0L10.7083 10.6541H0L8.66667 17.2579L5.375 27.9119L14.0417 21.3082L19.375 17.2579L28 10.6541Z"/>
    </svg>
  </div>
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
