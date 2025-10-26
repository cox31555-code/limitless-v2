"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insuranceSchema } from "@/utils/schemas/insuranceSchema";
import Header from "@/ui/insurance-quotes/header/Header";
import VehicleDetailsForm from "./_components/VehicleDetailsForm";
import CoverDetailsForm from "./_components/CoverDetailsForm";
import PersonalDetailsForm from "./_components/PersonalDetailsForm";
import TermsForm from "./_components/TermsForm";
import StepperProgress from "./_components/StepperProgress";
import StepActions from "./_components/StepActions";
import { useRouter, useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/utils/config";
import { toast } from "react-toastify";
import styles from "./stepForm.module.css";

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

const TemporaryInsuranceContent = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.VEHICLE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [foundVehicleData, setFoundVehicleData] = useState(null);
  const [shouldAutoTrigger, setShouldAutoTrigger] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

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
        type: "Days",
        period: 1,
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

  const { setValue, trigger } = form;

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

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Generate a temporary insurance ID for offline mode
    const insuranceId = `TEMP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Check if payment=false is in search params
    const skipPayment = searchParams.get("payment") === "false";

    // Redirect to payment summary with insurance ID or dashboard if payment is skipped
    if (skipPayment) {
      router.push(`/dashboard/policy`);
    } else {
      router.push(`/payment-summary?id=${insuranceId}`);
    }
  };

  return (
    <div>
      <Header title="Temporary Insurance" />
      <div className="centeredContent">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={styles.stepFormContainer}
          noValidate
        >
          <StepperProgress
            currentStep={currentStep}
            totalSteps={4}
            stepTitles={STEP_TITLES}
          />

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

const TemporaryInsurancePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TemporaryInsuranceContent />
    </Suspense>
  );
};

export default TemporaryInsurancePage;
