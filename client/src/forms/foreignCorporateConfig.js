// client/src/forms/foreignCorporateConfig.js
// Foreign -> Corporate (4 steps)

export const foreignCorporateSteps = [
  { key: "fcClientRegistration", title: "Client Registration" },
  { key: "fcKyc", title: "KYC Form" },
  { key: "fcBeneficialOwnership", title: "Beneficial Ownership Form" },
  { key: "fcAdditionalRequirements", title: "Additional Requirements" },
];

export const foreignCorporateEmpty = {
  // STEP 1
  fcClientRegistration: {
    companyName: "",
    telNos: "",
    emailAddress: "",
    faxNos: "",
    website: "",
    registeredAddress: "",
    correspondenceAddress: "",
    businessRegNo: "",
    dateOfIncorporation: "",
    natureOfBusiness: "",
    bankSia: { bankName: "", branchName: "", accountType: "", accountNo: "" },
    localBankContact: { bankName: "", contactPerson: "", contactPhone: "" },
    presentBrokers: "",
    correspondenceContact: "",
    correspondenceTelNo: "",
    correspondenceFaxNo: "",
    officeUseOnly: {
      applicationReceivedOn: "",
      date: "",
      advisorsCode: "",
      advisorsSignatures: "",
      staffName: "",
      advisorsSignature: "",
    },
    certification: { certifyingOfficerName: "", date: "" },
  },

  // STEP 2
  fcKyc: {
    cds: { prefix: "MSB", number: "" },
    natureOfBusiness: "",
    expectedInvestmentPerAnnum: "",
    sourceOfFunds: [],
    sourceOfFundsOther: "",
    fatcaUsPerson: "",
    fatcaClarify: "",
    pep: "",
    pepClarify: "",
    connectedBusinesses: "",
    authorizedPerson: {
      names: "",
      designation: "",
      telephone: "",
      fax: "",
      mobiles: "",
      email: "",
    },
    remarks: "",
  },

  // STEP 3
  fcBeneficialOwnership: {
    owners: [
      {
        name: "",
        nicOrPassport: "",
        dob: "",
        currentAddress: "",
        sourceOfBeneficialOwnership: "",
        pep: "",
      },
    ],
    authorizedCustomer: { name: "", nicPassport: "", dob: "" },
    verificationText: "",
    afiOfficial: { name: "", nicPassport: "", dob: "" },
    appendix: {
      naturalPersonName: "",
      naturalPersonDesignation: "",
      legalPersonName: "",
      legalPersonRegNo: "",
      legalPersonAddress: "",
      arrangementName: "",
      arrangementDeedNo: "",
      arrangementTrustee: "",
      arrangementAddress: "",
      declareOption: "",
    },
  },

  // ✅ STEP 4 (UPDATED — NO checkbox/radio; document-style text fields)
  fcAdditionalRequirements: {
    notes: "",
    items: {
      directorsDetails: "",
      directorCompanyDetails: "",
      topShareholders: "",
      authorizedPersons: "",

      memorandumArticles: "",
      certificateOfIncorporation: "",
      resolutionOpenCds: "",
      resolutionAuthorizeInstructions: "",
      letterOfCommencement: "",

      proofOfSiera: "",
      passportCopies: "",
    },
    certification: {
      methodText: "", // user types C1/C2/C3 + details
    },
    officeUseOnly: { completedBy: "", completedDate: "", remarks: "" },
  },
};
