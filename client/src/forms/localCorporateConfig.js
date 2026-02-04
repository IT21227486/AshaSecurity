// forms/localCorporateConfig.js
// Local -> Corporate onboarding (6-step)

const emptyDirector = () => ({
  fullName: "",
  nicOrPassport: "",
  designation: "",
  address: "",
});

const emptyBeneficialOwner = () => ({
  name: "",
  nicOrPassport: "",
  dob: "",
  currentAddress: "",
  sourceOfBeneficialOwnership: "",
  pep: "",
});


export const localCorporateSteps = [
  { key: "clientRegistration", title: "Client Registration" },
  { key: "creditFacility", title: "Agreement - Credit Facility" },
  { key: "paymentInstruction", title: "Payment Instructions" },
  { key: "kyc", title: "KYC Form" },
  { key: "beneficialOwnership", title: "Beneficial Ownership Form" },
  { key: "additionalRequirements", title: "Additional Requirements" },
];

export const localCorporateEmpty = {
  clientRegistration: {
    // CLIENT REGISTRATION FORM (FOR COMPANIES) - fields per your screenshots
    companyName: "",

    telNos: "",
    email: "",
    faxNos: "",
    website: "",

    registeredAddress: "",
    correspondenceAddress: "",

    businessRegNo: "",
    dateOfIncorporation: "", // stored as YYYY-MM-DD from <input type="date">
    natureOfBusiness: "",

    bankAccountDetails: {
      bankName: "",
      branchName: "",
      typeOfAccount: "",
      accountNo: "",
    },

    presentBrokers: "",

    // These are captured via FileUpload components in the UI (stored separately as File objects in parent state)
    // director1Sig, director2Sig, companySeal -> keep as external state (not inside this JSON)

    correspondenceContact: {
      name: "",
      telNo: "",
      faxNo: "",
    },

    // Optional proof upload (if you keep it in UI)
    // corpRegCert -> keep as external state (File)

    // Keeping your older structure so other parts won't crash if still referenced somewhere
    authorisedPerson: {
      fullName: "",
      nicOrPassport: "",
      designation: "",
      mobile: "",
      email: "",
    },

    // Keeping directors array (if you still use it elsewhere)
    directors: [emptyDirector()],

    notes: "",
  },

  creditFacility: {
    // Used by CreditFacilityAgreementLocalCorporate.jsx
    date: { day: "", month: "", year: "" },
    client: {
      name: "",
      nicCds: "",
      address: "",
      includeTheSaid: "",
    },
    execution: {
      name: "",
      date: "",
      month: "",
      year: "",
      witness1: { name: "", nic: "" },
      witness2: { name: "", nic: "" },
    },
  },

  paymentInstruction: {
    // PaymentInstruction.jsx reads `form.paymentInstruction.*`
    date: "",
    bankName: "",
    branch: "",
    accountName: "",
    accountNumber: "",
    currency: "LKR",
    notes: "",

    // Witness/Advisor section (auto-filled from Credit Facility step)
    witness: { name: "", idNo: "" },
  },

  kyc: {
    taxResidentCountries: "",
    sourceOfFunds: "",
    annualTurnover: "",
    pep: "No",
    sanctions: "No",
    usPerson: "No",
    bankName: "",
    bankAccount: "",
    bankBranch: "",
    directors: [emptyDirector()],
    notes: "",
  },

  beneficialOwnership: {
    // BENEFICIAL OWNERSHIP FORM (Appendix I)
    beneficialOwners: [
      {
        name: "",
        nicOrPassport: "",
        dob: "",
        currentAddress: "",
        sourceOfBeneficialOwnership: "",
        pep: "", // Yes / No
      },
    ],

    // Details of the Customer Authorized to Act on Behalf of Entity
    authorizedCustomer: {
      name: "",
      nicOrPassport: "",
      dob: "",
    },

    // Verification of Beneficial Ownership
    verificationText: "",

    // Authorized Financial Institution Official
    afiOfficial: {
      name: "",
      nicOrPassport: "",
      dob: "",
    },

    // Declaration of Beneficial Ownership (Customer Identification)
    declaration: {
      naturalPersonName: "",
      naturalPersonDesignation: "",
      legalPersonName: "",
      legalPersonRegNo: "",
      legalPersonAddress: "",
      arrangementName: "",
      arrangementDeedNo: "",
      arrangementTrustee: "",
      arrangementAddress: "",
      beneficialOwnerStatus: "", // "is" or "is_not"
    },

    notes: "",
  },

  additionalRequirements: {
    notes: "",
    requestedByBroker: "",
    dueDate: "",
  },

  accepted: false,
};
