const { object, string, number } = require('yup')
const govAuRegex = /(\.gov\.au$)/;

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

const schema = {
  "post": object().shape({
    applicantName: string().required(validationErrorMessages.applicantNameRequired),
    applicantEmail: string().email(validationErrorMessages.emailFormat).matches(govAuRegex, validationErrorMessages.emailFormat).required(validationErrorMessages.applicantEmailRequired),
    applicantPhone: string().required(validationErrorMessages.applicantPhoneRequired),
    domainName: string().matches(govAuRegex, validationErrorMessages.domainNameFormat).required(validationErrorMessages.domainNameRequired),
    nameServers: string(),
    registrantOrganisation: string().required(validationErrorMessages.registrantOrganisationRequired),
    registrantName: string().required(validationErrorMessages.registrantNameRequired),
    registrantEmail: string().email(validationErrorMessages.emailFormat).matches(govAuRegex, validationErrorMessages.emailFormat).required(validationErrorMessages.registrantEmailRequired),
    registrantPhone: string().required(validationErrorMessages.registrantPhoneRequired),
    registrantCity: string().required(validationErrorMessages.registrantCityRequired),
    registrantState: string().oneOf(validationErrorMessages.stateAllowableValues).required(validationErrorMessages.registrantStateRequired),
    statedPurpose: string().required(validationErrorMessages.domainPurposeRequired),
    technicalOrganisation: string().required(validationErrorMessages.technicalOrganisationRequired),
    technicalName: string().required(validationErrorMessages.technicalNameRequired),
    technicalEmail: string().email(validationErrorMessages.emailFormat).matches(govAuRegex, validationErrorMessages.emailFormat).required(validationErrorMessages.technicalEmailRequired),
    technicalPhone: string().required(validationErrorMessages.technicalPhoneRequired),
    technicalCity: string().required(validationErrorMessages.technicalCityRequired),
    technicalState: string().oneOf(validationErrorMessages.stateAllowableValues).required(validationErrorMessages.technicalStateRequired),
  }),
  "patch": object().shape({
    applicantName: string().required(validationErrorMessages.applicantNameRequired),
    applicantEmail: string().email(validationErrorMessages.emailFormat).matches(govAuRegex, validationErrorMessages.emailFormat).required(validationErrorMessages.applicantEmailRequired),
    applicantPhone: string().required(validationErrorMessages.applicantPhoneRequired),
    domainName: string().matches(govAuRegex, validationErrorMessages.domainNameFormat).required(validationErrorMessages.domainNameRequired),
    registrantOrganisation: string(),
    registrantName: string(),
    registrantEmail: string().email(validationErrorMessages.emailFormat).matches(govAuRegex, validationErrorMessages.emailFormat),
    registrantPhone: string(),
    registrantCity: string(),
    registrantState: string().oneOf(validationErrorMessages.stateAllowableValues),
    technicalOrganisation: string(),
    technicalName: string(),
    technicalEmail: string().email(validationErrorMessages.emailFormat).matches(govAuRegex, validationErrorMessages.emailFormat),
    technicalPhone: string(),
    technicalCity: string(),
  }),
  "delete": object().shape({
    applicantName: string().required(validationErrorMessages.applicantNameRequired),
    applicantEmail: string().email(validationErrorMessages.emailFormat).matches(govAuRegex, validationErrorMessages.emailFormat).required(validationErrorMessages.applicantEmailRequired),
    applicantPhone: string().required(validationErrorMessages.applicantPhoneRequired),
    domainName: string().matches(govAuRegex, validationErrorMessages.domainNameFormat).required(validationErrorMessages.domainNameRequired),
  }),
  "transfer": object().shape({
    applicantName: string().required(validationErrorMessages.applicantNameRequired),
    applicantEmail: string().email(validationErrorMessages.emailFormat).matches(govAuRegex, validationErrorMessages.emailFormat).required(validationErrorMessages.applicantEmailRequired),
    applicantPhone: string().required(validationErrorMessages.applicantPhoneRequired),
    domainName: string().matches(govAuRegex, validationErrorMessages.domainNameFormat).required(validationErrorMessages.domainNameRequired),

  })
}

module.exports = schema;
