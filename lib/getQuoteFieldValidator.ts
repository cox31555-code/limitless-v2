/**
 * Centralized field validation configuration for all get-quote flows
 * Provides step-specific field lists for validation across Annual, Temporary, and Impound flows
 */

import type { InsuranceType } from './getQuoteSessionManager';

export const STEPS = {
  VEHICLE: 1,
  PERSONAL: 2,
  COVER: 3,
  CHECK_ANSWERS: 4,
} as const;

// ============================================================================
// BASE FIELD DEFINITIONS (shared across all flows)
// ============================================================================

export const vehicleFields = [
  'vehicleDetails.registrationNumber',
  'vehicleDetails.type',
  'vehicleDetails.make',
  'vehicleDetails.model',
  'vehicleDetails.year',
  'vehicleDetails.fuel',
  'vehicleDetails.transmission',
  'vehicleDetails.colour',
  'vehicleDetails.worth',
  'vehicleDetails.trackingDevice',
  'vehicleDetails.alarmImmobiliser',
  'vehicleDetails.importedVehicle',
  'vehicleDetails.vehicleModified',
  'vehicleDetails.vehicleModifications',
  'vehicleDetails.purchaseDate',
  'vehicleDetails.legalOwner',
  'vehicleDetails.owner',
  'vehicleDetails.registeredKeeper',
];

export const step2PersonalFields = [
  'userDetails.title',
  'userDetails.firstName',
  'userDetails.surname',
  'userDetails.dateOfBirth',
  'userDetails.maritalStatus',
];

export const step2HouseholdFields = [
  'userDetails.houseNumber',
  'userDetails.postcode',
  'userDetails.addressLine1',
  'userDetails.addressLine2',
  'userDetails.addressLine3',
  'userDetails.city',
  'userDetails.manualPostcode',
  'userDetails.ownsHome',
  'userDetails.childrenUnder16',
  'userDetails.livedInUKSinceBirth',
];

export const step2EmploymentFields = [
  'userDetails.employmentStatus',
  'userDetails.occupation',
  'userDetails.industry',
  'userDetails.studentType',
];

export const step2LicenceFields = [
  'carUsage.licenseType',
  'carUsage.licenseIssueCountry',
  'carUsage.licenseHeld',
  'carUsage.licenseNumberFirst',
  'carUsage.licenseNumberLast',
  'carUsage.licenseNumberNI',
  'carUsage.declineShareLicenseNumber',
  'carUsage.hasAdditionalQualifications',
  'carUsage.additionalQualificationType',
  'carUsage.qualificationMonth',
  'carUsage.qualificationYear',
];

export const step2LicenceRestrictionsFields = [
  'carUsage.medicalConditions',
  'carUsage.dvlaConditionType',
  'carUsage.insuranceCancelledOrClaimRefusedOrPolicyVoided',
  'carUsage.criminalConvictions',
];

export const step2ClaimsAndConvictionsFields = [
  'carUsage.motorAccidentsClaims',
  'carUsage.drivingConvictions',
];

// ============================================================================
// COVER FIELDS (flow-specific)
// ============================================================================

export const coverFieldsAnnual = [
  'coverDetails.level',
  'coverDetails.minimumCoverLevel',
  'coverDetails.paymentFrequency',
  'coverDetails.startDate',
];

// Temporary has additional time fields
export const coverFieldsTemporary = [
  'coverDetails.level',
  'coverDetails.startDate',
  'coverDetails.startTime',
  'coverDetails.endDate',
  'coverDetails.endTime',
];

// Impound may have different cover fields if needed
export const coverFieldsImpound = [
  'coverDetails.level',
  'coverDetails.startDate',
];

// ============================================================================
// MAIN VALIDATION FUNCTION
// ============================================================================

/**
 * Get the list of fields to validate for a specific step and substep
 * @param step - The current step (VEHICLE, PERSONAL, COVER, CHECK_ANSWERS)
 * @param subStep - The current sub-step (e.g., "aboutYou", "household", "details")
 * @param insuranceType - The type of insurance (Annual, Temp, Impound)
 * @returns Array of field paths to validate
 */
export function getFieldsForStep(
  step: number,
  subStep: string | undefined,
  insuranceType: InsuranceType = 'Annual'
): string[] {
  switch (step) {
    case STEPS.VEHICLE:
      return vehicleFields;

    case STEPS.PERSONAL:
      switch (subStep) {
        case 'aboutYou':
          return step2PersonalFields;
        case 'household':
          return step2HouseholdFields;
        case 'employment':
          return step2EmploymentFields;
        case 'licence':
          return step2LicenceFields;
        case 'restrictions':
          return step2LicenceRestrictionsFields;
        case 'claims':
          return step2ClaimsAndConvictionsFields;
        default:
          return step2PersonalFields;
      }

    case STEPS.COVER:
      // Return cover fields based on insurance type
      if (insuranceType === 'Temp') {
        return coverFieldsTemporary;
      } else if (insuranceType === 'Impound') {
        return coverFieldsImpound;
      }
      return coverFieldsAnnual;

    case STEPS.CHECK_ANSWERS:
      return []; // No field validation needed for check answers step

    default:
      return [];
  }
}

/**
 * Get all fields that need to be persisted for a specific flow
 * Useful for determining which fields to save to sessionStorage
 * @param insuranceType - The type of insurance
 * @returns Array of all field paths used in the flow
 */
export function getAllFieldsForFlow(insuranceType: InsuranceType = 'Annual'): string[] {
  const allFields = [
    ...vehicleFields,
    ...step2PersonalFields,
    ...step2HouseholdFields,
    ...step2EmploymentFields,
    ...step2LicenceFields,
    ...step2LicenceRestrictionsFields,
    ...step2ClaimsAndConvictionsFields,
  ];

  if (insuranceType === 'Temp') {
    allFields.push(...coverFieldsTemporary);
  } else if (insuranceType === 'Impound') {
    allFields.push(...coverFieldsImpound);
  } else {
    allFields.push(...coverFieldsAnnual);
  }

  return allFields;
}

/**
 * Map of sub-step validation requirements per step
 * Used by components to determine which fields to validate
 */
export const STEP_SUBSTEP_MAP = {
  [STEPS.VEHICLE]: ['registration', 'carValue', 'carUsage', 'carStorage', 'otherCars'],
  [STEPS.PERSONAL]: [
    'aboutYou',
    'household',
    'employment',
    'licence',
    'restrictions',
    'claims',
    'addClaim',
    'addConviction',
  ],
  [STEPS.COVER]: [
    'details',
    'additionalDrivers',
    'addDriver',
    'addDriverClaimsAndConvictions',
    'addDriverClaim',
    'addDriverConviction',
    'carOwner',
    'carOwnerAddRegisteredKeeper',
    'carOwnerAddLegalOwner',
    'cover',
    'ncd',
    'additionalProducts',
    'contactInformation',
  ],
  [STEPS.CHECK_ANSWERS]: ['checkAnswers'],
} as const;

/**
 * Default cover substep per insurance type
 * Some flows start with 'carOwner' instead of 'details'
 */
export const DEFAULT_COVER_SUBSTEP: Record<InsuranceType, string> = {
  Annual: 'details',
  Temp: 'carOwner',
  Impound: 'carOwner',
} as const;
