const yup = require("yup")
const { object, string, number } = require('yup')
const govAuRegex = /(\.gov\.au$)/;
const phoneNumberRegex = /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/;

/**
 * WARNING
 *
 * Keep this file in sync with the frontend validation file
 * /src/components/forms/schema.tsx
 * 
 */

/*
 * Validation error messages
 */
const validationErrorMessages = {
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
  "domainNameFormat": "Please enter a domain name ending in .gov.au",
  "domainPurposeRequired": "Please enter the purpose for this domain name",
  "emailFormat": "Please enter an email address in the correct format, such as: name@agency.gov.au",
  "jurisdictionRequired": "Jurisdiction is required",
  "phoneNumberFormat": "Please enter a phone number in the correct format, like 0412 345 678 or (02) 6205 0267",
  "nameServersRequired": "Please enter the name servers to use",
  "registrantOrganisationRequired": "Registrant organisation is required",
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

const schema = {
  "post": object().shape({
    //TODO add conditional logic for whoIsContact requiring new or existing contacts.....
    applicantName: string().required(validationErrorMessages.applicantNameRequired),
    applicantEmail: string().email(validationErrorMessages.emailFormat).matches(govAuRegex, validationErrorMessages.emailFormat).required(validationErrorMessages.applicantEmailRequired),
    applicantPhone: string().matches(phoneNumberRegex, validationErrorMessages.phoneNumberFormat).required(validationErrorMessages.applicantPhoneRequired),
    changeImplementedSchedule: string().oneOf(ValidationErrorMessages.changeTypeAllowableValues).required(ValidationErrorMessages.changeTypeRequired),
    domainName: string().matches(govAuRegex, validationErrorMessages.domainNameFormat).required(validationErrorMessages.domainNameRequired),
    nameServers: string().required(validationErrorMessages.nameServersRequired),
    registrantContactOrganisation: string().required(validationErrorMessages.registrantContactOrganisationRequired),
    registrantOrganisation: string().required(validationErrorMessages.registrantOrganisationRequired),
    registrantName: string().required(validationErrorMessages.registrantNameRequired),
    registrantEmail: string().email(validationErrorMessages.emailFormat).matches(govAuRegex, validationErrorMessages.emailFormat).required(validationErrorMessages.registrantEmailRequired),
    registrantPhone: string().matches(phoneNumberRegex, validationErrorMessages.phoneNumberFormat).required(validationErrorMessages.registrantPhoneRequired),
    registrantCity: string().required(validationErrorMessages.registrantCityRequired),
    registrantState: string().oneOf(validationErrorMessages.stateAllowableValues).required(validationErrorMessages.registrantStateRequired),
    statedPurpose: string().required(validationErrorMessages.domainPurposeRequired),
    technicalOrganisation: string().required(validationErrorMessages.technicalOrganisationRequired),
    technicalName: string().required(validationErrorMessages.technicalNameRequired),
    technicalEmail: string().email(validationErrorMessages.emailFormat).matches(govAuRegex, validationErrorMessages.emailFormat).required(validationErrorMessages.technicalEmailRequired),
    technicalPhone: string().matches(phoneNumberRegex, validationErrorMessages.phoneNumberFormat).required(validationErrorMessages.technicalPhoneRequired),
    technicalCity: string().required(validationErrorMessages.technicalCityRequired),
    technicalState: string().oneOf(validationErrorMessages.stateAllowableValues).required(validationErrorMessages.technicalStateRequired),
  }),
  "patch": object().shape({
    applicantName: string().required(validationErrorMessages.applicantNameRequired),
    applicantEmail: string().email(validationErrorMessages.emailFormat).matches(govAuRegex, validationErrorMessages.emailFormat).required(validationErrorMessages.applicantEmailRequired),
    applicantPhone: string().matches(phoneNumberRegex, validationErrorMessages.phoneNumberFormat).required(validationErrorMessages.applicantPhoneRequired),
    // TODO Fix implemented schedule conditional formatting.
    // changeImplementedSchedule: string()
    //   .oneOf(validationErrorMessages.changeTypeAllowableValues)
    //   .when("changeImplementedSchedule", {
    //     is: "standard" || "urgent" || "scheduled",
    //     then: string().required(validationErrorMessages.changeTypeRequired),
    //     otherwise: string(),
    // }),
    changeImplementedSchedule: string().oneOf(ValidationErrorMessages.changeTypeAllowableValues).required(validationErrorMessages.changeTypeRequired),
    domainName: string().matches(govAuRegex, validationErrorMessages.domainNameFormat).required(validationErrorMessages.domainNameRequired),
    registrantOrganisation: string(),
    registrantName: string(),
    registrantEmail: string().email(validationErrorMessages.emailFormat).matches(govAuRegex, validationErrorMessages.emailFormat),
    registrantPhone: string().matches(phoneNumberRegex, validationErrorMessages.phoneNumberFormat).required(validationErrorMessages.registrantPhoneRequired),
    registrantCity: string().required(validationErrorMessages.registrantCityRequired),
    registrantState: string().oneOf(validationErrorMessages.stateAllowableValues),
    technicalOrganisation: string(),
    technicalName: string(),
    technicalEmail: string().email(validationErrorMessages.emailFormat).matches(govAuRegex, validationErrorMessages.emailFormat),
    technicalPhone: string().matches(phoneNumberRegex, validationErrorMessages.phoneNumberFormat).required(validationErrorMessages.technicalPhoneRequired),
    technicalCity: string().required(validationErrorMessages.technicalCityRequired),
  }),
  "delete": object().shape({
    applicantName: string().required(validationErrorMessages.applicantNameRequired),
    applicantEmail: string().email(validationErrorMessages.emailFormat).matches(govAuRegex, validationErrorMessages.emailFormat).required(validationErrorMessages.applicantEmailRequired),
    applicantPhone: string().matches(phoneNumberRegex, validationErrorMessages.phoneNumberFormat).required(validationErrorMessages.applicantPhoneRequired),
    domainName: string().matches(govAuRegex, validationErrorMessages.domainNameFormat).required(validationErrorMessages.domainNameRequired),
    deleteDomainTC: yup.boolean().oneOf([true], validationErrorMessages.checkboxesRequired).required(validationErrorMessages.delete),
  }),
  "transfer": object().shape({
    applicantName: string().required(validationErrorMessages.applicantNameRequired),
    applicantEmail: string().email(validationErrorMessages.emailFormat).matches(govAuRegex, validationErrorMessages.emailFormat).required(validationErrorMessages.applicantEmailRequired),
    applicantPhone: string().matches(phoneNumberRegex, validationErrorMessages.phoneNumberFormat).required(validationErrorMessages.applicantPhoneRequired),
    //TODO fix validation so multiple domain names can be entered
    domainName: string().matches(govAuRegex, validationErrorMessages.domainNameFormat).required(validationErrorMessages.domainNameRequired),
    nameServers: string().required(validationErrorMessages.nameServersRequired),
    registrantOrganisation: string(),
    registrantName: string(),
    registrantEmail: string().email(validationErrorMessages.emailFormat).matches(govAuRegex, validationErrorMessages.emailFormat),
    registrantPhone: string().matches(phoneNumberRegex, validationErrorMessages.phoneNumberFormat).required(validationErrorMessages.registrantPhoneRequired),
    registrantCity: string().required(validationErrorMessages.registrantCityRequired),
    registrantState: string().oneOf(validationErrorMessages.stateAllowableValues),
    statedPurpose: string().required(validationErrorMessages.domainPurposeRequired),
    technicalOrganisation: string(),
    technicalName: string(),
    technicalEmail: string().email(validationErrorMessages.emailFormat).matches(govAuRegex, validationErrorMessages.emailFormat),
    technicalPhone: string().matches(phoneNumberRegex, validationErrorMessages.phoneNumberFormat).required(validationErrorMessages.technicalPhoneRequired),
    technicalCity: string().required(validationErrorMessages.technicalCityRequired),
    transferAcquiringOrRelinquishing: string().oneOf(validationErrorMessages.requestingOrAcquiringOrganisationAllowableValues).required(validationErrorMessages.requestingOrAcquiringOrganisationRequired)
  })


}

module.exports = schema;
