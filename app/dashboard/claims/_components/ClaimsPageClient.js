"use client";
import React, { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Table from "./table/Table";
import DashboardHero from "@/ui/dashboard/DashboardHero";
import { useLoading } from "@/contexts/LoadingContext";
import styles from "./claimsPageClient.module.css";

const NeedHelpSection = dynamic(() => import("@/ui/layout/NeedHelpSection"), {
  loading: () => <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>,
  ssr: false,
});

const ClaimsPageClient = ({
  pendingClaims,
  completedClaims,
}) => {
  const router = useRouter();
  const { showLoading } = useLoading();
  const [activeTab, setActiveTab] = useState("pending");

  const handleCreateClaim = () => {
    showLoading();
    router.push("/dashboard/submit-claim");
  };

  const totalPending = pendingClaims?.length || 0;
  const totalCompleted = completedClaims?.length || 0;

  return (
    <div className={styles.container} suppressHydrationWarning>
      <DashboardHero
        title="Manage your claims"
        subtitle="View and manage your insurance claims. Track the status of pending claims and access your claim history"
        badge="Limitless Cover"
      />

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
          <button
            onClick={handleCreateClaim}
            className={styles.createButton}
          >
            <svg className={styles.plusIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Create a new claim</span>
          </button>
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

      <Suspense fallback={<div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>}>
        <NeedHelpSection />
      </Suspense>
    </div>
  );
};

export default ClaimsPageClient;
