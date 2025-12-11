/**
 * Generic page container for all get-quote flows
 * Replaces individual page.js files with a reusable component that accepts configuration
 */

'use client';

import React, { Suspense, useCallback } from 'react';
import LoadingOverlay from '@/ui/loadingSpinner/LoadingOverlay';
import CourierLoadingOverlay from '@/app/courier/_components/CourierLoadingOverlay';
import QuoteProgressCard from '@/app/annual/get-quote/_components/QuoteProgressCard';
import QuoteNavButtons from '@/app/annual/get-quote/_components/QuoteNavButtons';
import Step1VehicleRegistration from '@/app/annual/get-quote/_components/Step1VehicleRegistration';
import QuoteHeader from '@/app/annual/get-quote/_components/QuoteHeader';
import GetQuotePageHeader from '@/app/annual/get-quote/_components/GetQuotePageHeader';
import { StepFallback } from '@/lib/unifiedLazyStepsLoader';
import { useGetQuoteOrchestrator, STEP_ENUM } from '@/lib/getQuoteOrchestrator';
import styles from '@/app/annual/get-quote/newGetQuotePage.module.css';

/**
 * GetQuotePageContainer - Universal page container for all get-quote flows
 * @param {Object} props
 * @param {string} props.insuranceType - Insurance type ('Annual', 'Temp', 'Impound')
 * @param {Object} props.lazySteps - Lazy-loaded step components map
 * @param {Object} props.defaultFormValues - Default form values
 * @returns {React.ReactElement}
 */
export default function GetQuotePageContainer({
  insuranceType,
  lazySteps,
  defaultFormValues,
}) {
  const orchest = useGetQuoteOrchestrator({
    insuranceType,
    defaultFormValues,
  });

  const {
    form,
    isMounted,
    currentStep,
    vehicleSubStep,
    personalSubStep,
    coverSubStep,
    showLoading,
    isSubmitting,
    foundVehicleData,
    setFoundVehicleData,
    isEditingCarDetails,
    setIsEditingCarDetails,
    claims,
    editingClaimIndex,
    setEditingClaimIndex,
    handleAddClaim,
    handleNavigateToAddClaim,
    handleRemoveClaim,
    convictions,
    editingConvictionIndex,
    setEditingConvictionIndex,
    handleAddConviction,
    handleNavigateToAddConviction,
    handleRemoveConviction,
    additionalDrivers,
    editingDriverIndex,
    handleRemoveDriver,
    handleNavigateToAddDriver,
    driverBeingAdded,
    driverClaims,
    driverConvictions,
    editingDriverClaimIndex,
    editingDriverConvictionIndex,
    handleAddDriver,
    handleCompleteDriverClaimsAndConvictions,
    handleBackFromAddDriver,
    handleBackFromDriverClaimsAndConvictions,
    handleAddDriverClaim,
    handleNavigateToAddDriverClaim,
    handleAddDriverConviction,
    handleNavigateToAddDriverConviction,
    carOwnerData,
    carOwnerAddingType,
    handleNavigateToCarOwner,
    handleCarOwnerSubmit,
    handleBackFromCarOwner,
    handleAddCarOwnerPerson,
    handleSaveCarOwnerPerson,
    handleBackFromAddCarOwnerPerson,
    ncdData,
    productsData,
    contactInformationData,
    handleCoverDetailsSubmit,
    handleBackFromCoverDetails,
    handleNcdDataSubmit,
    handleBackFromNcd,
    handleAdditionalProductsSubmit,
    handleBackFromAdditionalProducts,
    handleContactInformationSubmit,
    handleBackFromContactInformation,
    handleNextStep,
    handlePreviousStep,
    handleSubmit,
  } = orchest;

  if (!isMounted) {
    return null;
  }

  /**
   * Handle cover details submission from Step3CoverDetails
   * Converts Step3CoverDetails output format to form state
   */
  const handleStep3CoverDetailsSubmit = useCallback((coverData) => {
    // Map Step3CoverDetails output to form state
    form.setValue('coverDetails.level', coverData.coverLevel, { shouldValidate: true });
    form.setValue('coverDetails.minimumCoverLevel', coverData.minimumCoverLevel || '', { shouldValidate: true });
    form.setValue('coverDetails.paymentFrequency', coverData.paymentFrequency, { shouldValidate: true });
    form.setValue('coverDetails.startDate', coverData.startDate, { shouldValidate: true });

    // Navigate to next step
    orchest.handleNavigateToCarOwner();
  }, [form, orchest]);

  /**
   * Handle substep navigation from sidebar
   * Maps substep index to substep key and navigates
   */
  const handleSubStepClick = (stepNumber, substepIndex) => {
    let substepKey;

    if (stepNumber === STEP_ENUM.VEHICLE) {
      const vehicleSubSteps = ['registration', 'carValue', 'carUsage', 'carStorage', 'otherCars'];
      substepKey = vehicleSubSteps[substepIndex];
      if (substepKey) {
        orchest.setVehicleSubStep(substepKey);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (stepNumber === STEP_ENUM.PERSONAL) {
      const personalSubSteps = ['aboutYou', 'household', 'employment', 'licence', 'restrictions', 'claims'];
      substepKey = personalSubSteps[substepIndex];
      if (substepKey) {
        orchest.setPersonalSubStep(substepKey);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (stepNumber === STEP_ENUM.COVER) {
      const isTemporaryOrImpound = insuranceType === 'Temp' || insuranceType === 'Impound';
      const coverSubSteps = isTemporaryOrImpound
        ? ['carOwner', 'cover', 'ncd', 'contactInformation']
        : ['additionalDrivers', 'carOwner', 'cover', 'ncd', 'additionalProducts', 'contactInformation'];

      substepKey = coverSubSteps[substepIndex];
      if (substepKey) {
        orchest.setCoverSubStep(substepKey);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const getSubtitle = () => {
    if (currentStep === STEP_ENUM.VEHICLE) {
      switch (vehicleSubStep) {
        case 'carValue':
          return 'Car Value';
        case 'carUsage':
          return 'Car Usage';
        case 'carStorage':
          return 'Car Storage';
        case 'otherCars':
          return 'Other cars';
        default:
          return 'Car Details';
      }
    }

    if (currentStep === STEP_ENUM.PERSONAL) {
      switch (personalSubStep) {
        case 'aboutYou':
          return 'About you';
        case 'household':
          return 'Your household';
        case 'employment':
          return 'Your employment';
        case 'licence':
          return 'Your licence';
        case 'restrictions':
          return 'Licence restrictions';
        case 'claims':
          return 'Claims and convictions';
        case 'addClaim':
          return 'Add a claim';
        case 'addConviction':
          return 'Add a conviction';
        default:
          return 'Personal Details';
      }
    }

    if (currentStep === STEP_ENUM.COVER) {
      switch (coverSubStep) {
        case 'additionalDrivers':
          return 'Additional drivers';
        case 'addDriver':
          return 'Add a driver';
        case 'addDriverClaimsAndConvictions':
          return 'Additional drivers - Claims and convictions';
        case 'addDriverClaim':
          return 'Add a claim';
        case 'addDriverConviction':
          return 'Add a conviction';
        case 'carOwner':
          return 'Car owner';
        case 'cover':
          return 'Cover details';
        case 'ncd':
          return 'No claims discount';
        case 'additionalProducts':
          return 'Additional products';
        case 'contactInformation':
          return 'Contact information';
        default:
          return 'Cover';
      }
    }

    if (currentStep === STEP_ENUM.CHECK_ANSWERS) {
      return 'Check your answers';
    }

    return undefined;
  };

  return (
    <div suppressHydrationWarning>
      <GetQuotePageHeader />
      <CourierLoadingOverlay isVisible={showLoading} />
      <QuoteHeader
        currentStep={currentStep}
        totalSteps={4}
        subtitle={getSubtitle()}
      />

      <div className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            <form
              noValidate
              suppressHydrationWarning
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <div className={styles.stepContent}>
                {/* VEHICLE STEP */}
                {currentStep === STEP_ENUM.VEHICLE && vehicleSubStep === 'registration' && (
                  <Step1VehicleRegistration
                    form={form}
                    onVehicleFound={setFoundVehicleData}
                    autoTriggerLookup={false}
                    onEditCarDetails={() => {
                      setIsEditingCarDetails(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    isEditingCarDetails={isEditingCarDetails}
                    onCarDetailsUpdated={() => {
                      setIsEditingCarDetails(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    foundVehicleData={foundVehicleData}
                  />
                )}

                {currentStep === STEP_ENUM.VEHICLE && vehicleSubStep === 'carValue' && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.carValue form={form} />
                  </Suspense>
                )}

                {currentStep === STEP_ENUM.VEHICLE && vehicleSubStep === 'carUsage' && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.carUsage form={form} />
                  </Suspense>
                )}

                {currentStep === STEP_ENUM.VEHICLE && vehicleSubStep === 'carStorage' && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.carStorage form={form} />
                  </Suspense>
                )}

                {currentStep === STEP_ENUM.VEHICLE && vehicleSubStep === 'otherCars' && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.otherCars form={form} />
                  </Suspense>
                )}

                {/* PERSONAL STEP */}
                {currentStep === STEP_ENUM.PERSONAL && personalSubStep === 'aboutYou' && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.aboutYou form={form} />
                  </Suspense>
                )}

                {currentStep === STEP_ENUM.PERSONAL && personalSubStep === 'household' && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.household form={form} />
                  </Suspense>
                )}

                {currentStep === STEP_ENUM.PERSONAL && personalSubStep === 'employment' && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.employment form={form} />
                  </Suspense>
                )}

                {currentStep === STEP_ENUM.PERSONAL && personalSubStep === 'licence' && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.licence form={form} />
                  </Suspense>
                )}

                {currentStep === STEP_ENUM.PERSONAL && personalSubStep === 'restrictions' && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.restrictions form={form} />
                  </Suspense>
                )}

                {currentStep === STEP_ENUM.PERSONAL && personalSubStep === 'claims' && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.claims
                      form={form}
                      claims={claims}
                      editingIndex={editingClaimIndex}
                      onAdd={handleAddClaim}
                      onNavigateToAdd={handleNavigateToAddClaim}
                      onRemove={handleRemoveClaim}
                    />
                  </Suspense>
                )}

                {currentStep === STEP_ENUM.PERSONAL && personalSubStep === 'addClaim' && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.addClaim
                      form={form}
                      onBack={() => {
                        setEditingClaimIndex(null);
                        orchest.setPersonalSubStep('claims');
                      }}
                      onAdd={handleAddClaim}
                      editingClaim={editingClaimIndex !== null ? claims[editingClaimIndex] : null}
                    />
                  </Suspense>
                )}

                {currentStep === STEP_ENUM.PERSONAL && personalSubStep === 'addConviction' && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.addConviction
                      form={form}
                      onBack={() => {
                        setEditingConvictionIndex(null);
                        orchest.setPersonalSubStep('claims');
                      }}
                      onAdd={handleAddConviction}
                      editingConviction={editingConvictionIndex !== null ? convictions[editingConvictionIndex] : null}
                    />
                  </Suspense>
                )}

                {/* COVER STEP - simplified rendering */}
                {currentStep === STEP_ENUM.COVER && coverSubStep === 'details' && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.details
                      onBack={handleBackFromCoverDetails}
                      onNext={handleStep3CoverDetailsSubmit}
                      coverData={{
                        coverLevel: form.watch('coverDetails.level'),
                        minimumCoverLevel: form.watch('coverDetails.minimumCoverLevel'),
                        paymentFrequency: form.watch('coverDetails.paymentFrequency'),
                        startDate: form.watch('coverDetails.startDate'),
                      }}
                      showCoverOptions={true}
                      insuranceType="Annual"
                    />
                  </Suspense>
                )}

                {currentStep === STEP_ENUM.COVER && coverSubStep === 'additionalDrivers' && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.additionalDrivers
                      form={form}
                      additionalDrivers={additionalDrivers}
                      onAdd={handleNavigateToAddDriver}
                      onRemove={handleRemoveDriver}
                      onNext={handleNavigateToCarOwner}
                      onBack={handleBackFromCoverDetails}
                    />
                  </Suspense>
                )}

                {currentStep === STEP_ENUM.COVER && coverSubStep === 'addDriver' && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.addDriver
                      form={form}
                      onBack={handleBackFromAddDriver}
                      onNext={handleAddDriver}
                      editingDriver={editingDriverIndex !== null ? additionalDrivers[editingDriverIndex] : null}
                    />
                  </Suspense>
                )}

                {currentStep === STEP_ENUM.COVER && coverSubStep === 'carOwner' && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.carOwner
                      form={form}
                      carOwnerData={carOwnerData}
                      onBack={handleBackFromCarOwner}
                      onNext={handleCarOwnerSubmit}
                      onAddPerson={handleAddCarOwnerPerson}
                    />
                  </Suspense>
                )}

                {currentStep === STEP_ENUM.COVER && coverSubStep === 'cover' && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.cover
                      form={form}
                      onBack={handleBackFromCoverDetails}
                      onNext={handleNcdDataSubmit}
                    />
                  </Suspense>
                )}

                {currentStep === STEP_ENUM.COVER && coverSubStep === 'ncd' && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.ncd
                      form={form}
                      ncdData={ncdData}
                      onBack={handleBackFromNcd}
                      onNext={handleNcdDataSubmit}
                    />
                  </Suspense>
                )}

                {currentStep === STEP_ENUM.COVER && coverSubStep === 'additionalProducts' && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.additionalProducts
                      form={form}
                      productsData={productsData}
                      onBack={handleBackFromAdditionalProducts}
                      onNext={handleAdditionalProductsSubmit}
                    />
                  </Suspense>
                )}

                {currentStep === STEP_ENUM.COVER && coverSubStep === 'contactInformation' && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.contactInformation
                      form={form}
                      contactInformationData={contactInformationData}
                      onBack={handleBackFromContactInformation}
                      onNext={handleContactInformationSubmit}
                    />
                  </Suspense>
                )}

                {/* CHECK ANSWERS STEP */}
                {currentStep === STEP_ENUM.CHECK_ANSWERS && (
                  <Suspense fallback={<StepFallback />}>
                    <lazySteps.checkAnswers
                      form={form}
                      onBack={handlePreviousStep}
                      onSubmit={handleSubmit}
                      isLoading={showLoading || isSubmitting}
                    />
                  </Suspense>
                )}
              </div>

              {/* Navigation Buttons */}
              <QuoteNavButtons
                onBack={handlePreviousStep}
                onSubmit={handleSubmit}
                onNext={handleNextStep}
                isLoading={showLoading || isSubmitting}
                currentStep={currentStep}
              />
            </form>
          </div>

          {/* Progress Sidebar */}
          <QuoteProgressCard
            currentStep={currentStep}
            totalSteps={4}
            vehicleSubStep={vehicleSubStep}
            personalSubStep={personalSubStep}
            coverSubStep={coverSubStep}
            insuranceType={insuranceType}
            onSubStepClick={handleSubStepClick}
          />
        </div>
      </div>

      <LoadingOverlay isVisible={showLoading} />
    </div>
  );
}
