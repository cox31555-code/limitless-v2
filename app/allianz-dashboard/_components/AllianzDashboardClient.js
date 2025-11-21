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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1"></circle>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path>
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

      {/* Footer Section */}
      <section className={styles.footerSection}>
        <div className={styles.securityBadge}>
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="10" y="10" width="80" height="80" rx="10"></rect>
            <text x="50" y="55" textAnchor="middle" fontSize="24" fill="currentColor">S</text>
          </svg>
          <div className={styles.securityText}>
            <strong>We'll keep your details safe</strong>
            <p>Our website is constantly monitored to check for harmful viruses or malware.</p>
          </div>
        </div>

        <div className={styles.partnersLogos}>
          <div className={styles.partner}>Team GB Logo</div>
          <div className={styles.allianzLogo}>Allianz</div>
          <div className={styles.paralympicsLogo}>Paralympics Logo</div>
        </div>
        <p className={styles.partnersText}>Proud Partner of Team GB and ParalympicsGB</p>

        <div className={styles.legalLinks}>
          <a href="#complaints" className={styles.legalLink}>Complaints</a>
          <a href="#cookies" className={styles.legalLink}>Our cookie policy</a>
          <a href="#privacy" className={styles.legalLink}>Personal data rights</a>
        </div>

        <p className={styles.legalText}>
          This insurance is arranged, underwritten and administered by Liverpool Victoria Insurance Company Limited, which is an Allianz Group company, registered in England and Wales number 3232514. Authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and the Prudential Regulation Authority, register number 202965. Registered address: 57 Ladymead, Guildford, Surrey, GU1 1DB. Allianz Online is a trading name of Liverpool Victoria Insurance Company Limited.
        </p>
      </section>
    </div>
  );
};

export default AllianzDashboardClient;
