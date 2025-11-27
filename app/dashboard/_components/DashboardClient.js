"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { extractVehicleMake } from "@/utils/vehicleIcons";
import { getBrandIcon } from "@/ui/dashboard/vehicleBrandIcons";
import styles from "./dashboardClient.module.css";

const DashboardClient = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activePolicies = [
    {
      id: 1,
      name: "Limitless Cover",
      badge: "ANNUAL",
      isNew: true,
      policyNumber: "LC-847291",
      registrationNumber: "LN60 AYT",
      vehicle: "FIAT 500 LOUNGE",
      status: "Active",
      statusType: "active",
      endDate: "24th November 2026",
      endTime: "23:59",
      insuranceType: "Annual",
    },
  ];

  const usefulLinks = [
    {
      id: 1,
      label: "Documents",
      icon: "documents",
      action: () => router.push("/dashboard/documents"),
    },
    {
      id: 2,
      label: "Payments",
      icon: "payments",
      action: () => router.push("/dashboard/policy"),
    },
    {
      id: 3,
      label: "Claims",
      icon: "claims",
      action: () => router.push("/dashboard/claims"),
    },
    {
      id: 4,
      label: "Quotes",
      icon: "quotes",
      action: () => router.push("/annual/get-quote"),
    },
  ];

  const LinkIcon = ({ type }) => {
    const icons = {
      documents: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
      payments: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
      ),
      claims: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
      quotes: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="12" y1="18" x2="12" y2="12"></line>
          <line x1="9" y1="15" x2="15" y2="15"></line>
        </svg>
      ),
    };
    return icons[type] || icons.documents;
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
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
        <span className={styles.breadcrumbItem}>Dashboard</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={`${styles.breadcrumbItem} ${styles.active}`}>Home</span>
      </div>

      {/* Content Wrapper */}
      <div className={styles.contentWrapper}>
        {/* My Policies Section */}
        <section className={styles.policiesSection}>
          <h2 className={styles.sectionTitle}>My Policies</h2>
          <div className={styles.policiesGrid}>
            {activePolicies.map((policy) => (
              <div key={policy.id} className={styles.policyCard} onClick={() => router.push("/dashboard/policy")}>
                <div className={styles.policyCardHeader}>
                  <div className={styles.policyBadgeWrapper}>
                    <div className={styles.brandedBadge}>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F058fdd9048ee40f580ca41b569bee55c%2F5f655402e5e54b5782ffee63c1df405c?format=webp&width=800"
                        alt="Limitless Cover"
                        className={styles.policyLogo}
                      />
                      <span className={styles.policyBadgeType}>{policy.badge}</span>
                    </div>
                    {policy.isNew && <span className={styles.newBadge}>NEW</span>}
                  </div>
                  <div className={styles.policyStatusWrapper}>
                    <span className={styles.policyStatusLabel}>Status:</span>
                    <span className={`${styles.policyStatus} ${styles[policy.statusType]}`}>
                      {policy.status}
                    </span>
                  </div>
                </div>
                
                <div className={styles.policyCardBody}>
                  <div className={styles.licensePlate}>
                    <span className={styles.licensePlateText}>{policy.registrationNumber}</span>
                  </div>
                  <h3 className={styles.vehicleName}>{policy.vehicle}</h3>
                </div>

                <div className={styles.policyCardFooter}>
                  <div className={styles.policyEndDate}>
                    <span className={styles.endDateLabel}>Ended on:</span>
                    <span className={styles.endDateValue}>{policy.endDate} ({policy.endTime})</span>
                  </div>
                  <div className={styles.policyArrow}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Useful Links Section */}
        <section className={styles.usefulLinksSection}>
          <h2 className={styles.sectionTitle}>Useful Links</h2>
          <div className={styles.usefulLinksGrid}>
            {usefulLinks.map((link) => (
              <button
                key={link.id}
                className={styles.usefulLinkCard}
                onClick={link.action}
              >
                <div className={styles.linkIcon}>
                  <LinkIcon type={link.icon} />
                </div>
                <span className={styles.linkLabel}>{link.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Emergency Help Section */}
        <section className={styles.emergencySection}>
          <div className={styles.emergencyCard}>
            <div className={styles.emergencyIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className={styles.emergencyTitle}>Emergency help</h3>
            <p className={styles.emergencyText}>
              From car breakdowns to home insurance claims, Limitless Cover has you covered.
            </p>
            <button 
              className={styles.emergencyButton}
              onClick={() => router.push("/dashboard/submit-claim")}
            >
              Report an incident
            </button>
          </div>
        </section>

        {/* Footer Info */}
        <section className={styles.footerInfo}>
          <p className={styles.footerText}>Limitless Cover Insurance Services</p>
          <p className={styles.footerSubtext}>
            Limited is authorised and regulated by the Financial Conduct Authority (FRN: 311492).
          </p>
        </section>
      </div>
    </div>
  );
};

export default DashboardClient;
