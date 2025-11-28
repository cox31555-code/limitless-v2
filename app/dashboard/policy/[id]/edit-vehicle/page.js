import React from "react";
import EditVehicleDetailsClient from "./_components/EditVehicleDetailsClient";
import { getPolicyById } from "@/app/dashboard/mockPoliciesData";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Edit Vehicle Details | Limitless Cover",
};

const EditVehicleDetailsPage = async ({ params }) => {
  const { id } = await params;
  const policy = getPolicyById(id);

  if (!policy) {
    redirect("/dashboard/policy");
  }

  const vehicleDetails = policy.vehicleDetails || {};

  return (
    <EditVehicleDetailsClient 
      policyId={id}
      policy={policy}
      vehicleDetails={vehicleDetails}
    />
  );
};

export default EditVehicleDetailsPage;
