"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./allianzDashboardClient.module.css";

const AllianzDashboardClient = () => {
  const router = useRouter();
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselItems = [
    {
      title: "Allianz Advantages",
      description: "Don't forget to check out your latest offers and rewards in your new Allianz Advantages ones.",
      icon: "gift",
      link: "View my Allianz Advantages",
    },
    {
      title: "More cars?",
      description: "Just tell us about any additional cars you need covered, and we'll give you a quick quote based on your existing Allianz Online policy.",
      icon: "cars",
      link: "Get your car quote",
    },
  ];

  const menuItems = [
    {
      icon: "products",
      label: "Our products",
      action: () => router.push("/products"),
    },
    {
      icon: "account",
      label: "Account details",
      action: () => router.push("/account"),
    },
    {
      icon: "marketing",
      label: "Marketing preferences",
      action: () => router.push("/marketing"),
    },
    {
      icon: "policies",
      label: "Old policies",
      action: () => router.push("/policies"),
    },
    {
      icon: "advantages",
      label: "Allianz Advantages",
      action: () => router.push("/advantages"),
    },
  ];

  const activePolicies = [
    {
      id: 1,
      name: "Allianz Online Car Insurance",
      policyNumber: "LN60AYT",
      vehicle: "VW GOLF TWIST",
      coverEnd: "Cover ends on 24 November 2026, 23:59",
    },
  ];

  const handleCarouselNext = () => {
    setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const handleCarouselPrev = () => {
    setCarouselIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const CarouselIcon = ({ type }) => {
    const icons = {
      gift: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 12 20 22 4 22 4 12"></polyline>
          <rect x="2" y="7" width="20" height="5"></rect>
          <path d="M12 22V7M7 7h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-3.5a2 2 0 0 0-1.414.586l-.915.915A2 2 0 0 1 9.172 2H7a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2z"></path>
        </svg>
      ),
      cars: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="5" cy="17" r="3"></circle>
          <circle cx="19" cy="17" r="3"></circle>
          <path d="M7 18h10v-5a1 1 0 0 0-1-1h-8a1 1 0 0 0-1 1z"></path>
          <path d="M2 11h20v-2a1 1 0 0 0-1-1h-3l-4-5h-4l-4 5H3a1 1 0 0 0-1 1z"></path>
        </svg>
      ),
    };
    return icons[type] || icons.gift;
  };

  const MenuIcon = ({ type }) => {
    const icons = {
      products: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
        </svg>
      ),
      account: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
      marketing: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="1"></circle>
          <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m6.08 0l4.24-4.24M1 12h6m6 0h6m-1.78 7.78l-4.24-4.24m-6.08 0l-4.24 4.24"></path>
        </svg>
      ),
      policies: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
      ),
      advantages: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
    };
    return icons[type] || icons.products;
  };

  return (
    <div className={styles.container}>
      {/* Greeting Section */}
      <section className={styles.greetingSection}>
        <div className={styles.greetingContent}>
          <h1 className={styles.greetingTitle}>Hi Adnan</h1>
          <span className={styles.allianzBadge}>Allianz Online</span>
        </div>
      </section>

      {/* Carousel Section */}
      <section className={styles.carouselSection}>
        <div className={styles.carouselContainer}>
          <div className={styles.carouselContent}>
            <div className={styles.carouselIcon}>
              <CarouselIcon type={carouselIndex === 0 ? "gift" : "cars"} />
            </div>
            <h2 className={styles.carouselTitle}>{carouselItems[carouselIndex].title}</h2>
            <p className={styles.carouselDescription}>{carouselItems[carouselIndex].description}</p>
            <a href="#" className={styles.carouselLink}>
              → {carouselItems[carouselIndex].link}
            </a>
          </div>
          <div className={styles.carouselControls}>
            <div className={styles.carouselDots}>
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === carouselIndex ? styles.active : ""}`}
                  onClick={() => setCarouselIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <div className={styles.carouselNavButtons}>
              <button className={styles.navButton} onClick={handleCarouselPrev} aria-label="Previous slide">
                ←
              </button>
              <button className={styles.navButton} onClick={handleCarouselNext} aria-label="Next slide">
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Active Policies Section */}
      <section className={styles.policiesSection}>
        <h2 className={styles.sectionTitle}>Active policies</h2>
        <div className={styles.policiesGrid}>
          {activePolicies.map((policy) => (
            <div key={policy.id} className={styles.policyCard}>
              <div className={styles.policyIcon}>
                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M 79.500 37.583 C 77.850 37.811, 71.430 38.503, 65.234 39.120 L 53.968 40.242 49.579 45.123 C 47.150 47.825, 43.894 53.111, 42.285 56.964 C 39.427 63.811, 39.351 63.891, 37.617 61.865 C 36.032 60.015, 34.943 59.842, 26.844 60.153 C 18.116 60.489, 17.743 60.602, 14.917 63.766 C 10.645 68.548, 10.823 74.023, 15.400 78.600 C 17.270 80.470, 19.608 82, 20.596 82 C 22.039 82, 21.761 82.651, 19.179 85.315 C 17.412 87.138, 15.524 90.173, 14.983 92.058 C 13.595 96.898, 13.701 153.843, 15.105 157.872 C 15.713 159.616, 17.033 161.483, 18.039 162.021 C 19.045 162.559, 24.995 163, 31.260 163 C 41.874 163, 42.800 162.842, 44.826 160.686 C 46.532 158.870, 47 157.147, 47 152.686 L 47 147 99.500 147 L 152 147 152 150.935 C 152 155.700, 153.481 159.883, 155.789 161.637 C 156.958 162.525, 161.167 162.946, 169.076 162.968 C 180.243 162.999, 180.737 162.909, 183.076 160.421 L 185.500 157.842 185.814 129.171 C 186.204 93.605, 185.939 91.045, 181.336 85.950 L 177.838 82.079 180.422 81.430 C 184.457 80.417, 188 75.513, 188 70.939 C 188 68.035, 187.251 66.193, 185.083 63.766 C 182.234 60.575, 181.948 60.492, 172.705 60.158 C 163.756 59.834, 163.155 59.941, 161.621 62.130 C 160.670 63.488, 160 63.867, 160 63.047 C 160 60.109, 152.762 47.176, 149.214 43.775 C 145.772 40.475, 144.805 40.128, 136 39.035 C 126.518 37.858, 85.184 36.795, 79.500 37.583 M 68.531 45.525 C 55.136 46.978, 55.044 47.034, 50.263 56.468 C 48.177 60.584, 44 71.381, 44 72.657 C 44 72.845, 69.200 73, 100 73 C 130.800 73, 156 72.845, 156 72.657 C 156 71.357, 151.799 60.572, 149.737 56.468 C 144.956 47.034, 144.864 46.978, 131.469 45.525 C 118.800 44.224, 81.200 44.224, 68.531 45.525 M 31 68.500 C 31 69.328, 31.448 70, 32 70 C 32.552 70, 33 69.328, 33 68.500 C 33 67.672, 32.552 67, 32 67 C 31.448 67, 31 67.672, 31 68.500 M 167 68.500 C 167 69.328, 167.448 70, 168 70 C 168.552 70, 169 69.328, 169 68.500 C 169 67.672, 168.552 67, 168 67 C 167.448 67, 167 67.672, 167 68.500 M 44.500 98 C 42.015 98, 40 100.239, 40 103 C 40 105.761, 42.015 108, 44.500 108 C 46.985 108, 49 105.761, 49 103 C 49 100.239, 46.985 98, 44.500 98 M 155.500 98 C 153.015 98, 151 100.239, 151 103 C 151 105.761, 153.015 108, 155.500 108 C 157.985 108, 160 105.761, 160 103 C 160 100.239, 157.985 98, 155.500 98 M 61 121 L 53.500 121 52.827 127.250 C 52.437 130.825, 52 135.456, 52 137.500 L 52 141 79.500 141 L 107 141 107 139.500 C 107 138.175, 105.700 134.300, 104.155 130.850 C 102.609 127.400, 101.500 124.775, 101.500 124.500 C 101.500 124.059, 88.543 124, 61 121 M 139 121 C 111.457 124, 98.500 124.059, 98.500 124.500 C 98.500 124.775, 97.391 127.400, 95.845 130.850 C 94.300 134.300, 93 138.175, 93 139.500 L 93 141 120.500 141 L 148 141 148 137.500 C 148 135.456, 147.563 130.825, 147.173 127.250 L 146.500 121 139 121" fill="currentColor"></path>
                </svg>
              </div>
              <div className={styles.policyContent}>
                <h3 className={styles.policyName}>{policy.name}</h3>
                <p className={styles.policyNumber}>{policy.policyNumber}</p>
                <p className={styles.policyVehicle}>{policy.vehicle}</p>
                <p className={styles.policyCoverEnd}>{policy.coverEnd}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Grid Section */}
      <section className={styles.menuSection}>
        <h2 className={styles.sectionTitle}>Menu</h2>
        <div className={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`${styles.menuItem} ${item.label === "Account details" ? styles.highlighted : ""}`}
              onClick={item.action}
            >
              <div className={styles.menuItemIcon}>
                <MenuIcon type={item.icon} />
              </div>
              <span className={styles.menuItemLabel}>{item.label}</span>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AllianzDashboardClient;
