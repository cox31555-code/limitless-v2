"use client";

import { lazy } from "react";

// Lazy load components - they only load when first accessed
export const lazySteps = {
  // Vehicle steps
  carValue: lazy(() => import("./_components/Step1CarValue")),
  carUsage: lazy(() => import("./_components/Step1CarUsage")),
  carStorage: lazy(() => import("./_components/Step1CarStorage")),
  otherCars: lazy(() => import("./_components/Step1OtherCars")),
  
  // Personal steps  
  aboutYou: lazy(() => import("./_components/Step2PersonalDetails")),
  household: lazy(() => import("./_components/Step2Household")),
  employment: lazy(() => import("./_components/Step2Employment")),
  licence: lazy(() => import("./_components/Step2Licence")),
  restrictions: lazy(() => import("./_components/Step2LicenceRestrictions")),
  claims: lazy(() => import("./_components/Step2ClaimsAndConvictions")),
  addClaim: lazy(() => import("./_components/Step2AddClaim")),
  addConviction: lazy(() => import("./_components/Step2AddConviction")),
  
  // Cover steps
  additionalDrivers: lazy(() => import("./_components/Step3AdditionalDrivers")),
  addDriver: lazy(() => import("./_components/Step3AddDriver")),
  addDriverClaimsAndConvictions: lazy(() => import("./_components/Step3DriverClaimsAndConvictions")),
  addDriverClaim: lazy(() => import("./_components/Step3AddDriverClaim")),
  addDriverConviction: lazy(() => import("./_components/Step3AddDriverConviction")),
  carOwner: lazy(() => import("./_components/Step3CarOwner")),
  carOwnerAddPerson: lazy(() => import("./_components/Step3CarOwnerAddPerson")),
  cover: lazy(() => import("./_components/Step3CoverDetails")),
  ncd: lazy(() => import("./_components/Step3NoClaimsDiscount")),
  additionalProducts: lazy(() => import("./_components/Step3AdditionalProducts")),
  contactInformation: lazy(() => import("./_components/Step3ContactInformation")),
  
  // Check answers
  checkAnswers: lazy(() => import("./_components/Step4CheckYourAnswers")),
};

export const StepFallback = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px", color: "#666", fontSize: "1.3rem" }}>
    Loading...
  </div>
);
