export const mockPolicies = {
  // Annual Policy
  "ANNUAL-001": {
    _id: "ANNUAL-001",
    type: "Annual",
    policyNumber: "LC-ANNUAL-001",
    vehicleDetails: {
      registrationNumber: "AB21DEV",
      make: "BMW",
      model: "3 Series",
      year: "2021",
      type: "Saloon",
      colour: "Black",
      fuel: "Petrol",
      transmission: "Automatic",
      doors: "4",
      worth: "£45,000",
      trackingDevice: "No",
      alarmImmobiliser: "Yes",
      importedVehicle: "No",
      vehicleModified: "No",
      vehicleModifications: [],
      purchaseDate: "2021-03-15",
      legalOwner: "Dev User",
      owner: "Dev User",
      registeredKeeper: "Dev User"
    },
    coverDetails: {
      level: "Comprehensive",
      startDate: "2024-01-15",
      startTime: "00:00",
      period: "12",
      type: "Months"
    },
    userDetails: {
      firstName: "Dev",
      surname: "User",
      dateOfBirth: "1990-05-20",
      email: "dev@limitlesscover.co.uk",
      phone: "+44 7700 900000",
      postCode: "SW1A 1AA",
      address: "123 Main Street, London, United Kingdom",
      employmentStatus: "Employed",
      industry: "Technology",
      occupation: "Software Engineer"
    },
    carUsage: {
      keepingCarDuringDay: "On Road Parking",
      keepingCarDuringNight: "On Road Parking",
      usageType: "Commuting",
      otherVehicles: "Yes",
      otherVehiclesType: "Car",
      licenseType: "Full",
      licenseHeld: "2010",
      licenseNumber: "DEVUS901201AB9IJ",
      NCB: "5 Years",
      voluntaryExcess: "£500",
      criminalConvictions: "No",
      medicalConditions: "No",
      insuranceCancelledOrClaimRefusedOrPolicyVoided: "No",
      hasAdditionalQualifications: "Yes",
      additionalQualificationType: "Advanced Driving",
      qualificationMonth: "March",
      qualificationYear: "2023"
    },
    optionalExtras: {
      courtesyCar: true,
      breakdownCover: true,
      foreignUseCover: false
    },
    quote: {
      paid: true,
      amount: 649.99,
      totalPremium: "£649.99 for 12 months"
    }
  },

  // Temporary Policy
  "TEMP-001": {
    _id: "TEMP-001",
    type: "Temporary",
    policyNumber: "LC-TEMP-001",
    vehicleDetails: {
      registrationNumber: "CD22DEV",
      make: "Ford",
      model: "Focus",
      year: "2022",
      type: "Hatchback",
      colour: "Silver",
      fuel: "Diesel",
      transmission: "Manual",
      doors: "5",
      worth: "£28,000"
    },
    coverDetails: {
      level: "Third Party Fire and Theft",
      startDate: "2024-02-01",
      startTime: "14:30",
      period: "7",
      type: "Days"
    },
    userDetails: {
      firstName: "Jane",
      surname: "Smith",
      dateOfBirth: "1988-08-14",
      email: "jane.smith@email.com",
      phone: "+44 7700 900001",
      postCode: "M1 1AA",
      address: "456 Oak Avenue, Manchester, United Kingdom",
      employmentStatus: "Employed",
      industry: "Finance",
      occupation: "Accountant"
    },
    carUsage: {
      keepingCarDuringDay: "Work Parking",
      keepingCarDuringNight: "Garage",
      usageType: "Commuting",
      licenseType: "Full",
      licenseHeld: "2008",
      licenseNumber: "SMITH880814AB1CD",
      NCB: "No Claims Bonus",
      voluntaryExcess: "£250"
    },
    optionalExtras: {
      courtesyCar: false,
      breakdownCover: true,
      foreignUseCover: false
    },
    quote: {
      paid: true,
      amount: 49.99,
      totalPremium: "£49.99 for 7 days"
    }
  },

  // Impound Policy
  "IMPOUND-001": {
    _id: "IMPOUND-001",
    type: "Impound",
    policyNumber: "LC-IMPOUND-001",
    vehicleDetails: {
      registrationNumber: "EF23DEV",
      make: "Audi",
      model: "A4",
      year: "2023",
      type: "Saloon",
      colour: "White",
      fuel: "Petrol",
      transmission: "Automatic",
      doors: "4",
      worth: "£55,000"
    },
    coverDetails: {
      level: "Impound Insurance",
      startDate: "2024-01-20",
      startTime: "09:00",
      period: "30",
      type: "Days"
    },
    userDetails: {
      firstName: "John",
      surname: "Johnson",
      dateOfBirth: "1985-12-10",
      email: "john.johnson@email.com",
      phone: "+44 7700 900002",
      postCode: "B1 1AA",
      address: "789 Elm Road, Birmingham, United Kingdom",
      employmentStatus: "Self-Employed",
      industry: "Retail",
      occupation: "Business Owner"
    },
    carUsage: {
      keepingCarDuringDay: "On Road Parking",
      keepingCarDuringNight: "On Road Parking",
      usageType: "Business Use",
      licenseType: "Full",
      licenseHeld: "2005",
      licenseNumber: "JOHNSO851210AB2EF",
      NCB: "10 Years",
      voluntaryExcess: "£750"
    },
    optionalExtras: {
      courtesyCar: true,
      breakdownCover: true,
      foreignUseCover: true
    },
    quote: {
      paid: true,
      amount: 199.99,
      totalPremium: "£199.99 for 30 days"
    }
  }
};

export const getAllPolicies = () => {
  return Object.values(mockPolicies);
};

export const getPolicyById = (id) => {
  return mockPolicies[id] || null;
};
