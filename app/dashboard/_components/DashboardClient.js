"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboardClient.module.css";
import Image from "next/image";
import { IoFileText, IoShield, IoCheckmarkCircle, IoClock, IoArrowForward } from "react-icons/io5";

const DashboardClient = () => {
  const router = useRouter();
  const [activeInsurances, setActiveInsurances] = useState(2);
  const [expiredInsurances, setExpiredInsurances] = useState(1);
  const [pendingClaims, setPendingClaims] = useState(1);

  const stats = [
    {
      icon: <IoShield className={styles.statIcon} />,
      label: "Active Policies",
      value: activeInsurances,
      color: "#0388ff",
      action: () => router.push("/dashboard/policy"),
    },
    {
      icon: <IoFileText className={styles.statIcon} />,
      label: "Documents",
      value: "5",
      color: "#049cff",
      action: () => router.push("/dashboard/documents"),
    },
    {
      icon: <IoClock className={styles.statIcon} />,
      label: "Pending Claims",
      value: pendingClaims,
      color: "#ff9500",
      action: () => router.push("/dashboard/claims"),
    },
    {
      icon: <IoCheckmarkCircle className={styles.statIcon} />,
      label: "Completed",
      value: "12",
      color: "#00c853",
      action: () => router.push("/dashboard/claims"),
    },
  ];

  const quickActions = [
    {
      title: "Create New Policy",
      description: "Get instant temporary insurance coverage",
      icon: "/svg/plus.svg",
      action: () => router.push("/temporary/get-quote?payment=false"),
      color: "#0388ff",
    },
    {
      title: "Manage Your Policy",
      description: "View and manage your existing policies",
      icon: "/svg/edit.svg",
      action: () => router.push("/dashboard/policy"),
      color: "#049cff",
    },
    {
      title: "View Documents",
      description: "Access policy documents and booklets",
      icon: "/svg/document.svg",
      action: () => router.push("/dashboard/documents"),
      color: "#0270cc",
    },
    {
      title: "Submit a Claim",
      description: "File a new insurance claim",
      icon: "/svg/claim.svg",
      action: () => router.push("/dashboard/submit-claim"),
      color: "#ff9500",
    },
  ];

  const recentActivity = [
    {
      title: "Policy Created",
      description: "Temporary insurance for AB21DEV",
      date: "2 days ago",
      icon: "📋",
      status: "completed",
    },
    {
      title: "Claim Submitted",
      description: "Claim #CLM-001 submitted successfully",
      date: "1 week ago",
      icon: "✓",
      status: "pending",
    },
    {
      title: "Document Downloaded",
      description: "Your policy schedule downloaded",
      date: "2 weeks ago",
      icon: "📄",
      status: "completed",
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
            <IoArrowForward />
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
              <IoArrowForward className={styles.statArrow} />
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
                  <Image
                    src={action.icon}
                    alt={action.title}
                    width={28}
                    height={28}
                  />
                </div>
              </div>
              <div className={styles.actionContent}>
                <h3 className={styles.actionTitle}>{action.title}</h3>
                <p className={styles.actionDescription}>{action.description}</p>
              </div>
              <IoArrowForward className={styles.actionArrow} />
            </button>
          ))}
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className={styles.activitySection}>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        <div className={styles.activityList}>
          {recentActivity.map((activity, index) => (
            <div key={index} className={`${styles.activityItem} ${styles[activity.status]}`}>
              <div className={styles.activityIcon}>{activity.icon}</div>
              <div className={styles.activityContent}>
                <h4 className={styles.activityTitle}>{activity.title}</h4>
                <p className={styles.activityDescription}>{activity.description}</p>
              </div>
              <time className={styles.activityDate}>{activity.date}</time>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className={styles.infoSection}>
        <div className={styles.infoCard}>
          <div className={styles.infoIconWrapper}>
            <IoShield className={styles.infoIcon} />
          </div>
          <h3 className={styles.infoTitle}>Your Data is Secure</h3>
          <p className={styles.infoDescription}>
            We use industry-leading encryption to protect your personal and financial information
          </p>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoIconWrapper}>
            <IoCheckmarkCircle className={styles.infoIcon} />
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
