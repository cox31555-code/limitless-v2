import { z } from "zod";

// Vehicle Details Schema with conditional validation
export const vehicleDetailsSchema = z
  .object({
    registrationNumber: z
      .string()
      .max(15, "Registration number cannot exceed 15 characters")
      .transform((val) => val.toUpperCase())
      .optional(),
    type: z.string().optional(),
    make: z.string().optional(),
    model: z.string().optional(),
    year: z.string().optional(),
    fuel: z.string().optional(),
    transmission: z.string().optional(),
    doors: z.string().optional(),
    colour: z.string().optional(),
    worth: z.string().optional(), // Made optional - will be validated conditionally
    carValue: z.string().optional(),
    estimatedValue: z.string().optional(),
    // Annual insurance specific fields
    trackingDevice: z.string().optional(),
    alarmImmobiliser: z.string().optional(),
    importedVehicle: z.string().optional(),
    vehicleModified: z.string().optional(),
    vehicleModifications: z.array(z.string()).optional(),
    purchaseDate: z.string().optional(),
    legalOwner: z.string().optional(),
    owner: z.string().optional(),
    ownerOther: z.string().optional(),
    registeredKeeper: z.string().optional(),
    registeredKeeperOther: z.string().optional(),
    apiData: z
      .object({
        registration: z.string().optional(),
        make: z.string().optional(),
        model: z.string().optional(),
        year: z.string().optional(),
        fuel: z.string().optional(),
        transmission: z.string().optional(),
        colour: z.string().optional(),
        cylinderCapacity: z.string().optional(),
        insuranceGroup: z.string().optional(),
      })
      .nullable()
      .optional(),
  })
  .refine(
    (data) => {
      // If we have API data with required fields, validation passes
      if (data.apiData && data.apiData.make && data.apiData.model) {
        return true;
      }

      // Check if we have manual fields (registration number is optional)
      const hasManualFields =
        data.type &&
        data.type.length > 0 &&
        data.make &&
        data.make.length > 0 &&
        data.model &&
        data.model.length > 0;

      return hasManualFields;
    },
    {
      message:
        "Please fill in vehicle details: type, make, and model are required (registration number is optional)",
      path: ["type"],
    }
  )
  .refine(
    (data) => {
      // If we have API data, worth is not required
      if (data.apiData && data.apiData.make && data.apiData.model) {
        return true;
      }
      // Otherwise, worth is required
      return data.worth && data.worth.trim().length > 0;
    },
    {
      message: "Vehicle worth is required when entering manual vehicle details",
      path: ["worth"],
    }
  );

// Cover Details Schema - for temporary/impound insurance
export const coverDetailsSchema = z.object({
  type: z.enum(["Hours", "Days", "Weeks", "Months", "Years"], {
    required_error: "Cover type is required",
  }),
  period: z
    .number()
    .min(1, "Period must be at least 1")
    .max(365, "Period cannot exceed 365"),
  startDate: z.string().min(1, "Start date is required"),
  startTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Please enter a valid time format (HH:MM)"
    ),
});

// Cover Details Schema - for annual insurance
export const annualCoverDetailsSchema = z.object({
  level: z.enum(["comprehensive", "tpft", "tpo"], {
    required_error: "Please select a cover level",
  }),
  startDate: z.string().min(1, "Start date is required"),
});

// User Details Schema
export const userDetailsSchema = z
  .object({
    title: z.string().optional(),
    firstName: z
      .string()
      .optional(),
    surname: z
      .string()
      .optional(),
    maritalStatus: z.string().optional(),
    email: z
      .string()
      .optional(),
    phone: z
      .string()
      .optional(),
    dateOfBirth: z.string().optional(),
    postCode: z.string().optional(),
    address: z.string().optional(),
    employmentStatus: z.string().optional(),
    occupation: z.string().optional(),
    industry: z.string().optional(),
    studentType: z.string().optional(),
    houseNumber: z.string().optional(),
    postcode: z.string().optional(),
    addressLine1: z.string().optional(),
    addressLine2: z.string().optional(),
    addressLine3: z.string().optional(),
    city: z.string().optional(),
    manualPostcode: z.string().optional(),
    ownsHome: z.boolean().nullable().optional(),
    childrenUnder16: z.boolean().nullable().optional(),
    livedInUKSinceBirth: z.boolean().nullable().optional(),
  })
  .refine(
    (data) => {
      // If employment status is Retired, Unemployed, or Student, industry is not required
      if (["Retired", "Unemployed", "Student"].includes(data.employmentStatus)) {
        return true;
      }
      // If Houseperson, industry and occupation can be N/A
      if (data.employmentStatus === "Houseperson") {
        return true;
      }
      // Otherwise, industry is required
      return data.industry && data.industry.trim().length > 0;
    },
    {
      message: "Industry is required for this employment status",
      path: ["industry"],
    }
  )
  .refine(
    (data) => {
      // If employment status is Retired, Unemployed, Houseperson, or Student, occupation is not required
      if (["Retired", "Unemployed", "Houseperson", "Student"].includes(data.employmentStatus)) {
        return true;
      }
      // Otherwise, occupation is required
      return data.occupation && data.occupation.trim().length > 0;
    },
    {
      message: "Occupation is required for this employment status",
      path: ["occupation"],
    }
  )
  .refine(
    (data) => {
      // If employment status is Student, studentType is required
      if (data.employmentStatus === "Student") {
        return data.studentType && data.studentType.trim().length > 0;
      }
      // For all other employment statuses, studentType is not required
      return true;
    },
    {
      message: "Please select a student type",
      path: ["studentType"],
    }
  );

// Car Usage Schema
export const carUsageSchema = z.object({
  industry: z.string().optional().default(""),
  keepingCarDuringDay: z.enum(
    [
      "At home",
      "Office or factory car park",
      "Open public car park",
      "Secure public car park",
      "Street away from home",
    ]
  ).optional(),
  keepingCarDuringNight: z.enum(
    [
      "Drive",
      "Street outside home",
      "Locked garage",
      "Street away from home",
      "Public car park",
      "Work car park",
      "Private property",
    ]
  ).optional(),
  usageType: z.enum(
    [
      "Social use only",
      "Social and commuting",
      "Social, commuting and business",
    ]
  ).optional(),
  otherVehicles: z.boolean().nullable(),
  otherVehiclesType: z.enum(
    [
      "Own another car or van",
      "Have use of another car",
      "Company car (including personal use)",
      "Company car (excluding personal use)",
    ]
  ).optional(),
  hasAdditionalQualifications: z.string().optional(),
  additionalQualificationType: z.enum(
    [
      "AA Proficiency",
      "Institute of Advanced Motorists",
      "Pass Plus",
    ]
  ).optional(),
  qualificationMonth: z.string().optional(),
  qualificationYear: z.string().optional(),
  ownsHome: z.boolean().nullable(),
  childrenUnder16: z.boolean().nullable(),
  livedInUKSinceBirth: z.boolean().nullable(),
  licenseType: z.string().optional(),
  licenseIssueCountry: z.string().optional(),
  licenseHeld: z.string().optional(),
  licenseNumber: z.string().optional(),
  licenseNumberFirst: z.string().optional(),
  licenseNumberLast: z.string().optional(),
  licenseNumberNI: z.string().optional(),
  declineShareLicenseNumber: z.boolean().optional(),
  NCB: z.string().optional(),
  voluntaryExcess: z.string().optional(),
  annualMileage: z.string().optional().nullable().refine(
    (val) => {
      if (!val || val.trim() === '') return true;
      const num = parseInt(val, 10);
      return !isNaN(num) && num >= 100 && num <= 20000;
    },
    {
      message: "Annual mileage must be between 100 and 20,000 miles",
    }
  ),
  criminalConvictions: z.string().optional(),
  convictions: z.array(z.any()).default([]),
  medicalConditions: z.string().optional(),
  dvlaConditionType: z.string().optional(),
  insuranceCancelledOrClaimRefusedOrPolicyVoided: z.string().optional(),
  hasAdditionalDrivers: z.boolean().nullable().default(null),
  additionalDrivers: z.array(z.object({
    relationship: z.string().optional(),
    title: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    dateOfBirth: z.string().optional(),
    relationshipStatus: z.string().optional(),
    livedInUKSinceBirth: z.boolean().nullable(),
    employmentStatus: z.string().optional(),
    licenseType: z.string().optional(),
    licenseHeld: z.string().optional(),
    otherVehicles: z.boolean().nullable(),
    medicalConditions: z.boolean().nullable(),
    dvlaConditionType: z.string().optional().nullable(),
    insuranceHistory: z.boolean().nullable(),
    criminalConvictions: z.boolean().nullable(),
  }).refine(
    (driver) => {
      // If medical conditions is true, dvlaConditionType must be selected
      if (driver.medicalConditions === true && !driver.dvlaConditionType) {
        return false;
      }
      return true;
    },
    {
      message: "Please select a DVLA status for your medical condition",
      path: ["dvlaConditionType"],
    }
  )).default([]).optional(),
}).refine(
  (data) => {
    // If hasAdditionalQualifications is "Yes", all qualification fields must be filled
    if (data.hasAdditionalQualifications === "Yes") {
      return data.additionalQualificationType && data.qualificationMonth && data.qualificationYear;
    }
    return true;
  },
  {
    message: "Please complete all qualification details",
    path: ["additionalQualificationType"],
  }
).refine(
  (data) => {
    // If it's a UK licence type and user hasn't declined to share licence number
    const nonUKTypes = ["Full International Licence", "Full EU Licence", "Full European non-EU Licence"];
    const isUKLicence = data.licenseType && !nonUKTypes.includes(data.licenseType);

    if (isUKLicence && !data.declineShareLicenseNumber) {
      // Check based on country: Northern Ireland requires 8 digits, Great Britain requires First 11 + Last 5
      if (data.licenseIssueCountry === "Northern Ireland") {
        return data.licenseNumberNI && data.licenseNumberNI.length > 0;
      } else if (data.licenseIssueCountry === "England, Scotland or Wales (Great Britain)") {
        return (data.licenseNumberFirst && data.licenseNumberFirst.length > 0) &&
               (data.licenseNumberLast && data.licenseNumberLast.length > 0);
      }
    }
    return true;
  },
  {
    message: "Please provide your licence number or decline to share it",
    path: ["licenseNumberFirst"],
  }
).refine(
  (data) => {
    // If medicalConditions is "Yes", dvlaConditionType must be provided
    if (data.medicalConditions === "Yes") {
      return data.dvlaConditionType && data.dvlaConditionType.length > 0;
    }
    return true;
  },
  {
    message: "Please select a DVLA status for your medical condition",
    path: ["dvlaConditionType"],
  }
);

// Terms and Conditions Schema
export const termsSchema = z.object({
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions to proceed",
  }),
  acceptMarketing: z.boolean().default(false),
});

// Main Insurance Schema
export const insuranceSchema = z.object({
  type: z.enum(["Impound", "Delivery", "Temp", "Other"], {
    required_error: "Insurance type is required",
  }),
  vehicleDetails: vehicleDetailsSchema,
  coverDetails: coverDetailsSchema,
  userDetails: userDetailsSchema.optional(), // Optional for dashboard users
  carUsage: carUsageSchema,
  terms: termsSchema,
}).refine(
  (data) => {
    // Validate NCB against date of birth
    // User cannot have NCB before their 17th birthday
    if (data.userDetails?.dateOfBirth && data.carUsage?.NCB) {
      const dob = new Date(data.userDetails.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();

      // Calculate exact age
      let exactAge = age;
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        exactAge--;
      }

      // Maximum NCB years = current age - 17 (minimum driving age)
      const maxNCBYears = Math.max(0, exactAge - 17);

      // Parse NCB value (handle "15+" case)
      const ncbValue = data.carUsage.NCB === "15+" ? 15 : parseInt(data.carUsage.NCB);

      if (ncbValue > maxNCBYears) {
        return false;
      }
    }
    return true;
  },
  {
    message: "No claims bonus years cannot exceed the years since you turned 17",
    path: ["carUsage", "NCB"],
  }
);

// Optional Extras Schema - for annual insurance
export const optionalExtrasSchema = z.object({
  protectedNCD: z.boolean().optional(),
  motorLegal: z.boolean().optional(),
  courtesyCar: z.boolean().optional(),
  breakdownCover: z.boolean().optional(),
  foreignUseCover: z.boolean().optional(),
}).optional();

// Annual Insurance Schema
export const annualInsuranceSchema = z.object({
  type: z.enum(["Annual"], {
    required_error: "Insurance type is required",
  }),
  vehicleDetails: vehicleDetailsSchema,
  coverDetails: annualCoverDetailsSchema,
  optionalExtras: optionalExtrasSchema,
  userDetails: userDetailsSchema.optional(), // Optional for dashboard users
  carUsage: carUsageSchema,
  terms: termsSchema,
}).refine(
  (data) => {
    // Validate NCB against date of birth
    // User cannot have NCB before their 17th birthday
    if (data.userDetails?.dateOfBirth && data.carUsage?.NCB) {
      const dob = new Date(data.userDetails.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();

      // Calculate exact age
      let exactAge = age;
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        exactAge--;
      }

      // Maximum NCB years = current age - 17 (minimum driving age)
      const maxNCBYears = Math.max(0, exactAge - 17);

      // Parse NCB value (handle "15+" case)
      const ncbValue = data.carUsage.NCB === "15+" ? 15 : parseInt(data.carUsage.NCB);

      if (ncbValue > maxNCBYears) {
        return false;
      }
    }
    return true;
  },
  {
    message: "No claims bonus years cannot exceed the years since you turned 17",
    path: ["carUsage", "NCB"],
  }
);

// Schema for dashboard users (without userDetails)
export const dashboardInsuranceSchema = z.object({
  type: z.enum(["Impound", "Delivery", "Temp", "Other"], {
    required_error: "Insurance type is required",
  }),
  vehicleDetails: vehicleDetailsSchema,
  coverDetails: coverDetailsSchema,
  carUsage: carUsageSchema,
  terms: termsSchema,
});

export default insuranceSchema;
