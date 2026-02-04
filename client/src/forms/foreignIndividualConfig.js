// client/src/forms/foreignIndividualConfig.js
// Foreign -> Individual (4 steps)

export const foreignIndividualSteps = [
  { key: "fiClientRegistration", title: "Client Registration" },
  { key: "fiDeclaration", title: "Declaration" },
  { key: "fiClientAgreement", title: "Client Agreement" },
  { key: "fiDirectionOnline", title: "DirectFN Online Form" },
];

export const foreignIndividualEmpty = {
  // -------------------------------------------------
  // STEP 1: CLIENT REGISTRATION (FULL STRUCTURE)
  // -------------------------------------------------
  fiClientRegistration: {
    principal: {
      title: "",
      initials: "",
      namesByInitials: "",
      surname: "",

      telHome: "",
      telOffice: "",
      mobile: "",
      email: "",

      permanentAddress: "",
      correspondenceAddress: "",
      resAddress: "",
      officeAddress: "",

      passportNo: "",
      passportIssueDate: "",
      passportExpiryDate: "",
      nationality: "",
      occupation: "",

      cdsPrefix: "MSB",
      cdsNo: "",

      employeeAddress: "",
      contactNo: "",

      bankIIA: {
        bankName: "",
        branchName: "",
        type: "",
        accountNo: "",
      },
    },

    localBankContact: {
      bankName: "",
      contactPerson: "",
      contactPhone: "",
    },

    stockMarketExperience: "",
    presentBroker: "",

    investmentDecision: {
      discretionary: false,
      discretionaryFormFilled: false,
      nonDiscretionary: false,
    },

    jointApplicant: {
      enabled: false,
      title: "",
      initials: "",
      namesByInitials: "",
      surname: "",

      telHome: "",
      telOffice: "",
      mobile: "",
      email: "",

      permanentAddress: "",
      correspondenceAddress: "",
      resAddress: "",
      officeAddress: "",

      passportNo: "",
      passportIssueDate: "",
      passportExpiryDate: "",
      nationality: "",
      occupation: "",

      cdsPrefix: "MSB",
      cdsNo: "",
    },

    secondJointApplicant: {
      enabled: false,
      title: "",
      initials: "",
      namesByInitials: "",
      surname: "",

      resAddress: "",
      officeAddress: "",

      telHome: "",
      telOffice: "",
      mobile: "",
      email: "",

      passportNo: "",
      passportIssueDate: "",
      passportExpiryDate: "",
      nationality: "",
      occupation: "",

      cdsPrefix: "MSB",
      cdsNo: "",
    },

    jointCdsInstructions: {
      cdsPrefix: "MSB",
      cdsNo: "",
      principalHolder: "",
      firstJointHolder: "",
      secondJointHolder: "",
      date: "",
      authorizeJointName: "",
      paymentsToName: "",
    },

    staffDeclaration: { staffName: "" },

    instructionAuthorization: {
      authorisedNames: "",
      authorisedNIC: "",
    },

    officeUseOnly: {
      receivedOn: "",
      advisorName: "",
      advisorSignature: "",
    },

    iWeDeclaration: {
      name: "",
      passportNo: "",
      cdsPrefix: "MSB",
      cdsNo: "",
      address: "",
    },

    certifyingOfficer: {
      name: "",
      signature: "",
      date: "",
    },
  },

  // -------------------------------------------------
  // STEP 2: DECLARATION (UPDATED AS WORD DOCUMENT)
  // -------------------------------------------------
  fiDeclaration: {
    schedule1: {
      authorisedPersonBlockLetters: "",
      clientNames: "",
      signedOnBehalfBy: "",
      name: "",
      designation: "",
      passportNo: "",
      date: "",
    },

    schedule2: {
      person1: { name: "", passportNo: "", address: "" },
      person2: { name: "", passportNo: "", address: "" },
      person3: { name: "", passportNo: "", address: "" },
      explainedByName: "",
      date: "",
    },

    accepted: false,
  },

  // -------------------------------------------------
  // STEP 3: CLIENT AGREEMENT (UPDATED AS WORD DOCUMENT)
  // -------------------------------------------------
  fiClientAgreement: {
    agreementDate: { date: "", month: "", year: "" },

    party1: { name: "", passportNo: "", passportCountry: "", address: "" },
    party2: { name: "", passportNo: "", passportCountry: "", address: "" },
    party3: { name: "", passportNo: "", passportCountry: "", address: "" },

    authorizedSignatory: "",
    witness1: "",
    witness2: "",

    accepted: false,
  },

  // -------------------------------------------------
  // STEP 4: DIRECTFN ONLINE FORM (UPDATED AS WORD DOCUMENT)
  // -------------------------------------------------
  fiDirectionOnline: {
    // Top fields
    clientName: "",
    address: "",
    telHotline: "",
    telOffice: "",
    mobile: "",
    email: "",

    // Two CDS lines (as shown in Word)
    cdsLine1: { prefix: "MSB", number: "", name: "" },
    cdsLine2: { prefix: "MSB", number: "", name: "" },

    // I/We line
    iWe: { name: "", organization: "" },

    // Office Use Only
    officeUseOnly: {
      userName: "",
      advisor: "",
      authorisedSignature: "",
      date: "",
    },

    accepted: false,
  },
};
