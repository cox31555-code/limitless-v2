"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { annualInsuranceSchema } from "@/utils/schemas/insuranceSchema";
import LoadingOverlay from "@/ui/loadingSpinner/LoadingOverlay";
import CourierLoadingOverlay from "@/app/courier/_components/CourierLoadingOverlay";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
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
const Step4CheckYourAnswers = dynamic(() => import("./_components/Step4CheckYourAnswers"), { loading: () => <StepFallback /> });
const Step1CarValue = dynamic(() => import("./_components/Step1CarValue"), { loading: () => <StepFallback /> });
const Step1CarUsage = dynamic(() => import("./_components/Step1CarUsage"), { loading: () => <StepFallback /> });
const Step1CarStorage = dynamic(() => import("./_components/Step1CarStorage"), { loading: () => <StepFallback /> });
const Step1OtherCars = dynamic(() => import("./_components/Step1OtherCars"), { loading: () => <StepFallback /> });
const Step2PersonalDetails = dynamic(() => import("./_components/Step2PersonalDetails"), { loading: () => <StepFallback /> });
const Step2Household = dynamic(() => import("./_components/Step2Household"), { loading: () => <StepFallback /> });
const Step2Employment = dynamic(() => import("./_components/Step2Employment"), { loading: () => <StepFallback /> });
const Step2Licence = dynamic(() => import("./_components/Step2Licence"), { loading: () => <StepFallback /> });
const Step2LicenceRestrictions = dynamic(() => import("./_components/Step2LicenceRestrictions"), { loading: () => <StepFallback /> });
const Step2ClaimsAndConvictions = dynamic(() => import("./_components/Step2ClaimsAndConvictions"), { loading: () => <StepFallback /> });
const Step2AddClaim = dynamic(() => import("./_components/Step2AddClaim"), { loading: () => <StepFallback /> });
const Step2AddConviction = dynamic(() => import("./_components/Step2AddConviction"), { loading: () => <StepFallback /> });
const Step3AdditionalDrivers = dynamic(() => import("./_components/Step3AdditionalDrivers"), { loading: () => <StepFallback /> });
const Step3AddDriver = dynamic(() => import("./_components/Step3AddDriver"), { loading: () => <StepFallback /> });
const Step3DriverClaimsAndConvictions = dynamic(() => import("./_components/Step3DriverClaimsAndConvictions"), { loading: () => <StepFallback /> });
const Step3AddDriverClaim = dynamic(() => import("./_components/Step3AddDriverClaim"), { loading: () => <StepFallback /> });
const Step3AddDriverConviction = dynamic(() => import("./_components/Step3AddDriverConviction"), { loading: () => <StepFallback /> });
const Step3CarOwner = dynamic(() => import("./_components/Step3CarOwner"), { loading: () => <StepFallback /> });
const Step3CarOwnerAddPerson = dynamic(() => import("./_components/Step3CarOwnerAddPerson"), { loading: () => <StepFallback /> });
const Step3CoverDetails = dynamic(() => import("./_components/Step3CoverDetails"), { loading: () => <StepFallback /> });
const Step3NoClaimsDiscount = dynamic(() => import("./_components/Step3NoClaimsDiscount"), { loading: () => <StepFallback /> });
const Step3AdditionalProducts = dynamic(() => import("./_components/Step3AdditionalProducts"), { loading: () => <StepFallback /> });
const Step3ContactInformation = dynamic(() => import("./_components/Step3ContactInformation"), { loading: () => <StepFallback /> });

const StepFallback = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px", color: "#666", fontSize: "1.3rem" }}>
    Loading...
  </div>
);

const STEPS = {
  VEHICLE: 1,
  PERSONAL: 2,
  COVER: 3,
  CHECK_ANSWERS: 4,
};

const AnnualInsuranceContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(STEPS.VEHICLE);
  const [vehicleSubStep, setVehicleSubStep] = useState("registration"); // "registration", "carValue", "carUsage", "carStorage", or "otherCars"
  const [personalSubStep, setPersonalSubStep] = useState("aboutYou"); // "aboutYou", "household", "employment", "licence", "restrictions", "claims", or "addClaim"
  const [coverSubStep, setCoverSubStep] = useState("details"); // "details", "additionalDrivers", "addDriver", "addDriverClaimsAndConvictions", "addDriverClaim", "addDriverConviction", "carOwner", "carOwnerAddRegisteredKeeper", "carOwnerAddLegalOwner", "cover", "ncd", "additionalProducts", or "contactInformation"
  const [driverBeingAdded, setDriverBeingAdded] = useState(null);
  const [driverClaims, setDriverClaims] = useState([]);
  const [driverConvictions, setDriverConvictions] = useState([]);
  const [editingDriverClaimIndex, setEditingDriverClaimIndex] = useState(null);
  const [editingDriverConvictionIndex, setEditingDriverConvictionIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [foundVehicleData, setFoundVehicleData] = useState(null);
  const [shouldAutoTrigger, setShouldAutoTrigger] = useState(false);
  const [claims, setClaims] = useState([]);
  const [editingClaimIndex, setEditingClaimIndex] = useState(null);
  const [convictions, setConvictions] = useState([]);
  const [editingConvictionIndex, setEditingConvictionIndex] = useState(null);
  const [isEditingCarDetails, setIsEditingCarDetails] = useState(false);
  const [additionalDrivers, setAdditionalDrivers] = useState([]);
  const [hasAdditionalDrivers, setHasAdditionalDrivers] = useState(null);
  const [editingDriverIndex, setEditingDriverIndex] = useState(null);
  const [carOwnerData, setCarOwnerData] = useState(null);
  const [carOwnerAddingType, setCarOwnerAddingType] = useState(null); // "registeredKeeper" or "legalOwner"
  const [ncdData, setNcdData] = useState(null);
  const [productsData, setProductsData] = useState(null);
  const [contactInformationData, setContactInformationData] = useState(null);

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
        minimumCoverLevel: "",
        startDate: "",
      },
      ncdData: {
        noClaimsDiscount: "",
        namedDriverExperience: "",
      },
      productsData: {
        personalAccidentCover: "",
        courtesyCar: "",
        breakdownCover: "",
        motorLegalProtection: "",
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
        licenseNumberFirst: "",
        licenseNumberLast: "",
        licenseNumberNI: "",
        declineShareLicenseNumber: false,
        medicalConditions: "",
        dvlaConditionType: "",
        insuranceCancelledOrClaimRefusedOrPolicyVoided: "",
        criminalConvictions: "",
        motorAccidentsClaims: "",
        drivingConvictions: "",
        NCB: "",
        voluntaryExcess: "",
        annualMileage: "",
        ownsHome: null,
        childrenUnder16: null,
        livedInUKSinceBirth: null,
        hasAdditionalDrivers: null,
        additionalDrivers: [],
      },
      terms: {
        acceptTerms: false,
        acceptMarketing: false,
      },
    },
  });

  const { setValue, trigger } = form;

  // Initialize mount and restore form state from sessionStorage
  useEffect(() => {
    setIsMounted(true);

    // Restore form state from sessionStorage on mount
    const savedState = sessionStorage.getItem("annualQuoteFormState");
    if (savedState) {
      try {
        const formState = JSON.parse(savedState);
        // Restore form data
        const formData = formState.formData;
        Object.keys(formData).forEach(key => {
          setValue(key, formData[key]);
        });
        // Restore step state
        setCurrentStep(formState.currentStep || STEPS.VEHICLE);
        setVehicleSubStep(formState.vehicleSubStep || "registration");
        setPersonalSubStep(formState.personalSubStep || "aboutYou");
        setCoverSubStep(formState.coverSubStep || "details");
        // Restore component state
        setAdditionalDrivers(formState.additionalDrivers || []);
        setClaims(formState.claims || []);
        setConvictions(formState.convictions || []);
        setCarOwnerData(formState.carOwnerData || null);
        setNcdData(formState.ncdData || null);
        setProductsData(formState.productsData || null);
        setContactInformationData(formState.contactInformationData || null);
        setFoundVehicleData(formState.foundVehicleData || null);
      } catch (e) {
        console.error("Failed to restore form state on mount:", e);
      }
    }
  }, []);

  // Save form state to sessionStorage whenever steps or form data change
  useEffect(() => {
    if (!isMounted) return;

    const formState = {
      formData: form.getValues(),
      currentStep,
      vehicleSubStep,
      personalSubStep,
      coverSubStep,
      additionalDrivers,
      claims,
      convictions,
      carOwnerData,
      ncdData,
      productsData,
      contactInformationData,
      foundVehicleData,
    };
    sessionStorage.setItem("annualQuoteFormState", JSON.stringify(formState));
  }, [isMounted, currentStep, vehicleSubStep, personalSubStep, coverSubStep, form, additionalDrivers, claims, convictions, carOwnerData, ncdData, productsData, contactInformationData, foundVehicleData]);

  // Handle browser back/forward navigation
  useEffect(() => {
    if (!isMounted) return;

    // Push initial state to history
    const historyState = {
      currentStep,
      vehicleSubStep,
      personalSubStep,
      coverSubStep,
    };
    window.history.replaceState(historyState, "", window.location.href);

    // Listen for browser back/forward button clicks
    const handlePopState = (event) => {
      if (event.state) {
        setCurrentStep(event.state.currentStep || STEPS.VEHICLE);
        setVehicleSubStep(event.state.vehicleSubStep || "registration");
        setPersonalSubStep(event.state.personalSubStep || "aboutYou");
        setCoverSubStep(event.state.coverSubStep || "details");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isMounted]);

  // Helper function to push navigation state to browser history
  const pushHistoryState = useCallback((step, vSubStep, pSubStep, cSubStep) => {
    const state = {
      type: "annualQuoteStep",
      currentStep: step,
      vehicleSubStep: vSubStep,
      personalSubStep: pSubStep,
      coverSubStep: cSubStep,
      timestamp: Date.now(),
    };
    window.history.pushState(state, "", window.location.href);
  }, []);

  // Handle browser back/forward navigation
  useEffect(() => {
    if (!isMounted) return;

    const handlePopState = (event) => {
      if (event.state && event.state.type === "annualQuoteStep") {
        setCurrentStep(event.state.currentStep || STEPS.VEHICLE);
        setVehicleSubStep(event.state.vehicleSubStep || "registration");
        setPersonalSubStep(event.state.personalSubStep || "aboutYou");
        setCoverSubStep(event.state.coverSubStep || "details");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const stepParam = searchParams.get("step");
    if (stepParam) {
      const step = parseInt(stepParam);
      if (step >= STEPS.VEHICLE && step <= STEPS.CHECK_ANSWERS) {
        setCurrentStep(step);

        // If returning from payment-summary (step 4), restore the saved form state
        if (step === STEPS.CHECK_ANSWERS) {
          const savedState = sessionStorage.getItem("annualQuoteFormState");
          if (savedState) {
            try {
              const formState = JSON.parse(savedState);
              // Restore form data
              const formData = formState.formData;
              Object.keys(formData).forEach(key => {
                setValue(key, formData[key]);
              });
              // Restore component state
              setAdditionalDrivers(formState.additionalDrivers || []);
              setClaims(formState.claims || []);
              setConvictions(formState.convictions || []);
              setCarOwnerData(formState.carOwnerData || null);
              setNcdData(formState.ncdData || null);
              setProductsData(formState.productsData || null);
              setContactInformationData(formState.contactInformationData || null);
              setFoundVehicleData(formState.foundVehicleData || null);
              setCoverSubStep("contactInformation");
            } catch (e) {
              console.error("Failed to restore form state:", e);
            }
          }
        }
      }
    }
  }, [isMounted, searchParams, setValue]);

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
    "carUsage.licenseNumberFirst",
    "carUsage.licenseNumberLast",
    "carUsage.licenseNumberNI",
    "carUsage.declineShareLicenseNumber",
    "carUsage.hasAdditionalQualifications",
    "carUsage.additionalQualificationType",
    "carUsage.qualificationMonth",
    "carUsage.qualificationYear",
  ];

  const step2LicenceRestrictionsFields = [
    "carUsage.medicalConditions",
    "carUsage.dvlaConditionType",
    "carUsage.insuranceCancelledOrClaimRefusedOrPolicyVoided",
    "carUsage.criminalConvictions",
  ];

  const step2ClaimsAndConvictionsFields = [
    "carUsage.motorAccidentsClaims",
    "carUsage.drivingConvictions",
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
        } else if (subStep === "restrictions") {
          return step2LicenceRestrictionsFields;
        } else if (subStep === "claims") {
          return step2ClaimsAndConvictionsFields;
        }
        return step2PersonalFields;
      case STEPS.COVER:
        return coverFields;
      default:
        return [];
    }
  };

  const handleAddClaim = (claimData) => {
    if (editingClaimIndex !== null) {
      const updatedClaims = [...claims];
      updatedClaims[editingClaimIndex] = claimData;
      setClaims(updatedClaims);
      setEditingClaimIndex(null);
    } else {
      setClaims([...claims, claimData]);
    }
    setPersonalSubStep("claims");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToAddClaim = (index = null) => {
    setEditingClaimIndex(index);
    setPersonalSubStep("addClaim");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddConviction = (convictionData) => {
    if (editingConvictionIndex !== null) {
      const updatedConvictions = [...convictions];
      updatedConvictions[editingConvictionIndex] = convictionData;
      setConvictions(updatedConvictions);
      setEditingConvictionIndex(null);
    } else {
      setConvictions([...convictions, convictionData]);
    }
    setPersonalSubStep("claims");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToAddConviction = (index = null) => {
    setEditingConvictionIndex(index);
    setPersonalSubStep("addConviction");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRemoveDriver = (index) => {
    setAdditionalDrivers(additionalDrivers.filter((_, i) => i !== index));
  };

  const handleNavigateToAddDriver = (index = null) => {
    setEditingDriverIndex(index);
    setCoverSubStep("addDriver");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddDriver = (driverData) => {
    setDriverBeingAdded(driverData);
    setCoverSubStep("addDriverClaimsAndConvictions");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCompleteDriverClaimsAndConvictions = (completeDriverData) => {
    if (editingDriverIndex !== null) {
      const updatedDrivers = [...additionalDrivers];
      updatedDrivers[editingDriverIndex] = completeDriverData;
      setAdditionalDrivers(updatedDrivers);
      setEditingDriverIndex(null);
    } else {
      setAdditionalDrivers([...additionalDrivers, completeDriverData]);
    }
    setDriverBeingAdded(null);
    setCoverSubStep("additionalDrivers");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackFromAddDriver = () => {
    setEditingDriverIndex(null);
    setDriverBeingAdded(null);
    setCoverSubStep("additionalDrivers");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackFromDriverClaimsAndConvictions = () => {
    setDriverBeingAdded(null);
    setDriverClaims([]);
    setDriverConvictions([]);
    setCoverSubStep("addDriver");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToCarOwner = () => {
    setCoverSubStep("carOwner");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCarOwnerSubmit = (data) => {
    setCarOwnerData(data);
    // Move to cover substep
    setCoverSubStep("cover");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackFromCarOwner = () => {
    setCoverSubStep("additionalDrivers");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddCarOwnerPerson = (type, formState) => {
    setCarOwnerAddingType(type);
    // Save the form state when navigating to add a person
    if (formState) {
      setCarOwnerData(formState);
    }
    setCoverSubStep(type === "registeredKeeper" ? "carOwnerAddRegisteredKeeper" : "carOwnerAddLegalOwner");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveCarOwnerPerson = (personData) => {
    if (carOwnerAddingType === "registeredKeeper") {
      setCarOwnerData({
        ...carOwnerData,
        registeredKeeperOtherPerson: personData
      });
    } else {
      setCarOwnerData({
        ...carOwnerData,
        legalOwnerOtherPerson: personData
      });
    }
    setCoverSubStep("carOwner");
    setCarOwnerAddingType(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackFromAddCarOwnerPerson = () => {
    setCoverSubStep("carOwner");
    setCarOwnerAddingType(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCoverDetailsSubmit = (data) => {
    // Store cover details in form
    form.setValue("coverDetails", data, { shouldValidate: true });
    // Move to NCD step
    setCoverSubStep("ncd");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackFromCoverDetails = () => {
    setCoverSubStep("carOwner");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNcdDataSubmit = (data) => {
    // Store NCD data in form
    setNcdData(data);
    form.setValue("ncdData", data, { shouldValidate: true });
    // Move to additional products step
    setCoverSubStep("additionalProducts");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackFromNcd = () => {
    setCoverSubStep("cover");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAdditionalProductsSubmit = (data) => {
    // Store products data in form
    setProductsData(data);
    form.setValue("productsData", data, { shouldValidate: true });
    // Move to contact information step
    setCoverSubStep("contactInformation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackFromAdditionalProducts = () => {
    setCoverSubStep("ncd");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactInformationSubmit = (data) => {
    // Store contact information data in form
    setContactInformationData(data);
    form.setValue("contactInformationData", data, { shouldValidate: true });
    // Move to check answers step
    setCurrentStep(STEPS.CHECK_ANSWERS);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackFromContactInformation = () => {
    setCoverSubStep("additionalProducts");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackFromCheckAnswers = () => {
    setCurrentStep(STEPS.COVER);
    setCoverSubStep("contactInformation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubStepClick = (stepNumber, subStepIndex) => {
    const subStepMaps = {
      [STEPS.VEHICLE]: ["registration", "carValue", "carUsage", "carStorage", "otherCars"],
      [STEPS.PERSONAL]: ["aboutYou", "household", "employment", "licence", "restrictions", "claims"],
      [STEPS.COVER]: ["additionalDrivers", "carOwner", "cover", "ncd", "additionalProducts", "contactInformation"],
    };

    const subStepKey = subStepMaps[stepNumber]?.[subStepIndex];
    if (!subStepKey) return;

    if (stepNumber === STEPS.VEHICLE) {
      setCurrentStep(STEPS.VEHICLE);
      setVehicleSubStep(subStepKey);
    } else if (stepNumber === STEPS.PERSONAL) {
      setCurrentStep(STEPS.PERSONAL);
      setPersonalSubStep(subStepKey);
    } else if (stepNumber === STEPS.COVER) {
      setCurrentStep(STEPS.COVER);
      setCoverSubStep(subStepKey);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddDriverClaimClick = (index) => {
    if (index !== undefined) {
      setEditingDriverClaimIndex(index);
    } else {
      setEditingDriverClaimIndex(null);
    }
    setCoverSubStep("addDriverClaim");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddDriverConvictionClick = (index) => {
    if (index !== undefined) {
      setEditingDriverConvictionIndex(index);
    } else {
      setEditingDriverConvictionIndex(null);
    }
    setCoverSubStep("addDriverConviction");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddDriverClaimSubmit = (claimData) => {
    if (editingDriverClaimIndex !== null) {
      const updatedClaims = [...driverClaims];
      updatedClaims[editingDriverClaimIndex] = claimData;
      setDriverClaims(updatedClaims);
      setEditingDriverClaimIndex(null);
    } else {
      setDriverClaims([...driverClaims, claimData]);
    }
    setCoverSubStep("addDriverClaimsAndConvictions");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddDriverConvictionSubmit = (convictionData) => {
    if (editingDriverConvictionIndex !== null) {
      const updatedConvictions = [...driverConvictions];
      updatedConvictions[editingDriverConvictionIndex] = convictionData;
      setDriverConvictions(updatedConvictions);
      setEditingDriverConvictionIndex(null);
    } else {
      setDriverConvictions([...driverConvictions, convictionData]);
    }
    setCoverSubStep("addDriverClaimsAndConvictions");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackFromAddDriverClaim = () => {
    setEditingDriverClaimIndex(null);
    setCoverSubStep("addDriverClaimsAndConvictions");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackFromAddDriverConviction = () => {
    setEditingDriverConvictionIndex(null);
    setCoverSubStep("addDriverClaimsAndConvictions");
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      setPersonalSubStep("restrictions");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.PERSONAL && personalSubStep === "restrictions") {
      setPersonalSubStep("claims");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.PERSONAL && personalSubStep === "claims") {
      setCurrentStep(STEPS.COVER);
      setCoverSubStep("additionalDrivers");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.COVER && coverSubStep === "additionalDrivers") {
      setCoverSubStep("carOwner");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.COVER && coverSubStep === "addDriverClaimsAndConvictions") {
      setCoverSubStep("addDriver");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.COVER && coverSubStep === "addDriver") {
      setCoverSubStep("additionalDrivers");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.COVER && coverSubStep === "details") {
      setCurrentStep(STEPS.CHECK_ANSWERS);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.CHECK_ANSWERS) {
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
    // Handle going back from addClaim
    if (currentStep === STEPS.PERSONAL && personalSubStep === "addClaim") {
      setPersonalSubStep("claims");
      setEditingClaimIndex(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Handle going back from addConviction
    if (currentStep === STEPS.PERSONAL && personalSubStep === "addConviction") {
      setPersonalSubStep("claims");
      setEditingConvictionIndex(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Handle going back from cover details
    if (currentStep === STEPS.COVER && coverSubStep === "details") {
      setCoverSubStep("additionalDrivers");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Handle going back from addDriverConviction
    if (currentStep === STEPS.COVER && coverSubStep === "addDriverConviction") {
      setEditingDriverConvictionIndex(null);
      setCoverSubStep("addDriverClaimsAndConvictions");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Handle going back from addDriverClaim
    if (currentStep === STEPS.COVER && coverSubStep === "addDriverClaim") {
      setEditingDriverClaimIndex(null);
      setCoverSubStep("addDriverClaimsAndConvictions");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Handle going back from addDriverClaimsAndConvictions
    if (currentStep === STEPS.COVER && coverSubStep === "addDriverClaimsAndConvictions") {
      setDriverBeingAdded(null);
      setDriverClaims([]);
      setDriverConvictions([]);
      setCoverSubStep("addDriver");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Handle going back from addDriver
    if (currentStep === STEPS.COVER && coverSubStep === "addDriver") {
      setEditingDriverIndex(null);
      setDriverBeingAdded(null);
      setCoverSubStep("additionalDrivers");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Handle going back from additionalDrivers
    if (currentStep === STEPS.COVER && coverSubStep === "additionalDrivers") {
      setCurrentStep(STEPS.PERSONAL);
      setPersonalSubStep("claims");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Handle going back from cover
    if (currentStep === STEPS.COVER && coverSubStep === "cover") {
      setCoverSubStep("carOwner");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Handle going back from carOwner
    if (currentStep === STEPS.COVER && coverSubStep === "carOwner") {
      setCoverSubStep("additionalDrivers");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Handle going back from carOwnerAddRegisteredKeeper and carOwnerAddLegalOwner
    if (currentStep === STEPS.COVER && (coverSubStep === "carOwnerAddRegisteredKeeper" || coverSubStep === "carOwnerAddLegalOwner")) {
      setCoverSubStep("carOwner");
      setCarOwnerAddingType(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Handle Step 2 sub-step navigation
    if (currentStep === STEPS.PERSONAL && personalSubStep === "claims") {
      setPersonalSubStep("restrictions");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === STEPS.PERSONAL && personalSubStep === "restrictions") {
      setPersonalSubStep("licence");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

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

    if (currentStep === STEPS.CHECK_ANSWERS) {
      setCurrentStep(STEPS.COVER);
      setCoverSubStep("contactInformation");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep > STEPS.VEHICLE) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (data) => {
    // Set loading state first to show the overlay
    setShowLoading(true);
    setIsSubmitting(true);

    // Save form state to sessionStorage before navigating
    const formState = {
      formData: form.getValues(),
      currentStep: STEPS.CHECK_ANSWERS,
      vehicleSubStep: "registration",
      personalSubStep: "aboutYou",
      coverSubStep: "details",
      additionalDrivers,
      claims,
      convictions,
      carOwnerData,
      ncdData,
      productsData,
      contactInformationData,
      foundVehicleData,
    };
    sessionStorage.setItem("annualQuoteFormState", JSON.stringify(formState));

    const insuranceId = `ANNUAL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const redirectUrl = `/payment-summary?id=${insuranceId}`;
    const randomDelay = Math.floor(Math.random() * 5001) + 4000;

    // Wait for the specified delay, then navigate
    await new Promise(resolve => setTimeout(resolve, randomDelay));

    // Navigate to payment summary
    router.push(redirectUrl);
  };

  return (
    <div suppressHydrationWarning>
      <GetQuotePageHeader />
      <CourierLoadingOverlay isVisible={showLoading} />
      <QuoteHeader
        currentStep={currentStep}
        totalSteps={4}
        subtitle={
          currentStep === STEPS.VEHICLE && vehicleSubStep === "carValue" ? "Car Value" :
          currentStep === STEPS.VEHICLE && vehicleSubStep === "carUsage" ? "Car Usage" :
          currentStep === STEPS.VEHICLE && vehicleSubStep === "carStorage" ? "Car Storage" :
          currentStep === STEPS.VEHICLE && vehicleSubStep === "otherCars" ? "Other cars" :
          currentStep === STEPS.PERSONAL && personalSubStep === "aboutYou" ? "About you" :
          currentStep === STEPS.PERSONAL && personalSubStep === "household" ? "Your household" :
          currentStep === STEPS.PERSONAL && personalSubStep === "employment" ? "Your employment" :
          currentStep === STEPS.PERSONAL && personalSubStep === "licence" ? "Your licence" :
          currentStep === STEPS.PERSONAL && personalSubStep === "restrictions" ? "Licence restrictions" :
          currentStep === STEPS.PERSONAL && personalSubStep === "claims" ? "Claims and convictions" :
          currentStep === STEPS.PERSONAL && personalSubStep === "addClaim" ? "Add a claim" :
          currentStep === STEPS.PERSONAL && personalSubStep === "addConviction" ? "Add a conviction" :
          currentStep === STEPS.COVER && coverSubStep === "additionalDrivers" ? "Additional drivers" :
          currentStep === STEPS.COVER && coverSubStep === "addDriver" ? "Add a driver" :
          currentStep === STEPS.COVER && coverSubStep === "addDriverClaimsAndConvictions" ? "Additional drivers - Claims and convictions" :
          currentStep === STEPS.COVER && coverSubStep === "addDriverClaim" ? "Add a claim" :
          currentStep === STEPS.COVER && coverSubStep === "addDriverConviction" ? "Add a conviction" :
          undefined
        }
      />
      
      <div className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            <form noValidate suppressHydrationWarning onSubmit={form.handleSubmit(onSubmit)}>
              <div className={styles.stepContent}>
                {currentStep === STEPS.VEHICLE && vehicleSubStep === "registration" && (
                  <Step1VehicleRegistration
                    form={form}
                    onVehicleFound={setFoundVehicleData}
                    autoTriggerLookup={shouldAutoTrigger}
                    onEditCarDetails={() => {
                      setIsEditingCarDetails(true);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    isEditingCarDetails={isEditingCarDetails}
                    onCarDetailsUpdated={() => {
                      setIsEditingCarDetails(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    foundVehicleData={foundVehicleData}
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
                {currentStep === STEPS.PERSONAL && personalSubStep === "restrictions" && (
                  <Step2LicenceRestrictions form={form} />
                )}
                {currentStep === STEPS.PERSONAL && personalSubStep === "claims" && (
                  <Step2ClaimsAndConvictions
                    form={form}
                    claims={claims}
                    convictions={convictions}
                    onAddClaim={handleNavigateToAddClaim}
                    onAddConviction={handleNavigateToAddConviction}
                  />
                )}
                {currentStep === STEPS.PERSONAL && personalSubStep === "addClaim" && (
                  <Step2AddClaim
                    onBack={handlePreviousStep}
                    onAddClaim={handleAddClaim}
                    editingClaim={editingClaimIndex !== null ? claims[editingClaimIndex] : null}
                  />
                )}
                {currentStep === STEPS.PERSONAL && personalSubStep === "addConviction" && (
                  <Step2AddConviction
                    onBack={handlePreviousStep}
                    onAddConviction={handleAddConviction}
                    editingConviction={editingConvictionIndex !== null ? convictions[editingConvictionIndex] : null}
                  />
                )}
                {currentStep === STEPS.COVER && coverSubStep === "details" && <AnnualCoverDetailsForm form={form} />}
                {currentStep === STEPS.COVER && coverSubStep === "additionalDrivers" && (
                  <Step3AdditionalDrivers
                    additionaDrivers={additionalDrivers}
                    onAddDriver={() => handleNavigateToAddDriver()}
                    onRemoveDriver={handleRemoveDriver}
                    onEditDriver={handleNavigateToAddDriver}
                    hasAdditionalDrivers={hasAdditionalDrivers}
                    onHasAdditionalDriversChange={setHasAdditionalDrivers}
                  />
                )}
                {currentStep === STEPS.COVER && coverSubStep === "addDriver" && (
                  <Step3AddDriver
                    onBack={handleBackFromAddDriver}
                    onAddDriver={handleAddDriver}
                    editingDriver={editingDriverIndex !== null ? additionalDrivers[editingDriverIndex] : null}
                  />
                )}
                {currentStep === STEPS.COVER && coverSubStep === "addDriverClaimsAndConvictions" && (
                  <Step3DriverClaimsAndConvictions
                    driverData={driverBeingAdded}
                    onBack={handleBackFromDriverClaimsAndConvictions}
                    onAddDriver={() => {
                      const completeData = {
                        ...driverBeingAdded,
                        claims: driverClaims,
                        convictions: driverConvictions
                      };
                      handleCompleteDriverClaimsAndConvictions(completeData);
                    }}
                    onAddClaim={handleAddDriverClaimClick}
                    onAddConviction={handleAddDriverConvictionClick}
                    claims={driverClaims}
                    convictions={driverConvictions}
                  />
                )}
                {currentStep === STEPS.COVER && coverSubStep === "addDriverClaim" && (
                  <Step3AddDriverClaim
                    onBack={handleBackFromAddDriverClaim}
                    onAddClaim={handleAddDriverClaimSubmit}
                    editingClaim={editingDriverClaimIndex !== null ? driverClaims[editingDriverClaimIndex] : null}
                  />
                )}
                {currentStep === STEPS.COVER && coverSubStep === "addDriverConviction" && (
                  <Step3AddDriverConviction
                    onBack={handleBackFromAddDriverConviction}
                    onAddConviction={handleAddDriverConvictionSubmit}
                    editingConviction={editingDriverConvictionIndex !== null ? driverConvictions[editingDriverConvictionIndex] : null}
                  />
                )}
                {currentStep === STEPS.COVER && coverSubStep === "carOwner" && (
                  <Step3CarOwner
                    onBack={handleBackFromCarOwner}
                    onNext={handleCarOwnerSubmit}
                    userData={form.getValues("userDetails")}
                    additionalDrivers={additionalDrivers}
                    carOwnerData={carOwnerData}
                    onAddPerson={handleAddCarOwnerPerson}
                  />
                )}
                {currentStep === STEPS.COVER && (coverSubStep === "carOwnerAddRegisteredKeeper" || coverSubStep === "carOwnerAddLegalOwner") && (
                  <Step3CarOwnerAddPerson
                    onBack={handleBackFromAddCarOwnerPerson}
                    onSave={handleSaveCarOwnerPerson}
                    onRemove={() => {
                      if (carOwnerAddingType === "registeredKeeper") {
                        setCarOwnerData({
                          ...carOwnerData,
                          registeredKeeperOtherPerson: null
                        });
                      } else {
                        setCarOwnerData({
                          ...carOwnerData,
                          legalOwnerOtherPerson: null
                        });
                      }
                      setCoverSubStep("carOwner");
                      setCarOwnerAddingType(null);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    personType={carOwnerAddingType}
                    personData={carOwnerAddingType === "registeredKeeper" ? carOwnerData?.registeredKeeperOtherPerson : carOwnerData?.legalOwnerOtherPerson}
                    isEditing={carOwnerAddingType === "registeredKeeper" ? !!carOwnerData?.registeredKeeperOtherPerson : !!carOwnerData?.legalOwnerOtherPerson}
                  />
                )}
                {currentStep === STEPS.COVER && coverSubStep === "cover" && (
                  <Step3CoverDetails
                    onBack={handleBackFromCoverDetails}
                    onNext={handleCoverDetailsSubmit}
                    coverData={form.getValues("coverDetails") || {}}
                  />
                )}
                {currentStep === STEPS.COVER && coverSubStep === "ncd" && (
                  <Step3NoClaimsDiscount
                    onBack={handleBackFromNcd}
                    onNext={handleNcdDataSubmit}
                    ncdData={ncdData || {}}
                  />
                )}
                {currentStep === STEPS.COVER && coverSubStep === "additionalProducts" && (
                  <Step3AdditionalProducts
                    onBack={handleBackFromAdditionalProducts}
                    onNext={handleAdditionalProductsSubmit}
                    productsData={productsData || {}}
                  />
                )}
                {currentStep === STEPS.COVER && coverSubStep === "contactInformation" && (
                  <Step3ContactInformation
                    onBack={handleBackFromContactInformation}
                    onNext={handleContactInformationSubmit}
                    contactInformationData={contactInformationData || {}}
                  />
                )}
                {currentStep === STEPS.CHECK_ANSWERS && (
                  <Step4CheckYourAnswers
                    form={form}
                    foundVehicleData={foundVehicleData}
                    additionalDrivers={additionalDrivers}
                    carOwnerData={carOwnerData}
                    ncdData={ncdData}
                    productsData={productsData}
                    contactInformationData={contactInformationData}
                    claims={claims}
                    convictions={convictions}
                    onBack={handleBackFromCheckAnswers}
                    onSubmit={onSubmit}
                    isLoading={showLoading}
                  />
                )}
              </div>

              {!(currentStep === STEPS.PERSONAL && (personalSubStep === "addClaim" || personalSubStep === "addConviction")) &&
                !(currentStep === STEPS.COVER && coverSubStep === "addDriver") &&
                !(currentStep === STEPS.COVER && coverSubStep === "addDriverClaimsAndConvictions") &&
                !(currentStep === STEPS.COVER && coverSubStep === "addDriverClaim") &&
                !(currentStep === STEPS.COVER && coverSubStep === "addDriverConviction") &&
                !(currentStep === STEPS.COVER && coverSubStep === "carOwner") &&
                !(currentStep === STEPS.COVER && coverSubStep === "carOwnerAddRegisteredKeeper") &&
                !(currentStep === STEPS.COVER && coverSubStep === "carOwnerAddLegalOwner") &&
                !(currentStep === STEPS.COVER && coverSubStep === "cover") &&
                !(currentStep === STEPS.COVER && coverSubStep === "ncd") &&
                !(currentStep === STEPS.COVER && coverSubStep === "additionalProducts") &&
                !(currentStep === STEPS.COVER && coverSubStep === "contactInformation") &&
                !(currentStep === STEPS.CHECK_ANSWERS) &&
                !isEditingCarDetails && (
                <QuoteNavButtons
                  currentStep={currentStep}
                  vehicleSubStep={vehicleSubStep}
                  personalSubStep={personalSubStep}
                  coverSubStep={coverSubStep}
                  totalSteps={5}
                  onNext={handleNextStep}
                  onBack={handlePreviousStep}
                  onSubmit={onSubmit}
                  isLoading={isSubmitting}
                  nextLabel={currentStep === STEPS.CHECK_ANSWERS ? "Get Quotes" : "Next"}
                  backLabel="Back"
                />
              )}
            </form>
          </div>

          <div className={styles.sidebarArea}>
            <QuoteProgressCard
              currentStep={currentStep}
              vehicleSubStep={vehicleSubStep}
              personalSubStep={personalSubStep}
              coverSubStep={coverSubStep}
              onSubStepClick={handleSubStepClick}
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
