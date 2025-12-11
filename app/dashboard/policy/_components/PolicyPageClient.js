"use client";
import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { Plus_Jakarta_Sans } from "next/font/google";
import Table from "./table/Table";
import DashboardHero from "@/ui/dashboard/DashboardHero";
import Breadcrumb from "@/ui/dashboard/breadcrumb/Breadcrumb";
import styles from "./policyPageClient.module.css";
import { useInsuranceModal } from "@/contexts/InsuranceModalContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const NeedHelpSection = dynamic(() => import("@/ui/layout/NeedHelpSection"), {
  loading: () => <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>,
  ssr: false,
});

const PolicyPageClient = ({
  activePolicies,
  expiredPolicies,
  pageStyles,
}) => {
  const { setIsInsuranceModalOpen } = useInsuranceModal();
  const [activeTab, setActiveTab] = useState("active");

  const handleCreatePolicy = () => {
    setIsInsuranceModalOpen(true);
  };

  const totalExpired = expiredPolicies?.length || 0;
  const totalActive = activePolicies?.length || 0;

  return (
    <div className={styles.container} suppressHydrationWarning>
      <DashboardHero
        title="Manage your policies"
        subtitle="Review, update and manage all your insurance policies in one secure place"
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={[
        { label: "Dashboard" },
        { label: "Manage Policy" }
      ]} />

      {/* Content Wrapper */}
      <div className={styles.contentWrapper}>
        {/* Header with Create Button */}
        <div className={styles.contentHeader}>
          <div className={styles.contentHeaderText}>
            <h2 className={styles.contentTitle}>Your Policies</h2>
            <p className={styles.contentSubtitle}>Manage and review all your insurance policies</p>
          </div>
          <button
            onClick={handleCreatePolicy}
            className={styles.createButton}
          >
            <svg className={styles.plusIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Create a new policy</span>
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tab} ${activeTab === "active" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("active")}
          >
            <span className={styles.tabNumber}>01</span>
            <span className={styles.tabLabel}>Active Policies</span>
            <span className={styles.tabBadge}>{totalActive}</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === "expired" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("expired")}
          >
            <span className={styles.tabNumber}>02</span>
            <span className={styles.tabLabel}>Expired Policies</span>
            <span className={styles.tabBadge}>{totalExpired}</span>
          </button>
        </div>

        {/* Active Policies Tab Content */}
        {activeTab === "active" && activePolicies && activePolicies.length > 0 && (
          <section className={styles.policiesSection}>
            <div className={styles.sectionHeaderWrapper}>
              <div className={styles.sectionHeader} />
              <p className={styles.sectionDescription}>
                Your policies are currently active and providing coverage
              </p>
            </div>
            <Table
              title="Active Policies"
              tableType="active"
              columns={[
                "Policy Number",
                "Remaining",
                "Name",
                "Vehicle Reg",
                "Details",
              ]}
              data={activePolicies}
              showTitle={false}
            />
          </section>
        )}

        {/* Expired Policies Tab Content */}
        {activeTab === "expired" && expiredPolicies && expiredPolicies.length > 0 && (
          <section className={styles.policiesSection}>
            <div className={styles.sectionHeaderWrapper}>
              <div className={styles.sectionHeader} />
            </div>
            <Table
              title="Expired Policies"
              tableType="inactive"
              columns={[
                "Policy Number",
                "Status",
                "Name",
                "Vehicle Reg",
                "Details",
              ]}
              data={expiredPolicies}
              showViewButton={true}
              theme="default"
              showTitle={false}
            />
          </section>
        )}
      </div>

      <Suspense fallback={<div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>}>
        <NeedHelpSection />
      </Suspense>
    </div>
  );
};

export default PolicyPageClient;
