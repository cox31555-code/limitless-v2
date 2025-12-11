"use client";

import React, { useState, useMemo, lazy, Suspense } from "react";
import styles from "./dashboardTabs.module.css";

const ClaimsPageClient = lazy(() => import("../claims/_components/ClaimsPageClient"));
const DocumentsClient = lazy(() => import("../documents/_components/DocumentsClient"));
const PolicyPageClient = lazy(() => import("../policy/_components/PolicyPageClient"));
const PaymentsPageClient = lazy(() => import("../payments/_components/PaymentsPageClient"));

const TabLoadingFallback = () => (
  <div className={styles.loadingFallback}>
    <div className={styles.spinner}></div>
    <p>Loading...</p>
  </div>
);

export const DashboardTabs = ({
  pendingClaims,
  completedClaims,
  insurances,
  activePolicies,
  expiredPolicies,
  plusJakartaSans,
}) => {
  const [activeTab, setActiveTab] = useState("claims");

  const tabs = [
    { id: "claims", label: "Claims" },
    { id: "documents", label: "Documents" },
    { id: "policy", label: "Policy" },
    { id: "payments", label: "Payments" },
  ];

  const memoizedPendingClaims = useMemo(() => pendingClaims, [pendingClaims]);
  const memoizedCompletedClaims = useMemo(() => completedClaims, [completedClaims]);
  const memoizedInsurances = useMemo(() => insurances, [insurances]);
  const memoizedActivePolicies = useMemo(() => activePolicies, [activePolicies]);
  const memoizedExpiredPolicies = useMemo(() => expiredPolicies, [expiredPolicies]);

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabNavigation}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ""}`}
            onClick={() => setActiveTab(tab.id)}
            aria-selected={activeTab === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.tabContent}>
        <Suspense fallback={<TabLoadingFallback />}>
          {activeTab === "claims" && (
            <ClaimsPageClient
              pendingClaims={memoizedPendingClaims}
              completedClaims={memoizedCompletedClaims}
              plusJakartaSans={plusJakartaSans}
            />
          )}
        </Suspense>

        <Suspense fallback={<TabLoadingFallback />}>
          {activeTab === "documents" && (
            <DocumentsClient insurances={memoizedInsurances} />
          )}
        </Suspense>

        <Suspense fallback={<TabLoadingFallback />}>
          {activeTab === "policy" && (
            <PolicyPageClient
              activePolicies={memoizedActivePolicies}
              expiredPolicies={memoizedExpiredPolicies}
              plusJakartaSans={plusJakartaSans}
            />
          )}
        </Suspense>

        <Suspense fallback={<TabLoadingFallback />}>
          {activeTab === "payments" && (
            <PaymentsPageClient />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardTabs;
