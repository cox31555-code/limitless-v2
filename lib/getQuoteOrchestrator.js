/**
 * Unified orchestration hook for all get-quote flows
 * Consolidates form state, navigation, handlers, and session management
 * to eliminate code duplication across Annual, Temporary, and Impound flows
 */

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { annualInsuranceSchema } from '@/utils/schemas/insuranceSchema';
import { 
  saveQuoteState, 
  loadQuoteState, 
  clearQuoteState, 
  getSessionKeyForType 
} from './getQuoteSessionManager';
import { 
  getFieldsForStep, 
  STEPS, 
  DEFAULT_COVER_SUBSTEP 
} from './getQuoteFieldValidator';

const STEP_ENUM = {
  VEHICLE: 1,
  PERSONAL: 2,
  COVER: 3,
  CHECK_ANSWERS: 4,
};

/**
 * Main orchestration hook for get-quote flows
 * @param {Object} config - Configuration object
 * @param {string} config.insuranceType - Type of insurance ('Annual', 'Temp', 'Impound')
 * @param {Object} config.defaultFormValues - Default form values for the flow
 * @returns {Object} Orchestration object with state and handlers
 */
export function useGetQuoteOrchestrator(config) {
  const { insuranceType, defaultFormValues } = config;
  const router = useRouter();
  const searchParams = useSearchParams();

  // =========================================================================
  // FORM STATE
  // =========================================================================

  const form = useForm({
    resolver: zodResolver(annualInsuranceSchema),
    defaultValues: defaultFormValues,
  });

  // =========================================================================
  // STEP STATE
  // =========================================================================

  const [isMounted, setIsMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(STEP_ENUM.VEHICLE);
  const [vehicleSubStep, setVehicleSubStep] = useState('registration');
  const [personalSubStep, setPersonalSubStep] = useState('aboutYou');
  const [coverSubStep, setCoverSubStep] = useState(DEFAULT_COVER_SUBSTEP[insuranceType] || 'details');

  // =========================================================================
  // UI STATE
  // =========================================================================

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [shouldAutoTrigger, setShouldAutoTrigger] = useState(false);
  const [foundVehicleData, setFoundVehicleData] = useState(null);
  const [isEditingCarDetails, setIsEditingCarDetails] = useState(false);

  // =========================================================================
  // NESTED COMPONENT STATE
  // =========================================================================

  const [claims, setClaims] = useState([]);
  const [editingClaimIndex, setEditingClaimIndex] = useState(null);
  const [convictions, setConvictions] = useState([]);
  const [editingConvictionIndex, setEditingConvictionIndex] = useState(null);

  const [driverBeingAdded, setDriverBeingAdded] = useState(null);
  const [driverClaims, setDriverClaims] = useState([]);
  const [driverConvictions, setDriverConvictions] = useState([]);
  const [editingDriverClaimIndex, setEditingDriverClaimIndex] = useState(null);
  const [editingDriverConvictionIndex, setEditingDriverConvictionIndex] = useState(null);

  const [additionalDrivers, setAdditionalDrivers] = useState([]);
  const [hasAdditionalDrivers, setHasAdditionalDrivers] = useState(null);
  const [editingDriverIndex, setEditingDriverIndex] = useState(null);

  const [carOwnerData, setCarOwnerData] = useState(null);
  const [carOwnerAddingType, setCarOwnerAddingType] = useState(null);

  const [ncdData, setNcdData] = useState(null);
  const [productsData, setProductsData] = useState(null);
  const [contactInformationData, setContactInformationData] = useState(null);

  // =========================================================================
  // INITIALIZATION & SESSION RESTORATION
  // =========================================================================

  useEffect(() => {
    setIsMounted(true);

    Promise.resolve().then(() => {
      const savedState = loadQuoteState(insuranceType);
      if (savedState) {
        try {
          const { formData } = savedState;
          Object.keys(formData).forEach(key => {
            form.setValue(key, formData[key]);
          });

          setCurrentStep(savedState.currentStep || STEP_ENUM.VEHICLE);
          setVehicleSubStep(savedState.vehicleSubStep || 'registration');
          setPersonalSubStep(savedState.personalSubStep || 'aboutYou');
          setCoverSubStep(savedState.coverSubStep || DEFAULT_COVER_SUBSTEP[insuranceType]);
          setAdditionalDrivers(savedState.additionalDrivers || []);
          setClaims(savedState.claims || []);
          setConvictions(savedState.convictions || []);
          setCarOwnerData(savedState.carOwnerData || null);
          setNcdData(savedState.ncdData || null);
          setProductsData(savedState.productsData || null);
          setContactInformationData(savedState.contactInformationData || null);
          setFoundVehicleData(savedState.foundVehicleData || null);
        } catch (e) {
          console.error(`Failed to restore ${insuranceType} quote state:`, e);
        }
      }
    });
  }, [form, insuranceType]);

  // =========================================================================
  // SESSION PERSISTENCE
  // =========================================================================

  useEffect(() => {
    if (!isMounted) return;

    const state = {
      formData: form.getValues(),
      currentStep,
      vehicleSubStep,
      personalSubStep,
      coverSubStep,
      additionalDrivers,
      claims,
      convictions,
      driverClaims,
      driverConvictions,
      carOwnerData,
      ncdData,
      productsData,
      contactInformationData,
      foundVehicleData,
    };

    saveQuoteState(insuranceType, state);
  }, [isMounted, currentStep, vehicleSubStep, personalSubStep, coverSubStep, form, additionalDrivers, claims, convictions, driverClaims, driverConvictions, carOwnerData, ncdData, productsData, contactInformationData, foundVehicleData, insuranceType]);

  // =========================================================================
  // HISTORY STATE MANAGEMENT
  // =========================================================================

  const pushHistoryState = useCallback((step, vSubStep, pSubStep, cSubStep) => {
    const state = {
      type: `${insuranceType}QuoteStep`,
      currentStep: step,
      vehicleSubStep: vSubStep,
      personalSubStep: pSubStep,
      coverSubStep: cSubStep,
      timestamp: Date.now(),
    };
    window.history.pushState(state, '', window.location.href);
  }, [insuranceType]);

  useEffect(() => {
    if (!isMounted) return;

    window.history.replaceState(
      {
        type: `${insuranceType}QuoteStep`,
        currentStep,
        vehicleSubStep,
        personalSubStep,
        coverSubStep,
      },
      '',
      window.location.href
    );
  }, [isMounted, currentStep, vehicleSubStep, personalSubStep, coverSubStep, insuranceType]);

  useEffect(() => {
    if (!isMounted) return;

    const handlePopState = (event) => {
      if (event.state && event.state.type === `${insuranceType}QuoteStep`) {
        setCurrentStep(event.state.currentStep || STEP_ENUM.VEHICLE);
        setVehicleSubStep(event.state.vehicleSubStep || 'registration');
        setPersonalSubStep(event.state.personalSubStep || 'aboutYou');
        setCoverSubStep(event.state.coverSubStep || DEFAULT_COVER_SUBSTEP[insuranceType]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isMounted, insuranceType]);

  // =========================================================================
  // URL PARAMETER HANDLING
  // =========================================================================

  useEffect(() => {
    if (!isMounted) return;

    const stepParam = searchParams.get('step');
    if (stepParam) {
      const step = parseInt(stepParam);
      if (step >= STEP_ENUM.VEHICLE && step <= STEP_ENUM.CHECK_ANSWERS) {
        setCurrentStep(step);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [searchParams, isMounted]);

  // =========================================================================
  // CLAIM & CONVICTION HANDLERS
  // =========================================================================

  const handleAddClaim = useCallback((claimData) => {
    if (editingClaimIndex !== null) {
      const updated = [...claims];
      updated[editingClaimIndex] = claimData;
      setClaims(updated);
      setEditingClaimIndex(null);
    } else {
      setClaims([...claims, claimData]);
    }
    setPersonalSubStep('claims');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [claims, editingClaimIndex]);

  const handleNavigateToAddClaim = useCallback((index = null) => {
    setEditingClaimIndex(index);
    setPersonalSubStep('addClaim');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRemoveClaim = useCallback((index) => {
    setClaims(claims.filter((_, i) => i !== index));
  }, [claims]);

  const handleAddConviction = useCallback((convictionData) => {
    if (editingConvictionIndex !== null) {
      const updated = [...convictions];
      updated[editingConvictionIndex] = convictionData;
      setConvictions(updated);
      setEditingConvictionIndex(null);
    } else {
      setConvictions([...convictions, convictionData]);
    }
    setPersonalSubStep('claims');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [convictions, editingConvictionIndex]);

  const handleNavigateToAddConviction = useCallback((index = null) => {
    setEditingConvictionIndex(index);
    setPersonalSubStep('addConviction');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRemoveConviction = useCallback((index) => {
    setConvictions(convictions.filter((_, i) => i !== index));
  }, [convictions]);

  // =========================================================================
  // DRIVER HANDLERS
  // =========================================================================

  const handleRemoveDriver = useCallback((index) => {
    setAdditionalDrivers(additionalDrivers.filter((_, i) => i !== index));
  }, [additionalDrivers]);

  const handleNavigateToAddDriver = useCallback((index = null) => {
    setEditingDriverIndex(index);
    setCoverSubStep('addDriver');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAddDriver = useCallback((driverData) => {
    setDriverBeingAdded(driverData);
    setCoverSubStep('addDriverClaimsAndConvictions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCompleteDriverClaimsAndConvictions = useCallback((completeDriverData) => {
    if (editingDriverIndex !== null) {
      const updated = [...additionalDrivers];
      updated[editingDriverIndex] = completeDriverData;
      setAdditionalDrivers(updated);
      setEditingDriverIndex(null);
    } else {
      setAdditionalDrivers([...additionalDrivers, completeDriverData]);
    }
    setDriverBeingAdded(null);
    setCoverSubStep('additionalDrivers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [additionalDrivers, editingDriverIndex]);

  const handleBackFromAddDriver = useCallback(() => {
    setEditingDriverIndex(null);
    setDriverBeingAdded(null);
    setCoverSubStep('additionalDrivers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackFromDriverClaimsAndConvictions = useCallback(() => {
    setDriverBeingAdded(null);
    setDriverClaims([]);
    setDriverConvictions([]);
    setCoverSubStep('addDriver');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAddDriverClaim = useCallback((claimData) => {
    if (editingDriverClaimIndex !== null) {
      const updated = [...driverClaims];
      updated[editingDriverClaimIndex] = claimData;
      setDriverClaims(updated);
      setEditingDriverClaimIndex(null);
    } else {
      setDriverClaims([...driverClaims, claimData]);
    }
    setCoverSubStep('addDriverClaimsAndConvictions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [driverClaims, editingDriverClaimIndex]);

  const handleNavigateToAddDriverClaim = useCallback((index = null) => {
    setEditingDriverClaimIndex(index);
    setCoverSubStep('addDriverClaim');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAddDriverConviction = useCallback((convictionData) => {
    if (editingDriverConvictionIndex !== null) {
      const updated = [...driverConvictions];
      updated[editingDriverConvictionIndex] = convictionData;
      setDriverConvictions(updated);
      setEditingDriverConvictionIndex(null);
    } else {
      setDriverConvictions([...driverConvictions, convictionData]);
    }
    setCoverSubStep('addDriverClaimsAndConvictions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [driverConvictions, editingDriverConvictionIndex]);

  const handleNavigateToAddDriverConviction = useCallback((index = null) => {
    setEditingDriverConvictionIndex(index);
    setCoverSubStep('addDriverConviction');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // =========================================================================
  // COVER SUBSTEP HANDLERS
  // =========================================================================

  const handleNavigateToCarOwner = useCallback(() => {
    setCoverSubStep('carOwner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCarOwnerSubmit = useCallback((data) => {
    setCarOwnerData(data);
    setCoverSubStep('cover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackFromCarOwner = useCallback(() => {
    setCoverSubStep('additionalDrivers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAddCarOwnerPerson = useCallback((type, formState) => {
    setCarOwnerAddingType(type);
    if (formState) {
      setCarOwnerData(formState);
    }
    setCoverSubStep(type === 'registeredKeeper' ? 'carOwnerAddRegisteredKeeper' : 'carOwnerAddLegalOwner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSaveCarOwnerPerson = useCallback((personData) => {
    if (carOwnerAddingType === 'registeredKeeper') {
      setCarOwnerData({
        ...carOwnerData,
        registeredKeeperOtherPerson: personData,
      });
    } else {
      setCarOwnerData({
        ...carOwnerData,
        legalOwnerOtherPerson: personData,
      });
    }
    setCoverSubStep('carOwner');
    setCarOwnerAddingType(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [carOwnerData, carOwnerAddingType]);

  const handleBackFromAddCarOwnerPerson = useCallback(() => {
    setCoverSubStep('carOwner');
    setCarOwnerAddingType(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCoverDetailsSubmit = useCallback((data) => {
    form.setValue('coverDetails', data, { shouldValidate: true });
    setCoverSubStep('ncd');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [form]);

  const handleBackFromCoverDetails = useCallback(() => {
    setCoverSubStep('carOwner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNcdDataSubmit = useCallback((data) => {
    setNcdData(data);
    form.setValue('ncdData', data, { shouldValidate: true });
    setCoverSubStep('additionalProducts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [form]);

  const handleBackFromNcd = useCallback(() => {
    setCoverSubStep('cover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAdditionalProductsSubmit = useCallback((data) => {
    setProductsData(data);
    form.setValue('productsData', data, { shouldValidate: true });
    setCoverSubStep('contactInformation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [form]);

  const handleBackFromAdditionalProducts = useCallback(() => {
    setCoverSubStep('ncd');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleContactInformationSubmit = useCallback((data) => {
    setContactInformationData(data);
    form.setValue('email', data.email, { shouldValidate: true });
    form.setValue('phone', data.phone, { shouldValidate: true });
    setCurrentStep(STEP_ENUM.CHECK_ANSWERS);
    pushHistoryState(STEP_ENUM.CHECK_ANSWERS, vehicleSubStep, personalSubStep, coverSubStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [form, vehicleSubStep, personalSubStep, coverSubStep, pushHistoryState]);

  const handleBackFromContactInformation = useCallback(() => {
    setCoverSubStep('additionalProducts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // =========================================================================
  // STEP NAVIGATION HANDLERS
  // =========================================================================

  const handleNextStep = useCallback(async () => {
    const subStep = currentStep === STEP_ENUM.VEHICLE ? vehicleSubStep : currentStep === STEP_ENUM.PERSONAL ? personalSubStep : undefined;
    const fieldsToValidate = getFieldsForStep(currentStep, subStep, insuranceType);
    const isValid = await form.trigger(fieldsToValidate);

    if (!isValid) return;

    // Step forward logic
    if (currentStep === STEP_ENUM.VEHICLE && vehicleSubStep === 'registration') {
      setVehicleSubStep('carValue');
      pushHistoryState(STEP_ENUM.VEHICLE, 'carValue', personalSubStep, coverSubStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentStep === STEP_ENUM.VEHICLE && vehicleSubStep === 'carValue') {
      setVehicleSubStep('carUsage');
      pushHistoryState(STEP_ENUM.VEHICLE, 'carUsage', personalSubStep, coverSubStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentStep === STEP_ENUM.VEHICLE && vehicleSubStep === 'carUsage') {
      setVehicleSubStep('carStorage');
      pushHistoryState(STEP_ENUM.VEHICLE, 'carStorage', personalSubStep, coverSubStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentStep === STEP_ENUM.VEHICLE && vehicleSubStep === 'carStorage') {
      setVehicleSubStep('otherCars');
      pushHistoryState(STEP_ENUM.VEHICLE, 'otherCars', personalSubStep, coverSubStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentStep === STEP_ENUM.VEHICLE && vehicleSubStep === 'otherCars') {
      setCurrentStep(STEP_ENUM.PERSONAL);
      setPersonalSubStep('aboutYou');
      pushHistoryState(STEP_ENUM.PERSONAL, vehicleSubStep, 'aboutYou', coverSubStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentStep === STEP_ENUM.PERSONAL) {
      // Personal step navigation is more complex due to multiple sub-steps
      // For now, move to cover when all personal steps are complete
      if (personalSubStep !== 'addClaim' && personalSubStep !== 'addConviction') {
        setCurrentStep(STEP_ENUM.COVER);
        setCoverSubStep(DEFAULT_COVER_SUBSTEP[insuranceType] || 'details');
        pushHistoryState(STEP_ENUM.COVER, vehicleSubStep, personalSubStep, DEFAULT_COVER_SUBSTEP[insuranceType] || 'details');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (currentStep === STEP_ENUM.COVER) {
      // Cover step navigation - simplified version
      setCurrentStep(STEP_ENUM.CHECK_ANSWERS);
      pushHistoryState(STEP_ENUM.CHECK_ANSWERS, vehicleSubStep, personalSubStep, coverSubStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  }, [currentStep, vehicleSubStep, personalSubStep, coverSubStep, insuranceType, form, pushHistoryState]);

  const handlePreviousStep = useCallback(() => {
    // Comprehensive backward navigation logic (simplified version)
    if (currentStep === STEP_ENUM.COVER) {
      setCurrentStep(STEP_ENUM.PERSONAL);
      setPersonalSubStep('aboutYou');
      pushHistoryState(STEP_ENUM.PERSONAL, vehicleSubStep, 'aboutYou', coverSubStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentStep === STEP_ENUM.PERSONAL && personalSubStep === 'aboutYou') {
      setCurrentStep(STEP_ENUM.VEHICLE);
      setVehicleSubStep('otherCars');
      pushHistoryState(STEP_ENUM.VEHICLE, 'otherCars', personalSubStep, coverSubStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentStep === STEP_ENUM.PERSONAL && personalSubStep === 'household') {
      setPersonalSubStep('aboutYou');
      pushHistoryState(STEP_ENUM.PERSONAL, vehicleSubStep, 'aboutYou', coverSubStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentStep === STEP_ENUM.CHECK_ANSWERS) {
      setCurrentStep(STEP_ENUM.COVER);
      setCoverSubStep('contactInformation');
      pushHistoryState(STEP_ENUM.COVER, vehicleSubStep, personalSubStep, 'contactInformation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Vehicle sub-step back navigation
    const vehicleSubSteps = ['registration', 'carValue', 'carUsage', 'carStorage', 'otherCars'];
    const currentVehicleIndex = vehicleSubSteps.indexOf(vehicleSubStep);
    if (currentStep === STEP_ENUM.VEHICLE && currentVehicleIndex > 0) {
      const prevSubStep = vehicleSubSteps[currentVehicleIndex - 1];
      setVehicleSubStep(prevSubStep);
      pushHistoryState(STEP_ENUM.VEHICLE, prevSubStep, personalSubStep, coverSubStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentStep > STEP_ENUM.VEHICLE) {
      setCurrentStep(currentStep - 1);
      pushHistoryState(currentStep - 1, vehicleSubStep, personalSubStep, coverSubStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, vehicleSubStep, personalSubStep, coverSubStep, pushHistoryState]);

  // =========================================================================
  // SUBMISSION HANDLER
  // =========================================================================

  const handleSubmit = useCallback(async (data) => {
    setShowLoading(true);
    setIsSubmitting(true);

    const formState = {
      formData: form.getValues(),
      currentStep: STEP_ENUM.CHECK_ANSWERS,
      vehicleSubStep: 'registration',
      personalSubStep: 'aboutYou',
      coverSubStep: DEFAULT_COVER_SUBSTEP[insuranceType] || 'details',
      additionalDrivers,
      claims,
      convictions,
      carOwnerData,
      ncdData,
      productsData,
      contactInformationData,
      foundVehicleData,
    };

    saveQuoteState(insuranceType, formState);

    const prefix = insuranceType === 'Annual' ? 'ANNUAL' : insuranceType === 'Temp' ? 'TEMP' : 'IMPOUND';
    const insuranceId = `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const redirectUrl = `/payment-summary?id=${insuranceId}`;
    const randomDelay = Math.floor(Math.random() * 5001) + 4000;

    await new Promise(resolve => setTimeout(resolve, randomDelay));
    router.push(redirectUrl);
  }, [form, insuranceType, additionalDrivers, claims, convictions, carOwnerData, ncdData, productsData, contactInformationData, foundVehicleData, router]);

  // =========================================================================
  // RETURN ORCHESTRATION OBJECT
  // =========================================================================

  return {
    // Form
    form,
    isMounted,
    shouldAutoTrigger,
    setShouldAutoTrigger,

    // Step state
    currentStep,
    setCurrentStep,
    vehicleSubStep,
    setVehicleSubStep,
    personalSubStep,
    setPersonalSubStep,
    coverSubStep,
    setCoverSubStep,

    // UI state
    isSubmitting,
    setIsSubmitting,
    showLoading,
    setShowLoading,
    foundVehicleData,
    setFoundVehicleData,
    isEditingCarDetails,
    setIsEditingCarDetails,

    // Claims
    claims,
    setClaims,
    editingClaimIndex,
    setEditingClaimIndex,
    handleAddClaim,
    handleNavigateToAddClaim,
    handleRemoveClaim,

    // Convictions
    convictions,
    setConvictions,
    editingConvictionIndex,
    setEditingConvictionIndex,
    handleAddConviction,
    handleNavigateToAddConviction,
    handleRemoveConviction,

    // Drivers
    additionalDrivers,
    setAdditionalDrivers,
    hasAdditionalDrivers,
    setHasAdditionalDrivers,
    editingDriverIndex,
    setEditingDriverIndex,
    handleRemoveDriver,
    handleNavigateToAddDriver,
    handleAddDriver,
    handleCompleteDriverClaimsAndConvictions,
    handleBackFromAddDriver,
    handleBackFromDriverClaimsAndConvictions,

    // Driver claims & convictions
    driverBeingAdded,
    setDriverBeingAdded,
    driverClaims,
    setDriverClaims,
    driverConvictions,
    setDriverConvictions,
    editingDriverClaimIndex,
    setEditingDriverClaimIndex,
    editingDriverConvictionIndex,
    setEditingDriverConvictionIndex,
    handleAddDriverClaim,
    handleNavigateToAddDriverClaim,
    handleAddDriverConviction,
    handleNavigateToAddDriverConviction,

    // Car owner
    carOwnerData,
    setCarOwnerData,
    carOwnerAddingType,
    setCarOwnerAddingType,
    handleNavigateToCarOwner,
    handleCarOwnerSubmit,
    handleBackFromCarOwner,
    handleAddCarOwnerPerson,
    handleSaveCarOwnerPerson,
    handleBackFromAddCarOwnerPerson,

    // Cover details
    handleCoverDetailsSubmit,
    handleBackFromCoverDetails,

    // NCD
    ncdData,
    setNcdData,
    handleNcdDataSubmit,
    handleBackFromNcd,

    // Additional products
    productsData,
    setProductsData,
    handleAdditionalProductsSubmit,
    handleBackFromAdditionalProducts,

    // Contact information
    contactInformationData,
    setContactInformationData,
    handleContactInformationSubmit,
    handleBackFromContactInformation,

    // Navigation
    handleNextStep,
    handlePreviousStep,
    handleSubmit,
    pushHistoryState,
  };
}

export { STEP_ENUM };
