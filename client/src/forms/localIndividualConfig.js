// forms/localIndividualConfig.js

export const localIndividualSteps = [
  { key: "clientRegistration", title: "Client Registration" },
  { key: "declaration", title: "Declaration" },
  { key: "clientAgreement", title: "Client Agreement" },
  { key: "creditFacility", title: "Agreement - Credit Facility" },
  { key: "paymentInstruction", title: "Payment Instruction" },
  { key: "directionOnline", title: "Direction Online Form" },
];

const emptyParty = () => ({
  name: "",
  nicNo: "",
  address: "",
});

const emptyAgreementDoc = () => ({
  // date fields (easy to map to the doc style lines)
  date: {
    day: "",
    month: "",
    year: "",
  },

  // Parties for “By and Between”
  // 0: Principal, 1: Joint, 2: Second Joint (optional)
  parties: [emptyParty(), emptyParty(), emptyParty()],

  // Signatures / uploads (store file object or string path depending on your FileUpload design)
  signatures: {
    principal: null,
    joint1: null,
    joint2: null,
    firm: null,
    witness1: null,
    witness2: null,
  },

  // user confirmation
  accepted: false,

  // optional notes / extra fields
  notes: "",
});

export const localIndividualEmpty = {
  clientRegistration: {
    principal: {
      title: "",
      initials: "",
      namesByInitials: "",
      surname: "",
      telephoneHome: "",
      telephoneOffice: "",
      mobile: "",
      email: "",
      permanentAddress: "",
      correspondenceAddress: "",
      nic: "",
      nationality: "",
      nicDateOfIssue: "",
      occupation: "",
      employerAddress: "",
      contactNo: "",
      cds: { prefix: "MSB", number: "" },
      bank: { bankName: "", branchName: "", accountType: "", accountNo: "" },
      stockMarketExperience: "",
      presentBrokers: "",
      investmentDecision: {
        discretionary: false,
        nonDiscretionary: false,
        fillDiscretionaryForm: false,
      },
    },

    jointApplicant: {
      enabled: false,
      title: "",
      initials: "",
      namesByInitials: "",
      surnames: "",
      telephoneHome: "",
      telephoneOffice: "",
      mobile: "",
      email: "",
      permanentAddress: "",
      correspondenceAddress: "",
      nic: "",
      nicDateOfIssue: "",
      nationality: "",
      occupation: "",
    },

    secondJointApplicant: {
      enabled: false,
      title: "",
      initials: "",
      namesByInitials: "",
      surnames: "",
      residentialAddress: "",
      officeAddress: "",
      nic: "",
      nicDateOfIssue: "",
      nationality: "",
      occupation: "",
      telephoneHome: "",
      telephoneOffice: "",
    },

    jointCdsInstructions: {
      cdsPrefix: "MSB",
      cdsNo: "",
      principalHolder: "",
      firstJointHolder: "",
      secondJointHolder: "",
      date: "",
      iName: "",
      authorizeJointName: "",
      paymentsToName: "",
    },

    certifyingOfficer: {
      name: "",
      signature: "",
      date: "",
    },
  },

  // ✅ FULLY INITIALIZED DECLARATION (kept exactly as you have)
  declaration: {
    staffName: "",
    authorizedPersonsName: "",
    authorizedPersonsNic: "",
    officeUseOnly: {
      applicationReceivedOn: "",
      advisorsName: "",
    },
    iWe: {
      name: "",
      nicNo: "",
      cds: { prefix: "", number: "" },
      address: "",
    },

    schedule1: {
      authorisedPersonFullName: "",
      clientNames: "",
      signedOnBehalfBy: "",
      name: "",
      designation: "",
      nicNo: "",
      date: "",
    },

    schedule2: {
      person1: { name: "", nicNo: "", address: "" },
      person2: { name: "", nicNo: "", address: "" },
      person3: { name: "", nicNo: "", address: "" },
      explainedByName: "",
      date: "",
    },
  },

  // ✅ Updated to support “show like document” rendering
  clientAgreement: emptyAgreementDoc(),

  // ✅ Optional: make these document-style too (so you can render like docs later)
  creditFacility: {
    ...emptyAgreementDoc(),
    // add any credit-facility-specific fields here later
    // e.g. limit: "", interestRate: "", etc.
  },

  paymentInstruction: {
    ...emptyAgreementDoc(),
    // add any payment-instruction-specific fields here later
    // e.g. bankAccountToDebit: "", standingInstruction: false, etc.
  },

  directionOnline: {
    ...emptyAgreementDoc(),
    // add any direction-online-specific fields here later
    // e.g. onlineTradingEnabled: false, username: "", etc.
  },
};
