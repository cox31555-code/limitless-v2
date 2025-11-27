"use client";
import React from "react";
import styles from "./quoteCard.module.css";
import { useRouter } from "next/navigation";

const QuoteCard = ({ quote }) => {
  const router = useRouter();

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.brandedBadge}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F058fdd9048ee40f580ca41b569bee55c%2F5f655402e5e54b5782ffee63c1df405c?format=png&width=800"
            alt="Limitless Cover"
            className={styles.logo}
          />
          <span className={styles.policyType}>{quote.policyType}</span>
        </div>
        <div className={styles.expiryBadge}>
          <svg className={styles.clockIcon} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
          </svg>
          <span>Expires in {quote.expiresInDays} days</span>
        </div>
      </div>

      <div className={styles.vehicleSection}>
        <div className={styles.licensePlate}>
          <span className={styles.licensePlateText}>{quote.vehicleReg}</span>
        </div>
        <div className={styles.vehicleInfo}>
          <h3 className={styles.vehicleName}>{quote.vehicleMake} {quote.vehicleModel}</h3>
          <p className={styles.policyholderName}>{quote.policyholderName}</p>
        </div>
      </div>
      
      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <div className={styles.quoteMetaRow}>
            <div className={styles.metaItem}>
              <svg className={styles.metaIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
              <span className={styles.metaLabel}>Quote created:</span>
              <span className={styles.metaValue}>{quote.createdDate}</span>
            </div>
          </div>

          <h4 className={styles.title}>{quote.title}</h4>
          <p className={styles.description}>{quote.description}</p>
          
          <div className={styles.detailsRow}>
            <div className={styles.detailSection}>
              <h4 className={styles.sectionTitle}>Excess details</h4>
              <div className={styles.excessList}>
                <div className={styles.excessRow}>
                  <span className={styles.excessLabel}>Voluntary</span>
                  <span className={styles.excessValue}>£{quote.excessDetails.voluntary}</span>
                </div>
                <div className={styles.excessRow}>
                  <span className={styles.excessLabel}>Compulsory</span>
                  <span className={styles.excessValue}>£{quote.excessDetails.compulsory}</span>
                </div>
                <div className={`${styles.excessRow} ${styles.excessTotal}`}>
                  <span className={styles.excessLabel}>Total</span>
                  <span className={styles.excessValue}>£{quote.excessDetails.total}</span>
                </div>
              </div>
            </div>
            
            <div className={styles.detailSection}>
              <h4 className={styles.sectionTitle}>Optional extras</h4>
              <ul className={styles.extrasList}>
                {quote.optionalExtras.map((extra, index) => (
                  <li key={index} className={extra.included ? styles.included : styles.notIncluded}>
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      {extra.included ? (
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      ) : (
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                      )}
                    </svg>
                    <span>{extra.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className={styles.rightColumn}>
          <div className={styles.priceSection}>
            <div className={styles.priceRow}>
              <span className={styles.priceLabel}>Monthly {quote.times}</span>
              <div className={styles.priceAmount}>
                <span className={styles.price}>£{quote.pricePerMonth}</span>
              </div>
            </div>
            <div className={styles.priceRow}>
              <span className={styles.priceLabel}>Deposit</span>
              <span className={styles.price}>£{quote.deposit}</span>
            </div>
            <div className={`${styles.priceRow} ${styles.totalRow}`}>
              <span className={styles.priceLabel}>Total</span>
              <span className={styles.totalPrice}>£{quote.total}</span>
            </div>
          </div>
          
          <button className={styles.viewQuoteBtn}>
            {quote.buttonText}
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
