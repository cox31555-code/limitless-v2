import React from "react";
import Updates from "../_components/updates/Updates";
import PolicyDetails from "../_components/policyDetails/PolicyDetails";
import ThirdPartyDetails from "../_components/thirdPartyDetails/ThirdPartyDetails";
import styles from "./page.module.css";
import Buttons from "../_components/buttons/Buttons";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/utils/config";
import { serverFetch } from "@/utils/serverFetch";
import { Plus_Jakarta_Sans } from "next/font/google";
import NeedHelpSection from "@/ui/layout/NeedHelpSection";
import Link from "next/link";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const page = async ({ params }) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const devMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";

  if (!token && !devMode) {
    redirect("/login");
  }

  let claim = null;
  let error = null;

  // Dev mode: return mock data
  if (devMode && !token) {
    claim = {
      _id: id,
      orderReference: "CLM-DEV001",
      status: "Pending",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      policyNumber: "LC-ANNUAL-001",
      claimDetails: {
        placeHolderFirstName: "Dev",
        placeHolderLastName: "User",
        claimentsName: "Dev User",
        emailAddress: "dev@limitlesscover.co.uk",
        incidentDescription: "Minor collision at junction while turning right. The other vehicle failed to stop at the red light and collided with the passenger side of my vehicle.",
        incidentDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        responsible: false,
        detailsIfNotResponsible: "Other driver ran red light and failed to yield right of way. I had the green light and was proceeding through the intersection when the collision occurred.",
        vehicleLocation: "Home address - 123 Main Street, Aberdeen",
        drivable: "No"
      },
      claimreason: "Accident",
      thirdPartyDetails: {
        name: "John Smith",
        phone: "07700 900123",
        postcode: "AB10 1AB",
        address: "45 High Street, Aberdeen",
        registrationNumber: "CD22TEST",
        make: "Ford",
        model: "Focus",
        damage: "Front bumper damage and broken headlight"
      }
    };
  } else {
    try {
      const response = await serverFetch(`${API_BASE_URL}/api/claims/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        claim = data.data?.data || data.data;
      } else if (response.status === 404) {
        error = "Claim not found";
      } else {
        error = "Failed to load claim details";
      }
    } catch (err) {
      console.error("Error fetching claim:", err);
      error = "Failed to load claim details";
    }
  }

  if (!claim || error) {
    redirect("/dashboard/claims");
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="106.238px" height="176.262px" viewBox="0 0 106.238 140.262" className={styles.heroBackgroundImage}>
            <style>{`.st0{fill:#FFFFFF;}.st1{fill:#05AFFF;}.st2{fill:#0A0913;}`}</style>
            <path className="st1" d="M86.515,75.233L44.398,94.136v25.204l-4.194-4.194l-13.187-13.187l-7.276-7.276l24.658-11.08l17.44-7.823l35.953-16.152c9.13-4.116,11.334-16.094,4.253-23.175L70.012,4.419C60.57,-5.023,44.398,1.669,44.398,15.012v20.171L0.115,55.081v19.098l17.44-7.823l39.484-17.713l4.916-2.204V27.302l-0.117,0.058v-6.457l24.677,24.677l-10.944,4.916l0.02,0.039l-46.682,21.01l-0.039-0.078L8.464,80.636c-0.351,0.156-0.683,0.312-0.995,0.488c-4.253,2.302-6.808,6.399-7.354,10.768c-0.527,4.175,0.741,8.583,4.077,11.919l32.051,32.032c9.442,9.442,25.594,2.751,25.594-10.612v-19.82l24.677-11.08l19.722-8.837V66.357L86.515,75.233z"/>
          </svg>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.greetingArea}>
            <h1 className={`${styles.greetingTitle} ${plusJakartaSans.className}`}>
              Claim Details
            </h1>
            <p className={styles.greetingSubtitle}>
              View your claim information and track its status
            </p>
          </div>
          <div className={styles.statusBadge}>
            <span className={`${styles.statusPill} ${styles[claim.status?.toLowerCase()] || ''}`}>
              {claim.status}
            </span>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className={styles.breadcrumb}>
        <Link href="/dashboard" className={styles.breadcrumbItem}>Dashboard</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <Link href="/dashboard/claims" className={styles.breadcrumbItem}>Manage Claims</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={`${styles.breadcrumbItem} ${styles.active}`}>Claim {claim.orderReference}</span>
      </div>

      {/* Content Wrapper */}
      <div className={styles.contentWrapper}>
        {/* Header with Claim Reference */}
        <div className={styles.contentHeader}>
          <div className={styles.contentHeaderText}>
            <h2 className={styles.contentTitle}>Claim Reference: {claim.orderReference}</h2>
            <p className={styles.contentSubtitle}>
              Submitted on {formatDate(claim.createdAt)} • Last updated {formatDate(claim.updatedAt)}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.container}>
          <PolicyDetails claimData={claim} />
          <ThirdPartyDetails claimData={claim.thirdPartyDetails} />
          <Updates
            columns={["Description", "Date", "Time"]}
            data={[
              {
                description: "Claim submitted",
                date: claim.createdAt,
                time: new Date(claim.createdAt).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
              {
                description: `Status: ${claim.status}`,
                date: claim.updatedAt,
                time: new Date(claim.updatedAt).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ]}
          />
          <Buttons />
        </div>
      </div>

      <NeedHelpSection />
    </div>
  );
};

export default page;
