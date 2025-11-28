"use client";
import React from "react";
import styles from "./quoteCard.module.css";
import { useRouter } from "next/navigation";
import { useLoading } from "@/contexts/LoadingContext";

const QuoteCard = ({ quote }) => {
  const router = useRouter();
  const { showLoading } = useLoading();

  return (
    <div className={styles.card}>
      {/* Header Section */}
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.brandedBadge}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F058fdd9048ee40f580ca41b569bee55c%2F5f655402e5e54b5782ffee63c1df405c?format=png&width=800"
              alt="Limitless Cover"
              className={styles.logo}
            />
            <span className={styles.policyType}>{quote.policyType}</span>
          </div>
          <div className={styles.metaItem}>
            <svg className={styles.metaIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
            </svg>
            <span className={styles.metaText}>Policy start: {quote.createdDate}</span>
          </div>
        </div>
        <div className={styles.expiryBadge}>
          <svg className={styles.clockIcon} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
          </svg>
          <span>Expires in {quote.expiresInDays} days</span>
        </div>
      </div>

      {/* Vehicle Section */}
      <div className={styles.vehicleSection}>
        <div className={styles.licensePlate}>
          <span className={styles.licensePlateText}>{quote.vehicleReg}</span>
        </div>
        <div className={styles.vehicleInfo}>
          <h3 className={styles.vehicleName}>{quote.vehicleMake} {quote.vehicleModel}</h3>
          <p className={styles.policyholderName}>{quote.policyholderName}</p>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className={styles.mainContent}>
        {/* Left: Quote Details */}
        <div className={styles.leftColumn}>
          <div className={styles.quoteHeader}>
            <h4 className={styles.title}>{quote.title}</h4>
            <p className={styles.description}>{quote.description}</p>
          </div>
          
          <div className={styles.detailsSection}>
            <div className={styles.detailBlock}>
              <h5 className={styles.detailTitle}>Excess details</h5>
              <div className={styles.excessGrid}>
                <div className={styles.excessItem}>
                  <span className={styles.excessLabel}>Voluntary</span>
                  <span className={styles.excessValue}>£{quote.excessDetails.voluntary}</span>
                </div>
                <div className={styles.excessItem}>
                  <span className={styles.excessLabel}>Compulsory</span>
                  <span className={styles.excessValue}>£{quote.excessDetails.compulsory}</span>
                </div>
                <div className={`${styles.excessItem} ${styles.excessTotal}`}>
                  <span className={styles.excessLabel}>Total</span>
                  <span className={styles.excessValue}>£{quote.excessDetails.total}</span>
                </div>
              </div>
            </div>
            
            <div className={styles.detailBlock}>
              <h5 className={styles.detailTitle}>Optional extras</h5>
              <div className={styles.extrasGrid}>
                {quote.optionalExtras.map((extra, index) => (
                  <div key={index} className={styles.extraItem}>
                    <svg className={extra.included ? styles.checkIcon : styles.crossIcon} viewBox="0 0 20 20" fill="currentColor">
                      {extra.included ? (
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      ) : (
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                      )}
                    </svg>
                    <span className={styles.extraLabel}>{extra.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right: Pricing */}
        <div className={styles.rightColumn}>
          <div className={styles.priceCard}>
            <div className={styles.priceHeader}>
              <h5 className={styles.priceTitle}>Quote Summary</h5>
            </div>
            <div className={styles.priceBreakdown}>
              <div className={styles.priceRow}>
                <span className={styles.priceLabel}>Monthly payment</span>
                <div className={styles.priceValueWrapper}>
                  <span className={styles.priceValue}>£{quote.pricePerMonth}</span>
                  <span className={styles.priceFrequency}>{quote.times}</span>
                </div>
              </div>
              <div className={styles.priceRow}>
                <span className={styles.priceLabel}>Deposit</span>
                <span className={styles.priceValue}>£{quote.deposit}</span>
              </div>
              <div className={`${styles.priceRow} ${styles.totalRow}`}>
                <span className={styles.totalLabel}>Total cost</span>
                <span className={styles.totalValue}>£{quote.total}</span>
              </div>
            </div>
          </div>
          
          <button
            className={styles.viewQuoteBtn}
            onClick={() => {
              showLoading();
              router.push(`/dashboard/quotes/${quote.id}`);
            }}
          >
            <span>{quote.buttonText}</span>
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
