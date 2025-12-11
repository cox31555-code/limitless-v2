"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { Plus_Jakarta_Sans } from "next/font/google";
import DashboardHero from "@/ui/dashboard/DashboardHero";
import styles from "./paymentsClient.module.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const NeedHelpSection = dynamic(() => import("@/ui/layout/NeedHelpSection"), {
  loading: () => <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>,
  ssr: false,
});

export default function PaymentsClient() {
  const [scheduleExpanded, setScheduleExpanded] = useState(false);
  const [autoRenewal, setAutoRenewal] = useState(true);
  const [optOutExpanded, setOptOutExpanded] = useState(false);
  const [showRenewalModal, setShowRenewalModal] = useState(false);

  useEffect(() => {
    if (showRenewalModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showRenewalModal]);

  const handleAutoRenewalChange = (e) => {
    if (e.target.checked) {
      // If checking, allow it immediately
      setAutoRenewal(true);
    } else {
      // If unchecking, show modal first
      setShowRenewalModal(true);
    }
  };

  const handleConfirmOptOut = () => {
    setAutoRenewal(false);
    setShowRenewalModal(false);
  };

  const handleCancelOptOut = () => {
    setShowRenewalModal(false);
  };

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
      <DashboardHero
        title="Manage your payments"
        subtitle="View your payment schedule, manage payment methods, and keep track of upcoming instalments"
      />

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

        {/* Account Balance Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <svg className={styles.sectionIcon} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 4v8M9 6l3-2 3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="7" cy="16" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M7 12v8M4 14l3-2 3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="17" cy="16" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M17 12v8M14 14l3-2 3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
              You have paid <strong>£47.29</strong> out of <strong>£568.69</strong>
            </p>
            <p className={styles.installmentInfo}>(11 instalments left X £47.40)</p>

            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: '8.3%' }}></div>
            </div>

            <button
              className={styles.viewInstalmentsButton}
              onClick={() => setScheduleExpanded(!scheduleExpanded)}
            >
              <svg className={styles.viewInstalmentsIcon} viewBox="0 0 24 24" fill="none">
                {scheduleExpanded ? (
                  <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                ) : (
                  <>
                    <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </>
                )}
              </svg>
              <span>{scheduleExpanded ? 'Hide instalments plan' : 'View instalments plan'}</span>
            </button>

            {scheduleExpanded && (
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
            )}
          </div>
        </div>

        {/* Auto-Renewal Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <svg className={styles.sectionIcon} viewBox="0 0 24 24" fill="none">
              <path d="M21 12a9 9 0 11-9-9c2.52 0 4.93 1 6.74 2.74L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 3v5h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className={styles.sectionTitle}>Auto-renewal makes things a little easier...</h2>
          </div>
          <div className={styles.sectionContent}>
            <ul className={styles.benefitsList}>
              <li className={styles.benefitItem}>
                <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className={styles.benefitText}>
                  <strong>Continuous cover for peace of mind:</strong> Save time, stay covered
                </div>
              </li>
              <li className={styles.benefitItem}>
                <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className={styles.benefitText}>
                  <strong>Control:</strong> We'll let you know if you're happy with the price and cover 4 weeks before your renewal's due
                </div>
              </li>
              <li className={styles.benefitItem}>
                <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className={styles.benefitText}>
                  <strong>Flexibility:</strong> You can opt out of auto-renewal for free at any time
                </div>
              </li>
            </ul>

            <div className={styles.optOutSection}>
              <h3 className={styles.optOutTitle}>Prefer not to auto-renew?</h3>
              <button
                className={styles.optOutToggle}
                onClick={() => setOptOutExpanded(!optOutExpanded)}
              >
                <span>Opt out here</span>
                <svg
                  className={`${styles.chevronIcon} ${optOutExpanded ? styles.chevronOpen : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <polyline points="6 9 12 15 18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {optOutExpanded && (
                <div className={styles.optOutContent}>
                  <label className={styles.autoRenewalLabel}>
                    <input
                      type="checkbox"
                      checked={autoRenewal}
                      onChange={handleAutoRenewalChange}
                      className={styles.autoRenewalCheckbox}
                    />
                    <span className={styles.autoRenewalText}>
                      By automatically renewing your insurance, you can save time next year and ensure that there's no interruption to your cover. Untick this button to opt out of automatic renewal.
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>}>
        <NeedHelpSection />
      </Suspense>

      {/* Auto-Renewal Confirmation Modal */}
      {showRenewalModal && (
        <div className={styles.modalOverlay} onClick={handleCancelOptOut}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={handleCancelOptOut}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className={styles.modalHeader}>
              <div className={styles.modalIconCircle}>
                <svg className={styles.modalIcon} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h2 className={styles.modalTitle}>Automatic renewal</h2>
            </div>

            <div className={styles.modalBody}>
              <p className={styles.modalText}>
                To make things easy, we can <strong>set up your policy to renew automatically</strong> next year but you can always opt out if you change your mind.
              </p>
              <p className={styles.modalText}>
                We want to give you the <strong>reassurance of our continuous cover</strong> as car insurance is a legal requirement and, as you're in control, you'll have <strong>plenty of time to review</strong> your renewal quote either way.
              </p>
              <p className={styles.modalText}>
                Whatever you decide, we'll make it happen.
              </p>
            </div>

            <div className={styles.modalActions}>
              <button className={styles.modalButtonPrimary} onClick={handleCancelOptOut}>
                Ok, auto-renew
              </button>
              <button className={styles.modalButtonSecondary} onClick={handleConfirmOptOut}>
                I don't want to auto-renew
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
