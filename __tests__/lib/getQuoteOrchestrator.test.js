/**
 * Tests for getQuoteOrchestrator
 * This file serves as a template for testing the orchestrator hook
 * NOTE: Full testing requires React Testing Library and form mocking
 */

import { renderHook, act } from '@testing-library/react';
import { useGetQuoteOrchestrator, STEP_ENUM } from '@/lib/getQuoteOrchestrator';
import { DEFAULT_COVER_SUBSTEP } from '@/lib/getQuoteFieldValidator';

// Mock dependencies
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    getValues: jest.fn(() => ({})),
    setValue: jest.fn(),
    trigger: jest.fn().mockResolvedValue(true),
    handleSubmit: jest.fn((fn) => fn),
  }),
}));

jest.mock('@/lib/getQuoteSessionManager', () => ({
  saveQuoteState: jest.fn(),
  loadQuoteState: jest.fn(() => null),
  clearQuoteState: jest.fn(),
  getSessionKeyForType: jest.fn((type) => `${type}QuoteFormState`),
}));

describe('useGetQuoteOrchestrator', () => {
  const mockConfig = {
    insuranceType: 'Annual',
    defaultFormValues: {
      type: 'Annual',
      vehicleDetails: {},
      coverDetails: {},
      userDetails: {},
      carUsage: {},
      terms: {},
    },
  };

  describe('Initialization', () => {
    it('should initialize with correct default state', () => {
      const { result } = renderHook(() => useGetQuoteOrchestrator(mockConfig));

      expect(result.current).toBeDefined();
      expect(result.current.isMounted).toBe(false); // Not mounted until effect runs
      expect(result.current.form).toBeDefined();
    });

    it('should have form property', () => {
      const { result } = renderHook(() => useGetQuoteOrchestrator(mockConfig));
      expect(result.current.form).toBeDefined();
      expect(typeof result.current.form.getValues).toBe('function');
    });
  });

  describe('Step Navigation', () => {
    it('should have correct initial step', () => {
      const { result } = renderHook(() => useGetQuoteOrchestrator(mockConfig));

      act(() => {
        // Simulate mount
        result.current;
      });

      expect(result.current.currentStep).toBe(STEP_ENUM.VEHICLE);
      expect(result.current.vehicleSubStep).toBe('registration');
    });

    it('should have correct default cover substep for Annual', () => {
      const { result } = renderHook(() => useGetQuoteOrchestrator(mockConfig));

      act(() => {
        result.current;
      });

      expect(result.current.coverSubStep).toBe(DEFAULT_COVER_SUBSTEP.Annual);
    });

    it('should have correct default cover substep for Temp', () => {
      const tempConfig = { ...mockConfig, insuranceType: 'Temp' };
      const { result } = renderHook(() => useGetQuoteOrchestrator(tempConfig));

      act(() => {
        result.current;
      });

      expect(result.current.coverSubStep).toBe(DEFAULT_COVER_SUBSTEP.Temp);
    });

    it('should have correct default cover substep for Impound', () => {
      const impoundConfig = { ...mockConfig, insuranceType: 'Impound' };
      const { result } = renderHook(() => useGetQuoteOrchestrator(impoundConfig));

      act(() => {
        result.current;
      });

      expect(result.current.coverSubStep).toBe(DEFAULT_COVER_SUBSTEP.Impound);
    });
  });

  describe('State Management', () => {
    it('should have claim handlers', () => {
      const { result } = renderHook(() => useGetQuoteOrchestrator(mockConfig));

      expect(result.current.handleAddClaim).toBeDefined();
      expect(result.current.handleNavigateToAddClaim).toBeDefined();
      expect(result.current.handleRemoveClaim).toBeDefined();
    });

    it('should have conviction handlers', () => {
      const { result } = renderHook(() => useGetQuoteOrchestrator(mockConfig));

      expect(result.current.handleAddConviction).toBeDefined();
      expect(result.current.handleNavigateToAddConviction).toBeDefined();
      expect(result.current.handleRemoveConviction).toBeDefined();
    });

    it('should have driver handlers', () => {
      const { result } = renderHook(() => useGetQuoteOrchestrator(mockConfig));

      expect(result.current.handleRemoveDriver).toBeDefined();
      expect(result.current.handleNavigateToAddDriver).toBeDefined();
      expect(result.current.handleAddDriver).toBeDefined();
      expect(result.current.handleCompleteDriverClaimsAndConvictions).toBeDefined();
    });

    it('should have car owner handlers', () => {
      const { result } = renderHook(() => useGetQuoteOrchestrator(mockConfig));

      expect(result.current.handleNavigateToCarOwner).toBeDefined();
      expect(result.current.handleCarOwnerSubmit).toBeDefined();
      expect(result.current.handleBackFromCarOwner).toBeDefined();
      expect(result.current.handleAddCarOwnerPerson).toBeDefined();
      expect(result.current.handleSaveCarOwnerPerson).toBeDefined();
    });

    it('should have cover detail handlers', () => {
      const { result } = renderHook(() => useGetQuoteOrchestrator(mockConfig));

      expect(result.current.handleCoverDetailsSubmit).toBeDefined();
      expect(result.current.handleBackFromCoverDetails).toBeDefined();
      expect(result.current.handleNcdDataSubmit).toBeDefined();
      expect(result.current.handleBackFromNcd).toBeDefined();
      expect(result.current.handleAdditionalProductsSubmit).toBeDefined();
      expect(result.current.handleContactInformationSubmit).toBeDefined();
    });
  });

  describe('Navigation Handlers', () => {
    it('should have handleNextStep function', () => {
      const { result } = renderHook(() => useGetQuoteOrchestrator(mockConfig));
      expect(typeof result.current.handleNextStep).toBe('function');
    });

    it('should have handlePreviousStep function', () => {
      const { result } = renderHook(() => useGetQuoteOrchestrator(mockConfig));
      expect(typeof result.current.handlePreviousStep).toBe('function');
    });

    it('should have handleSubmit function', () => {
      const { result } = renderHook(() => useGetQuoteOrchestrator(mockConfig));
      expect(typeof result.current.handleSubmit).toBe('function');
    });
  });

  describe('State Setters', () => {
    it('should have state setters for all state properties', () => {
      const { result } = renderHook(() => useGetQuoteOrchestrator(mockConfig));

      expect(typeof result.current.setCurrentStep).toBe('function');
      expect(typeof result.current.setVehicleSubStep).toBe('function');
      expect(typeof result.current.setPersonalSubStep).toBe('function');
      expect(typeof result.current.setCoverSubStep).toBe('function');
      expect(typeof result.current.setClaims).toBe('function');
      expect(typeof result.current.setConvictions).toBe('function');
      expect(typeof result.current.setAdditionalDrivers).toBe('function');
      expect(typeof result.current.setCarOwnerData).toBe('function');
      expect(typeof result.current.setNcdData).toBe('function');
      expect(typeof result.current.setProductsData).toBe('function');
      expect(typeof result.current.setContactInformationData).toBe('function');
    });
  });

  describe('UI State Management', () => {
    it('should initialize with correct loading states', () => {
      const { result } = renderHook(() => useGetQuoteOrchestrator(mockConfig));

      expect(result.current.showLoading).toBe(false);
      expect(result.current.isSubmitting).toBe(false);
      expect(result.current.foundVehicleData).toBeNull();
      expect(result.current.isEditingCarDetails).toBe(false);
    });

    it('should have UI state setters', () => {
      const { result } = renderHook(() => useGetQuoteOrchestrator(mockConfig));

      expect(typeof result.current.setShowLoading).toBe('function');
      expect(typeof result.current.setIsSubmitting).toBe('function');
      expect(typeof result.current.setFoundVehicleData).toBe('function');
      expect(typeof result.current.setIsEditingCarDetails).toBe('function');
    });
  });

  describe('Empty Arrays', () => {
    it('should initialize arrays as empty', () => {
      const { result } = renderHook(() => useGetQuoteOrchestrator(mockConfig));

      expect(result.current.claims).toEqual([]);
      expect(result.current.convictions).toEqual([]);
      expect(result.current.additionalDrivers).toEqual([]);
      expect(result.current.driverClaims).toEqual([]);
      expect(result.current.driverConvictions).toEqual([]);
    });
  });
});
