"use client";
import React from "react";
import styles from "./quoteCard.module.css";
import { useRouter } from "next/navigation";

const QuoteCard = ({ quote }) => {
  const router = useRouter();

  return (
    <div className={styles.card}>
      {/* Cashback Badge */}
      <div className={styles.cashbackBadge}>
        {quote.cashback}
      </div>

      {/* Card Content */}
      <div className={styles.cardContent}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <h3 className={styles.quoteTitle}>{quote.title}</h3>
          <p className={styles.quoteDescription}>{quote.description}</p>
        </div>

        {/* Price Breakdown */}
        <div className={styles.priceSection}>
          <div className={styles.priceRow}>
            <span className={styles.priceLabel}>Pay Per Mile</span>
            <div className={styles.priceValue}>
              <span className={styles.price}>£{quote.pricePerMonth}</span>
              <span className={styles.priceMeta}>per month {quote.times}</span>
            </div>
          </div>
          <div className={styles.priceRow}>
            <span className={styles.priceLabel}>Deposit</span>
            <span className={styles.priceValue}>£{quote.deposit}</span>
          </div>
          <div className={`${styles.priceRow} ${styles.totalRow}`}>
            <span className={styles.priceLabel}>Total</span>
            <span className={styles.totalValue}>£{quote.total}</span>
          </div>
        </div>

        {/* Details Grid */}
        <div className={styles.detailsGrid}>
          {/* Excess Details */}
          <div className={styles.detailColumn}>
            <div className={styles.detailHeader}>
              <h4 className={styles.detailTitle}>Excess details</h4>
            </div>
            <ul className={styles.detailList}>
              {quote.excessDetails.map((detail, index) => (
                <li key={index} className={styles.detailItem}>
                  <span className={styles.detailText}>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Optional Extras */}
          <div className={styles.detailColumn}>
            <div className={styles.detailHeader}>
              <h4 className={styles.detailTitle}>Optional extras</h4>
              <svg className={styles.infoIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
              </svg>
            </div>
            <ul className={styles.extrasList}>
              {quote.optionalExtras.map((extra, index) => (
                <li key={index} className={styles.extraItem}>
                  <svg className={`${styles.checkbox} ${extra.included ? styles.checked : ''}`} viewBox="0 0 24 24" fill="currentColor">
                    {extra.included ? (
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    ) : (
                      <circle cx="12" cy="12" r="10"/>
                    )}
                  </svg>
                  <span className={styles.extraLabel}>{extra.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Button */}
      <button className={styles.viewButton}>
        {quote.buttonText}
        <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default QuoteCard;
