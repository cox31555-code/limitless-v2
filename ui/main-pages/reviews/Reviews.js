"use client";
import React, { memo, useState } from "react";
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
  <div style={{ width: '3.4rem', height: '3.4rem', flexShrink: 0, position: 'relative' }}>
    <div style={{
      display: 'flex',
      width: '3.4rem',
      height: '3.4rem',
      padding: '3px',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
      background: 'linear-gradient(90deg, #00B67A 0%, #00B67A 50%, rgba(0, 182, 122, 0.00) 50.01%, #D9D9D9 50.02%, #D9D9D9 99.98%, rgba(0, 182, 122, 0.00) 99.99%, #D9D9D9 100%)',
      position: 'absolute',
      left: '0px',
      top: '0px'
    }}></div>
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '2.8rem', height: '2.8rem', flexShrink: 0, fill: '#FFF', position: 'absolute', left: '3px', top: '3px' }}>
      <path d="M14 21.3522L20.0833 19.7233L22.625 28L14 21.3522ZM28 10.6541H17.2917L14 0L10.7083 10.6541H0L8.66667 17.2579L5.375 27.9119L14.0417 21.3082L19.375 17.2579L28 10.6541Z" fill="white"/>
    </svg>
  </div>
));

const TrustpilotLogo = memo(() => (
  <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.6792 18.3019L18.1887 16.9057L20.4906 24L12.6792 18.3019ZM25.3585 9.13208H15.6604L12.6792 0L9.69811 9.13208H0L7.84906 14.7925L4.86792 23.9245L12.717 18.2641L17.5472 14.7925L25.3585 9.13208Z" fill="#00B67A"/>
  </svg>
));


const reviewsData = [
  {
    id: 1,
    title: "Excellent value for money",
    text: "Quick quote process and the coverage options are exactly what I needed. Customer service team sorted everything out in minutes.",
    name: "SarahM92",
    timestamp: "5 hours ago",
  },
  {
    id: 2,
    title: "Fast and hassle-free",
    text: "Been with them for over a year now. Really impressed with how easy renewals are. They genuinely care about their customers.",
    name: "JohnDriver",
    timestamp: "2 days ago",
  },
  {
    id: 3,
    title: "Great customer support",
    text: "Had a query about my policy and they responded within an hour. Professional, friendly team. Would definitely recommend to friends.",
    name: "EmmaH",
    timestamp: "4 days ago",
  },
  {
    id: 4,
    title: "Smooth online process",
    text: "The whole thing took less than 10 minutes. No hidden fees, everything transparent from the start. Very happy with my choice.",
    name: "MikeT",
    timestamp: "2 hours ago",
  },
  {
    id: 5,
    title: "Best insurance deal",
    text: "Compared with other providers and this is definitely the best value. Love the flexibility of the coverage options available.",
    name: "LisaW",
    timestamp: "1 day ago",
  },
  {
    id: 6,
    title: "Reliable and trustworthy",
    text: "Never had any issues with my policy. When I needed to make a claim, the process was straightforward and efficient.",
    name: "RobertK",
    timestamp: "3 days ago",
  },
  {
    id: 7,
    title: "Highly recommend",
    text: "Five stars isn't enough for this company. Genuinely impressed with the level of service and attention to detail.",
    name: "ClaireL",
    timestamp: "6 days ago",
  },
  {
    id: 8,
    title: "Great online dashboard",
    text: "Love how easy it is to manage my policy online. Everything is clearly laid out and updates happen instantly.",
    name: "DavidJ",
    timestamp: "5 days ago",
  },
  {
    id: 9,
    title: "Flexible coverage options",
    text: "The range of cover options means I can choose exactly what I need. Very straightforward and competitive pricing throughout.",
    name: "NataliaP",
    timestamp: "8 days ago",
  },
  {
    id: 10,
    title: "Quick settlement process",
    text: "Filed a claim and got my money within 5 business days. No hassle, no complications. Highly impressed.",
    name: "MarkH",
    timestamp: "10 days ago",
  },
  {
    id: 11,
    title: "Excellent renewal experience",
    text: "Just renewed my policy. The process was smooth, prices competitive, and the team was incredibly helpful throughout.",
    name: "SophieR",
    timestamp: "7 days ago",
  },
  {
    id: 12,
    title: "Professional and efficient",
    text: "From quote to purchase to renewal, everything has been handled professionally. This is the standard all companies should aim for.",
    name: "JamesC",
    timestamp: "9 days ago",
  },
  {
    id: 13,
    title: "Amazing customer service",
    text: "Called with questions and got through immediately. The team member was knowledgeable and super friendly. Really appreciated the support.",
    name: "AnnaB",
    timestamp: "3 hours ago",
  },
  {
    id: 14,
    title: "Worth every penny",
    text: "The coverage is comprehensive and the cost is fair. Can't ask for much more from an insurance provider. Very satisfied.",
    name: "PeterM",
    timestamp: "12 days ago",
  },
  {
    id: 15,
    title: "Transparent pricing",
    text: "No surprises, no hidden costs. Everything is clearly explained upfront. Refreshing to deal with an honest company.",
    name: "TinaS",
    timestamp: "11 days ago",
  },
  {
    id: 16,
    title: "Great mobile experience",
    text: "The mobile app is brilliant. Can manage everything on the go with ease. Really modern and user-friendly platform.",
    name: "AlexG",
    timestamp: "4 days ago",
  },
  {
    id: 17,
    title: "Outstanding value proposition",
    text: "Compared dozens of quotes and this one stood out immediately. Quality cover at a price that makes sense for my situation.",
    name: "HelenD",
    timestamp: "6 days ago",
  },
  {
    id: 18,
    title: "Very responsive team",
    text: "Every email gets a response within hours. Every call gets answered quickly. The level of responsiveness is exceptional.",
    name: "GarryN",
    timestamp: "13 days ago",
  },
  {
    id: 19,
    title: "Simple and straightforward",
    text: "No complicated terms or confusing policies. Everything is explained in plain English. Love the clarity and honesty.",
    name: "JanetO",
    timestamp: "14 days ago",
  },
  {
    id: 20,
    title: "Can't fault their service",
    text: "Been a customer for two years now. Consistently excellent service, fair pricing, and genuine care for their customers.",
    name: "StevueX",
    timestamp: "2 weeks ago",
  },
  {
    id: 21,
    title: "Best decision ever",
    text: "Switched from another provider and wish I'd done it sooner. This company is in a different league entirely. Really impressed.",
    name: "NicolaM",
    timestamp: "1 day ago",
  },
  {
    id: 22,
    title: "Top-notch support",
    text: "Contacted them on a Sunday and got help within 30 minutes. That's the kind of commitment to customers I haven't seen elsewhere.",
    name: "RichardF",
    timestamp: "5 days ago",
  },
  {
    id: 23,
    title: "Exceptional all around",
    text: "From the quote process to claims handling, everything about this company is exceptional. Absolutely would recommend to everyone.",
    name: "VictoriaL",
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const reviewsPerPage = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, reviewsData.length - reviewsPerPage);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + reviewsPerPage > maxIndex ? 0 : prev + reviewsPerPage));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - reviewsPerPage < 0 ? maxIndex : prev - reviewsPerPage));
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    if (touchStart - e.changedTouches[0].clientX > 50) {
      handleNext();
    }
    if (e.changedTouches[0].clientX - touchStart > 50) {
      handlePrev();
    }
  };

  const displayedReviews = reviewsData.slice(currentIndex, currentIndex + reviewsPerPage);
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= maxIndex;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={`${styles.title} ${poppins.className}`}>
            Trustpilot Reviews
          </h2>
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

          <div className={styles.reviewsContainer} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {displayedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        <div className={styles.navigation}>
          <button className={`${styles.prevButton} ${!isAtStart ? styles.prevButtonActive : ''}`} onClick={handlePrev} aria-label="Previous review" disabled={isAtStart}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={`${styles.nextButton} ${!isAtEnd ? styles.nextButtonActive : ''}`} onClick={handleNext} aria-label="Next review" disabled={isAtEnd}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Reviews);
