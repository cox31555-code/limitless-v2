"use client";

import { lazy } from "react";

// Lazy load components - they only load when first accessed
export const lazySteps = {
  // Vehicle steps
  carValue: lazy(() => import("@/app/annual/get-quote/_components/Step1CarValue")),
  carUsage: lazy(() => import("@/app/annual/get-quote/_components/Step1CarUsage")),
  carStorage: lazy(() => import("@/app/annual/get-quote/_components/Step1CarStorage")),
  otherCars: lazy(() => import("@/app/annual/get-quote/_components/Step1OtherCars")),
  
  // Personal steps  
  aboutYou: lazy(() => import("@/app/annual/get-quote/_components/Step2PersonalDetails")),
  household: lazy(() => import("@/app/annual/get-quote/_components/Step2Household")),
  employment: lazy(() => import("@/app/annual/get-quote/_components/Step2Employment")),
  licence: lazy(() => import("@/app/annual/get-quote/_components/Step2Licence")),
  restrictions: lazy(() => import("@/app/annual/get-quote/_components/Step2LicenceRestrictions")),
  claims: lazy(() => import("@/app/annual/get-quote/_components/Step2ClaimsAndConvictions")),
  addClaim: lazy(() => import("@/app/annual/get-quote/_components/Step2AddClaim")),
  addConviction: lazy(() => import("@/app/annual/get-quote/_components/Step2AddConviction")),
  
  // Cover steps
  details: lazy(() => import("@/app/annual/get-quote/_components/AnnualCoverDetailsForm")),
  carOwner: lazy(() => import("@/app/annual/get-quote/_components/Step3CarOwner")),
  carOwnerAddPerson: lazy(() => import("@/app/annual/get-quote/_components/Step3CarOwnerAddPerson")),
  cover: lazy(() => import("@/app/annual/get-quote/_components/Step3CoverDetails")),
  ncd: lazy(() => import("@/app/annual/get-quote/_components/Step3NoClaimsDiscount")),
  contactInformation: lazy(() => import("@/app/annual/get-quote/_components/Step3ContactInformation")),
  
  // Check answers
  checkAnswers: lazy(() => import("@/app/annual/get-quote/_components/Step4CheckYourAnswers")),
};

export const StepFallback = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px", color: "#666", fontSize: "1.3rem" }}>
    Loading...
  </div>
);
