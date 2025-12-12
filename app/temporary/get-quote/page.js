'use client';

import { createLazyStepsMap } from '@/lib/unifiedLazyStepsLoader';
import GetQuotePageContainer from '@/ui/getQuote/GetQuotePageContainer';

/**
 * Temporary Get Quote Page
 * Now uses generic GetQuotePageContainer with configuration
 * Reduced from 1400+ lines to 65 lines!
 */
export default function TemporaryGetQuotePage() {
  const lazySteps = createLazyStepsMap('Temp');

  const defaultFormValues = {
    type: 'Temp',
    vehicleDetails: {
      registrationNumber: '',
      type: '',
      make: '',
      model: '',
      year: '',
      fuel: '',
      transmission: '',
      doors: '',
      colour: '',
      worth: '',
      trackingDevice: '',
      alarmImmobiliser: '',
      importedVehicle: '',
      vehicleModified: 'No',
      vehicleModifications: [],
      purchaseDate: '02/2025',
      haventBoughtYet: false,
      usageType: '',
      legalOwner: '',
      owner: '',
      ownerOther: '',
      registeredKeeper: '',
      registeredKeeperOther: '',
      apiData: null,
      carValue: '4560',
      estimatedValue: '4560',
    },
    // Temporary includes time fields in coverDetails
    coverDetails: {
      level: '',
      minimumCoverLevel: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
    },
    ncdData: {
      noClaimsDiscount: '',
      namedDriverExperience: '',
    },
    productsData: {
      personalAccidentCover: '',
      courtesyCar: '',
      breakdownCover: '',
      motorLegalProtection: '',
    },
    optionalExtras: {
      courtesyCar: null,
      breakdownCover: null,
      foreignUseCover: null,
    },
    userDetails: {
      title: '',
      firstName: '',
      surname: '',
      maritalStatus: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      postCode: '',
      address: '',
      employmentStatus: '',
      occupation: '',
      industry: '',
      studentType: '',
      houseNumber: '',
      postcode: '',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      city: '',
      manualPostcode: '',
      ownsHome: null,
      childrenUnder16: null,
      livedInUKSinceBirth: null,
    },
    carUsage: {
      industry: '',
      keepingCarDuringDay: '',
      keepingCarDuringNight: '',
      usageType: '',
      otherVehicles: null,
      otherVehiclesType: '',
      hasAdditionalQualifications: '',
      additionalQualificationType: '',
      qualificationMonth: '',
      qualificationYear: '',
      licenseType: '',
      licenseIssueCountry: '',
      licenseHeld: '',
      licenseNumber: '',
      licenseNumberFirst: '',
      licenseNumberLast: '',
      licenseNumberNI: '',
      declineShareLicenseNumber: false,
      medicalConditions: '',
      dvlaConditionType: '',
      insuranceCancelledOrClaimRefusedOrPolicyVoided: '',
      criminalConvictions: '',
      motorAccidentsClaims: '',
      drivingConvictions: '',
      NCB: '',
      voluntaryExcess: '',
      annualMileage: '',
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
  };

  return (
    <GetQuotePageContainer
      insuranceType="Temp"
      lazySteps={lazySteps}
      defaultFormValues={defaultFormValues}
    />
  );
}
