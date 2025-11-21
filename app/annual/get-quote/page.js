"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { annualInsuranceSchema } from "@/utils/schemas/insuranceSchema";
import GetQuoteHeaderWithNav from "@/ui/getQuote/GetQuoteHeaderWithNav";
import StepActions from "@/app/temporary/get-quote/_components/StepActions";
import LoadingOverlay from "@/ui/loadingSpinner/LoadingOverlay";
import { useRouter, useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/utils/config";
import { toast } from "react-toastify";
import styles from "@/app/temporary/get-quote/stepForm.module.css";

const AnnualVehicleDetailsForm = dynamic(() => import("./_components/AnnualVehicleDetailsForm"), { loading: () => <StepFallback /> });
const AnnualCoverDetailsForm = dynamic(() => import("./_components/AnnualCoverDetailsForm"), { loading: () => <StepFallback /> });
const AnnualPersonalDetailsForm = dynamic(() => import("./_components/AnnualPersonalDetailsForm"), { loading: () => <StepFallback /> });
const AnnualOptionalExtrasForm = dynamic(() => import("./_components/AnnualOptionalExtrasForm"), { loading: () => <StepFallback /> });
const ReviewQuote = dynamic(() => import("@/app/temporary/get-quote/_components/ReviewQuote"), { loading: () => <StepFallback /> });

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

const STEP_TITLES = [
  "Vehicle Details",
  "Cover Details",
  "Personal Details",
  "Optional Extras",
  "Review Your Quote",
];

const AnnualInsuranceContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(STEPS.VEHICLE);
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

  const { setValue, trigger, watch } = form;

  // Handle step parameter from URL (only on client)
  useEffect(() => {
    if (!isMounted) return;

    const stepParam = searchParams.get("step");
    if (stepParam) {
      const step = parseInt(stepParam);
      if (step >= STEPS.VEHICLE && step <= STEPS.TERMS) {
        setCurrentStep(step);
      }
    }
  }, [isMounted, searchParams]);

  // Populate form with URL parameters from GetQuote (only on client)
  useEffect(() => {
    if (!isMounted) return;

    const fromQuote = searchParams.get("fromQuote");

    if (fromQuote === "true") {
      // Check if registration number was provided
      const registrationNumber = searchParams.get("registrationNumber");
      if (registrationNumber) {
        setValue("vehicleDetails.registrationNumber", registrationNumber.toUpperCase());
        // Auto-trigger vehicle lookup
        setShouldAutoTrigger(true);
      }
    }
  }, [isMounted, searchParams, setValue]);

  // Step validation fields
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
        const employmentStatus = watch("userDetails.employmentStatus");
        // Only require industry and occupation if not a Student
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
        // Final step - will be handled by form submission
        return;
      }
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > STEPS.VEHICLE) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = (data) => {
    // Show loading overlay
    setShowLoading(true);
    setIsSubmitting(true);

    // Generate an annual insurance ID for offline mode
    const insuranceId = `ANNUAL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Redirect to payment summary (review your quote) page
    const redirectUrl = `/payment-summary?id=${insuranceId}`;

    // Generate random delay between 4-9 seconds for loading spinner
    const randomDelay = Math.floor(Math.random() * 5001) + 4000;

    // Use window.location.href for reliable navigation
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, randomDelay);
  };

  return (
    <div suppressHydrationWarning>
      <LoadingOverlay isVisible={showLoading} />
      <GetQuoteHeaderWithNav title="Annual Insurance Quote" currentStep={currentStep} totalSteps={5} />
      <div className="centeredContent" suppressHydrationWarning>
        <form
          className={styles.stepFormContainer}
          noValidate
          suppressHydrationWarning
        >
          <div className={styles.stepContent}>
            {currentStep === STEPS.VEHICLE && (
              <AnnualVehicleDetailsForm
                form={form}
                onVehicleDataFound={setFoundVehicleData}
                autoTriggerLookup={shouldAutoTrigger}
              />
            )}
            {currentStep === STEPS.COVER && <AnnualCoverDetailsForm form={form} />}
            {currentStep === STEPS.PERSONAL && (
              <AnnualPersonalDetailsForm form={form} />
            )}
            {currentStep === STEPS.OPTIONAL_EXTRAS && (
              <AnnualOptionalExtrasForm form={form} />
            )}
            {currentStep === STEPS.REVIEW && (
              <ReviewQuote form={form} insuranceType="Annual" />
            )}
          </div>

          <StepActions
            currentStep={currentStep}
            totalSteps={5}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
            onSubmit={onSubmit}
            isLoading={isSubmitting}
            nextLabel={currentStep === STEPS.REVIEW ? "Get Quote" : "Next"}
            backLabel="Back"
          />
        </form>
      </div>
    </div>
  );
};

const AnnualInsurancePage = () => {
  return (
    <Suspense fallback={<GetQuoteHeaderWithNav title="Annual Insurance Quote" currentStep={1} totalSteps={5} />}>
      <AnnualInsuranceContent />
    </Suspense>
  );
};

export default AnnualInsurancePage;
