"use client";
import React from "react";
import styles from "./reviews.module.css";
import { Plus_Jakarta_Sans, Manrope, Playfair_Display, Poppins, Roboto } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
});

const reviewsData = [
  {
    id: 1,
    text: "I love this product because the support is great. Please ...",
    name: "Jaxson Philips",
    timestamp: "2 days ago",
  },
  {
    id: 2,
    text: "I love this product because the support is great. Please ...",
    name: "Jaxson Philips",
    timestamp: "14 days ago",
  },
  {
    id: 3,
    text: "I love this product because the support is great. Please ...",
    name: "Jaxson Philips",
    timestamp: "5 hours ago",
  },
  {
    id: 4,
    text: "I love this product because the support is great. Please ...",
    name: "Jaxson Philips",
    timestamp: "1 day ago",
  },
  {
    id: 5,
    text: "I love this product because the support is great. Please ...",
    name: "Jaxson Philips",
    timestamp: "3 days ago",
  },
  {
    id: 6,
    text: "I love this product because the support is great. Please ...",
    name: "Jaxson Philips",
    timestamp: "1 week ago",
  },
];

const FiveStarsIcon = () => (
  <svg width="120" height="21" viewBox="0 0 120 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.6667 0H0V20.6667H20.6667V0Z" fill="#219653"/>
    <path d="M10.3329 13.9283L13.476 13.1318L14.7892 17.179L10.3329 13.9283ZM17.5663 8.69703H12.0336L10.3329 3.4873L8.63225 8.69703H3.09961L7.57739 11.9262L5.87669 17.1359L10.3545 13.9068L13.11 11.9262L17.5663 8.69703Z" fill="white"/>
    <path d="M45.3327 0H24.666V20.6667H45.3327V0Z" fill="#219653"/>
    <path d="M34.999 13.9283L38.142 13.1318L39.4552 17.179L34.999 13.9283ZM42.2323 8.69703H36.6996L34.999 3.4873L33.2983 8.69703H27.7656L32.2434 11.9262L30.5427 17.1359L35.0205 13.9068L37.776 11.9262L42.2323 8.69703Z" fill="white"/>
    <path d="M70.0007 0H49.334V20.6667H70.0007V0Z" fill="#219653"/>
    <path d="M59.6689 13.9283L62.8119 13.1318L64.1251 17.179L59.6689 13.9283ZM66.9022 8.69703H61.3696L59.6689 3.4873L57.9682 8.69703H52.4355L56.9133 11.9262L55.2126 17.1359L59.6904 13.9068L62.446 11.9262L66.9022 8.69703Z" fill="white"/>
    <path d="M94.6667 0H74V20.6667H94.6667V0Z" fill="#219653"/>
    <path d="M84.3329 13.9283L87.476 13.1318L88.7892 17.179L84.3329 13.9283ZM91.5663 8.69703H86.0336L84.3329 3.4873L82.6322 8.69703H77.0996L81.5774 11.9262L79.8767 17.1359L84.3545 13.9068L87.11 11.9262L91.5663 8.69703Z" fill="white"/>
    <path d="M119.333 0H98.666V20.6667H119.333V0Z" fill="#219653"/>
    <path d="M108.999 13.9283L112.142 13.1318L113.455 17.179L108.999 13.9283ZM116.232 8.69703H110.7L108.999 3.4873L107.298 8.69703H101.766L106.243 11.9262L104.543 17.1359L109.02 13.9068L111.776 11.9262L116.232 8.69703Z" fill="white"/>
  </svg>
);

const TrustpilotIcon = () => (
  <svg width="37" height="34" viewBox="0 0 37 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.5 25.9277L26.5387 23.9497L29.8973 34L18.5 25.9277ZM37 12.9371H22.8497L18.5 0L14.1503 12.9371H0L11.4524 20.956L7.10267 33.8931L18.5551 25.8742L25.6027 20.956L37 12.9371Z" fill="#219653"/>
  </svg>
);

const Reviews = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <h2 className={`${styles.title} ${playfairDisplay.className}`}>
            Trustpilot Reviews
          </h2>
          
          <div className={styles.trustpilotBadge}>
            <TrustpilotIcon />
            <span className={`${styles.trustpilotText} ${roboto.className}`}>Trustpilot</span>
          </div>
          
          <div className={styles.ratingInfo}>
            <span className={`${styles.rating} ${manrope.className}`}>Rated 4.7</span>
            <div className={styles.divider}></div>
            <span className={`${styles.reviewCount} ${manrope.className}`}>134 Reviews</span>
          </div>
        </div>

        <div className={styles.cardsGridWrapper}>
          <div className={styles.cardsGrid}>
            {reviewsData.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <FiveStarsIcon />
                
                <p className={`${styles.reviewText} ${manrope.className}`}>
                  {review.text}
                </p>
                
                <div className={styles.authorInfo}>
                  <p className={`${styles.authorName} ${plusJakartaSans.className}`}>
                    {review.name}
                  </p>
                  <p className={`${styles.timestamp} ${poppins.className}`}>
                    {review.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
