"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insuranceSchema } from "@/utils/schemas/insuranceSchema";
import GetQuoteHeaderWithNav from "@/ui/getQuote/GetQuoteHeaderWithNav";
import StepActions from "./_components/StepActions";
import LoadingOverlay from "@/ui/loadingSpinner/LoadingOverlay";
import { useRouter, useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/utils/config";
import { toast } from "react-toastify";
import styles from "./stepForm.module.css";

const VehicleDetailsForm = dynamic(() => import("./_components/VehicleDetailsForm"), { loading: () => <StepFallback /> });
const CoverDetailsForm = dynamic(() => import("./_components/CoverDetailsForm"), { loading: () => <StepFallback /> });
const PersonalDetailsForm = dynamic(() => import("./_components/PersonalDetailsForm"), { loading: () => <StepFallback /> });
const ReviewQuote = dynamic(() => import("./_components/ReviewQuote"), { loading: () => <StepFallback /> });

const StepFallback = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px", color: "#666", fontSize: "1.3rem" }}>
    Loading...
  </div>
);

const STEPS = {
  VEHICLE: 1,
  COVER: 2,
  PERSONAL: 3,
  REVIEW: 4,
};

const STEP_TITLES = [
  "Vehicle Details",
  "Cover Details",
  "Personal Details",
  "Review Your Quote",
];

const TemporaryInsuranceContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(STEPS.VEHICLE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [foundVehicleData, setFoundVehicleData] = useState(null);
  const [shouldAutoTrigger, setShouldAutoTrigger] = useState(false);
  const [formReady, setFormReady] = useState(false);

  const form = useForm({
    resolver: zodResolver(insuranceSchema),
    defaultValues: {
      type: "Temp",
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
        type: "",
        period: "",
        startDate: "",
        startTime: "",
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
        licenseType: "",
        licenseHeld: "",
        licenseNumber: "",
        NCB: "",
        voluntaryExcess: "",
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
    setFormReady(true);
  }, []);

  // Handle step parameter from URL
  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (stepParam) {
      const step = parseInt(stepParam);
      if (step >= STEPS.VEHICLE && step <= STEPS.TERMS) {
        setCurrentStep(step);
      }
    }
  }, [searchParams]);

  // Populate form with URL parameters from GetQuote
  useEffect(() => {
    const fromQuote = searchParams.get("fromQuote");

    if (fromQuote === "true") {
      // Duration details from URL parameters (always present)
      const durationType = searchParams.get("durationType");
      const durationValue = searchParams.get("durationValue");

      // Set cover details if provided
      if (durationType) {
        setValue("coverDetails.type", durationType);
      }
      if (durationValue) {
        setValue("coverDetails.period", parseInt(durationValue) || 1);
      }

      // Check if registration number was provided
      const registrationNumber = searchParams.get("registrationNumber");
      if (registrationNumber) {
        setValue("vehicleDetails.registrationNumber", registrationNumber.toUpperCase());
        // Auto-trigger vehicle lookup
        setShouldAutoTrigger(true);
      }
    }
  }, [searchParams, setValue]);

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
  ];

  const coverFields = [
    "coverDetails.type",
    "coverDetails.period",
    "coverDetails.startDate",
    "coverDetails.startTime",
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
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      if (currentStep === STEPS.PERSONAL) {
        setCurrentStep(STEPS.REVIEW);
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

    // Generate a temporary insurance ID for offline mode
    const insuranceId = `TEMP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

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
      <GetQuoteHeaderWithNav title="Temporary Insurance Quote" currentStep={currentStep} totalSteps={4} />
      <div className="centeredContent" suppressHydrationWarning>
        <form
          className={styles.stepFormContainer}
          noValidate
          suppressHydrationWarning
        >
          <div className={styles.stepContent}>
            {currentStep === STEPS.VEHICLE && (
              <VehicleDetailsForm
                form={form}
                onVehicleDataFound={setFoundVehicleData}
                autoTriggerLookup={shouldAutoTrigger}
              />
            )}
            {currentStep === STEPS.COVER && <CoverDetailsForm form={form} />}
            {currentStep === STEPS.PERSONAL && (
              <PersonalDetailsForm form={form} />
            )}
            {currentStep === STEPS.REVIEW && (
              <ReviewQuote form={form} insuranceType="Temp" />
            )}
          </div>

            <StepActions
              currentStep={currentStep}
              totalSteps={4}
              onNext={handleNextStep}
              onBack={handlePreviousStep}
              onSubmit={onSubmit}
              isLoading={isSubmitting}
              nextLabel={currentStep === STEPS.REVIEW ? "Get Quotes" : "Next"}
              backLabel="Back"
            />
        </form>
      </div>
    </div>
  );
};

const TemporaryInsurancePage = () => {
  return (
    <Suspense fallback={<GetQuoteHeaderWithNav title="Temporary Insurance Quote" currentStep={1} totalSteps={4} />}>
      <TemporaryInsuranceContent />
    </Suspense>
  );
};

export default TemporaryInsurancePage;
