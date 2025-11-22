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
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Policy summary</h1>
        <p className={styles.policyNumber}>Policy no: {insurance.policyNumber}</p>
      </div>
      <PolicyDetailsReview policy={insurance} />
    </div>
  );
};

export default page;
