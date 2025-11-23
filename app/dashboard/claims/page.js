import React from "react";
import styles from "./page.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { API_BASE_URL } from "@/utils/config";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { serverFetch } from "@/utils/serverFetch";
import ClaimsPageClient from "./_components/ClaimsPageClient";

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
      },
      {
        _id: "dev-claim-2",
        estimatedResolutionDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        orderReference: "DEV002",
        status: "Pending",
        claimDetails: {
          placeHolderFirstName: "Test",
          placeHolderLastName: "User"
        },
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        _id: "dev-claim-3",
        estimatedResolutionDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        orderReference: "DEV003",
        status: "Completed",
        claimDetails: {
          placeHolderFirstName: "Admin",
          placeHolderLastName: "User"
        },
        updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
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
      date: claim.estimatedResolutionDate,
      ref: `Claim Reference ${claim.orderReference}`,
      status: claim.status || "Pending",
      claimant: `${claim.claimDetails.placeHolderFirstName} ${claim.claimDetails.placeHolderLastName}`,
      pendingActions: claim.updatedAt,
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
      <ClaimsPageClient
        pendingClaims={pendingClaims}
        completedClaims={completedClaims}
        plusJakartaSans={plusJakartaSans}
      />
    </div>
  );
};

export default Page;
