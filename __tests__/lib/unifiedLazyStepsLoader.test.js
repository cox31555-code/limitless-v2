/**
 * Tests for unifiedLazyStepsLoader
 * Tests lazy component loading, caching, and factory functions
 */

import {
  createLazyStepsMap,
  clearComponentCache,
  getCacheStats,
  StepFallback,
} from '@/lib/unifiedLazyStepsLoader';

describe('unifiedLazyStepsLoader', () => {
  beforeEach(() => {
    clearComponentCache();
  });

  describe('StepFallback component', () => {
    it('should render without error', () => {
      const result = StepFallback();
      expect(result).toBeDefined();
      expect(result.type).toBe('div');
      expect(result.props.children).toBe('Loading...');
    });

    it('should have correct styling', () => {
      const result = StepFallback();
      const style = result.props.style;
      expect(style.display).toBe('flex');
      expect(style.justifyContent).toBe('center');
      expect(style.alignItems).toBe('center');
    });
  });

  describe('createLazyStepsMap', () => {
    it('should return object with vehicle steps for Annual', () => {
      const steps = createLazyStepsMap('Annual');
      expect(steps.carValue).toBeDefined();
      expect(steps.carUsage).toBeDefined();
      expect(steps.carStorage).toBeDefined();
      expect(steps.otherCars).toBeDefined();
    });

    it('should return object with personal steps for Annual', () => {
      const steps = createLazyStepsMap('Annual');
      expect(steps.aboutYou).toBeDefined();
      expect(steps.household).toBeDefined();
      expect(steps.employment).toBeDefined();
      expect(steps.licence).toBeDefined();
      expect(steps.restrictions).toBeDefined();
      expect(steps.claims).toBeDefined();
    });

    it('should return object with cover steps for Annual', () => {
      const steps = createLazyStepsMap('Annual');
      expect(steps.details).toBeDefined();
      expect(steps.additionalDrivers).toBeDefined();
      expect(steps.addDriver).toBeDefined();
      expect(steps.carOwner).toBeDefined();
      expect(steps.cover).toBeDefined();
      expect(steps.ncd).toBeDefined();
      expect(steps.additionalProducts).toBeDefined();
      expect(steps.contactInformation).toBeDefined();
    });

    it('should return object with check answers step for Annual', () => {
      const steps = createLazyStepsMap('Annual');
      expect(steps.checkAnswers).toBeDefined();
    });

    it('should return steps for Temp flow', () => {
      const steps = createLazyStepsMap('Temp');
      expect(steps.carValue).toBeDefined();
      expect(steps.aboutYou).toBeDefined();
      expect(steps.carOwner).toBeDefined();
      expect(steps.checkAnswers).toBeDefined();
    });

    it('should return steps for Impound flow', () => {
      const steps = createLazyStepsMap('Impound');
      expect(steps.registration).toBeDefined();
      expect(steps.carValue).toBeDefined();
      expect(steps.aboutYou).toBeDefined();
      expect(steps.carOwner).toBeDefined();
      expect(steps.checkAnswers).toBeDefined();
    });

    it('should default to Annual flow for unknown type', () => {
      const steps = createLazyStepsMap('Unknown');
      expect(steps.carValue).toBeDefined();
      expect(steps.aboutYou).toBeDefined();
    });
  });

  describe('Component caching', () => {
    it('should cache components to avoid reloading', () => {
      const steps1 = createLazyStepsMap('Annual');
      const steps2 = createLazyStepsMap('Annual');

      // Both calls should return the same cached components
      expect(steps1.carValue).toBe(steps2.carValue);
      expect(steps1.aboutYou).toBe(steps2.aboutYou);
    });

    it('should cache components independently for each flow', () => {
      const annualSteps = createLazyStepsMap('Annual');
      const tempSteps = createLazyStepsMap('Temp');

      // Different flows should have different cache keys
      expect(annualSteps.carValue).not.toBe(tempSteps.carValue);
    });

    it('should track cache size', () => {
      createLazyStepsMap('Annual');
      const stats = getCacheStats();

      expect(stats.size).toBeGreaterThan(0);
      expect(stats.keys).toBeDefined();
      expect(Array.isArray(stats.keys)).toBe(true);
    });

    it('should clear cache', () => {
      createLazyStepsMap('Annual');
      let stats = getCacheStats();
      expect(stats.size).toBeGreaterThan(0);

      clearComponentCache();
      stats = getCacheStats();
      expect(stats.size).toBe(0);
    });
  });

  describe('Flow-specific variations', () => {
    it('Annual should have more steps than Temp', () => {
      const annualSteps = createLazyStepsMap('Annual');
      const tempSteps = createLazyStepsMap('Temp');

      const annualKeys = Object.keys(annualSteps).filter((k) => annualSteps[k]);
      const tempKeys = Object.keys(tempSteps).filter((k) => tempSteps[k]);

      expect(annualKeys.length).toBeGreaterThan(tempKeys.length);
    });

    it('Impound should have registration step', () => {
      const impoundSteps = createLazyStepsMap('Impound');
      expect(impoundSteps.registration).toBeDefined();
    });

    it('Temp should not have additionalDrivers substeps', () => {
      const tempSteps = createLazyStepsMap('Temp');
      expect(tempSteps.additionalDrivers).toBeUndefined();
      expect(tempSteps.addDriver).toBeUndefined();
    });
  });
});
