"use client";
import React, { useState, useEffect } from "react";
import styles from "./reviews.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope, Inter } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const reviewsData = [
  {
    id: 1,
    text: "Best temporary car insurance I've found. Quick quote, instant cover, and genuinely affordable. No hassle, no hidden fees. Absolutely brilliant service!",
    name: "Marcus Thompson",
    date: "2024-11-20",
    verified: true,
    rating: 5,
  },
  {
    id: 2,
    text: "Needed cover for a week and Limitless Cover came through perfectly. Easy to use platform, fair pricing, and responsive customer support.",
    name: "Jennifer Hayes",
    date: "2024-10-18",
    verified: true,
    rating: 5,
  },
  {
    id: 3,
    text: "Excellent for short-term insurance needs. The process was straightforward and they delivered exactly what was promised. Very impressed!",
    name: "Anthony Clarke",
    date: "2024-10-05",
    verified: true,
    rating: 5,
  },
  {
    id: 4,
    text: "Top-notch service from start to finish. Got my temporary cover sorted in minutes, great rates, and the claims process was smooth.",
    name: "Victoria Rodriguez",
    date: "2024-09-28",
    verified: true,
    rating: 5,
  },
  {
    id: 5,
    text: "Really pleased with Limitless Cover. Competitive pricing for temporary cover and they actually respond to queries promptly.",
    name: "Michael Brown",
    date: "2024-09-12",
    verified: true,
    rating: 5,
  },
  {
    id: 6,
    text: "Outstanding experience! Got insured for a weekend trip without any complications. Professional, reliable, and genuinely good value.",
    name: "Sophie Williams",
    date: "2024-08-30",
    verified: true,
    rating: 5,
  },
];

const Reviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviewsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviewsData.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
            Trusted by Thousands of Drivers
          </h2>
          <p className={`${styles.subtitle} ${manrope.className}`}>
            See what our customers have to say about Limitless Cover
          </p>
        </div>

        <div className={styles.badgeSection}>
          <div className={styles.trustpilotBadge}>
            <div className={styles.badgeContent}>
              <div className={styles.logoWrapper}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 0C8.96 0 0 8.96 0 20s8.96 20 20 20 20-8.96 20-20S31.04 0 20 0zm0 36c-8.82 0-16-7.18-16-16s7.18-16 16-16 16 7.18 16 16-7.18 16-16 16z" fill="#00B582"/>
                  <path d="M28 14L17 25l-5-5" stroke="#00B582" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.badgeInfo}>
                <div className={styles.ratingDisplay}>
                  <span className={`${styles.ratingNumber} ${inter.className}`}>4.8</span>
                  <div className={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <span key={item} className={styles.star}>★</span>
                    ))}
                  </div>
                </div>
                <p className={`${styles.reviewCount} ${manrope.className}`}>
                  892 reviews on Trustpilot
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.carouselSection}>
        <div className={styles.carouselContainer}>
          <button className={styles.carouselButton + " " + styles.prevBtn} onClick={prevSlide} aria-label="Previous review">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <div className={styles.carouselTrack}>
            {reviewsData.map((review, index) => (
              <div 
                key={review.id}
                className={`${styles.reviewSlide} ${index === currentSlide ? styles.activeSlide : ""}`}
              >
                <div className={styles.reviewCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.starsRow}>
                      {Array(review.rating).fill(0).map((_, i) => (
                        <span key={i} className={styles.filledStar}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className={`${styles.reviewText} ${inter.className}`}>
                    "{review.text}"
                  </p>
                  <div className={styles.cardFooter}>
                    <div className={styles.authorInfo}>
                      <p className={`${styles.authorName} ${inter.className}`}>
                        {review.name}
                      </p>
                      <p className={`${styles.reviewDate} ${manrope.className}`}>
                        {new Date(review.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    {review.verified && (
                      <div className={styles.verifiedBadge}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6L8 1Z" fill="#00B582" />
                        </svg>
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className={styles.carouselButton + " " + styles.nextBtn} onClick={nextSlide} aria-label="Next review">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div className={styles.paginationDots}>
          {reviewsData.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
