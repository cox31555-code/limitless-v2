"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { annualInsuranceSchema } from "@/utils/schemas/insuranceSchema";
import LoadingOverlay from "@/ui/loadingSpinner/LoadingOverlay";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import QuoteProgressCard from "./_components/QuoteProgressCard";
import QuoteNavButtons from "./_components/QuoteNavButtons";
import Step1VehicleRegistration from "./_components/Step1VehicleRegistration";
import QuoteHeader from "./_components/QuoteHeader";
import GetQuotePageHeader from "./_components/GetQuotePageHeader";
import styles from "./newGetQuotePage.module.css";

const AnnualVehicleDetailsForm = dynamic(() => import("./_components/AnnualVehicleDetailsForm"), { loading: () => <StepFallback /> });
const AnnualCoverDetailsForm = dynamic(() => import("./_components/AnnualCoverDetailsForm"), { loading: () => <StepFallback /> });
const AnnualPersonalDetailsForm = dynamic(() => import("./_components/AnnualPersonalDetailsForm"), { loading: () => <StepFallback /> });
const AnnualOptionalExtrasForm = dynamic(() => import("./_components/AnnualOptionalExtrasForm"), { loading: () => <StepFallback /> });
const ReviewQuote = dynamic(() => import("@/app/temporary/get-quote/_components/ReviewQuote"), { loading: () => <StepFallback /> });
const Step1CarValue = dynamic(() => import("./_components/Step1CarValue"), { loading: () => <StepFallback /> });
const Step1CarUsage = dynamic(() => import("./_components/Step1CarUsage"), { loading: () => <StepFallback /> });

const StepFallback = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px", color: "#666", fontSize: "1.3rem" }}>
    Loading...
  </div>
);

const STEPS = {
  VEHICLE: 1,
  COVER: 2,
  PERSONAL: 3,
  OPTIONAL_EXTRAS: 4,
  REVIEW: 5,
};

const AnnualInsuranceContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(STEPS.VEHICLE);
  const [vehicleSubStep, setVehicleSubStep] = useState("registration"); // "registration" or "carValue"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [foundVehicleData, setFoundVehicleData] = useState(null);
  const [shouldAutoTrigger, setShouldAutoTrigger] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(annualInsuranceSchema),
    defaultValues: {
      type: "Annual",
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
        trackingDevice: "",
        alarmImmobiliser: "",
        importedVehicle: "",
        vehicleModified: "No",
        vehicleModifications: [],
        purchaseDate: "",
        legalOwner: "",
        owner: "",
        ownerOther: "",
        registeredKeeper: "",
        registeredKeeperOther: "",
        apiData: null,
        carValue: "4560",
        estimatedValue: "4560",
      },
      coverDetails: {
        level: "",
        startDate: "",
      },
      optionalExtras: {
        courtesyCar: null,
        breakdownCover: null,
        foreignUseCover: null,
      },
      userDetails: {
        title: "",
        firstName: "",
        surname: "",
        maritalStatus: "",
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
        otherVehicles: null,
        otherVehiclesType: "",
        hasAdditionalQualifications: null,
        additionalQualificationType: "",
        qualificationMonth: "",
        qualificationYear: "",
        licenseType: "",
        licenseHeld: "",
        licenseNumber: "",
        NCB: "",
        voluntaryExcess: "",
        annualMileage: "",
        ownsHome: null,
        childrenUnder16: null,
        livedInUKSinceBirth: null,
        hasAdditionalDrivers: null,
        additionalDrivers: [],
        criminalConvictions: null,
        medicalConditions: null,
        dvlaConditionType: null,
        insuranceCancelledOrClaimRefusedOrPolicyVoided: null,
      },
      terms: {
        acceptTerms: false,
        acceptMarketing: false,
      },
    },
  });

  const { setValue, trigger } = form;

  useEffect(() => {
    if (!isMounted) return;

    const stepParam = searchParams.get("step");
    if (stepParam) {
      const step = parseInt(stepParam);
      if (step >= STEPS.VEHICLE && step <= STEPS.REVIEW) {
        setCurrentStep(step);
      }
    }
  }, [isMounted, searchParams]);

  useEffect(() => {
    if (!isMounted) return;

    const fromQuote = searchParams.get("fromQuote");
    if (fromQuote === "true") {
      const registrationNumber = searchParams.get("registrationNumber");
      if (registrationNumber) {
        setValue("vehicleDetails.registrationNumber", registrationNumber.toUpperCase());
        setShouldAutoTrigger(true);
      }
    }
  }, [isMounted, searchParams, setValue]);

  const vehicleFields = [
    "vehicleDetails.registrationNumber",
    "vehicleDetails.type",
    "vehicleDetails.make",
    "vehicleDetails.model",
    "vehicleDetails.year",
    "vehicleDetails.fuel",
    "vehicleDetails.transmission",
    "vehicleDetails.colour",
    "vehicleDetails.worth",
    "vehicleDetails.trackingDevice",
    "vehicleDetails.alarmImmobiliser",
    "vehicleDetails.importedVehicle",
    "vehicleDetails.vehicleModified",
    "vehicleDetails.vehicleModifications",
    "vehicleDetails.purchaseDate",
    "vehicleDetails.legalOwner",
    "vehicleDetails.owner",
    "vehicleDetails.registeredKeeper",
  ];

  const coverFields = [
    "coverDetails.level",
    "coverDetails.startDate",
  ];

  const basePersonalFields = [
    "userDetails.firstName",
    "userDetails.surname",
    "userDetails.email",
    "userDetails.phone",
    "userDetails.dateOfBirth",
    "userDetails.postCode",
    "userDetails.address",
    "userDetails.employmentStatus",
    "carUsage.keepingCarDuringDay",
    "carUsage.keepingCarDuringNight",
    "carUsage.usageType",
    "carUsage.licenseType",
    "carUsage.licenseHeld",
    "carUsage.NCB",
    "carUsage.voluntaryExcess",
    "carUsage.criminalConvictions",
    "carUsage.medicalConditions",
    "carUsage.insuranceCancelledOrClaimRefusedOrPolicyVoided",
  ];

  const getFieldsForStep = (step) => {
    switch (step) {
      case STEPS.VEHICLE:
        return vehicleFields;
      case STEPS.COVER:
        return coverFields;
      case STEPS.PERSONAL: {
        const employmentStatus = form.watch("userDetails.employmentStatus");
        const personalFields = [...basePersonalFields];
        if (employmentStatus !== "Student") {
          personalFields.push("userDetails.industry", "userDetails.occupation");
        }
        return personalFields;
      }
      default:
        return [];
    }
  };

  const handleNextStep = async () => {
    // Handle Step 1 sub-step navigation
    if (currentStep === STEPS.VEHICLE && vehicleSubStep === "registration") {
      setVehicleSubStep("carValue");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.VEHICLE && vehicleSubStep === "carValue") {
      setVehicleSubStep("carUsage");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.OPTIONAL_EXTRAS) {
      setCurrentStep(STEPS.REVIEW);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      if (currentStep === STEPS.PERSONAL) {
        setCurrentStep(STEPS.OPTIONAL_EXTRAS);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (currentStep === STEPS.REVIEW) {
        return;
      }
      setCurrentStep(currentStep + 1);
      setVehicleSubStep("registration"); // Reset vehicle sub-step when moving to next main step
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handlePreviousStep = () => {
    // Handle Step 1 sub-step navigation
    if (currentStep === STEPS.VEHICLE && vehicleSubStep === "carValue") {
      setVehicleSubStep("registration");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep > STEPS.VEHICLE) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = (data) => {
    setShowLoading(true);
    setIsSubmitting(true);

    const insuranceId = `ANNUAL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const redirectUrl = `/payment-summary?id=${insuranceId}`;
    const randomDelay = Math.floor(Math.random() * 5001) + 4000;

    setTimeout(() => {
      window.location.href = redirectUrl;
    }, randomDelay);
  };

  return (
    <div suppressHydrationWarning>
      <GetQuotePageHeader />
      <LoadingOverlay isVisible={showLoading} />
      <QuoteHeader
        currentStep={currentStep}
        totalSteps={5}
        subtitle={currentStep === STEPS.VEHICLE && vehicleSubStep === "carValue" ? "Car Value" : undefined}
      />
      
      <div className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            <form noValidate suppressHydrationWarning>
              <div className={styles.stepContent}>
                {currentStep === STEPS.VEHICLE && vehicleSubStep === "registration" && (
                  <Step1VehicleRegistration
                    form={form}
                    onVehicleFound={setFoundVehicleData}
                    autoTriggerLookup={shouldAutoTrigger}
                  />
                )}
                {currentStep === STEPS.VEHICLE && vehicleSubStep === "carValue" && (
                  <Step1CarValue form={form} />
                )}
                {currentStep === STEPS.COVER && <AnnualCoverDetailsForm form={form} />}
                {currentStep === STEPS.PERSONAL && <AnnualPersonalDetailsForm form={form} />}
                {currentStep === STEPS.OPTIONAL_EXTRAS && <AnnualOptionalExtrasForm form={form} />}
                {currentStep === STEPS.REVIEW && <ReviewQuote form={form} insuranceType="Annual" />}
              </div>

              <QuoteNavButtons
                currentStep={currentStep}
                vehicleSubStep={vehicleSubStep}
                totalSteps={5}
                onNext={handleNextStep}
                onBack={handlePreviousStep}
                onSubmit={onSubmit}
                isLoading={isSubmitting}
                nextLabel={currentStep === STEPS.REVIEW ? "Get Quote" : "Continue"}
                backLabel="Back"
              />
            </form>
          </div>

          <div className={styles.sidebarArea}>
            <QuoteProgressCard currentStep={currentStep} />
          </div>
        </div>
      </div>
    </div>
  );
};

const AnnualInsurancePage = () => {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        Loading...
      </div>
    }>
      <AnnualInsuranceContent />
    </Suspense>
  );
};

export default AnnualInsurancePage;
