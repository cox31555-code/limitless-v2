/**
 * Tests for getQuoteSessionManager
 * Tests session persistence, state management, and error handling
 */

import {
  getSessionKeyForType,
  saveQuoteState,
  loadQuoteState,
  clearQuoteState,
  clearAllQuoteStates,
  hasQuoteState,
} from '@/lib/getQuoteSessionManager';

describe('getQuoteSessionManager', () => {
  // Mock sessionStorage
  const localStorageMock = (() => {
    let store = {};

    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      removeItem: (key) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  beforeEach(() => {
    Object.defineProperty(window, 'sessionStorage', {
      value: localStorageMock,
    });
    window.sessionStorage.clear();
  });

  describe('getSessionKeyForType', () => {
    it('should return correct key for Annual', () => {
      expect(getSessionKeyForType('Annual')).toBe('annualQuoteFormState');
    });

    it('should return correct key for Temp', () => {
      expect(getSessionKeyForType('Temp')).toBe('temporaryQuoteFormState');
    });

    it('should return correct key for Impound', () => {
      expect(getSessionKeyForType('Impound')).toBe('impoundQuoteFormState');
    });
  });

  describe('saveQuoteState', () => {
    it('should save state to sessionStorage', () => {
      const state = { formData: { name: 'John' }, currentStep: 1 };
      saveQuoteState('Annual', state);

      const saved = window.sessionStorage.getItem('annualQuoteFormState');
      expect(saved).toBeDefined();
      expect(JSON.parse(saved)).toEqual(state);
    });

    it('should overwrite existing state', () => {
      const state1 = { currentStep: 1 };
      const state2 = { currentStep: 2 };

      saveQuoteState('Annual', state1);
      saveQuoteState('Annual', state2);

      const saved = JSON.parse(window.sessionStorage.getItem('annualQuoteFormState'));
      expect(saved.currentStep).toBe(2);
    });

    it('should handle different insurance types independently', () => {
      const annualState = { currentStep: 1 };
      const tempState = { currentStep: 2 };

      saveQuoteState('Annual', annualState);
      saveQuoteState('Temp', tempState);

      const annualSaved = JSON.parse(window.sessionStorage.getItem('annualQuoteFormState'));
      const tempSaved = JSON.parse(window.sessionStorage.getItem('temporaryQuoteFormState'));

      expect(annualSaved.currentStep).toBe(1);
      expect(tempSaved.currentStep).toBe(2);
    });
  });

  describe('loadQuoteState', () => {
    it('should load state from sessionStorage', () => {
      const state = { formData: { name: 'John' }, currentStep: 1 };
      saveQuoteState('Annual', state);

      const loaded = loadQuoteState('Annual');
      expect(loaded).toEqual(state);
    });

    it('should return null if no state exists', () => {
      const loaded = loadQuoteState('Annual');
      expect(loaded).toBeNull();
    });

    it('should handle corrupted JSON gracefully', () => {
      window.sessionStorage.setItem('annualQuoteFormState', 'invalid json');
      const loaded = loadQuoteState('Annual');
      expect(loaded).toBeNull();
    });
  });

  describe('clearQuoteState', () => {
    it('should clear specific flow state', () => {
      saveQuoteState('Annual', { currentStep: 1 });
      saveQuoteState('Temp', { currentStep: 2 });

      clearQuoteState('Annual');

      expect(window.sessionStorage.getItem('annualQuoteFormState')).toBeNull();
      expect(window.sessionStorage.getItem('temporaryQuoteFormState')).not.toBeNull();
    });
  });

  describe('clearAllQuoteStates', () => {
    it('should clear all flow states', () => {
      saveQuoteState('Annual', { currentStep: 1 });
      saveQuoteState('Temp', { currentStep: 2 });
      saveQuoteState('Impound', { currentStep: 3 });

      clearAllQuoteStates();

      expect(window.sessionStorage.getItem('annualQuoteFormState')).toBeNull();
      expect(window.sessionStorage.getItem('temporaryQuoteFormState')).toBeNull();
      expect(window.sessionStorage.getItem('impoundQuoteFormState')).toBeNull();
    });
  });

  describe('hasQuoteState', () => {
    it('should return true if state exists', () => {
      saveQuoteState('Annual', { currentStep: 1 });
      expect(hasQuoteState('Annual')).toBe(true);
    });

    it('should return false if state does not exist', () => {
      expect(hasQuoteState('Annual')).toBe(false);
    });

    it('should work independently for each flow type', () => {
      saveQuoteState('Annual', { currentStep: 1 });

      expect(hasQuoteState('Annual')).toBe(true);
      expect(hasQuoteState('Temp')).toBe(false);
      expect(hasQuoteState('Impound')).toBe(false);
    });
  });
});
