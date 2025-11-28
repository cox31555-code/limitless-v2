import React from "react";
import ReplaceVehicleClient from "./_components/ReplaceVehicleClient";
import { getPolicyById } from "@/app/dashboard/mockPoliciesData";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Replace Vehicle | Limitless Cover",
};

const ReplaceVehiclePage = async ({ params }) => {
  const { id } = await params;
  const policy = getPolicyById(id);

  if (!policy) {
    redirect("/dashboard/policy");
  }

  const vehicleDetails = policy.vehicleDetails || {};

  return (
    <ReplaceVehicleClient 
      policyId={id}
      policy={policy}
      vehicleDetails={vehicleDetails}
    />
  );
};

export default ReplaceVehiclePage;
