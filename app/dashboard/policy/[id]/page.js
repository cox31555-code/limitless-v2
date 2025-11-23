import React from "react";
import PolicyDetailsReview from "../_components/PolicyDetailsReview";
import styles from "./page.module.css";
import { API_BASE_URL } from "@/utils/config";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { serverFetch } from "@/utils/serverFetch";
import { mockPolicies } from "../../mockPoliciesData";

const page = async ({ params }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const devMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";

  if (!token && !devMode) {
    redirect("/login");
  }

  const { id } = await params;
  let insurance = null;

  // Dev mode: return mock data
  if (devMode && !token) {
    // Check if ID matches mock policy IDs
    if (mockPolicies[id]) {
      insurance = mockPolicies[id];
    } else {
      // Default to first mock policy
      insurance = mockPolicies["ANNUAL-001"];
    }
  } else {
    try {
      const response = await serverFetch(`${API_BASE_URL}/api/insurance/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (response.ok) {
        const result = await response.json();
        insurance = result.data?.data || null;
      }
    } catch (error) {
      console.error("Error fetching insurance:", error);
      // Fallback to mock data on error in dev mode
      if (devMode) {
        insurance = mockPolicies[id] || mockPolicies["ANNUAL-001"];
      }
    }
  }

  if (!insurance) {
    redirect("/dashboard/policy");
  }

  return (
    <div className={styles.page}>
      <div className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <svg
            className={styles.heroBackgroundImage}
            viewBox="0 0 520 519"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M280 0C313.137 0 340 26.8629 340 60V459C340 492.137 313.137 519 280 519H60C26.8629 519 0 492.137 0 459V60C0 26.8629 26.8629 0 60 0H280Z"
              fill="white"
              fillOpacity="0.08"
            />
          </svg>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.greetingArea}>
            <h1 className={styles.greetingTitle}>Policy summary</h1>
            <p className={styles.greetingSubtitle}>Policy no: {insurance.policyNumber}</p>
          </div>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <PolicyDetailsReview policy={insurance} />
      </div>
    </div>
  );
};

export default page;
