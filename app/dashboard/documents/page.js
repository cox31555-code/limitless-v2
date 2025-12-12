import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/utils/config";
import { serverFetch } from "@/utils/serverFetch";
import DocumentsClient from "./_components/DocumentsClient";
import DashboardHero from "@/ui/dashboard/DashboardHero";
import Breadcrumb from "@/ui/dashboard/breadcrumb/Breadcrumb";
import styles from "./page.module.css";

export const metadata = {
  title: "Your Documentation | Limitless Cover",
};

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const devMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";

  if (!token && !devMode) {
    redirect("/login");
  }

  let insurances = [];

  // Dev mode: return mock data
  if (devMode && !token) {
    insurances = [
      {
        _id: "dev-insurance-1",
        userDetails: {
          firstName: "Dev",
          surname: "User"
        },
        vehicleDetails: {
          registrationNumber: "AB21DEV"
        },
        quote: {
          paid: true
        },
        coverDetails: {
          type: "Weeks",
          period: 1
        }
      }
    ];
  } else {
    try {
      const response = await serverFetch(
        `${API_BASE_URL}/api/insurance/user/my-insurances`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      if (response.ok) {
        const result = await response.json();
        const allInsurances = result.data?.data || [];

        // Filter for paid insurances only
        // insurances = allInsurances.filter(
        //   (insurance) => insurance.quote?.paid === true
        // );
        insurances = allInsurances;
      }
    } catch (error) {
      console.error("Error fetching insurance:", error);
    }
  }

  // Get first insurance for hero display
  const firstInsurance = insurances.length > 0 ? insurances[0] : null;
  const getPolicyNumber = () => {
    return firstInsurance?.policyNumber || firstInsurance?._id?.slice(-8).toUpperCase() || "N/A";
  };

  return (
    <div className={styles.page}>
      <DashboardHero
        title="Policy documents"
        subtitle="Access your insurance documents including certificate of motor insurance, policy schedule, and statement of fact."
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={[
        { label: "Dashboard" },
        { label: "Documents" }
      ]} />

      <DocumentsClient insurances={insurances} />
    </div>
  );
};

export default page;
