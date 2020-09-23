import * as Yup from "yup";

export const InitialValues: FormData = {
  applicantName: "",
  applicantEmail: "",
  applicantPhone: "",
  domainName: "",
  nameServers: "",
  registrantOrganisation: "",
  registrantName: "",
  registrantEmail: "",
  registrantPhone: "",
  registrantCity: "",
  registrantState: "",
  statedPurpose: "",
  technicalOrganisation: "",
  technicalName: "",
  technicalEmail: "",
  technicalPhone: "",
  technicalCity: "",
  technicalState: ""
};

const govAuRegex = /(\.gov\.au$)/;

export interface FormData {
  applicantName: Yup.string;
  applicantEmail: Yup.string;
  applicantPhone: Yup.string;
  domainName: Yup.string;
  nameServers: Yup.string;
  registrantOrganisation: Yup.string;
  registrantName: Yup.string;
  registrantEmail: Yup.string;
  registrantPhone: Yup.string;
  registrantCity: Yup.string;
  registrantState: Yup.string;
  statedPurpose: Yup.string;
  technicalOrganisation: Yup.string;
  technicalName: Yup.string;
  technicalEmail: Yup.string;
  technicalPhone: Yup.string;
  technicalCity: Yup.string;
  technicalState: Yup.string;
}




const ValidationErrorMessages = {
  "applicantNameRequired": "Applicant name is required",
  "applicantEmailRequired": "Applicant email is required",
  "applicantPhoneRequired": "Applicant phone number is required",
  "changeTypeAllowableValues": [
    "standard",
    "scheduled",
    "urgent"
  ],
  "changeTypeRequired": "Please select when you would like the change to be made",
  "domainNameRequired": "Domain name is required",
  "domainNameFormat": "Enter a domain name ending in .gov.au",
  "domainPurposeRequired": "What is the purpose of this domain name?",
  "emailFormat": "Enter an email address in the correct format, like name@agency.gov.au",
  "nameServersRequired": "Please enter the name servers to use",
  "registrantOrganisationRequired": "Registrant organisation is required",
  "registrantNameRequired": "Registrant organisation is required",
  "registrantEmailRequired": "Registrant email address is required",
  "registrantPhoneRequired": "Registrant phone number is required",
  "registrantCityRequired": "Registrant city is required",
  "registrantStateRequired": "Registrant state is required",
  "technicalOrganisationRequired": "Technical registrant organisation is required",
  "technicalNameRequired": "Technical registrant organisation is required",
  "technicalEmailRequired": "Technical registrant email address is required",
  "technicalPhoneRequired": "Technical registrant phone number is required",
  "technicalCityRequired": "Technical registrant city is required",
  "technicalStateRequired": "Technical registrant state is required",
  "stateAllowableValues": [
    "ACT",
    "NSW",
    "NT",
    "QLD",
    "SA",
    "TAS",
    "VIC",
    "WA"
  ]
}


export const Schema = {
  "post": Yup.object().shape({
    applicantName: Yup.string().required(ValidationErrorMessages.applicantNameRequired),
    applicantEmail: Yup.string().email(ValidationErrorMessages.emailFormat).matches(govAuRegex, ValidationErrorMessages.emailFormat).required(ValidationErrorMessages.applicantEmailRequired),
    applicantPhone: Yup.string().required(ValidationErrorMessages.applicantPhoneRequired),
    domainName: Yup.string().matches(govAuRegex, ValidationErrorMessages.domainNameFormat).required(ValidationErrorMessages.domainNameRequired),
    nameServers: Yup.string(),
    registrantOrganisation: Yup.string().required(ValidationErrorMessages.registrantOrganisationRequired),
    registrantName: Yup.string().required(ValidationErrorMessages.registrantNameRequired),
    registrantEmail: Yup.string().email(ValidationErrorMessages.emailFormat).matches(govAuRegex, ValidationErrorMessages.emailFormat).required(ValidationErrorMessages.registrantEmailRequired),
    registrantPhone: Yup.string().required(ValidationErrorMessages.registrantPhoneRequired),
    registrantCity: Yup.string().required(ValidationErrorMessages.registrantCityRequired),
    registrantState: Yup.string().oneOf(ValidationErrorMessages.stateAllowableValues).required(ValidationErrorMessages.registrantStateRequired),
    statedPurpose: Yup.string().required(ValidationErrorMessages.domainPurposeRequired),
    technicalOrganisation: Yup.string().required(ValidationErrorMessages.technicalOrganisationRequired),
    technicalName: Yup.string().required(ValidationErrorMessages.technicalNameRequired),
    technicalEmail: Yup.string().email(ValidationErrorMessages.emailFormat).matches(govAuRegex, ValidationErrorMessages.emailFormat).required(ValidationErrorMessages.technicalEmailRequired),
    technicalPhone: Yup.string().required(ValidationErrorMessages.technicalPhoneRequired),
    technicalCity: Yup.string().required(ValidationErrorMessages.technicalCityRequired),
    technicalState: Yup.string().oneOf(ValidationErrorMessages.stateAllowableValues).required(ValidationErrorMessages.technicalStateRequired),
  }),
  "patch": Yup.object().shape({
    applicantName: Yup.string().required(ValidationErrorMessages.applicantNameRequired),
    applicantEmail: Yup.string().email(ValidationErrorMessages.emailFormat).matches(govAuRegex, ValidationErrorMessages.emailFormat).required(ValidationErrorMessages.applicantEmailRequired),
    applicantPhone: Yup.string().required(ValidationErrorMessages.applicantPhoneRequired),
    domainName: Yup.string().matches(govAuRegex, ValidationErrorMessages.domainNameFormat).required(ValidationErrorMessages.domainNameRequired),
    registrantOrganisation: Yup.string(),
    registrantName: Yup.string(),
    registrantEmail: Yup.string().email(ValidationErrorMessages.emailFormat).matches(govAuRegex, ValidationErrorMessages.emailFormat),
    registrantPhone: Yup.string(),
    registrantCity: Yup.string(),
    registrantState: Yup.string().oneOf(ValidationErrorMessages.stateAllowableValues),
    technicalOrganisation: Yup.string(),
    technicalName: Yup.string(),
    technicalEmail: Yup.string().email(ValidationErrorMessages.emailFormat).matches(govAuRegex, ValidationErrorMessages.emailFormat),
    technicalPhone: Yup.string(),
    technicalCity: Yup.string(),
  }),
  "delete": Yup.object().shape({
    applicantName: Yup.string().required(ValidationErrorMessages.applicantNameRequired),
    applicantEmail: Yup.string().email(ValidationErrorMessages.emailFormat).matches(govAuRegex, ValidationErrorMessages.emailFormat).required(ValidationErrorMessages.applicantEmailRequired),
    applicantPhone: Yup.string().required(ValidationErrorMessages.applicantPhoneRequired),
    domainName: Yup.string().matches(govAuRegex, ValidationErrorMessages.domainNameFormat).required(ValidationErrorMessages.domainNameRequired),
  }),
  "transfer": Yup.object().shape({
    applicantName: Yup.string().required(ValidationErrorMessages.applicantNameRequired),
    applicantEmail: Yup.string().email(ValidationErrorMessages.emailFormat).matches(govAuRegex, ValidationErrorMessages.emailFormat).required(ValidationErrorMessages.applicantEmailRequired),
    applicantPhone: Yup.string().required(ValidationErrorMessages.applicantPhoneRequired),
    domainName: Yup.string().matches(govAuRegex, ValidationErrorMessages.domainNameFormat).required(ValidationErrorMessages.domainNameRequired),

  })
}

