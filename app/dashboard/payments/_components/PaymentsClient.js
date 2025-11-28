"use client";

import { useState } from "react";
import styles from "./paymentsClient.module.css";

export default function PaymentsClient() {
  const [consentChecked, setConsentChecked] = useState(false);

  const paymentSchedule = [
    { date: "21 Nov 2025", amount: "£47.29", type: "deposit" },
    { date: "05 Jan 2026", amount: "£47.40" },
    { date: "05 Feb 2026", amount: "£47.40" },
    { date: "05 Mar 2026", amount: "£47.40" },
    { date: "05 Apr 2026", amount: "£47.40" },
    { date: "05 May 2026", amount: "£47.40" },
    { date: "05 Jun 2026", amount: "£47.40" },
    { date: "05 Jul 2026", amount: "£47.40" },
    { date: "05 Aug 2026", amount: "£47.40" },
    { date: "05 Sep 2026", amount: "£47.40" },
    { date: "05 Oct 2026", amount: "£47.40" },
    { date: "05 Nov 2026", amount: "£47.40" },
  ];

  return (
    <div className={styles.container}>
      {/* Notice Banner */}
      <div className={styles.noticeBanner}>
        <svg className={styles.noticeIcon} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p className={styles.noticeText}>
          Your next instalment of <strong>£47.40</strong> is due on <strong>5 Jan 2026</strong>.
        </p>
      </div>

      {/* Payment Day Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <svg className={styles.sectionIcon} viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
            <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="15" r="1.5" fill="currentColor"/>
          </svg>
          <h2 className={styles.sectionTitle}>Payment day</h2>
        </div>
        <p className={styles.paymentDay}>Every <strong>5th</strong> of the month</p>
        <button className={styles.changeButton}>Change day</button>
      </div>

      {/* Card Details Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <svg className={styles.sectionIcon} viewBox="0 0 24 24" fill="none">
            <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
            <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <h2 className={styles.sectionTitle}>Card details</h2>
        </div>
        <div className={styles.cardInfo}>
          <p className={styles.cardNumber}>Visa ending in <strong>0320</strong></p>
          <p className={styles.expiryDate}>Expiry date: <strong>Apr '29</strong></p>
        </div>
        <label className={styles.consentLabel}>
          <input
            type="checkbox"
            checked={consentChecked}
            onChange={(e) => setConsentChecked(e.target.checked)}
            className={styles.checkbox}
          />
          <span className={styles.consentText}>
            I consent to my card details being stored securely for any future policy changes I make.
          </span>
        </label>
        <button className={styles.changeButton}>Change card</button>
      </div>

      {/* Payment Schedule Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <svg className={styles.sectionIcon} viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
            <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="15" r="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M10.5 15l1 1 2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2 className={styles.sectionTitle}>Payment schedule</h2>
        </div>
        <p className={styles.scheduleInfo}>
          You have paid <strong>47.29</strong> out of <strong>568.69</strong>
        </p>
        <p className={styles.installmentInfo}>(11 instalments left X 47.40)</p>
        
        <div className={styles.scheduleList}>
          {paymentSchedule.map((payment, index) => (
            <div key={index} className={styles.scheduleItem}>
              <div className={styles.scheduleDate}>{payment.date}</div>
              <div className={styles.scheduleAmountWrapper}>
                {payment.type === "deposit" && (
                  <span className={styles.depositBadge}>D</span>
                )}
                <span className={styles.scheduleAmount}>{payment.amount}</span>
                {payment.type === "deposit" && (
                  <span className={styles.depositLabel}>(deposit)</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
