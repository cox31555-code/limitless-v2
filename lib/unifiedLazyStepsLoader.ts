/**
 * Unified lazy steps loader for all get-quote flows
 * Creates lazy-loaded component maps for Annual, Temporary, and Impound flows
 */

import { lazy, ComponentType } from 'react';
import type { InsuranceType } from './getQuoteSessionManager';

export interface LazyStepsMap {
  // Vehicle steps
  carValue?: ComponentType<any>;
  carUsage?: ComponentType<any>;
  carStorage?: ComponentType<any>;
  otherCars?: ComponentType<any>;
  registration?: ComponentType<any>;

  // Personal steps
  aboutYou?: ComponentType<any>;
  household?: ComponentType<any>;
  employment?: ComponentType<any>;
  licence?: ComponentType<any>;
  restrictions?: ComponentType<any>;
  claims?: ComponentType<any>;
  addClaim?: ComponentType<any>;
  addConviction?: ComponentType<any>;

  // Cover steps
  details?: ComponentType<any>;
  additionalDrivers?: ComponentType<any>;
  addDriver?: ComponentType<any>;
  addDriverClaimsAndConvictions?: ComponentType<any>;
  addDriverClaim?: ComponentType<any>;
  addDriverConviction?: ComponentType<any>;
  carOwner?: ComponentType<any>;
  carOwnerAddPerson?: ComponentType<any>;
  carOwnerAddRegisteredKeeper?: ComponentType<any>;
  carOwnerAddLegalOwner?: ComponentType<any>;
  cover?: ComponentType<any>;
  ncd?: ComponentType<any>;
  additionalProducts?: ComponentType<any>;
  contactInformation?: ComponentType<any>;

  // Check answers
  checkAnswers?: ComponentType<any>;
}

/**
 * Shared StepFallback component used as Suspense fallback
 */
export const StepFallback = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
      color: '#666',
      fontSize: '1.3rem',
    }}
  >
    Loading...
  </div>
);

/**
 * Cache for lazy loaded components to prevent reloading on re-renders
 */
const componentCache = new Map<string, ComponentType<any>>();

/**
 * Helper to get or create a lazy-loaded component
 * @param key - Unique cache key for the component
 * @param importFn - Function that imports the component
 * @returns Lazy-loaded component
 */
function getCachedLazyComponent(
  key: string,
  importFn: () => Promise<{ default: ComponentType<any> }>
): ComponentType<any> {
  if (!componentCache.has(key)) {
    componentCache.set(key, lazy(importFn));
  }
  return componentCache.get(key)!;
}

/**
 * Create lazy steps map for Annual flow
 * Annual includes all available steps and sub-steps
 */
function createAnnualLazySteps(): LazyStepsMap {
  return {
    // Vehicle steps
    carValue: getCachedLazyComponent(
      'annual-carValue',
      () => import('@/app/annual/get-quote/_components/Step1CarValue')
    ),
    carUsage: getCachedLazyComponent(
      'annual-carUsage',
      () => import('@/app/annual/get-quote/_components/Step1CarUsage')
    ),
    carStorage: getCachedLazyComponent(
      'annual-carStorage',
      () => import('@/app/annual/get-quote/_components/Step1CarStorage')
    ),
    otherCars: getCachedLazyComponent(
      'annual-otherCars',
      () => import('@/app/annual/get-quote/_components/Step1OtherCars')
    ),

    // Personal steps
    aboutYou: getCachedLazyComponent(
      'annual-aboutYou',
      () => import('@/app/annual/get-quote/_components/Step2PersonalDetails')
    ),
    household: getCachedLazyComponent(
      'annual-household',
      () => import('@/app/annual/get-quote/_components/Step2Household')
    ),
    employment: getCachedLazyComponent(
      'annual-employment',
      () => import('@/app/annual/get-quote/_components/Step2Employment')
    ),
    licence: getCachedLazyComponent(
      'annual-licence',
      () => import('@/app/annual/get-quote/_components/Step2Licence')
    ),
    restrictions: getCachedLazyComponent(
      'annual-restrictions',
      () => import('@/app/annual/get-quote/_components/Step2LicenceRestrictions')
    ),
    claims: getCachedLazyComponent(
      'annual-claims',
      () => import('@/app/annual/get-quote/_components/Step2ClaimsAndConvictions')
    ),
    addClaim: getCachedLazyComponent(
      'annual-addClaim',
      () => import('@/app/annual/get-quote/_components/Step2AddClaim')
    ),
    addConviction: getCachedLazyComponent(
      'annual-addConviction',
      () => import('@/app/annual/get-quote/_components/Step2AddConviction')
    ),

    // Cover steps - Annual specific
    details: getCachedLazyComponent(
      'annual-details',
      () => import('@/app/annual/get-quote/_components/AnnualCoverDetailsForm')
    ),
    additionalDrivers: getCachedLazyComponent(
      'annual-additionalDrivers',
      () => import('@/app/annual/get-quote/_components/Step3AdditionalDrivers')
    ),
    addDriver: getCachedLazyComponent(
      'annual-addDriver',
      () => import('@/app/annual/get-quote/_components/Step3AddDriver')
    ),
    addDriverClaimsAndConvictions: getCachedLazyComponent(
      'annual-addDriverClaimsAndConvictions',
      () => import('@/app/annual/get-quote/_components/Step3DriverClaimsAndConvictions')
    ),
    addDriverClaim: getCachedLazyComponent(
      'annual-addDriverClaim',
      () => import('@/app/annual/get-quote/_components/Step3AddDriverClaim')
    ),
    addDriverConviction: getCachedLazyComponent(
      'annual-addDriverConviction',
      () => import('@/app/annual/get-quote/_components/Step3AddDriverConviction')
    ),
    carOwner: getCachedLazyComponent(
      'annual-carOwner',
      () => import('@/app/annual/get-quote/_components/Step3CarOwner')
    ),
    carOwnerAddPerson: getCachedLazyComponent(
      'annual-carOwnerAddPerson',
      () => import('@/app/annual/get-quote/_components/Step3CarOwnerAddPerson')
    ),
    cover: getCachedLazyComponent(
      'annual-cover',
      () => import('@/app/annual/get-quote/_components/Step3CoverDetails')
    ),
    ncd: getCachedLazyComponent(
      'annual-ncd',
      () => import('@/app/annual/get-quote/_components/Step3NoClaimsDiscount')
    ),
    additionalProducts: getCachedLazyComponent(
      'annual-additionalProducts',
      () => import('@/app/annual/get-quote/_components/Step3AdditionalProducts')
    ),
    contactInformation: getCachedLazyComponent(
      'annual-contactInformation',
      () => import('@/app/annual/get-quote/_components/Step3ContactInformation')
    ),

    // Check answers
    checkAnswers: getCachedLazyComponent(
      'annual-checkAnswers',
      () => import('@/app/annual/get-quote/_components/Step4CheckYourAnswers')
    ),
  };
}

/**
 * Create lazy steps map for Temporary flow
 * Temporary reuses most Annual components but with a subset of steps
 */
function createTemporaryLazySteps(): LazyStepsMap {
  return {
    // Vehicle steps - reuse from Annual
    carValue: getCachedLazyComponent(
      'temp-carValue',
      () => import('@/app/annual/get-quote/_components/Step1CarValue')
    ),
    carUsage: getCachedLazyComponent(
      'temp-carUsage',
      () => import('@/app/annual/get-quote/_components/Step1CarUsage')
    ),
    carStorage: getCachedLazyComponent(
      'temp-carStorage',
      () => import('@/app/annual/get-quote/_components/Step1CarStorage')
    ),
    otherCars: getCachedLazyComponent(
      'temp-otherCars',
      () => import('@/app/annual/get-quote/_components/Step1OtherCars')
    ),

    // Personal steps - reuse from Annual
    aboutYou: getCachedLazyComponent(
      'temp-aboutYou',
      () => import('@/app/annual/get-quote/_components/Step2PersonalDetails')
    ),
    household: getCachedLazyComponent(
      'temp-household',
      () => import('@/app/annual/get-quote/_components/Step2Household')
    ),
    employment: getCachedLazyComponent(
      'temp-employment',
      () => import('@/app/annual/get-quote/_components/Step2Employment')
    ),
    licence: getCachedLazyComponent(
      'temp-licence',
      () => import('@/app/annual/get-quote/_components/Step2Licence')
    ),
    restrictions: getCachedLazyComponent(
      'temp-restrictions',
      () => import('@/app/annual/get-quote/_components/Step2LicenceRestrictions')
    ),
    claims: getCachedLazyComponent(
      'temp-claims',
      () => import('@/app/annual/get-quote/_components/Step2ClaimsAndConvictions')
    ),
    addClaim: getCachedLazyComponent(
      'temp-addClaim',
      () => import('@/app/annual/get-quote/_components/Step2AddClaim')
    ),
    addConviction: getCachedLazyComponent(
      'temp-addConviction',
      () => import('@/app/annual/get-quote/_components/Step2AddConviction')
    ),

    // Cover steps - Temporary uses subset
    details: getCachedLazyComponent(
      'temp-details',
      () => import('@/app/annual/get-quote/_components/AnnualCoverDetailsForm')
    ),
    carOwner: getCachedLazyComponent(
      'temp-carOwner',
      () => import('@/app/annual/get-quote/_components/Step3CarOwner')
    ),
    carOwnerAddPerson: getCachedLazyComponent(
      'temp-carOwnerAddPerson',
      () => import('@/app/annual/get-quote/_components/Step3CarOwnerAddPerson')
    ),
    cover: getCachedLazyComponent(
      'temp-cover',
      () => import('@/app/annual/get-quote/_components/Step3CoverDetails')
    ),
    ncd: getCachedLazyComponent(
      'temp-ncd',
      () => import('@/app/annual/get-quote/_components/Step3NoClaimsDiscount')
    ),
    contactInformation: getCachedLazyComponent(
      'temp-contactInformation',
      () => import('@/app/annual/get-quote/_components/Step3ContactInformation')
    ),

    // Check answers
    checkAnswers: getCachedLazyComponent(
      'temp-checkAnswers',
      () => import('@/app/annual/get-quote/_components/Step4CheckYourAnswers')
    ),
  };
}

/**
 * Create lazy steps map for Impound flow
 * Impound reuses most Annual components but with ImpoundCoverDetailsForm
 */
function createImpoundLazySteps(): LazyStepsMap {
  return {
    // Vehicle steps - reuse from Annual
    registration: getCachedLazyComponent(
      'impound-registration',
      () => import('@/app/annual/get-quote/_components/Step1VehicleRegistration')
    ),
    carValue: getCachedLazyComponent(
      'impound-carValue',
      () => import('@/app/annual/get-quote/_components/Step1CarValue')
    ),
    carUsage: getCachedLazyComponent(
      'impound-carUsage',
      () => import('@/app/annual/get-quote/_components/Step1CarUsage')
    ),
    carStorage: getCachedLazyComponent(
      'impound-carStorage',
      () => import('@/app/annual/get-quote/_components/Step1CarStorage')
    ),
    otherCars: getCachedLazyComponent(
      'impound-otherCars',
      () => import('@/app/annual/get-quote/_components/Step1OtherCars')
    ),

    // Personal steps - reuse from Annual
    aboutYou: getCachedLazyComponent(
      'impound-aboutYou',
      () => import('@/app/annual/get-quote/_components/Step2PersonalDetails')
    ),
    household: getCachedLazyComponent(
      'impound-household',
      () => import('@/app/annual/get-quote/_components/Step2Household')
    ),
    employment: getCachedLazyComponent(
      'impound-employment',
      () => import('@/app/annual/get-quote/_components/Step2Employment')
    ),
    licence: getCachedLazyComponent(
      'impound-licence',
      () => import('@/app/annual/get-quote/_components/Step2Licence')
    ),
    restrictions: getCachedLazyComponent(
      'impound-restrictions',
      () => import('@/app/annual/get-quote/_components/Step2LicenceRestrictions')
    ),
    claims: getCachedLazyComponent(
      'impound-claims',
      () => import('@/app/annual/get-quote/_components/Step2ClaimsAndConvictions')
    ),
    addClaim: getCachedLazyComponent(
      'impound-addClaim',
      () => import('@/app/annual/get-quote/_components/Step2AddClaim')
    ),
    addConviction: getCachedLazyComponent(
      'impound-addConviction',
      () => import('@/app/annual/get-quote/_components/Step2AddConviction')
    ),

    // Cover steps - Impound specific
    additionalDrivers: getCachedLazyComponent(
      'impound-additionalDrivers',
      () => import('@/app/annual/get-quote/_components/Step3AdditionalDrivers')
    ),
    addDriver: getCachedLazyComponent(
      'impound-addDriver',
      () => import('@/app/annual/get-quote/_components/Step3AddDriver')
    ),
    addDriverClaimsAndConvictions: getCachedLazyComponent(
      'impound-addDriverClaimsAndConvictions',
      () => import('@/app/annual/get-quote/_components/Step3DriverClaimsAndConvictions')
    ),
    addDriverClaim: getCachedLazyComponent(
      'impound-addDriverClaim',
      () => import('@/app/annual/get-quote/_components/Step3AddDriverClaim')
    ),
    addDriverConviction: getCachedLazyComponent(
      'impound-addDriverConviction',
      () => import('@/app/annual/get-quote/_components/Step3AddDriverConviction')
    ),
    carOwner: getCachedLazyComponent(
      'impound-carOwner',
      () => import('@/app/annual/get-quote/_components/Step3CarOwner')
    ),
    carOwnerAddPerson: getCachedLazyComponent(
      'impound-carOwnerAddPerson',
      () => import('@/app/annual/get-quote/_components/Step3CarOwnerAddPerson')
    ),
    cover: getCachedLazyComponent(
      'impound-cover',
      () => import('@/app/annual/get-quote/_components/Step3CoverDetails')
    ),
    ncd: getCachedLazyComponent(
      'impound-ncd',
      () => import('@/app/annual/get-quote/_components/Step3NoClaimsDiscount')
    ),
    contactInformation: getCachedLazyComponent(
      'impound-contactInformation',
      () => import('@/app/annual/get-quote/_components/Step3ContactInformation')
    ),

    // Check answers
    checkAnswers: getCachedLazyComponent(
      'impound-checkAnswers',
      () => import('@/app/annual/get-quote/_components/Step4CheckYourAnswers')
    ),
  };
}

/**
 * Factory function to create lazy steps map for a specific insurance type
 * @param insuranceType - The type of insurance (Annual, Temp, Impound)
 * @returns Lazy steps map for the specified flow
 */
export function createLazyStepsMap(insuranceType: InsuranceType): LazyStepsMap {
  switch (insuranceType) {
    case 'Annual':
      return createAnnualLazySteps();
    case 'Temp':
      return createTemporaryLazySteps();
    case 'Impound':
      return createImpoundLazySteps();
    default:
      return createAnnualLazySteps();
  }
}

/**
 * Clear the component cache (useful for testing or hot reloads)
 */
export function clearComponentCache(): void {
  componentCache.clear();
}

/**
 * Get cache statistics (useful for debugging)
 */
export function getCacheStats(): {
  size: number;
  keys: string[];
} {
  return {
    size: componentCache.size,
    keys: Array.from(componentCache.keys()),
  };
}