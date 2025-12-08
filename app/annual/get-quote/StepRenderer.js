"use client";

import { Suspense, lazy, useMemo } from "react";

const StepFallback = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px", color: "#666", fontSize: "1.3rem" }}>
    Loading...
  </div>
);

// Component map - only imports when step is rendered
const getStepComponent = (stepKey) => {
  const components = {
    // Vehicle steps
    'vehicle-registration': lazy(() => import("./_components/Step1VehicleRegistration")),
    'vehicle-carValue': lazy(() => import("./_components/Step1CarValue")),
    'vehicle-carUsage': lazy(() => import("./_components/Step1CarUsage")),
    'vehicle-carStorage': lazy(() => import("./_components/Step1CarStorage")),
    'vehicle-otherCars': lazy(() => import("./_components/Step1OtherCars")),
    
    // Personal steps
    'personal-aboutYou': lazy(() => import("./_components/Step2PersonalDetails")),
    'personal-household': lazy(() => import("./_components/Step2Household")),
    'personal-employment': lazy(() => import("./_components/Step2Employment")),
    'personal-licence': lazy(() => import("./_components/Step2Licence")),
    'personal-restrictions': lazy(() => import("./_components/Step2LicenceRestrictions")),
    'personal-claims': lazy(() => import("./_components/Step2ClaimsAndConvictions")),
    'personal-addClaim': lazy(() => import("./_components/Step2AddClaim")),
    'personal-addConviction': lazy(() => import("./_components/Step2AddConviction")),
    
    // Cover steps
    'cover-additionalDrivers': lazy(() => import("./_components/Step3AdditionalDrivers")),
    'cover-addDriver': lazy(() => import("./_components/Step3AddDriver")),
    'cover-addDriverClaimsAndConvictions': lazy(() => import("./_components/Step3DriverClaimsAndConvictions")),
    'cover-addDriverClaim': lazy(() => import("./_components/Step3AddDriverClaim")),
    'cover-addDriverConviction': lazy(() => import("./_components/Step3AddDriverConviction")),
    'cover-carOwner': lazy(() => import("./_components/Step3CarOwner")),
    'cover-carOwnerAddRegisteredKeeper': lazy(() => import("./_components/Step3CarOwnerAddPerson")),
    'cover-carOwnerAddLegalOwner': lazy(() => import("./_components/Step3CarOwnerAddPerson")),
    'cover-cover': lazy(() => import("./_components/Step3CoverDetails")),
    'cover-ncd': lazy(() => import("./_components/Step3NoClaimsDiscount")),
    'cover-additionalProducts': lazy(() => import("./_components/Step3AdditionalProducts")),
    'cover-contactInformation': lazy(() => import("./_components/Step3ContactInformation")),
    
    // Check answers
    'checkAnswers': lazy(() => import("./_components/Step4CheckYourAnswers")),
  };
  
  return components[stepKey];
};

export default function StepRenderer({ currentStep, vehicleSubStep, personalSubStep, coverSubStep, ...props }) {
  const stepKey = useMemo(() => {
    if (currentStep === 1) return `vehicle-${vehicleSubStep}`;
    if (currentStep === 2) return `personal-${personalSubStep}`;
    if (currentStep === 3) return `cover-${coverSubStep}`;
    if (currentStep === 4) return 'checkAnswers';
    return null;
  }, [currentStep, vehicleSubStep, personalSubStep, coverSubStep]);

  const StepComponent = useMemo(() => getStepComponent(stepKey), [stepKey]);

  if (!StepComponent) return null;

  return (
    <Suspense fallback={<StepFallback />}>
      <StepComponent {...props} />
    </Suspense>
  );
}
