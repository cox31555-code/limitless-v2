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
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" fill="#00B67A"/>
    <path d="M20 27.3522L26.0833 25.7233L28.625 34L20 27.3522ZM34 16.6541H23.2917L20 6L16.7083 16.6541H6L14.6667 23.2579L11.375 33.9119L20.0417 27.3082L25.375 23.2579L34 16.6541Z" fill="white"/>
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
              <LargeStarIcon />
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
