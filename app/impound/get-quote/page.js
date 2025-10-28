"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { impoundInsuranceSchema } from "@/utils/schemas/impoundInsuranceSchema";
import GetQuoteHeader from "@/ui/getQuote/GetQuoteHeader";
import VehicleDetailsForm from "@/app/temporary/get-quote/_components/VehicleDetailsForm";
import ImpoundCoverDetailsForm from "./_components/ImpoundCoverDetailsForm";
import PersonalDetailsForm from "@/app/temporary/get-quote/_components/PersonalDetailsForm";
import TermsForm from "@/app/temporary/get-quote/_components/TermsForm";
import { useRouter, useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/utils/config";
import { toast } from "react-toastify";

const ImpoundInsuranceContent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [foundVehicleData, setFoundVehicleData] = useState(null);
  const [shouldAutoTrigger, setShouldAutoTrigger] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm({
    resolver: zodResolver(impoundInsuranceSchema),
    defaultValues: {
      type: "Impound",
      vehicleDetails: {
        registrationNumber: "",
        type: "",
        make: "",
        model: "",
        year: "",
        fuel: "",
        transmission: "",
        doors: "",
        colour: "",
        worth: "",
        apiData: null,
      },
      coverDetails: {
        impoundType: "",
        startDate: "",
        startTime: "10:00",
      },
      userDetails: {
        firstName: "",
        surname: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        postCode: "",
        address: "",
        employmentStatus: "",
        occupation: "",
        industry: "",
      },
      carUsage: {
        industry: "",
        keepingCarDuringDay: "",
        keepingCarDuringNight: "",
        usageType: "",
        licenseType: "",
        licenseHeld: "",
        licenseNumber: "",
        NCB: "",
        voluntaryExcess: "",
        criminalConvictions: false,
        medicalConditions: false,
        insuranceCancelledOrClaimRefusedOrPolicyVoided: false,
      },
      terms: {
        acceptTerms: false,
        acceptMarketing: false,
      },
    },
  });

  const { setValue } = form;

  // Populate form with URL parameters
  useEffect(() => {
    const fromQuote = searchParams.get("fromQuote");

    if (fromQuote === "true") {
      const registrationNumber = searchParams.get("registrationNumber");
      if (registrationNumber) {
        setValue("vehicleDetails.registrationNumber", registrationNumber.toUpperCase());
        // Auto-trigger vehicle lookup
        setShouldAutoTrigger(true);
      }

      // Handle start date from URL params
      const startDateDay = searchParams.get("startDateDay");
      const startDateMonth = searchParams.get("startDateMonth");
      const startDateYear = searchParams.get("startDateYear");

      if (startDateDay && startDateMonth && startDateYear) {
        // Convert month name to number (Jan = 01, Feb = 02, etc.)
        const monthMap = {
          "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04",
          "May": "05", "Jun": "06", "Jul": "07", "Aug": "08",
          "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
        };
        const monthNum = monthMap[startDateMonth] || "01";
        const dayPadded = startDateDay.padStart(2, "0");
        const dateString = `${startDateYear}-${monthNum}-${dayPadded}`;
        setValue("coverDetails.startDate", dateString);
      }
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const submissionData = {
        ...data,
        foundVehicleData: foundVehicleData,
      };

      const response = await fetch(`${API_BASE_URL}/api/insurance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (response.status === 409) {
        toast.error(
          `An account with email ${data.userDetails.email} already exists. Please login to continue.`
        );
        router.push(
          `/login?email=${encodeURIComponent(data.userDetails.email)}`
        );
        return;
      }

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to submit insurance application"
        );
      }

      const insuranceId = result.data.insurance._id;

      toast.success("Insurance application submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Check if payment=false is in search params
      const skipPayment = searchParams.get("payment") === "false";

      setTimeout(() => {
        if (skipPayment) {
          router.push(`/dashboard/policy`);
        } else {
          router.push(`/payment-summary?id=${insuranceId}`);
        }
      }, 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.message ||
          "Failed to submit insurance application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <GetQuoteHeader title="Impound Insurance" />
      <div className="centeredContent">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="insuranceQuotesContainer"
          noValidate
        >
          <VehicleDetailsForm
            form={form}
            onVehicleDataFound={setFoundVehicleData}
            autoTriggerLookup={shouldAutoTrigger}
          />
          <ImpoundCoverDetailsForm form={form} />
          <PersonalDetailsForm form={form} />
          <TermsForm
            form={form}
            onBack={() => router.back()}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </>
  );
};

const ImpoundInsurancePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ImpoundInsuranceContent />
    </Suspense>
  );
};

export default ImpoundInsurancePage;
