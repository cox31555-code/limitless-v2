"use client";

import { useState } from "react";
import styles from "./paymentsClient.module.css";
import NeedHelpSection from "@/ui/layout/NeedHelpSection";

export default function PaymentsClient({ plusJakartaSans }) {
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
    <div className={styles.container} suppressHydrationWarning>
      {/* Hero Section - Full Width */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="106.238px" height="176.262px" viewBox="0 0 106.238 140.262" className={styles.heroBackgroundImage}>
            <style>{`.st0{fill:#FFFFFF;}.st1{fill:#05AFFF;}.st2{fill:#0A0913;}`}</style>
            <path className="st1" d="M86.515,75.233L44.398,94.136v25.204l-4.194-4.194l-13.187-13.187l-7.276-7.276l24.658-11.08l17.44-7.823l35.953-16.152c9.13-4.116,11.334-16.094,4.253-23.175L70.012,4.419C60.57-5.023,44.398,1.669,44.398,15.012v20.171L0.115,55.081v19.098l17.44-7.823l39.484-17.713l4.916-2.204V27.302l-0.117,0.058v-6.457l24.677,24.677l-10.944,4.916l0.02,0.039l-46.682,21.01l-0.039-0.078L8.464,80.636c-0.351,0.156-0.683,0.312-0.995,0.488c-4.253,2.302-6.808,6.399-7.354,10.768c-0.527,4.175,0.741,8.583,4.077,11.919l32.051,32.032c9.442,9.442,25.594,2.751,25.594-10.612v-19.82l24.677-11.08l19.722-8.837V66.357L86.515,75.233z"/>
          </svg>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.greetingArea} suppressHydrationWarning>
            <h1 className={`${styles.greetingTitle} ${plusJakartaSans?.className || ""}`}>
              Manage your payments
            </h1>
            <p className={styles.greetingSubtitle}>
              View your payment schedule, manage payment methods, and keep track of upcoming instalments
            </p>
          </div>
          <div className={styles.badgeArea}>
            <span className={styles.allianzBadge}>Limitless Cover</span>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbItem}>Dashboard</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={`${styles.breadcrumbItem} ${styles.active}`}>Payments</span>
      </div>

      {/* Content Wrapper */}
      <div className={styles.contentWrapper}>
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
          <div className={styles.sectionContent}>
            <p className={styles.paymentDay}>Every <strong>5th</strong> of the month</p>
            <button className={styles.changeButton}>Change day</button>
          </div>
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
          <div className={styles.sectionContent}>
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
        </div>

        {/* Account Balance Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <svg className={styles.sectionIcon} viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
              <circle cx="9" cy="11" r="1.5" fill="currentColor"/>
              <circle cx="15" cy="11" r="1.5" fill="currentColor"/>
              <path d="M12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="currentColor"/>
              <path d="M8 8h2v2H8zm6 0h2v2h-2z" fill="currentColor"/>
            </svg>
            <h2 className={styles.sectionTitle}>Account balance</h2>
          </div>
          <div className={styles.sectionContent}>
            <div className={styles.balanceInfo}>
              <p className={styles.balanceAmount}>
                <strong>£521.4</strong> <span className={styles.balanceNote}>(incl. Interest and Insurance Premium Tax)</span>
              </p>
              <p className={styles.balanceDescription}>
                By paying off your car insurance, you're saving <strong>£43.04</strong> in interest charges. There are no fees on doing this.
              </p>
            </div>
            <button className={styles.payOffButton}>Pay off my balance</button>
          </div>
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
          <div className={styles.sectionContent}>
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
      </div>

      <NeedHelpSection />
    </div>
  );
}
