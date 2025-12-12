/**
 * Tests for getQuoteFieldValidator
 * Tests field validation configuration and step-specific field lists
 */

import {
  STEPS,
  vehicleFields,
  step2PersonalFields,
  step2HouseholdFields,
  step2EmploymentFields,
  step2LicenceFields,
  step2LicenceRestrictionsFields,
  step2ClaimsAndConvictionsFields,
  coverFieldsAnnual,
  coverFieldsTemporary,
  coverFieldsImpound,
  getFieldsForStep,
  getAllFieldsForFlow,
  DEFAULT_COVER_SUBSTEP,
} from '@/lib/getQuoteFieldValidator';

describe('getQuoteFieldValidator', () => {
  describe('STEPS constant', () => {
    it('should have correct step values', () => {
      expect(STEPS.VEHICLE).toBe(1);
      expect(STEPS.PERSONAL).toBe(2);
      expect(STEPS.COVER).toBe(3);
      expect(STEPS.CHECK_ANSWERS).toBe(4);
    });
  });

  describe('Field definitions', () => {
    it('vehicleFields should contain registration and other vehicle details', () => {
      expect(vehicleFields).toContain('vehicleDetails.registrationNumber');
      expect(vehicleFields).toContain('vehicleDetails.type');
      expect(vehicleFields).toContain('vehicleDetails.make');
      expect(vehicleFields.length).toBeGreaterThan(10);
    });

    it('step2PersonalFields should contain basic personal info', () => {
      expect(step2PersonalFields).toContain('userDetails.firstName');
      expect(step2PersonalFields).toContain('userDetails.surname');
      expect(step2PersonalFields).toContain('userDetails.dateOfBirth');
    });

    it('coverFieldsTemporary should include time fields', () => {
      expect(coverFieldsTemporary).toContain('coverDetails.startTime');
      expect(coverFieldsTemporary).toContain('coverDetails.endTime');
      expect(coverFieldsTemporary.length).toBeGreaterThan(coverFieldsAnnual.length);
    });

    it('coverFieldsAnnual should not include time fields', () => {
      expect(coverFieldsAnnual).not.toContain('coverDetails.startTime');
      expect(coverFieldsAnnual).not.toContain('coverDetails.endTime');
    });
  });

  describe('getFieldsForStep', () => {
    it('should return vehicleFields for VEHICLE step', () => {
      const fields = getFieldsForStep(STEPS.VEHICLE, undefined, 'Annual');
      expect(fields).toEqual(vehicleFields);
    });

    it('should return step2PersonalFields for PERSONAL step with aboutYou substep', () => {
      const fields = getFieldsForStep(STEPS.PERSONAL, 'aboutYou', 'Annual');
      expect(fields).toEqual(step2PersonalFields);
    });

    it('should return step2HouseholdFields for PERSONAL step with household substep', () => {
      const fields = getFieldsForStep(STEPS.PERSONAL, 'household', 'Annual');
      expect(fields).toEqual(step2HouseholdFields);
    });

    it('should return step2EmploymentFields for PERSONAL step with employment substep', () => {
      const fields = getFieldsForStep(STEPS.PERSONAL, 'employment', 'Annual');
      expect(fields).toEqual(step2EmploymentFields);
    });

    it('should return step2LicenceFields for PERSONAL step with licence substep', () => {
      const fields = getFieldsForStep(STEPS.PERSONAL, 'licence', 'Annual');
      expect(fields).toEqual(step2LicenceFields);
    });

    it('should return step2LicenceRestrictionsFields for PERSONAL step with restrictions substep', () => {
      const fields = getFieldsForStep(STEPS.PERSONAL, 'restrictions', 'Annual');
      expect(fields).toEqual(step2LicenceRestrictionsFields);
    });

    it('should return step2ClaimsAndConvictionsFields for PERSONAL step with claims substep', () => {
      const fields = getFieldsForStep(STEPS.PERSONAL, 'claims', 'Annual');
      expect(fields).toEqual(step2ClaimsAndConvictionsFields);
    });

    it('should return coverFieldsAnnual for COVER step with Annual flow', () => {
      const fields = getFieldsForStep(STEPS.COVER, undefined, 'Annual');
      expect(fields).toEqual(coverFieldsAnnual);
    });

    it('should return coverFieldsTemporary for COVER step with Temp flow', () => {
      const fields = getFieldsForStep(STEPS.COVER, undefined, 'Temp');
      expect(fields).toEqual(coverFieldsTemporary);
    });

    it('should return coverFieldsImpound for COVER step with Impound flow', () => {
      const fields = getFieldsForStep(STEPS.COVER, undefined, 'Impound');
      expect(fields).toEqual(coverFieldsImpound);
    });

    it('should return empty array for CHECK_ANSWERS step', () => {
      const fields = getFieldsForStep(STEPS.CHECK_ANSWERS, undefined, 'Annual');
      expect(fields).toEqual([]);
    });

    it('should return empty array for unknown step', () => {
      const fields = getFieldsForStep(999, undefined, 'Annual');
      expect(fields).toEqual([]);
    });

    it('should default to first field set when substep is unknown', () => {
      const fields = getFieldsForStep(STEPS.PERSONAL, 'unknown', 'Annual');
      expect(fields).toEqual(step2PersonalFields);
    });
  });

  describe('getAllFieldsForFlow', () => {
    it('should return all fields for Annual flow', () => {
      const fields = getAllFieldsForFlow('Annual');
      expect(fields).toContain('vehicleDetails.registrationNumber');
      expect(fields).toContain('userDetails.firstName');
      expect(fields).toContain('coverDetails.level');
      expect(fields).not.toContain('coverDetails.startTime');
    });

    it('should return all fields including time fields for Temp flow', () => {
      const fields = getAllFieldsForFlow('Temp');
      expect(fields).toContain('vehicleDetails.registrationNumber');
      expect(fields).toContain('userDetails.firstName');
      expect(fields).toContain('coverDetails.level');
      expect(fields).toContain('coverDetails.startTime');
      expect(fields).toContain('coverDetails.endTime');
    });

    it('should return all fields for Impound flow', () => {
      const fields = getAllFieldsForFlow('Impound');
      expect(fields).toContain('vehicleDetails.registrationNumber');
      expect(fields).toContain('userDetails.firstName');
      expect(fields).toContain('coverDetails.level');
    });

    it('should have more fields for Temp than Annual', () => {
      const annualFields = getAllFieldsForFlow('Annual');
      const tempFields = getAllFieldsForFlow('Temp');
      expect(tempFields.length).toBeGreaterThan(annualFields.length);
    });
  });

  describe('DEFAULT_COVER_SUBSTEP', () => {
    it('should be "details" for Annual', () => {
      expect(DEFAULT_COVER_SUBSTEP.Annual).toBe('details');
    });

    it('should be "carOwner" for Temp', () => {
      expect(DEFAULT_COVER_SUBSTEP.Temp).toBe('carOwner');
    });

    it('should be "carOwner" for Impound', () => {
      expect(DEFAULT_COVER_SUBSTEP.Impound).toBe('carOwner');
    });
  });
});
