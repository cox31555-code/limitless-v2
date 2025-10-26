"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboardClient.module.css";

const DashboardClient = () => {
  const router = useRouter();
  const [activeInsurances, setActiveInsurances] = useState(2);
  const [pendingClaims, setPendingClaims] = useState(1);

  const StatIcon = ({ type }) => {
    const icons = {
      shield: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      document: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <polyline points="13 2 13 9 20 9" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="15" y2="17" />
        </svg>
      ),
      clock: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    };
    return <span className={styles.statIcon}>{icons[type]}</span>;
  };

  const ArrowIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7 10h10M14 7l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const stats = [
    {
      icon: <StatIcon type="shield" />,
      label: "Active Policies",
      value: activeInsurances,
      color: "#0388ff",
      action: () => router.push("/dashboard/policy"),
    },
    {
      icon: <StatIcon type="document" />,
      label: "Documents",
      value: "5",
      color: "#049cff",
      action: () => router.push("/dashboard/documents"),
    },
    {
      icon: <StatIcon type="clock" />,
      label: "Pending Claims",
      value: pendingClaims,
      color: "#ff9500",
      action: () => router.push("/dashboard/claims"),
    },
  ];

  const ActionIcon = ({ type }) => {
    const icons = {
      add: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      ),
      settings: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 0l4.24-4.24M1 12h6m6 0h6m-1.78 7.78l-4.24-4.24m-5.08 0l-4.24 4.24" />
        </svg>
      ),
      briefcase: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <line x1="8" y1="12" x2="8" y2="16" />
          <line x1="16" y1="12" x2="16" y2="16" />
        </svg>
      ),
      fileText: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="16" y2="17" />
        </svg>
      ),
    };
    return <span className={styles.actionIcon}>{icons[type]}</span>;
  };

  const quickActions = [
    {
      title: "Create New Policy",
      description: "Get instant temporary insurance coverage",
      icon: <ActionIcon type="add" />,
      action: () => router.push("/temporary/get-quote?payment=false"),
      color: "#0388ff",
    },
    {
      title: "Manage Your Policy",
      description: "View and manage your existing policies",
      icon: <ActionIcon type="settings" />,
      action: () => router.push("/dashboard/policy"),
      color: "#049cff",
    },
    {
      title: "View Documents",
      description: "Access policy documents and booklets",
      icon: <ActionIcon type="briefcase" />,
      action: () => router.push("/dashboard/documents"),
      color: "#0270cc",
    },
    {
      title: "Submit a Claim",
      description: "File a new insurance claim",
      icon: <ActionIcon type="fileText" />,
      action: () => router.push("/dashboard/submit-claim"),
      color: "#ff9500",
    },
  ];


  return (
    <div className={styles.container}>
      {/* Welcome Section */}
      <section className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <div className={styles.welcomeText}>
            <h1 className={styles.welcomeTitle}>Welcome Back!</h1>
            <p className={styles.welcomeSubtitle}>
              Manage your insurance policies, claims, and documents in one place
            </p>
          </div>
          <button
            className={styles.liveChat}
            onClick={() => {
              // Live chat integration would go here
              window.open("https://limitlesscover.co.uk", "_blank");
            }}
          >
            <span>Need Help?</span>
            <ArrowIcon />
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={styles.statCard}
              onClick={stat.action}
              style={{ "--stat-color": stat.color }}
            >
              <div className={styles.statIconWrapper} style={{ "--bg-color": stat.color }}>
                {stat.icon}
              </div>
              <div className={styles.statContent}>
                <p className={styles.statLabel}>{stat.label}</p>
                <p className={styles.statValue}>{stat.value}</p>
              </div>
              <ArrowIcon className={styles.statArrow} style={{ width: "20px", height: "20px" }} />
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className={styles.quickActionsSection}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <button
              key={index}
              className={styles.actionCard}
              onClick={action.action}
              style={{ "--action-color": action.color }}
            >
              <div className={styles.actionIconWrapper}>
                <div className={styles.actionIcon} style={{ "--icon-color": action.color }}>
                  {action.icon}
                </div>
              </div>
              <div className={styles.actionContent}>
                <h3 className={styles.actionTitle}>{action.title}</h3>
                <p className={styles.actionDescription}>{action.description}</p>
              </div>
              <ArrowIcon className={styles.actionArrow} style={{ width: "20px", height: "20px" }} />
            </button>
          ))}
        </div>
      </section>


      {/* Info Section */}
      <section className={styles.infoSection}>
        <div className={styles.infoCard}>
          <div className={styles.infoIconWrapper}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "2.4rem", height: "2.4rem" }}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="10 14 12 16 14 12" />
            </svg>
          </div>
          <h3 className={styles.infoTitle}>Your Data is Secure</h3>
          <p className={styles.infoDescription}>
            We use industry-leading encryption to protect your personal and financial information
          </p>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoIconWrapper}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "2.4rem", height: "2.4rem" }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="9" cy="10" r="1" fill="currentColor" />
              <circle cx="12" cy="10" r="1" fill="currentColor" />
              <circle cx="15" cy="10" r="1" fill="currentColor" />
            </svg>
          </div>
          <h3 className={styles.infoTitle}>24/7 Support</h3>
          <p className={styles.infoDescription}>
            Our support team is available round the clock to help with any questions
          </p>
        </div>
      </section>
    </div>
  );
};

export default DashboardClient;
