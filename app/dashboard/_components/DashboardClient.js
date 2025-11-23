"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { extractVehicleMake } from "@/utils/vehicleIcons";
import { getBrandIcon } from "@/ui/dashboard/vehicleBrandIcons";
import styles from "./dashboardClient.module.css";

const DashboardClient = () => {
  const router = useRouter();
  const [bannerIndex, setBannerIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % promotionalBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activePolicies = [
    {
      id: 1,
      name: "Limitless Cover Car Insurance",
      policyNumber: "LC-847291",
      vehicle: "LN60AYT - FIAT 500",
      vehicleYear: 2020,
      engineSize: "1.2L",
      transmission: "Auto",
      coverEnd: "24 November 2026",
      status: "Active",
      insuranceType: "Annual",
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
      label: "Chat Now",
      description: "Chat with our support team",
      hours: "9 AM - 6 PM, Mon - Fri",
      icon: "chat",
      action: () => {
        if (window.tawk) {
          window.tawk.maximize();
        }
      },
    },
    {
      label: "Call Us",
      description: "Speak directly with our team",
      hours: "9 AM - 6 PM, Mon - Fri",
      icon: "phone",
      action: () => {
        window.location.href = "tel:+1234567890";
      },
    },
    {
      label: "Email Us",
      description: "Get help anytime via email",
      hours: null,
      icon: "email",
      action: () => {
        window.location.href = "mailto:support@limitlesscover.com";
      },
    },
    {
      label: "FAQ",
      description: "Find answers to common questions",
      hours: null,
      icon: "faq",
      action: () => {
        router.push("/faq");
      },
    },
  ];

  const MenuIcon = ({ type }) => {
    const icons = {
      chat: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
      ),
      phone: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      ),
      email: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      faq: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
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
      </section>

      {/* Breadcrumb Navigation */}
      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbItem}>Home</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbItem}>Profile</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={`${styles.breadcrumbItem} ${styles.active}`}>Edit</span>
      </div>

      <div className={styles.container}>
        {/* Policy Card Section with Promotional Banners */}
        <section className={styles.policiesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Your Active Policies</h2>
        </div>
        <div className={styles.policiesBannerContainer}>
          <div className={styles.policiesGrid}>
            {activePolicies.map((policy) => {
              const make = extractVehicleMake(policy.vehicle);
              const BrandIconComponent = getBrandIcon(make);
              const vehicleModelMatch = policy.vehicle.match(/- (.+)$/);
              const vehicleModel = vehicleModelMatch ? vehicleModelMatch[1] : "Vehicle";
              const vehicleDisplayText = `${vehicleModel} ${policy.vehicleYear} ${policy.engineSize} ${policy.transmission}`;
              return (
              <div key={policy.id} className={styles.policyCard}>
                <div className={styles.policyCardHeader}>
                  <div className={styles.policyIcon}>
                    {BrandIconComponent ? (
                      <BrandIconComponent />
                    ) : (
                      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 79.500 37.583 C 77.850 37.811, 71.430 38.503, 65.234 39.120 L 53.968 40.242 49.579 45.123 C 47.150 47.825, 43.894 53.111, 42.285 56.964 C 39.427 63.811, 39.351 63.891, 37.617 61.865 C 36.032 60.015, 34.943 59.842, 26.844 60.153 C 18.116 60.489, 17.743 60.602, 14.917 63.766 C 10.645 68.548, 10.823 74.023, 15.400 78.600 C 17.270 80.470, 19.608 82, 20.596 82 C 22.039 82, 21.761 82.651, 19.179 85.315 C 17.412 87.138, 15.524 90.173, 14.983 92.058 C 13.595 96.898, 13.701 153.843, 15.105 157.872 C 15.713 159.616, 17.033 161.483, 18.039 162.021 C 19.045 162.559, 24.995 163, 31.260 163 C 41.874 163, 42.800 162.842, 44.826 160.686 C 46.532 158.870, 47 157.147, 47 152.686 L 47 147 99.500 147 L 152 147 152 150.935 C 152 155.700, 153.481 159.883, 155.789 161.637 C 156.958 162.525, 161.167 162.946, 169.076 162.968 C 180.243 162.999, 180.737 162.909, 183.076 160.421 L 185.500 157.842 185.814 129.171 C 186.204 93.605, 185.939 91.045, 181.336 85.950 L 177.838 82.079 180.422 81.430 C 184.457 80.417, 188 75.513, 188 70.939 C 188 68.035, 187.251 66.193, 185.083 63.766 C 182.234 60.575, 181.948 60.492, 172.705 60.158 C 163.756 59.834, 163.155 59.941, 161.621 62.130 C 160.670 63.488, 160 63.867, 160 63.047 C 160 60.109, 152.762 47.176, 149.214 43.775 C 145.772 40.475, 144.805 40.128, 136 39.035 C 126.518 37.858, 85.184 36.795, 79.500 37.583 M 68.531 45.525 C 55.136 46.978, 55.044 47.034, 50.263 56.468 C 48.177 60.584, 44 71.381, 44 72.657 C 44 72.845, 69.200 73, 100 73 C 130.800 73, 155.000 72.845, 155.000 72.657 C 155.000 71.381, 150.823 60.584, 148.737 56.468 C 143.956 47.034, 143.864 46.978, 130.469 45.525 C 122.030 44.733, 88.970 44.733, 80.531 45.525 M 47 80.531 L 47 88 L 44 88 C 40.400 88, 38.600 87.100, 36.900 84.400 L 34.400 80.531 L 40.700 80.531 L 47 80.531 M 156 80.531 L 162.300 80.531 L 159.800 84.400 C 158.100 87.100, 156.300 88, 152.700 88 L 150 88 L 150 80.531 L 156 80.531 M 100 97 C 108.835 97, 116 104.165, 116 113 C 116 121.835, 108.835 129, 100 129 C 91.165 129, 84 121.835, 84 113 C 84 104.165, 91.165 97, 100 97 M 100 103 C 94.477 103, 90 107.477, 90 113 C 90 118.523, 94.477 123, 100 123 C 105.523 123, 110 118.523, 110 113 C 110 107.477, 105.523 103, 100 103 Z"/>
                      </svg>
                    )}
                  </div>
                  <div className={styles.policyHeaderInfo}>
                    <h3 className={styles.policyName}>{vehicleDisplayText}</h3>
                    <span className={styles.policyStatus}>{policy.status}</span>
                  </div>
                  <div className={styles.insuranceTypeBadge}>{policy.insuranceType}</div>
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
              );
            })}
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
      </div>

      {/* Need Help Footer Banner - Full Width */}
      <section className={styles.menuSection}>
        <div className={styles.menuSectionInner}>
          <div className={styles.menuRowContainer}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Need help?</h2>
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
                  <p className={styles.menuItemLabel}>{item.label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardClient;
