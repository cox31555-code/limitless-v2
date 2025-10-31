import React from "react";
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";
import { redirect } from "next/navigation";
import PaymentSummaryClient from "./_components/PaymentSummaryClient";

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const id = params?.id;

  // Redirect if no id provided
  if (!id) {
    redirect("/error");
  }

  let insuranceData = null;

  // Handle offline mode with temporary IDs
  if (id.startsWith("TEMP_") || id.startsWith("ANNUAL_") || id.startsWith("IMP_")) {
    const insuranceType = id.startsWith("TEMP_") ? "Temp" : id.startsWith("ANNUAL_") ? "Annual" : "Impound";
    insuranceData = {
      _id: id,
      type: insuranceType,
      vehicleDetails: {
        registrationNumber: "XX23ABC",
        make: "Toyota",
        model: "Corolla",
        year: "2023",
      },
      coverDetails: {
        type: insuranceType === "Temp" ? "Days" : "Annual",
        period: insuranceType === "Temp" ? 7 : 1,
      },
      userDetails: {
        firstName: "John",
        surname: "Doe",
        email: "john@example.com",
        phone: "07000000000",
      },
      totalPrice: 49.99,
      quote: {
        priceAmount: 49.99,
      },
    };
  } else {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/insurance/${id}`);

      if (response.status === 200 && response.data.data) {
        insuranceData = response.data.data.data || response.data.data;
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

  return <PaymentSummaryClient insuranceData={insuranceData} id={id} />;
};

export default page;
