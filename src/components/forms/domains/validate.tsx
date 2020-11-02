import * as Yup from "yup";


export const InitialValues: FormData = {
  applicantName: "",
  applicantEmail: "",
  applicantPhone: "",
  changeImplementedSchedule: "",
  deleteDomainTC: false, 
  domainName: "",
  jurisdiction: "",
  nameServers: "",
  registrantContactOrganisation: "",
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
  technicalState: "",
  transferAcquiringOrRelinquishing: "",
};

const govAuRegex = /(\.gov\.au$)/;
const phoneNumberRegex = /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/;

export interface FormData {
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  changeImplementedSchedule: string;
  domainName: string;
  deleteDomainTC: boolean;
  jurisdiction: string;
  nameServers: string;
  registrantContactOrganisation: string;
  registrantOrganisation: string;
  registrantName: string;
  registrantEmail: string;
  registrantPhone: string;
  registrantCity: string;
  registrantState: string;
  statedPurpose: string;
  technicalOrganisation: string;
  technicalName: string;
  technicalEmail: string;
  technicalPhone: string;
  technicalCity: string;
  technicalState: string;
  transferAcquiringOrRelinquishing: string;
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
  "checkboxesRequired": "Please accept the terms and conditions",
  "domainNameRequired": "Domain name is required",
  "domainNameFormat": "Enter a domain name ending in .gov.au",
  "domainPurposeRequired": "What is the purpose of this domain name?",
  "emailFormat": "Enter an email address in the correct format, like name@agency.gov.au",
  "jurisdictionRequired": "Jurisdiction is required",
  "nameServersRequired": "Please enter the name servers to use",
  "phoneNumberFormat": "Enter a phone number in the correct format, like 0412 345 678 or (02) 6205 0267",
  "registrantOrganisationRequired": "Registrant organisation is required",
  "registrantContactOrganisationRequired": "Registrant organisation is required",
  "registrantNameRequired": "Registrant organisation is required",
  "registrantEmailRequired": "Registrant email address is required",
  "registrantPhoneRequired": "Registrant phone number is required",
  "registrantCityRequired": "Registrant city is required",
  "registrantStateRequired": "Registrant state is required",
  "requestingOrAcquiringOrganisationRequired": "Please advise whether you are the requesting or acquiring organisation",
  "requestingOrAcquiringOrganisationAllowableValues": [
    "relinquishing",
    "acquiring"
  ],
  "technicalOrganisationRequired": "Technical registrant organisation is required",
  "technicalNameRequired": "Technical registrant organisation is required",
  "technicalEmailRequired": "Technical registrant email address is required",
  "technicalPhoneRequired": "Technical registrant phone number is required",
  "technicalCityRequired": "Technical registrant city is required",
  "technicalStateRequired": "Technical registrant state is required",
  "stateAllowableValues": [
    "FED",
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
    //TODO add conditional logic for whoIsContact requiring new or existing contacts.....
    applicantName: Yup.string().required(ValidationErrorMessages.applicantNameRequired),
    applicantEmail: Yup.string().email(ValidationErrorMessages.emailFormat).matches(govAuRegex, ValidationErrorMessages.emailFormat).required(ValidationErrorMessages.applicantEmailRequired),
    applicantPhone: Yup.string().matches(phoneNumberRegex, ValidationErrorMessages.phoneNumberFormat).required(ValidationErrorMessages.applicantPhoneRequired),
    changeImplementedSchedule: Yup.string().oneOf(ValidationErrorMessages.changeTypeAllowableValues).required(ValidationErrorMessages.changeTypeRequired),
    domainName: Yup.string().matches(govAuRegex, ValidationErrorMessages.domainNameFormat).required(ValidationErrorMessages.domainNameRequired),
    jurisdiction: Yup.string().oneOf(ValidationErrorMessages.stateAllowableValues).required(ValidationErrorMessages.jurisdictionRequired),
    nameServers: Yup.string(),
    registrantOrganisation: Yup.string().required(ValidationErrorMessages.registrantOrganisationRequired),
    registrantName: Yup.string().required(ValidationErrorMessages.registrantNameRequired),
    registrantEmail: Yup.string().email(ValidationErrorMessages.emailFormat).matches(govAuRegex, ValidationErrorMessages.emailFormat).required(ValidationErrorMessages.registrantEmailRequired),
    registrantPhone: Yup.string().matches(phoneNumberRegex, ValidationErrorMessages.phoneNumberFormat).required(ValidationErrorMessages.registrantPhoneRequired),
    registrantCity: Yup.string().required(ValidationErrorMessages.registrantCityRequired),
    registrantState: Yup.string().oneOf(ValidationErrorMessages.stateAllowableValues).required(ValidationErrorMessages.registrantStateRequired),
    statedPurpose: Yup.string().required(ValidationErrorMessages.domainPurposeRequired),
    technicalOrganisation: Yup.string().required(ValidationErrorMessages.technicalOrganisationRequired),
    technicalName: Yup.string().required(ValidationErrorMessages.technicalNameRequired),
    technicalEmail: Yup.string().email(ValidationErrorMessages.emailFormat).matches(govAuRegex, ValidationErrorMessages.emailFormat).required(ValidationErrorMessages.technicalEmailRequired),
    technicalPhone: Yup.string().matches(phoneNumberRegex, ValidationErrorMessages.phoneNumberFormat).required(ValidationErrorMessages.technicalPhoneRequired),
    technicalCity: Yup.string().required(ValidationErrorMessages.technicalCityRequired),
    technicalState: Yup.string().oneOf(ValidationErrorMessages.stateAllowableValues).required(ValidationErrorMessages.technicalStateRequired),
  }),
  "patch": Yup.object().shape({
    applicantName: Yup.string().required(ValidationErrorMessages.applicantNameRequired),
    applicantEmail: Yup.string().email(ValidationErrorMessages.emailFormat).matches(govAuRegex, ValidationErrorMessages.emailFormat).required(ValidationErrorMessages.applicantEmailRequired),
    applicantPhone: Yup.string().matches(phoneNumberRegex, ValidationErrorMessages.phoneNumberFormat).required(ValidationErrorMessages.applicantPhoneRequired),
    // TODO Fix implemented schedule conditional formatting.
    // changeImplementedSchedule: Yup.string()
    //   .when("changeImplementedSchedule", {
    //     is: "standard" || "urgent" || "scheduled",
    //     then: Yup.string().required(ValidationErrorMessages.changeTypeRequired),
    //     otherwise: Yup.string(),
    // }),
    changeImplementedSchedule: Yup.string().oneOf(ValidationErrorMessages.changeTypeAllowableValues).required(ValidationErrorMessages.changeTypeRequired),
    domainName: Yup.string().matches(govAuRegex, ValidationErrorMessages.domainNameFormat).required(ValidationErrorMessages.domainNameRequired),
    registrantOrganisation: Yup.string(),
    registrantName: Yup.string(),
    registrantEmail: Yup.string().email(ValidationErrorMessages.emailFormat).matches(govAuRegex, ValidationErrorMessages.emailFormat),
    registrantPhone: Yup.string().matches(phoneNumberRegex, ValidationErrorMessages.phoneNumberFormat),
    registrantCity: Yup.string(),
    registrantState: Yup.string().oneOf(ValidationErrorMessages.stateAllowableValues),
    technicalOrganisation: Yup.string(),
    technicalName: Yup.string(),
    technicalEmail: Yup.string().email(ValidationErrorMessages.emailFormat).matches(govAuRegex, ValidationErrorMessages.emailFormat),
    technicalPhone: Yup.string().matches(phoneNumberRegex, ValidationErrorMessages.phoneNumberFormat),
    technicalCity: Yup.string(),
    
  }),
  "delete": Yup.object().shape({
    applicantName: Yup.string().required(ValidationErrorMessages.applicantNameRequired),
    applicantEmail: Yup.string().email(ValidationErrorMessages.emailFormat).matches(govAuRegex, ValidationErrorMessages.emailFormat).required(ValidationErrorMessages.applicantEmailRequired),
    applicantPhone: Yup.string().matches(phoneNumberRegex, ValidationErrorMessages.phoneNumberFormat).required(ValidationErrorMessages.applicantPhoneRequired),
    domainName: Yup.string().matches(govAuRegex, ValidationErrorMessages.domainNameFormat).required(ValidationErrorMessages.domainNameRequired),
    deleteDomainTC: Yup.bool().oneOf([true], ValidationErrorMessages.checkboxesRequired).required(ValidationErrorMessages.checkboxesRequired),
  }),
  "transfer": Yup.object().shape({
    //TODO add conditional logic for whoIsContact requiring new or existing contacts.....
    applicantName: Yup.string().required(ValidationErrorMessages.applicantNameRequired),
    applicantEmail: Yup.string().email(ValidationErrorMessages.emailFormat).matches(govAuRegex, ValidationErrorMessages.emailFormat).required(ValidationErrorMessages.applicantEmailRequired),
    applicantPhone: Yup.string().matches(phoneNumberRegex, ValidationErrorMessages.phoneNumberFormat).required(ValidationErrorMessages.applicantPhoneRequired),
    //TODO fix validation so multiple domain names can be entered
    domainName: Yup.string().matches(govAuRegex, ValidationErrorMessages.domainNameFormat).required(ValidationErrorMessages.domainNameRequired),
    nameServers: Yup.string().required(ValidationErrorMessages.nameServersRequired),
    registrantOrganisation: Yup.string(),
    registrantName: Yup.string(),
    registrantEmail: Yup.string().email(ValidationErrorMessages.emailFormat).matches(govAuRegex, ValidationErrorMessages.emailFormat),
    registrantPhone: Yup.string().matches(phoneNumberRegex, ValidationErrorMessages.phoneNumberFormat).required(ValidationErrorMessages.registrantPhoneRequired),
    registrantCity: Yup.string().required(ValidationErrorMessages.registrantCityRequired),
    registrantState: Yup.string().oneOf(ValidationErrorMessages.stateAllowableValues),
    statedPurpose: Yup.string().required(ValidationErrorMessages.domainPurposeRequired),
    technicalOrganisation: Yup.string(),
    technicalName: Yup.string(),
    technicalEmail: Yup.string().email(ValidationErrorMessages.emailFormat).matches(govAuRegex, ValidationErrorMessages.emailFormat),
    technicalPhone: Yup.string().matches(phoneNumberRegex, ValidationErrorMessages.phoneNumberFormat).required(ValidationErrorMessages.technicalPhoneRequired),
    technicalCity: Yup.string().required(ValidationErrorMessages.technicalCityRequired),
    transferAcquiringOrRelinquishing: Yup.string().oneOf(ValidationErrorMessages.requestingOrAcquiringOrganisationAllowableValues).required(ValidationErrorMessages.requestingOrAcquiringOrganisationRequired)

  })
}

