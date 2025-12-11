/**
 * Unified session storage manager for all get-quote flows (Annual, Temporary, Impound)
 * Handles save/load of quote state to sessionStorage with automatic key generation
 */

export type InsuranceType = 'Annual' | 'Temp' | 'Impound';

export interface QuoteFormState {
  formData: Record<string, any>;
  currentStep: number;
  vehicleSubStep: string;
  personalSubStep: string;
  coverSubStep: string;
  additionalDrivers: any[];
  claims: any[];
  convictions: any[];
  driverClaims: any[];
  driverConvictions: any[];
  carOwnerData: any | null;
  ncdData: any | null;
  productsData: any | null;
  contactInformationData: any | null;
  foundVehicleData: any | null;
}

/**
 * Generate session storage key based on insurance type
 * @param insuranceType - The type of insurance (Annual, Temp, Impound)
 * @returns The session key (e.g., "annualQuoteFormState", "tempQuoteFormState")
 */
export function getSessionKeyForType(insuranceType: InsuranceType): string {
  const typeMap: Record<InsuranceType, string> = {
    Annual: 'annualQuoteFormState',
    Temp: 'temporaryQuoteFormState',
    Impound: 'impoundQuoteFormState',
  };
  return typeMap[insuranceType];
}

/**
 * Save quote form state to sessionStorage
 * @param insuranceType - The type of insurance
 * @param state - The state object to save
 */
export function saveQuoteState(insuranceType: InsuranceType, state: Partial<QuoteFormState>): void {
  if (typeof window === 'undefined') return;
  
  try {
    const key = getSessionKeyForType(insuranceType);
    sessionStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.error(`Failed to save ${insuranceType} quote state to sessionStorage:`, error);
  }
}

/**
 * Load quote form state from sessionStorage
 * @param insuranceType - The type of insurance
 * @returns The saved state or null if not found
 */
export function loadQuoteState(insuranceType: InsuranceType): Partial<QuoteFormState> | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const key = getSessionKeyForType(insuranceType);
    const savedState = sessionStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : null;
  } catch (error) {
    console.error(`Failed to load ${insuranceType} quote state from sessionStorage:`, error);
    return null;
  }
}

/**
 * Clear quote form state from sessionStorage
 * @param insuranceType - The type of insurance
 */
export function clearQuoteState(insuranceType: InsuranceType): void {
  if (typeof window === 'undefined') return;
  
  try {
    const key = getSessionKeyForType(insuranceType);
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to clear ${insuranceType} quote state from sessionStorage:`, error);
  }
}

/**
 * Clear all quote states from sessionStorage
 */
export function clearAllQuoteStates(): void {
  if (typeof window === 'undefined') return;
  
  try {
    ['annualQuoteFormState', 'temporaryQuoteFormState', 'impoundQuoteFormState'].forEach(key => {
      sessionStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Failed to clear all quote states from sessionStorage:', error);
  }
}

/**
 * Check if a quote state exists in sessionStorage
 * @param insuranceType - The type of insurance
 * @returns True if state exists, false otherwise
 */
export function hasQuoteState(insuranceType: InsuranceType): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const key = getSessionKeyForType(insuranceType);
    return sessionStorage.getItem(key) !== null;
  } catch (error) {
    console.error(`Failed to check ${insuranceType} quote state:`, error);
    return false;
  }
}
