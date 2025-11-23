import React from "react";
import Table from "./_components/table/Table";
import styles from "./page.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import CreateBtn from "@/ui/dashboard/createBtn/CreateBtn";
import { API_BASE_URL } from "@/utils/config";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { serverFetch } from "@/utils/serverFetch";
import NeedHelpSection from "@/ui/layout/NeedHelpSection";

export const metadata = {
  title: "Your Claims | Limitless Cover",
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const Page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const devMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";

  if (!token && !devMode) {
    redirect("/login");
  }

  let claims = [];
  let error = null;

  if (devMode && !token) {
    claims = [
      {
        _id: "dev-claim-1",
        estimatedResolutionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        orderReference: "DEV001",
        status: "Pending",
        claimDetails: {
          placeHolderFirstName: "Dev",
          placeHolderLastName: "User"
        },
        updatedAt: new Date().toISOString()
      }
    ];
  } else {
    try {
      const response = await serverFetch(`${API_BASE_URL}/api/claims`, {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        claims = data.data?.claims || [];
      } else {
        error = "Failed to fetch claims";
      }
    } catch (err) {
      console.error("Error fetching claims:", err);
      error = err.message;
    }
  }

  const formatClaimsData = (claims) => {
    return claims.map((claim) => ({
      date: new Date(claim.estimatedResolutionDate).toLocaleDateString(),
      ref: `Claim Reference ${claim.orderReference}`,
      status: claim.status || "Pending",
      claimant: `${claim.claimDetails.placeHolderFirstName} ${claim.claimDetails.placeHolderLastName}`,
      pendingActions: new Date(claim.updatedAt).toLocaleDateString(),
      id: claim._id,
    }));
  };

  const formattedClaims = formatClaimsData(claims);
  const pendingClaims = formattedClaims.filter(
    (claim) => claim.status === "Pending"
  );
  const completedClaims = formattedClaims.filter(
    (claim) => claim.status !== "Pending"
  );

  return (
    <div className={styles.page}>
      <div className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="106.238px" height="176.262px" viewBox="0 0 106.238 140.262" className={styles.heroBackgroundImage}>
            <style>{`.st0{fill:#FFFFFF;}.st1{fill:#05AFFF;}.st2{fill:#0A0913;}`}</style>
            <path className="st1" d="M86.515,75.233L44.398,94.136v25.204l-4.194-4.194l-13.187-13.187l-7.276-7.276l24.658-11.08l17.44-7.823l35.953-16.152c9.13-4.116,11.334-16.094,4.253-23.175L70.012,4.419C60.57,-5.023,44.398,1.669,44.398,15.012v20.171L0.115,55.081v19.098l17.44-7.823l39.484-17.713l4.916-2.204V27.302l-0.117,0.058v-6.457l24.677,24.677l-10.944,4.916l0.02,0.039l-46.682,21.01l-0.039-0.078L8.464,80.636c-0.351,0.156-0.683,0.312-0.995,0.488c-4.253,2.302-6.808,6.399-7.354,10.768c-0.527,4.175,0.741,8.583,4.077,11.919l32.051,32.032c9.442,9.442,25.594,2.751,25.594-10.612v-19.82l24.677-11.08l19.722-8.837V66.357L86.515,75.233z"/>
          </svg>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.greetingArea}>
            <h1 className={`${styles.greetingTitle} ${plusJakartaSans?.className || ""}`}>Your Claims</h1>
            <p className={styles.greetingSubtitle}>
              View and manage your insurance claims. Track the status of pending claims and access your claim history.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbItem}>Dashboard</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={`${styles.breadcrumbItem} ${styles.active}`}>Claims</span>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
            Manage Claims
          </h2>
          <CreateBtn title="Create a new claim" href="/dashboard/submit-claim" />
        </div>

        {error && (
          <div className={styles.errorState}>
            {error}
          </div>
        )}

        {claims.length === 0 && !error ? (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyTitle}>No claims found</h3>
            <p className={styles.emptyDescription}>
              You haven&apos;t submitted any claims yet.
            </p>
          </div>
        ) : (
          <div className={styles.claimsSection}>
            {pendingClaims.length > 0 && (
              <Table
                title="Pending Claims"
                columns={[
                  "Date of Claim",
                  "Status",
                  "Claimant",
                  "Last Updated",
                  "Actions",
                ]}
                data={pendingClaims}
              />
            )}

            {completedClaims.length > 0 && (
              <Table
                title="Claim History"
                columns={[
                  "Date of Claim",
                  "Status",
                  "Claimant",
                  "Last Updated",
                  "Actions",
                ]}
                data={completedClaims}
              />
            )}
          </div>
        )}
      </div>

      <NeedHelpSection />
    </div>
  );
};

export default Page;
