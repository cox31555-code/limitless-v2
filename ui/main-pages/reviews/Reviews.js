"use client";
import React, { useState, useEffect } from "react";
import styles from "./reviews.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const reviewsData = [
  {
    id: 1,
    text: "Best temporary car insurance I've found. Quick quote, instant cover, and genuinely affordable. No hassle, no hidden fees. Absolutely brilliant service!",
    name: "Marcus Thompson",
    date: "2024-11-20",
  },
  {
    id: 2,
    text: "Needed cover for a week and Limitless Cover came through perfectly. Easy to use platform, fair pricing, and responsive customer support. Would definitely use again.",
    name: "Jennifer Hayes",
    date: "2024-10-18",
  },
  {
    id: 3,
    text: "Excellent for short-term insurance needs. The process was straightforward and they delivered exactly what was promised. Very impressed with the whole experience.",
    name: "Anthony Clarke",
    date: "2024-10-05",
  },
  {
    id: 4,
    text: "Top-notch service from start to finish. Got my temporary cover sorted in minutes, great rates, and the claims process was smooth and efficient.",
    name: "Victoria Rodriguez",
    date: "2024-09-28",
  },
  {
    id: 5,
    text: "Really pleased with Limitless Cover. Competitive pricing for temporary cover, no complicated forms, and they actually respond to queries promptly.",
    name: "Michael Brown",
    date: "2024-09-12",
  },
  {
    id: 6,
    text: "Outstanding experience! Got insured for a weekend trip without any complications. Professional, reliable, and genuinely good value. Highly recommend!",
    name: "Sophie Williams",
    date: "2024-08-30",
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
    <div className={styles.container}>
      <div className={styles.first}>
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          Hear From Our <span>Customers</span>
        </h2>
        <div className={styles.starsContainer}>
          <Image
            className={styles.star1}
            src={`/svg/trustpilot-icon.svg`}
            alt="trustpilot"
            width={24}
            height={24}
          />
          <p className={`${styles.rating} ${manrope.className}`}>4.8</p>
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
          <p className={`${styles.reviewsCount} ${manrope.className}`}>
            892 Reviews
          </p>
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
