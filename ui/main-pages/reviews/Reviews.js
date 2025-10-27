"use client";
import React from "react";
import styles from "./reviews.module.css";
import { Plus_Jakarta_Sans, Manrope, Playfair_Display } from "next/font/google";
import Image from "next/image";

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

const reviewsData = [
  {
    id: 1,
    text: "I love this product because the support is great. Please ...",
    name: "Jaxson Philips",
    title: "CEO Lorem Ipsum",
    avatar: "/svg/avatar-1.svg",
  },
  {
    id: 2,
    text: "I love this product because the support is great. Please ...",
    name: "Jaxson Philips",
    title: "CEO Lorem Ipsum",
    avatar: "/svg/avatar-2.svg",
  },
  {
    id: 3,
    text: "I love this product because the support is great. Please ...",
    name: "Jaxson Philips",
    title: "CEO Lorem Ipsum",
    avatar: "/svg/avatar-3.svg",
  },
];

const Reviews = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <h2 className={`${styles.title} ${playfairDisplay.className}`}>
            Trustpilot Reviews
          </h2>
          
          <div className={styles.trustpilotInfo}>
            <Image
              src="https://api.builder.io/api/v1/image/assets/TEMP/8904fd24d5f06ad1009ebb79115c37f65283e748?width=282"
              alt="Trustpilot"
              width={141}
              height={35}
              className={styles.trustpilotLogo}
            />
            
            <div className={styles.ratingInfo}>
              <span className={`${styles.rating} ${manrope.className}`}>Rated 4.7</span>
              <span className={styles.divider}></span>
              <span className={`${styles.reviewCount} ${manrope.className}`}>134 Reviews</span>
            </div>
          </div>
        </div>

        <div className={styles.cardsGrid}>
          {reviewsData.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/1fb1b840a03b018d6b74df351c3c4010974d3a92?width=190"
                alt="5 stars"
                width={95}
                height={18}
                className={styles.stars}
              />
              
              <p className={`${styles.reviewText} ${manrope.className}`}>
                {review.text}
              </p>
              
              <div className={styles.authorSection}>
                <div className={styles.authorInfo}>
                  <p className={`${styles.authorName} ${plusJakartaSans.className}`}>
                    {review.name}
                  </p>
                  <p className={`${styles.authorTitle} ${manrope.className}`}>
                    {review.title}
                  </p>
                </div>
                
                <div className={styles.avatarCircle}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
