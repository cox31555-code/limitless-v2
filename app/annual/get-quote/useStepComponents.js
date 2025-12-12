"use client";

import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";

const StepFallback = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px", color: "#666", fontSize: "1.3rem" }}>
    Loading...
  </div>
);

export function useStepComponents() {
  const loadedComponents = useRef(new Map());

  const getComponent = useMemo(() => (stepKey) => {
    if (!loadedComponents.current.has(stepKey)) {
      let componentPath;
      
      switch (stepKey) {
        // Vehicle steps
        case 'carValue':
          componentPath = "./_components/Step1CarValue";
          break;
        case 'carUsage':
          componentPath = "./_components/Step1CarUsage";
          break;
        case 'carStorage':
          componentPath = "./_components/Step1CarStorage";
          break;
        case 'otherCars':
          componentPath = "./_components/Step1OtherCars";
          break;
        
        // Personal steps
        case 'aboutYou':
          componentPath = "./_components/Step2PersonalDetails";
          break;
        case 'household':
          componentPath = "./_components/Step2Household";
          break;
        case 'employment':
          componentPath = "./_components/Step2Employment";
          break;
        case 'licence':
          componentPath = "./_components/Step2Licence";
          break;
        case 'restrictions':
          componentPath = "./_components/Step2LicenceRestrictions";
          break;
        case 'claims':
          componentPath = "./_components/Step2ClaimsAndConvictions";
          break;
        case 'addClaim':
          componentPath = "./_components/Step2AddClaim";
          break;
        case 'addConviction':
          componentPath = "./_components/Step2AddConviction";
          break;
        
        // Cover steps
        case 'additionalDrivers':
          componentPath = "./_components/Step3AdditionalDrivers";
          break;
        case 'addDriver':
          componentPath = "./_components/Step3AddDriver";
          break;
        case 'addDriverClaimsAndConvictions':
          componentPath = "./_components/Step3DriverClaimsAndConvictions";
          break;
        case 'addDriverClaim':
          componentPath = "./_components/Step3AddDriverClaim";
          break;
        case 'addDriverConviction':
          componentPath = "./_components/Step3AddDriverConviction";
          break;
        case 'carOwner':
          componentPath = "./_components/Step3CarOwner";
          break;
        case 'carOwnerAddRegisteredKeeper':
        case 'carOwnerAddLegalOwner':
          componentPath = "./_components/Step3CarOwnerAddPerson";
          break;
        case 'cover':
          componentPath = "./_components/Step3CoverDetails";
          break;
        case 'ncd':
          componentPath = "./_components/Step3NoClaimsDiscount";
          break;
        case 'additionalProducts':
          componentPath = "./_components/Step3AdditionalProducts";
          break;
        case 'contactInformation':
          componentPath = "./_components/Step3ContactInformation";
          break;
        
        // Check answers
        case 'checkAnswers':
          componentPath = "./_components/Step4CheckYourAnswers";
          break;
        
        default:
          return null;
      }
      
      if (componentPath) {
        loadedComponents.current.set(
          stepKey,
          dynamic(() => import(`${componentPath}`), {
            ssr: false,
            loading: () => <StepFallback />
          })
        );
      }
    }
    
    return loadedComponents.current.get(stepKey) || null;
  }, []);

  return getComponent;
}
