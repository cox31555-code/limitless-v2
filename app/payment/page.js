import React from "react";
import { API_BASE_URL } from "@/utils/config";
import { redirect } from "next/navigation";
import PaymentConfirmationClient from "./_components/PaymentConfirmationClient";

const page = async ({ searchParams }) => {
  const { id } = await searchParams;
  let insuranceData = null;

  // Handle offline mode with temporary IDs
  if (id && id.startsWith("TEMP_")) {
    insuranceData = {
      _id: id,
      type: "Temp",
      vehicleDetails: {
        registrationNumber: "XX23ABC",
        make: "Toyota",
        model: "Corolla",
        year: "2023",
      },
      coverDetails: {
        type: "Days",
        period: 7,
      },
      userDetails: {
        firstName: "John",
        surname: "Doe",
        email: "john@example.com",
        phone: "07000000000",
      },
      totalPrice: 49.99,
    };
  } else {
    try {
      const response = await fetch(`${API_BASE_URL}/api/insurance/${id}`, {
        cache: 'no-store'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data) {
          insuranceData = data.data.data || data.data;
        }
      }
    } catch (err) {
      console.error("Error fetching insurance:", err);
      redirect("/error");
    }
  }

  // Redirect if no insurance found
  if (!insuranceData) {
    redirect("/error");
  }

  return <PaymentConfirmationClient insuranceData={insuranceData} />;
};

export default page;
