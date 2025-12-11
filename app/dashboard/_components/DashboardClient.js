"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { extractVehicleMake } from "@/utils/vehicleIcons";
import { getBrandIcon } from "@/ui/dashboard/vehicleBrandIcons";
import { useLoading } from "@/contexts/LoadingContext";
import DashboardHero from "@/ui/dashboard/DashboardHero";
import { DocumentsIcon, PaymentsIcon, ClaimsIcon, QuotesIcon, SupportIcon } from "@/ui/icons";
import styles from "./dashboardClient.module.css";

const DashboardClient = () => {
  const router = useRouter();
  const { showLoading } = useLoading();
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
    {
      id: 2,
      name: "Limitless Cover",
      badge: "ANNUAL",
      isNew: false,
      policyNumber: "LC-923847",
      registrationNumber: "SM21 UOL",
      vehicle: "BMW 3 SERIES M340i",
      status: "Active",
      statusType: "active",
      endDate: "15th December 2025",
      endTime: "23:59",
      insuranceType: "Annual",
    },
  ];

  const usefulLinks = [
    {
      id: 1,
      label: "Documents",
      icon: "documents",
      action: () => {
        showLoading();
        router.push("/dashboard/documents");
      },
    },
    {
      id: 2,
      label: "Payments",
      icon: "payments",
      action: () => {
        showLoading();
        router.push("/dashboard/payments");
      },
    },
    {
      id: 3,
      label: "Claims",
      icon: "claims",
      action: () => {
        showLoading();
        router.push("/dashboard/claims");
      },
    },
    {
      id: 4,
      label: "Quotes",
      icon: "quotes",
      action: () => {
        showLoading();
        router.push("/dashboard/quotes");
      },
    },
    {
      id: 5,
      label: "Help Center",
      icon: "support",
      action: () => {
        showLoading();
        router.push("/dashboard/support-tickets");
      },
    },
  ];

  const iconMap = {
    documents: DocumentsIcon,
    payments: PaymentsIcon,
    claims: ClaimsIcon,
    quotes: QuotesIcon,
    support: SupportIcon,
  };

  return (
    <div className={styles.container}>
      <DashboardHero
        title="Hi, John"
        subtitle="Welcome back. Manage and review your insurance policies anytime, anywhere"
        badge="Limitless Cover"
      />

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
          <div className={styles.sectionHeaderWrapper}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>My Policies</h2>
            </div>
            <p className={styles.sectionDescription}>
              Review, update and manage all your insurance policies in one secure place
            </p>
          </div>
          <div className={styles.policiesGrid}>
            {activePolicies.map((policy) => (
              <div key={policy.id} className={styles.policyCard} onClick={() => {
                showLoading();
                router.push("/dashboard/policy");
              }}>
                <div className={styles.policyCardHeader}>
                  <div className={styles.policyBadgeWrapper}>
                    <div className={styles.brandedBadge}>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F058fdd9048ee40f580ca41b569bee55c%2F5f655402e5e54b5782ffee63c1df405c?format=png&width=800"
                        alt="Limitless Cover"
                        className={styles.policyLogo}
                      />
                      <span className={styles.policyBadgeType}>{policy.badge}</span>
                    </div>
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
                    <span className={styles.endDateLabel}>Ends on:</span>
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
          <div className={styles.sectionHeaderWrapper}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Useful Links</h2>
            </div>
            <p className={styles.sectionDescription}>
              Quick access to important tools and documents
            </p>
          </div>
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
              </svg>
            </div>
            <h3 className={styles.emergencyTitle}>Need to report a claim?</h3>
            <button
              className={styles.emergencyButton}
              onClick={() => {
                showLoading();
                router.push("/dashboard/submit-claim");
              }}
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
