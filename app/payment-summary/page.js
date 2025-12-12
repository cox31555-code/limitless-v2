import React from "react";
import { API_BASE_URL } from "@/utils/config";
import { redirect } from "next/navigation";
import PaymentSummaryClient from "./_components/PaymentSummaryClient";

const page = async ({ searchParams }) => {
  const params = await searchParams;
  let id = params?.id;

  // Generate default mock ID if not provided
  if (!id) {
    id = `TEMP_${Date.now()}_default`;
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
        type: "Saloon",
        fuel: "Petrol",
        transmission: "Manual",
        doors: "4",
        colour: "Silver",
        worth: insuranceType === "Annual" ? "£10,000 - £20,000" : "N/A",
        trackingDevice: insuranceType === "Annual" ? "Yes - Aftermarket" : undefined,
        alarmImmobiliser: insuranceType === "Annual" ? "Thatcham approved alarm and immobiliser" : undefined,
        importedVehicle: insuranceType === "Annual" ? "No" : undefined,
        vehicleModified: insuranceType === "Annual" ? "No" : undefined,
        vehicleModifications: insuranceType === "Annual" ? [] : undefined,
        purchaseDate: insuranceType === "Annual" ? "2022-06-15" : undefined,
        legalOwner: insuranceType === "Annual" ? "Yes" : undefined,
      },
      coverDetails: {
        type: insuranceType === "Temp" ? "Days" : insuranceType === "Impound" ? "Days" : "Annual",
        period: insuranceType === "Temp" ? 7 : insuranceType === "Impound" ? 30 : 1,
        startDate: "2025-01-15",
        startTime: "09:00",
        level: insuranceType === "Annual" ? "Comprehensive" : undefined,
        impoundType: insuranceType === "Impound" ? "Impound Insurance" : undefined,
      },
      userDetails: {
        firstName: "John",
        surname: "Doe",
        email: "john@example.com",
        phone: "07000000000",
        dateOfBirth: "1990-05-20",
        postCode: "SW1A 1AA",
        address: "10 Downing Street",
        employmentStatus: "Employed",
        occupation: "Manager",
        industry: "Finance",
      },
      carUsage: {
        keepingCarDuringDay: "Parked at home",
        keepingCarDuringNight: "Parked at home",
        usageType: "Social, domestic and pleasure",
        licenseType: "Full UK",
        licenseHeld: "20+ years",
        licenseNumber: "N/A",
        NCB: "No Claims Bonus",
        voluntaryExcess: "£0",
        criminalConvictions: false,
        medicalConditions: false,
        insuranceCancelledOrClaimRefusedOrPolicyVoided: false,
        ownsHome: true,
        childrenUnder16: false,
        livedInUKSinceBirth: true,
        hasAdditionalDrivers: insuranceType === "Annual",
        additionalDrivers: insuranceType === "Annual" ? [
          {
            firstName: "Sarah",
            surname: "Smith",
            dateOfBirth: "1995-08-10",
            employmentStatus: "Employed",
            occupation: "Engineer",
            industry: "Technology",
            otherVehicles: false,
            licenseType: "Full UK",
            licenseHeld: "10+ years",
            NCB: "3 Years",
            criminalConvictions: false,
            medicalConditions: false,
          }
        ] : [],
      },
      optionalExtras: {
        courtesyCar: insuranceType === "Annual" ? true : false,
        breakdownCover: insuranceType === "Annual" ? true : false,
        foreignUseCover: insuranceType === "Annual" ? false : false,
      },
      totalPrice: 49.99,
      quote: {
        priceAmount: 49.99,
      },
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
      insuranceData = {
        _id: id,
        type: "Temp",
        vehicleDetails: {
          registrationNumber: "XX23ABC",
          make: "Toyota",
          model: "Corolla",
          year: "2023",
          type: "Saloon",
          fuel: "Petrol",
          transmission: "Manual",
          doors: "4",
          colour: "Silver",
          worth: "N/A",
        },
        coverDetails: {
          type: "Days",
          period: 7,
          startDate: "2025-01-15",
          startTime: "09:00",
        },
        userDetails: {
          firstName: "John",
          surname: "Doe",
          email: "john@example.com",
          phone: "07000000000",
          dateOfBirth: "1990-05-20",
          postCode: "SW1A 1AA",
          address: "10 Downing Street",
          employmentStatus: "Employed",
          occupation: "Manager",
          industry: "Finance",
        },
        carUsage: {
          keepingCarDuringDay: "Parked at home",
          keepingCarDuringNight: "Parked at home",
          usageType: "Social, domestic and pleasure",
          licenseType: "Full UK",
          licenseHeld: "20+ years",
          licenseNumber: "N/A",
          NCB: "No Claims Bonus",
          voluntaryExcess: "£0",
          criminalConvictions: false,
          medicalConditions: false,
          insuranceCancelledOrClaimRefusedOrPolicyVoided: false,
          ownsHome: true,
          childrenUnder16: false,
          livedInUKSinceBirth: true,
          hasAdditionalDrivers: false,
          additionalDrivers: [],
        },
        optionalExtras: {
          courtesyCar: false,
          breakdownCover: false,
          foreignUseCover: false,
        },
        totalPrice: 49.99,
        quote: {
          priceAmount: 49.99,
        },
      };
    }
  }

  // Use default mock data if no insurance found
  if (!insuranceData) {
    insuranceData = {
      _id: id,
      type: "Temp",
      vehicleDetails: {
        registrationNumber: "XX23ABC",
        make: "Toyota",
        model: "Corolla",
        year: "2023",
        type: "Saloon",
        fuel: "Petrol",
        transmission: "Manual",
        doors: "4",
        colour: "Silver",
        worth: "N/A",
      },
      coverDetails: {
        type: "Days",
        period: 7,
        startDate: "2025-01-15",
        startTime: "09:00",
      },
      userDetails: {
        firstName: "John",
        surname: "Doe",
        email: "john@example.com",
        phone: "07000000000",
        dateOfBirth: "1990-05-20",
        postCode: "SW1A 1AA",
        address: "10 Downing Street",
        employmentStatus: "Employed",
        occupation: "Manager",
        industry: "Finance",
      },
      carUsage: {
        keepingCarDuringDay: "Parked at home",
        keepingCarDuringNight: "Parked at home",
        usageType: "Social, domestic and pleasure",
        licenseType: "Full UK",
        licenseHeld: "20+ years",
        licenseNumber: "N/A",
        NCB: "No Claims Bonus",
        voluntaryExcess: "£0",
        criminalConvictions: false,
        medicalConditions: false,
        insuranceCancelledOrClaimRefusedOrPolicyVoided: false,
        ownsHome: true,
        childrenUnder16: false,
        livedInUKSinceBirth: true,
        hasAdditionalDrivers: false,
        additionalDrivers: [],
      },
      optionalExtras: {
        courtesyCar: false,
        breakdownCover: false,
        foreignUseCover: false,
      },
      totalPrice: 49.99,
      quote: {
        priceAmount: 49.99,
      },
    };
  }

  return <PaymentSummaryClient insuranceData={insuranceData} id={id} />;
};

export default page;
