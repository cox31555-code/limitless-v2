"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { annualInsuranceSchema } from "@/utils/schemas/insuranceSchema";
import GetQuoteHeaderWithNav from "@/ui/getQuote/GetQuoteHeaderWithNav";
import AnnualVehicleDetailsForm from "./_components/AnnualVehicleDetailsForm";
import AnnualCoverDetailsForm from "./_components/AnnualCoverDetailsForm";
import AnnualPersonalDetailsForm from "./_components/AnnualPersonalDetailsForm";
import TermsForm from "@/app/temporary/get-quote/_components/TermsForm";
import StepActions from "@/app/temporary/get-quote/_components/StepActions";
import LoadingOverlay from "@/ui/loadingSpinner/LoadingOverlay";
import { useRouter, useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/utils/config";
import { toast } from "react-toastify";
import styles from "@/app/temporary/get-quote/stepForm.module.css";

const STEPS = {
  VEHICLE: 1,
  COVER: 2,
  PERSONAL: 3,
  TERMS: 4,
};

const STEP_TITLES = [
  "Vehicle Details",
  "Cover Details",
  "Personal Details",
  "Terms & Conditions",
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
        otherVehicles: false,
        otherVehiclesType: "",
        hasAdditionalQualifications: false,
        additionalQualificationType: "",
        qualificationMonth: "",
        qualificationYear: "",
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

  const { setValue, trigger } = form;

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

  const personalFields = [
    "userDetails.firstName",
    "userDetails.surname",
    "userDetails.email",
    "userDetails.phone",
    "userDetails.dateOfBirth",
    "userDetails.postCode",
    "userDetails.address",
    "userDetails.employmentStatus",
    "userDetails.industry",
    "userDetails.occupation",
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

  const termsFields = [
    "terms.acceptTerms",
  ];

  const getFieldsForStep = (step) => {
    switch (step) {
      case STEPS.VEHICLE:
        return vehicleFields;
      case STEPS.COVER:
        return coverFields;
      case STEPS.PERSONAL:
        return personalFields;
      case STEPS.TERMS:
        return termsFields;
      default:
        return [];
    }
  };

  const handleNextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      if (currentStep === STEPS.TERMS) {
        // Last step - will be handled by form submission
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

    // Generate an annual insurance ID for offline mode
    const insuranceId = `ANNUAL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Wait 5 seconds then redirect to payment summary with insurance ID
    setTimeout(() => {
      router.push(`/payment-summary?id=${insuranceId}`);
    }, 5000);
  };

  return (
    <div suppressHydrationWarning>
      <LoadingOverlay isVisible={showLoading} />
      <GetQuoteHeaderWithNav title="Annual Insurance Quote" currentStep={currentStep} totalSteps={4} />
      <div className="centeredContent" suppressHydrationWarning>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
              <PersonalDetailsForm form={form} />
            )}
            {currentStep === STEPS.TERMS && (
              <TermsForm form={form} onBack={handlePreviousStep} isSubmitting={isSubmitting} />
            )}
          </div>

          {currentStep !== STEPS.TERMS && (
            <StepActions
              currentStep={currentStep}
              totalSteps={4}
              onNext={handleNextStep}
              onBack={handlePreviousStep}
              isLoading={isSubmitting}
              nextLabel="Next"
              backLabel="Back"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default AnnualInsuranceContent;
