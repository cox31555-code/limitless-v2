"use client";
import React from "react";
import styles from "./quoteCard.module.css";
import { useRouter } from "next/navigation";

const QuoteCard = ({ quote }) => {
  const router = useRouter();

  return (
    <div className={styles.card}>
      <div className={styles.cashbackBadge}>{quote.cashback}</div>
      
      <div className={styles.cardLayout}>
        <div className={styles.leftSection}>
          <div className={styles.header}>
            <h3 className={styles.title}>{quote.title}</h3>
            <p className={styles.description}>{quote.description}</p>
          </div>

          <div className={styles.detailsCompact}>
            <div className={styles.detailBlock}>
              <span className={styles.detailBlockTitle}>Excess</span>
              <div className={styles.detailItems}>
                {quote.excessDetails.map((detail, index) => (
                  <span key={index} className={styles.detailText}>{detail}</span>
                ))}
              </div>
            </div>

            <div className={styles.detailBlock}>
              <span className={styles.detailBlockTitle}>Extras</span>
              <div className={styles.extrasCompact}>
                {quote.optionalExtras.map((extra, index) => (
                  <div key={index} className={styles.extraTag}>
                    <svg className={`${styles.checkIcon} ${extra.included ? styles.included : ''}`} viewBox="0 0 16 16" fill="currentColor">
                      {extra.included ? (
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                      ) : (
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      )}
                    </svg>
                    <span>{extra.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.priceBlock}>
            <div className={styles.priceRow}>
              <span className={styles.label}>Monthly</span>
              <div className={styles.value}>
                <span className={styles.amount}>£{quote.pricePerMonth}</span>
                <span className={styles.meta}>{quote.times}</span>
              </div>
            </div>
            <div className={styles.priceRow}>
              <span className={styles.label}>Deposit</span>
              <span className={styles.amount}>£{quote.deposit}</span>
            </div>
            <div className={`${styles.priceRow} ${styles.total}`}>
              <span className={styles.label}>Total</span>
              <span className={styles.totalAmount}>£{quote.total}</span>
            </div>
          </div>

          <button className={styles.viewBtn}>
            {quote.buttonText}
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 12l4-4-4-4"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
