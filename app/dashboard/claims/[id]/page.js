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
      claimDetails: {
        placeHolderFirstName: "Dev",
        placeHolderLastName: "User"
      },
      thirdPartyDetails: {
        name: "Third Party",
        registrationNumber: "CD22TEST"
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
        // Handle nested data structure: data.data.data
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

  // Redirect if no claim found or error
  if (!claim || error) {
    redirect("/dashboard/claims");
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Your Claim - {claim.orderReference}</h1>
      </div>

      {error && (
        <div className={styles.error}>
          <p>Error: {error}</p>
        </div>
      )}

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
  );
};

export default page;
