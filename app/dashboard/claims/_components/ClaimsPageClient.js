"use client";
import React, { useState } from "react";
import Table from "./table/Table";
import NeedHelpSection from "@/ui/layout/NeedHelpSection";
import styles from "./claimsPageClient.module.css";
import Link from "next/link";

const ClaimsPageClient = ({
  pendingClaims,
  completedClaims,
  plusJakartaSans,
}) => {
  const [activeTab, setActiveTab] = useState("pending");

  const totalPending = pendingClaims?.length || 0;
  const totalCompleted = completedClaims?.length || 0;

  return (
    <div className={styles.container} suppressHydrationWarning>
      {/* Hero Section - Full Width */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="106.238px" height="176.262px" viewBox="0 0 106.238 140.262" className={styles.heroBackgroundImage}>
            <style>{`.st0{fill:#FFFFFF;}.st1{fill:#05AFFF;}.st2{fill:#0A0913;}`}</style>
            <path className="st1" d="M86.515,75.233L44.398,94.136v25.204l-4.194-4.194l-13.187-13.187l-7.276-7.276l24.658-11.08l17.44-7.823l35.953-16.152c9.13-4.116,11.334-16.094,4.253-23.175L70.012,4.419C60.57,-5.023,44.398,1.669,44.398,15.012v20.171L0.115,55.081v19.098l17.44-7.823l39.484-17.713l4.916-2.204V27.302l-0.117,0.058v-6.457l24.677,24.677l-10.944,4.916l0.02,0.039l-46.682,21.01l-0.039-0.078L8.464,80.636c-0.351,0.156-0.683,0.312-0.995,0.488c-4.253,2.302-6.808,6.399-7.354,10.768c-0.527,4.175,0.741,8.583,4.077,11.919l32.051,32.032c9.442,9.442,25.594,2.751,25.594-10.612v-19.82l24.677-11.08l19.722-8.837V66.357L86.515,75.233z"/>
          </svg>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.greetingArea}>
            <h1 className={`${styles.greetingTitle} ${plusJakartaSans?.className || ""}`}>
              Manage your claims
            </h1>
            <p className={styles.greetingSubtitle}>
              View and manage your insurance claims. Track the status of pending claims and access your claim history
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
        <span className={`${styles.breadcrumbItem} ${styles.active}`}>Manage Claims</span>
      </div>

      {/* Content Wrapper */}
      <div className={styles.contentWrapper}>
        {/* Header with Create Button */}
        <div className={styles.contentHeader}>
          <div className={styles.contentHeaderText}>
            <h2 className={styles.contentTitle}>Your Claims</h2>
            <p className={styles.contentSubtitle}>Manage and track all your insurance claims</p>
          </div>
          <Link href="/dashboard/submit-claim" className={styles.createButton}>
            <svg className={styles.plusIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Create a new claim</span>
          </Link>
        </div>

        {/* Tabs Navigation */}
        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tab} ${activeTab === "pending" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            <span className={styles.tabNumber}>01</span>
            <span className={styles.tabLabel}>Pending Claims</span>
            <span className={styles.tabBadge}>{totalPending}</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === "completed" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            <span className={styles.tabNumber}>02</span>
            <span className={styles.tabLabel}>Claim History</span>
            <span className={styles.tabBadge}>{totalCompleted}</span>
          </button>
        </div>

        {/* Pending Claims Tab Content */}
        {activeTab === "pending" && (
          <section className={styles.claimsSection}>
            {pendingClaims && pendingClaims.length > 0 ? (
              <>
                <div className={styles.sectionHeaderWrapper}>
                  <div className={styles.sectionHeader} />
                  <p className={styles.sectionDescription}>
                    Your claims are currently being processed
                  </p>
                </div>
                <Table
                  title="Pending Claims"
                  claimType="pending"
                  data={pendingClaims}
                  showTitle={false}
                />
              </>
            ) : (
              <div className={styles.emptyState}>
                <h3 className={styles.emptyTitle}>No pending claims</h3>
                <p className={styles.emptyDescription}>
                  You don&apos;t have any pending claims at the moment.
                </p>
              </div>
            )}
          </section>
        )}

        {/* Completed Claims Tab Content */}
        {activeTab === "completed" && (
          <section className={styles.claimsSection}>
            {completedClaims && completedClaims.length > 0 ? (
              <>
                <div className={styles.sectionHeaderWrapper}>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Claim History</h2>
                  </div>
                </div>
                <Table
                  title="Claim History"
                  claimType="completed"
                  data={completedClaims}
                  showTitle={false}
                />
              </>
            ) : (
              <div className={styles.emptyState}>
                <h3 className={styles.emptyTitle}>No claim history</h3>
                <p className={styles.emptyDescription}>
                  You don&apos;t have any completed claims yet.
                </p>
              </div>
            )}
          </section>
        )}
      </div>

      <NeedHelpSection />
    </div>
  );
};

export default ClaimsPageClient;
