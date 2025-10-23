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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 2) % reviewsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isClient]);

  const getVisibleReviews = () => {
    const reviews = [];
    for (let i = 0; i < 2; i++) {
      const index = (currentSlide + i) % reviewsData.length;
      reviews.push(reviewsData[index]);
    }
    return reviews;
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
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 2C8.27 2 2 8.27 2 16s6.27 14 14 14 14-6.27 14-14S23.73 2 16 2z" fill="#00B5A1" />
                  <path d="M23.5 13l-9.5 9.5-5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
      <div className={styles.reviews}>
        {/* Desktop version - unchanged */}
        <div className={styles.desktopReviews}>
          <div className={styles.reviewContainer}>
            {reviewsData.slice(0, 3).map((review) => (
              <div className={styles.review} key={review.id}>
                <p className={styles.text}>{review.text}</p>
                <div className={styles.bottom}>
                  <div className={styles.author}>
                    <p className={styles.name}>{review.name}</p>
                    <p className={styles.date}>{review.date}</p>
                  </div>
                  <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <Image
                        className={styles.star}
                        src={`/svg/star.svg`}
                        alt="star"
                        width={18}
                        height={18}
                        key={item}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.reviewContainer}>
            {reviewsData.slice(3, 6).map((review) => (
              <div className={styles.review} key={review.id}>
                <p className={styles.text}>{review.text}</p>
                <div className={styles.bottom}>
                  <div className={styles.author}>
                    <p className={styles.name}>{review.name}</p>
                    <p className={styles.date}>{review.date}</p>
                  </div>
                  <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <Image
                        className={styles.star}
                        src={`/svg/star.svg`}
                        alt="star"
                        width={18}
                        height={18}
                        key={item}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile version - smooth horizontal slide */}
        <div className={styles.mobileReviews}>
          <div className={styles.slideContainer}>
            <div className={styles.mainReviews} key={currentSlide}>
              {getVisibleReviews().map((review, index) => (
                <div className={styles.review} key={`main-${review.id}-${currentSlide}`}>
                  <p className={styles.text}>{review.text}</p>
                  <div className={styles.bottom}>
                    <div className={styles.author}>
                      <p className={styles.name}>{review.name}</p>
                      <p className={styles.date}>{review.date}</p>
                    </div>
                    <div className={styles.stars}>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <Image
                          className={styles.star}
                          src={`/svg/star.svg`}
                          alt="star"
                          width={18}
                          height={18}
                          key={item}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide indicators */}
          <div className={styles.indicators}>
            {Array.from({ length: Math.ceil(reviewsData.length / 2) }).map(
              (_, index) => (
                <div
                  key={index}
                  className={`${styles.indicator} ${
                    Math.floor(currentSlide / 2) === index ? styles.active : ""
                  }`}
                  onClick={() => setCurrentSlide(index * 2)}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
