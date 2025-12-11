"use client";
import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import Table from "./table/Table";
import styles from "./policyPageClient.module.css";
import { useInsuranceModal } from "@/contexts/InsuranceModalContext";

const NeedHelpSection = dynamic(() => import("@/ui/layout/NeedHelpSection"), {
  loading: () => <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>,
  ssr: false,
});

const PolicyPageClient = ({
  activePolicies,
  expiredPolicies,
  pageStyles,
  plusJakartaSans,
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
      {/* Hero Section - Full Width */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="106.238px" height="176.262px" viewBox="0 0 106.238 140.262" className={styles.heroBackgroundImage}>
            <style>{`.st0{fill:#FFFFFF;}.st1{fill:#05AFFF;}.st2{fill:#0A0913;}`}</style>
            <path className="st1" d="M86.515,75.233L44.398,94.136v25.204l-4.194-4.194l-13.187-13.187l-7.276-7.276l24.658-11.08l17.44-7.823l35.953-16.152c9.13-4.116,11.334-16.094,4.253-23.175L70.012,4.419C60.57,-5.023,44.398,1.669,44.398,15.012v20.171L0.115,55.081v19.098l17.44-7.823l39.484-17.713l4.916-2.204V27.302l-0.117,0.058v-6.457l24.677,24.677l-10.944,4.916l0.02,0.039l-46.682,21.01l-0.039-0.078L8.464,80.636c-0.351,0.156-0.683,0.312-0.995,0.488c-4.253,2.302-6.808,6.399-7.354,10.768c-0.527,4.175,0.741,8.583,4.077,11.919l32.051,32.032c9.442,9.442,25.594,2.751,25.594-10.612v-19.82l24.677-11.08l19.722-8.837V66.357L86.515,75.233z"/>
          </svg>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.greetingArea} suppressHydrationWarning>
            <h1 className={`${styles.greetingTitle} ${plusJakartaSans?.className || ""}`}>
              Manage your policies
            </h1>
            <p className={styles.greetingSubtitle}>
              Review, update and manage all your insurance policies in one secure place
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
        <span className={`${styles.breadcrumbItem} ${styles.active}`}>Manage Policy</span>
      </div>

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
