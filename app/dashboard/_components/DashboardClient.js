"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboardClient.module.css";
import { useInsuranceModal } from "@/contexts/InsuranceModalContext";

const DashboardClient = () => {
  const router = useRouter();
  const [bannerIndex, setBannerIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { setIsInsuranceModalOpen } = useInsuranceModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCreatePolicy = () => {
    setIsInsuranceModalOpen(true);
  };

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
      label: "Chat with us",
      description: "Live chat support available 24/7",
      icon: "chat",
      action: () => {
        // Trigger chat widget
        if (window.tawk) {
          window.tawk.maximize();
        }
      },
    },
    {
      label: "Call us",
      description: "Speak to our team directly",
      icon: "phone",
      action: () => {
        window.location.href = "tel:+1234567890";
      },
    },
    {
      label: "Email us",
      description: "Send us a message anytime",
      icon: "email",
      action: () => {
        window.location.href = "mailto:support@limitlesscover.com";
      },
    },
  ];

  const MenuIcon = ({ type }) => {
    const icons = {
      chat: (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M 40 40 L 160 40 L 160 140 L 60 140 L 40 160 Z" fill="none" stroke="currentColor" strokeWidth="8"/>
          <line x1="60" y1="70" x2="140" y2="70" stroke="currentColor" strokeWidth="4"/>
          <line x1="60" y1="100" x2="140" y2="100" stroke="currentColor" strokeWidth="4"/>
        </svg>
      ),
      phone: (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="30" width="100" height="140" rx="12" fill="none" stroke="currentColor" strokeWidth="8"/>
          <circle cx="100" cy="155" r="8" fill="currentColor"/>
          <path d="M 70 60 Q 100 100 130 140" fill="none" stroke="currentColor" strokeWidth="4"/>
        </svg>
      ),
      email: (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="50" width="120" height="100" rx="8" fill="none" stroke="currentColor" strokeWidth="8"/>
          <path d="M 40 50 L 100 100 L 160 50" fill="none" stroke="currentColor" strokeWidth="6"/>
        </svg>
      ),
    };
    return icons[type] || icons.chat;
  };

  return (
    <>
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
            <h1 className={styles.greetingTitle}>Hi, John</h1>
            <p className={styles.greetingSubtitle}>Welcome back. Manage and review your insurance policies anytime, anywhere</p>
          </div>
          <div className={styles.badgeArea}>
            <span className={styles.allianzBadge}>Limitless Cover</span>
          </div>
        </div>
        <button
          onClick={handleCreatePolicy}
          className={styles.createPolicyBtn}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Create a new policy</span>
        </button>
      </section>

      <div className={styles.container}>
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
                      <path d="M 79.500 37.583 C 77.850 37.811, 71.430 38.503, 65.234 39.120 L 53.968 40.242 49.579 45.123 C 47.150 47.825, 43.894 53.111, 42.285 56.964 C 39.427 63.811, 39.351 63.891, 37.617 61.865 C 36.032 60.015, 34.943 59.842, 26.844 60.153 C 18.116 60.489, 17.743 60.602, 14.917 63.766 C 10.645 68.548, 10.823 74.023, 15.400 78.600 C 17.270 80.470, 19.608 82, 20.596 82 C 22.039 82, 21.761 82.651, 19.179 85.315 C 17.412 87.138, 15.524 90.173, 14.983 92.058 C 13.595 96.898, 13.701 153.843, 15.105 157.872 C 15.713 159.616, 17.033 161.483, 18.039 162.021 C 19.045 162.559, 24.995 163, 31.260 163 C 41.874 163, 42.800 162.842, 44.826 160.686 C 46.532 158.870, 47 157.147, 47 152.686 L 47 147 99.500 147 L 152 147 152 150.935 C 152 155.700, 153.481 159.883, 155.789 161.637 C 156.958 162.525, 161.167 162.946, 169.076 162.968 C 180.243 162.999, 180.737 162.909, 183.076 160.421 L 185.500 157.842 185.814 129.171 C 186.204 93.605, 185.939 91.045, 181.336 85.950 L 177.838 82.079 180.422 81.430 C 184.457 80.417, 188 75.513, 188 70.939 C 188 68.035, 187.251 66.193, 185.083 63.766 C 182.234 60.575, 181.948 60.492, 172.705 60.158 C 163.756 59.834, 163.155 59.941, 161.621 62.130 C 160.670 63.488, 160 63.867, 160 63.047 C 160 60.109, 152.762 47.176, 149.214 43.775 C 145.772 40.475, 144.805 40.128, 136 39.035 C 126.518 37.858, 85.184 36.795, 79.500 37.583 M 68.531 45.525 C 55.136 46.978, 55.044 47.034, 50.263 56.468 C 48.177 60.584, 44 71.381, 44 72.657 C 44 72.845, 69.200 73, 100 73 C 130.800 73, 155.823 72.845, 155.737 72.657 C 155.575 71.381, 151.398 60.584, 149.312 56.468 C 144.531 47.034, 144.439 46.978, 131.044 45.525 C 124.452 44.884, 107.548 44.884, 100.500 45.525 M 100 82 L 47 82 L 47 115 C 47 142.066, 47.073 148.053, 47.474 148.236 C 47.762 148.364, 71.537 148.500, 100.500 148.500 C 129.463 148.500, 153.238 148.364, 153.526 148.236 C 153.927 148.053, 154 142.066, 154 115 L 154 82 L 100 82 M 65 97 L 65 107 L 73 107 L 73 97 L 65 97 M 95 97 L 95 107 L 103 107 L 103 97 L 95 97 M 125 97 L 125 107 L 133 107 L 133 97 L 125 97 M 65 118 L 65 128 L 73 128 L 73 118 L 65 118 M 95 118 L 95 128 L 103 128 L 103 118 L 95 118 M 125 118 L 125 128 L 133 128 L 133 118 L 125 118" fill="currentColor"/>
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
          <h2 className={styles.sectionTitle}>Get in Touch</h2>
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
    </>
  );
};

export default DashboardClient;
