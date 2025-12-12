import React from "react";
import PaymentConfirmationClient from "@/app/payment/_components/PaymentConfirmationClient";

const PaymentTestPage = () => {
  // Mock insurance data for testing
  const mockInsuranceData = {
    _id: "TEST_12345",
    type: "Temp",
    vehicleDetails: {
      registrationNumber: "AB23XYZ",
      make: "Toyota",
      model: "Corolla",
      year: "2023",
      colour: "Blue",
      fuel: "Petrol",
      transmission: "Automatic",
      doors: "4",
    },
    coverDetails: {
      type: "Days",
      period: 7,
      startDate: "2025-01-20",
      startTime: "10:00",
    },
    userDetails: {
      firstName: "John",
      surname: "Smith",
      email: "john.smith@example.com",
      phone: "07123456789",
      dateOfBirth: "1990-05-15",
      postCode: "SW1A 1AA",
      address: "123 Test Street, London",
    },
    carUsage: {
      keepingCarDuringDay: "At home",
      keepingCarDuringNight: "At home",
      usageType: "Commuting",
      licenseType: "Full UK",
      licenseHeld: "5-10 years",
      licenseNumber: "AB123CD456",
      NCB: "5",
      voluntaryExcess: "£250",
      criminalConvictions: false,
      medicalConditions: false,
      insuranceCancelledOrClaimRefusedOrPolicyVoided: false,
    },
    quote: {
      priceAmount: 49.99,
      paid: true,
      sumupData: {
        transactionId: "TEST_TXN_12345",
      },
    },
  };

  return <PaymentConfirmationClient insuranceData={mockInsuranceData} />;
};

export default PaymentTestPage;
