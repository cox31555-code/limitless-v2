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
const Step1CarStorage = dynamic(() => import("./_components/Step1CarStorage"), { loading: () => <StepFallback /> });
const Step1OtherCars = dynamic(() => import("./_components/Step1OtherCars"), { loading: () => <StepFallback /> });
const Step2PersonalDetails = dynamic(() => import("./_components/Step2PersonalDetails"), { loading: () => <StepFallback /> });
const Step2Household = dynamic(() => import("./_components/Step2Household"), { loading: () => <StepFallback /> });
const Step2Employment = dynamic(() => import("./_components/Step2Employment"), { loading: () => <StepFallback /> });
const Step2Licence = dynamic(() => import("./_components/Step2Licence"), { loading: () => <StepFallback /> });

const StepFallback = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px", color: "#666", fontSize: "1.3rem" }}>
    Loading...
  </div>
);

const STEPS = {
  VEHICLE: 1,
  PERSONAL: 2,
  COVER: 3,
  OPTIONAL_EXTRAS: 4,
  REVIEW: 5,
};

const AnnualInsuranceContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(STEPS.VEHICLE);
  const [vehicleSubStep, setVehicleSubStep] = useState("registration"); // "registration", "carValue", "carUsage", "carStorage", or "otherCars"
  const [personalSubStep, setPersonalSubStep] = useState("aboutYou"); // "aboutYou", "household", "employment", or "licence"
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
        purchaseDate: "02/2025",
        haventBoughtYet: false,
        usageType: "",
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
        studentType: "",
        houseNumber: "",
        postcode: "",
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        city: "",
        manualPostcode: "",
        ownsHome: null,
        childrenUnder16: null,
        livedInUKSinceBirth: null,
      },
      carUsage: {
        industry: "",
        keepingCarDuringDay: "",
        keepingCarDuringNight: "",
        usageType: "",
        otherVehicles: null,
        otherVehiclesType: "",
        hasAdditionalQualifications: "",
        additionalQualificationType: "",
        qualificationMonth: "",
        qualificationYear: "",
        licenseType: "",
        licenseIssueCountry: "",
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

  const step2PersonalFields = [
    "userDetails.title",
    "userDetails.firstName",
    "userDetails.surname",
    "userDetails.dateOfBirth",
    "userDetails.maritalStatus",
  ];

  const step2HouseholdFields = [
    "userDetails.houseNumber",
    "userDetails.postcode",
    "userDetails.addressLine1",
    "userDetails.addressLine2",
    "userDetails.addressLine3",
    "userDetails.city",
    "userDetails.manualPostcode",
    "userDetails.ownsHome",
    "userDetails.childrenUnder16",
    "userDetails.livedInUKSinceBirth",
  ];

  const step2EmploymentFields = [
    "userDetails.employmentStatus",
    "userDetails.occupation",
    "userDetails.industry",
    "userDetails.studentType",
  ];

  const step2LicenceFields = [
    "carUsage.licenseType",
    "carUsage.licenseIssueCountry",
    "carUsage.licenseHeld",
    "carUsage.hasAdditionalQualifications",
    "carUsage.additionalQualificationType",
    "carUsage.qualificationMonth",
    "carUsage.qualificationYear",
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
    "carUsage.householdCarsCount",
    "carUsage.otherVehicles",
    "carUsage.otherVehiclesType",
    "carUsage.licenseType",
    "carUsage.licenseHeld",
    "carUsage.NCB",
    "carUsage.voluntaryExcess",
    "carUsage.criminalConvictions",
    "carUsage.medicalConditions",
    "carUsage.insuranceCancelledOrClaimRefusedOrPolicyVoided",
  ];

  const getFieldsForStep = (step, subStep) => {
    switch (step) {
      case STEPS.VEHICLE:
        return vehicleFields;
      case STEPS.PERSONAL:
        if (subStep === "aboutYou") {
          return step2PersonalFields;
        } else if (subStep === "household") {
          return step2HouseholdFields;
        } else if (subStep === "employment") {
          return step2EmploymentFields;
        } else if (subStep === "licence") {
          return step2LicenceFields;
        }
        return step2PersonalFields;
      case STEPS.COVER:
        return coverFields;
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

    if (currentStep === STEPS.VEHICLE && vehicleSubStep === "carUsage") {
      setVehicleSubStep("carStorage");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.VEHICLE && vehicleSubStep === "carStorage") {
      setVehicleSubStep("otherCars");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.VEHICLE && vehicleSubStep === "otherCars") {
      setCurrentStep(STEPS.PERSONAL);
      setPersonalSubStep("aboutYou");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.PERSONAL && personalSubStep === "aboutYou") {
      setPersonalSubStep("household");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.PERSONAL && personalSubStep === "household") {
      setPersonalSubStep("employment");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.PERSONAL && personalSubStep === "employment") {
      setPersonalSubStep("licence");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.PERSONAL && personalSubStep === "licence") {
      setCurrentStep(STEPS.COVER);
      setVehicleSubStep("registration");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.REVIEW) {
      return;
    }

    const subStep = currentStep === STEPS.VEHICLE ? vehicleSubStep : currentStep === STEPS.PERSONAL ? personalSubStep : undefined;
    const fieldsToValidate = getFieldsForStep(currentStep, subStep);
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep(currentStep + 1);
      setVehicleSubStep("registration"); // Reset vehicle sub-step when moving to next main step
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handlePreviousStep = () => {
    // Handle Step 2 sub-step navigation
    if (currentStep === STEPS.PERSONAL && personalSubStep === "licence") {
      setPersonalSubStep("employment");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.PERSONAL && personalSubStep === "employment") {
      setPersonalSubStep("household");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.PERSONAL && personalSubStep === "household") {
      setPersonalSubStep("aboutYou");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.PERSONAL && personalSubStep === "aboutYou") {
      setCurrentStep(STEPS.VEHICLE);
      setVehicleSubStep("otherCars");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Handle Step 1 sub-step navigation
    if (currentStep === STEPS.VEHICLE && vehicleSubStep === "otherCars") {
      setVehicleSubStep("carStorage");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.VEHICLE && vehicleSubStep === "carStorage") {
      setVehicleSubStep("carUsage");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.VEHICLE && vehicleSubStep === "carUsage") {
      setVehicleSubStep("carValue");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

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
        subtitle={
          currentStep === STEPS.VEHICLE && vehicleSubStep === "carValue" ? "Car Value" :
          currentStep === STEPS.VEHICLE && vehicleSubStep === "carUsage" ? "Car Usage" :
          currentStep === STEPS.VEHICLE && vehicleSubStep === "carStorage" ? "Car Storage" :
          currentStep === STEPS.VEHICLE && vehicleSubStep === "otherCars" ? "Other cars" :
          currentStep === STEPS.PERSONAL && personalSubStep === "aboutYou" ? "About you" :
          currentStep === STEPS.PERSONAL && personalSubStep === "household" ? "Your household" :
          currentStep === STEPS.PERSONAL && personalSubStep === "employment" ? "Your employment" :
          currentStep === STEPS.PERSONAL && personalSubStep === "licence" ? "Your licence" :
          undefined
        }
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
                {currentStep === STEPS.VEHICLE && vehicleSubStep === "carUsage" && (
                  <Step1CarUsage form={form} />
                )}
                {currentStep === STEPS.VEHICLE && vehicleSubStep === "carStorage" && (
                  <Step1CarStorage form={form} />
                )}
                {currentStep === STEPS.VEHICLE && vehicleSubStep === "otherCars" && (
                  <Step1OtherCars form={form} />
                )}
                {currentStep === STEPS.PERSONAL && personalSubStep === "aboutYou" && (
                  <Step2PersonalDetails form={form} />
                )}
                {currentStep === STEPS.PERSONAL && personalSubStep === "household" && (
                  <Step2Household form={form} />
                )}
                {currentStep === STEPS.PERSONAL && personalSubStep === "employment" && (
                  <Step2Employment form={form} />
                )}
                {currentStep === STEPS.PERSONAL && personalSubStep === "licence" && (
                  <Step2Licence form={form} />
                )}
                {currentStep === STEPS.COVER && <AnnualCoverDetailsForm form={form} />}
                {currentStep === STEPS.OPTIONAL_EXTRAS && <AnnualOptionalExtrasForm form={form} />}
                {currentStep === STEPS.REVIEW && <ReviewQuote form={form} insuranceType="Annual" />}
              </div>

              <QuoteNavButtons
                currentStep={currentStep}
                vehicleSubStep={vehicleSubStep}
                personalSubStep={personalSubStep}
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
            <QuoteProgressCard
              currentStep={currentStep}
              vehicleSubStep={vehicleSubStep}
              personalSubStep={personalSubStep}
            />
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
