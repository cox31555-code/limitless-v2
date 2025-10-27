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
  weight: ["400", "500"],
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
];

const StarIcon = () => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20.6667" height="20.6667" fill="#219653"/>
    <path d="M10.3329 13.9283L13.476 13.1318L14.7892 17.179L10.3329 13.9283ZM17.5663 8.69703H12.0336L10.3329 3.4873L8.63225 8.69703H3.09961L7.57739 11.9262L5.87669 17.1359L10.3545 13.9068L13.11 11.9262L17.5663 8.69703Z" fill="white"/>
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

        <div className={styles.cardsGrid}>
          {reviewsData.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.starsRow}>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
              
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
  );
};

export default Reviews;
