"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./allianzDashboardClient.module.css";

const AllianzDashboardClient = () => {
  const router = useRouter();
  const [bannerIndex, setBannerIndex] = useState(0);

  const promotionalBanners = [
    {
      id: "more-cars",
      title: "More cars?",
      description: "Just tell us about any additional cars you need covered, and we'll give you a quick quote based on your existing Limitless Cover policy.",
      cta: "Get your car quote",
      ctaAction: () => router.push("/temporary/get-quote"),
      icon: "cars",
    },
    {
      id: "temporary",
      title: "Need temporary cover?",
      description: "Get quick and affordable temporary car insurance cover when you need it. Perfect for short-term driving needs.",
      cta: "Get temporary cover",
      ctaAction: () => router.push("/temporary/get-quote"),
      icon: "calendar",
    },
    {
      id: "impound",
      title: "Impound cover",
      description: "Protect yourself with impound insurance. Get coverage for vehicle recovery and storage costs.",
      cta: "Explore impound cover",
      ctaAction: () => router.push("/impound/get-quote"),
      icon: "shield",
    },
    {
      id: "courier",
      title: "Courier insurance",
      description: "Professional courier and delivery vehicle insurance. Comprehensive protection for your business.",
      cta: "Get a quote",
      ctaAction: () => router.push("/courier"),
      icon: "truck",
    },
  ];

  const menuItems = [
    {
      icon: "policy",
      label: "Manage Policy",
      action: () => router.push("/dashboard/policy"),
      description: "View and modify your policy details"
    },
    {
      icon: "documents",
      label: "Documents",
      action: () => router.push("/dashboard/documents"),
      description: "Access your documents and files"
    },
    {
      icon: "claims",
      label: "Manage Claims",
      action: () => router.push("/dashboard/claims"),
      description: "Track your existing claims"
    },
    {
      icon: "submitClaim",
      label: "Submit a Claim",
      action: () => router.push("/dashboard/submit-claim"),
      description: "File a new claim"
    },
  ];

  const activePolicies = [
    {
      id: 1,
      name: "Limitless Cover Car Insurance",
      policyNumber: "LN60AYT",
      vehicle: "VW GOLF TWIST",
      coverEnd: "24 November 2026",
      status: "Active",
    },
  ];

  const MenuIcon = ({ type }) => {
    const icons = {
      policy: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="12" y1="13" x2="12" y2="17"></line>
          <line x1="10" y1="15" x2="14" y2="15"></line>
        </svg>
      ),
      documents: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
          <polyline points="13 2 13 9 20 9"></polyline>
        </svg>
      ),
      claims: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      submitClaim: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14m-7-7h14"></path>
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2.4 12.4a2 2 0 010-2.83l7.17-7.17a2 2 0 012.83 0l7.59 7.59a2 2 0 010 2.82z"></path>
        </svg>
      ),
    };
    return icons[type] || icons.policy;
  };

  return (
    <div className={styles.container}>
      {/* Hero Greeting Section */}
      <section className={styles.heroSection}>
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
          <h2 className={styles.sectionTitle}>Your Active Policy</h2>
        </div>
        <div className={styles.policiesBannerContainer}>
          <div className={styles.policiesGrid}>
            {activePolicies.map((policy) => (
              <div key={policy.id} className={styles.policyCard}>
              <div className={styles.policyCardHeader}>
                <div className={styles.policyIcon}>
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 79.500 37.583 C 77.850 37.811, 71.430 38.503, 65.234 39.120 L 53.968 40.242 49.579 45.123 C 47.150 47.825, 43.894 53.111, 42.285 56.964 C 39.427 63.811, 39.351 63.891, 37.617 61.865 C 36.032 60.015, 34.943 59.842, 26.844 60.153 C 18.116 60.489, 17.743 60.602, 14.917 63.766 C 10.645 68.548, 10.823 74.023, 15.400 78.600 C 17.270 80.470, 19.608 82, 20.596 82 C 22.039 82, 21.761 82.651, 19.179 85.315 C 17.412 87.138, 15.524 90.173, 14.983 92.058 C 13.595 96.898, 13.701 153.843, 15.105 157.872 C 15.713 159.616, 17.033 161.483, 18.039 162.021 C 19.045 162.559, 24.995 163, 31.260 163 C 41.874 163, 42.800 162.842, 44.826 160.686 C 46.532 158.870, 47 157.147, 47 152.686 L 47 147 99.500 147 L 152 147 152 150.935 C 152 155.700, 153.481 159.883, 155.789 161.637 C 156.958 162.525, 161.167 162.946, 169.076 162.968 C 180.243 162.999, 180.737 162.909, 183.076 160.421 L 185.500 157.842 185.814 129.171 C 186.204 93.605, 185.939 91.045, 181.336 85.950 L 177.838 82.079 180.422 81.430 C 184.457 80.417, 188 75.513, 188 70.939 C 188 68.035, 187.251 66.193, 185.083 63.766 C 182.234 60.575, 181.948 60.492, 172.705 60.158 C 163.756 59.834, 163.155 59.941, 161.621 62.130 C 160.670 63.488, 160 63.867, 160 63.047 C 160 60.109, 152.762 47.176, 149.214 43.775 C 145.772 40.475, 144.805 40.128, 136 39.035 C 126.518 37.858, 85.184 36.795, 79.500 37.583 M 68.531 45.525 C 55.136 46.978, 55.044 47.034, 50.263 56.468 C 48.177 60.584, 44 71.381, 44 72.657 C 44 72.845, 69.200 73, 100 73 C 130.800 73, 156 72.845, 156 72.657 C 156 71.357, 151.799 60.572, 149.737 56.468 C 144.956 47.034, 144.864 46.978, 131.469 45.525 C 118.800 44.224, 81.200 44.224, 68.531 45.525 M 31 68.500 C 31 69.328, 31.448 70, 32 70 C 32.552 70, 33 69.328, 33 68.500 C 33 67.672, 32.552 67, 32 67 C 31.448 67, 31 67.672, 31 68.500 M 167 68.500 C 167 69.328, 167.448 70, 168 70 C 168.552 70, 169 69.328, 169 68.500 C 169 67.672, 168.552 67, 168 67 C 167.448 67, 167 67.672, 167 68.500 M 44.500 98 C 42.015 98, 40 100.239, 40 103 C 40 105.761, 42.015 108, 44.500 108 C 46.985 108, 49 105.761, 49 103 C 49 100.239, 46.985 98, 44.500 98 M 155.500 98 C 153.015 98, 151 100.239, 151 103 C 151 105.761, 153.015 108, 155.500 108 C 157.985 108, 160 105.761, 160 103 C 160 100.239, 157.985 98, 155.500 98 M 61 121 L 53.500 121 52.827 127.250 C 52.437 130.825, 52 135.456, 52 137.500 L 52 141 79.500 141 L 107 141 107 139.500 C 107 138.175, 105.700 134.300, 104.155 130.850 C 102.609 127.400, 101.500 124.775, 101.500 124.500 C 101.500 124.059, 88.543 124, 61 121 M 139 121 C 111.457 124, 98.500 124.059, 98.500 124.500 C 98.500 124.775, 97.391 127.400, 95.845 130.850 C 94.300 134.300, 93 138.175, 93 139.500 L 93 141 120.500 141 L 148 141 148 137.500 C 148 135.456, 147.563 130.825, 147.173 127.250 L 146.500 121 139 121" fill="currentColor"></path>
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
              {promotionalBanners.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === bannerIndex ? styles.active : ''}`}
                  onClick={() => setBannerIndex(index)}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
              <button
                className={styles.nextButton}
                onClick={() => setBannerIndex((bannerIndex + 1) % promotionalBanners.length)}
                aria-label="Next slide"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Menu */}
      <section className={styles.menuSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Quick Actions</h2>
          <p className={styles.sectionDescription}>Manage your policy and claims</p>
        </div>
        <div className={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={styles.menuItem}
              onClick={item.action}
              title={item.description}
            >
              <div className={styles.menuItemIconWrapper}>
                <div className={styles.menuItemIcon}>
                  <MenuIcon type={item.icon} />
                </div>
              </div>
              <div className={styles.menuItemContent}>
                <span className={styles.menuItemLabel}>{item.label}</span>
                <span className={styles.menuItemDescription}>{item.description}</span>
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

export default AllianzDashboardClient;
