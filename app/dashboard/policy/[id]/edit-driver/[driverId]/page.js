import React from "react";
import EditDriverDetailsClient from "../_components/EditDriverDetailsClient";
import { getPolicyById } from "@/app/dashboard/mockPoliciesData";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Edit Driver Details | Limitless Cover",
};

const EditDriverDetailsPage = async ({ params }) => {
  const { id, driverId } = await params;
  const policy = getPolicyById(id);

  if (!policy) {
    redirect("/dashboard/policy");
  }

  // Get the driver data
  const drivers = policy.drivers || [policy.userDetails];
  const driver = drivers[parseInt(driverId) || 0];

  if (!driver) {
    redirect(`/dashboard/policy/${id}`);
  }

  return (
    <EditDriverDetailsClient 
      policyId={id} 
      driverId={parseInt(driverId) || 0}
      policy={policy}
      driver={driver}
    />
  );
};

export default EditDriverDetailsPage;
