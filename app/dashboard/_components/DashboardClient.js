"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboardClient.module.css";

const DashboardClient = () => {
  const router = useRouter();
  const [bannerIndex, setBannerIndex] = useState(0);

  const activePolicies = [
    {
      id: 1,
      name: "Limitless Cover Car Insurance",
      policyNumber: "LC-847291",
      vehicle: "LN60AYT - VW GOLF TWIST",
      coverEnd: "24 November 2026",
      status: "Active",
    },
  ];

  const promotionalBanners = [
    {
      id: 1,
      title: "More cars?",
      description: "Just tell us about any additional cars you need covered, and we'll give you a quick quote based on your existing Limitless Cover policy.",
      cta: "Get your car quote",
      ctaAction: () => router.push("/dashboard"),
      icon: "cars",
    },
    {
      id: 2,
      title: "Need temporary cover?",
      description: "Get peace of mind with our flexible temporary cover. Quote in minutes, cover within hours.",
      cta: "Get temporary cover",
      ctaAction: () => router.push("/dashboard"),
      icon: "calendar",
    },
  ];

  const menuItems = [
    {
      label: "Manage Policy",
      description: "View and update your policy details",
      icon: "policy",
      action: () => router.push("/dashboard/policy"),
    },
    {
      label: "Documents",
      description: "Access your policy documents and certificates",
      icon: "document",
      action: () => router.push("/dashboard/documents"),
    },
    {
      label: "Manage Claims",
      description: "Track and manage your claims",
      icon: "claims",
      action: () => router.push("/dashboard/claims"),
    },
    {
      label: "Submit a Claim",
      description: "Start a new insurance claim",
      icon: "submit",
      action: () => router.push("/dashboard/submit-claim"),
    },
  ];

  const MenuIcon = ({ type }) => {
    const icons = {
      policy: (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="30" width="120" height="140" rx="8" fill="none" stroke="currentColor" strokeWidth="8"/>
          <line x1="60" y1="60" x2="140" y2="60" stroke="currentColor" strokeWidth="4"/>
          <line x1="60" y1="90" x2="140" y2="90" stroke="currentColor" strokeWidth="4"/>
          <line x1="60" y1="120" x2="120" y2="120" stroke="currentColor" strokeWidth="4"/>
        </svg>
      ),
      document: (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M 60 40 L 140 40 L 140 160 L 60 160 Z" fill="none" stroke="currentColor" strokeWidth="8"/>
          <line x1="80" y1="70" x2="120" y2="70" stroke="currentColor" strokeWidth="4"/>
          <line x1="80" y1="100" x2="120" y2="100" stroke="currentColor" strokeWidth="4"/>
          <line x1="80" y1="130" x2="120" y2="130" stroke="currentColor" strokeWidth="4"/>
        </svg>
      ),
      claims: (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="8"/>
          <path d="M 75 100 L 95 120 L 130 80" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
        </svg>
      ),
      submit: (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M 100 40 L 160 80 L 160 160 L 40 160 L 40 80 Z" fill="none" stroke="currentColor" strokeWidth="8"/>
          <line x1="100" y1="80" x2="100" y2="130" stroke="currentColor" strokeWidth="6"/>
          <line x1="75" y1="105" x2="125" y2="105" stroke="currentColor" strokeWidth="6"/>
        </svg>
      ),
    };
    return icons[type] || icons.policy;
  };

  return (
    <div className={styles.container}>
      {/* Hero Greeting Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="106.238px" height="176.262px" viewBox="0 0 106.238 140.262" className={styles.heroBackgroundImage}>
            <style>{`.st0{fill:#FFFFFF;}.st1{fill:#05AFFF;}.st2{fill:#0A0913;}`}</style>
            <path className="st1" d="M86.515,75.233L44.398,94.136v25.204l-4.194-4.194l-13.187-13.187l-7.276-7.276l24.658-11.08l17.44-7.823l35.953-16.152c9.13-4.116,11.334-16.094,4.253-23.175L70.012,4.419C60.57-5.023,44.398,1.669,44.398,15.012v20.171L0.115,55.081v19.098l17.44-7.823l39.484-17.713l4.916-2.204V27.302l-0.117,0.058v-6.457l24.677,24.677l-10.944,4.916l0.02,0.039l-46.682,21.01l-0.039-0.078L8.464,80.636c-0.351,0.156-0.683,0.312-0.995,0.488c-4.253,2.302-6.808,6.399-7.354,10.768c-0.527,4.175,0.741,8.583,4.077,11.919l32.051,32.032c9.442,9.442,25.594,2.751,25.594-10.612v-19.82l24.677-11.08l19.722-8.837V66.357L86.515,75.233z"/>
          </svg>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.greetingArea}>
            <h1 className={styles.greetingTitle}>Hi, Adnan</h1>
            <p className={styles.greetingSubtitle}>Welcome back to your insurance hub</p>
          </div>
          <div className={styles.badgeArea}>
            <span className={styles.allianzBadge}>Limitless Cover</span>
          </div>
        </div>
      </section>

      {/* Policy Card Section with Promotional Banners */}
      <section className={styles.policiesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Your Active Policies</h2>
        </div>
        <div className={styles.policiesBannerContainer}>
          <div className={styles.policiesGrid}>
            {activePolicies.map((policy) => (
              <div key={policy.id} className={styles.policyCard}>
                <div className={styles.policyCardHeader}>
                  <div className={styles.policyIcon}>
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <rect x="40" y="40" width="120" height="120" rx="10" fill="currentColor"/>
                      <circle cx="100" cy="80" r="15" fill="white"/>
                      <rect x="70" y="110" width="60" height="50" rx="5" fill="white"/>
                    </svg>
                  </div>
                  <div className={styles.policyHeaderInfo}>
                    <h3 className={styles.policyName}>{policy.name}</h3>
                    <span className={styles.policyStatus}>{policy.status}</span>
                  </div>
                </div>
                <div className={styles.policyDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Policy Number</span>
                    <span className={styles.detailValue}>{policy.policyNumber}</span>
                  </div>
                  <div className={styles.detailDivider}></div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Registered Vehicle</span>
                    <span className={styles.detailValue}>{policy.vehicle}</span>
                  </div>
                </div>
                <div className={styles.policyCoverInfo}>
                  <div className={styles.coverInfoIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className={styles.coverInfoLabel}>Cover Ends</p>
                    <p className={styles.coverInfoValue}>{policy.coverEnd}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Promotional Banners Carousel */}
          <div className={styles.bannerCarousel}>
            <div className={styles.bannerContent}>
              <div className={styles.bannerText}>
                <h3 className={styles.bannerTitle}>{promotionalBanners[bannerIndex].title}</h3>
                <p className={styles.bannerDescription}>{promotionalBanners[bannerIndex].description}</p>
                <button
                  className={styles.bannerCta}
                  onClick={promotionalBanners[bannerIndex].ctaAction}
                >
                  {promotionalBanners[bannerIndex].cta}
                </button>
              </div>
            </div>
            <div className={styles.bannerDots}>
              {promotionalBanners.map((banner, index) => (
                <button
                  key={banner.id}
                  className={`${styles.dot} ${bannerIndex === index ? styles.active : ""}`}
                  onClick={() => setBannerIndex(index)}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
              <button
                className={styles.nextButton}
                onClick={() => setBannerIndex((prev) => (prev + 1) % promotionalBanners.length)}
                aria-label="Next banner"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className={styles.menuSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Quick Actions</h2>
        </div>
        <div className={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={styles.menuItem}
              onClick={item.action}
            >
              <div className={styles.menuItemIconWrapper}>
                <div className={styles.menuItemIcon}>
                  <MenuIcon type={item.icon} />
                </div>
              </div>
              <div className={styles.menuItemContent}>
                <p className={styles.menuItemLabel}>{item.label}</p>
                <p className={styles.menuItemDescription}>{item.description}</p>
              </div>
              <div className={styles.menuItemArrow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardClient;
