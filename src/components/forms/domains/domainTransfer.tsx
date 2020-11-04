/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState } from "react";
import { Formik, Form } from "formik";

import TextField from "../text-field";
import SelectField from "../drop-down";
import { Aubtn, AuFormGroup, AuFieldset, AuLegend, AuSelect, AuRadio } from "../../helpers/auds";
import PageAlert from "../../blocks/page-alert";
import { navigate } from "@reach/router";
import { InitialValues, Schema, FormData } from "./validate";

import fetch from 'node-fetch';

const domainTransferForm: React.FC = () => {
  const [state, setState] = useState({
    isErrors: false,
    submitted: false,
    apiMessage: "",
  });
  
  const [whoIsContacts, changeWhoIsContacts] = useState<boolean>(true);
  
  const handleWhoIsChange = () => {
    changeWhoIsContacts(!whoIsContacts)
  }

  const [saving, setSaving] = useState<boolean>(false);

  const handleAPIerror = (apiMessage: string) => {
    setState((currentState) => ({ ...currentState, apiMessage }));

    document.title = "Error | Sign up form";
    const container = document.querySelector("main") as any;
    container &&
      container.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const submitForm = async (formData: FormData) => {
    setSaving(true);

    const fetchUrl = 'http://localhost:9000/api/domain';
    const headers = { 'Content-Type': 'application/json' };

    const submitFormResult = await fetch( fetchUrl, { method: 'POST', headers: headers, body: JSON.stringify(formData) });

    if (submitFormResult.result === "error") {
      const apiMessage = submitFormResult.msg;
      handleAPIerror(apiMessage);
      setSaving(false);
      return;
    }

    // TODO Add submitted successful page specifically for domainTransfer
    setSaving(false);
    navigate(`/submitted`, { replace: true, state: { formData } });
  };

  return (
    <Formik
      initialValues={InitialValues}
      onSubmit={(data, errors) => {
        submitForm(data);
        setState({ isErrors: false, submitted: true, apiMessage: "" });
      }}
      validationSchema={Schema["transfer"]}
    >
      {({ values, errors, touched, handleSubmit }) => (
        <Form
          noValidate
          onSubmit={(e) => {
            handleSubmit(e);
            if (Object.keys(errors).length < 1) return;

            setState({ isErrors: true, submitted: false, apiMessage: "" });
            document.title = "Errors | Sign up form";
            const timeout = setTimeout(() => {
              const errorSum = document.getElementById("error-heading") as any;
              if (errorSum && errorSum.focus()) {
                errorSum.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
              clearTimeout(timeout);
            }, 500);
          }}
        >
          {state && state.apiMessage && (
            <PageAlert type="error" className="max-42">
              <>
                <h3 id="api-error-heading">There was an error</h3>
                <p dangerouslySetInnerHTML={{ __html: state.apiMessage }}></p>
              </>
            </PageAlert>
          )}
          {state.isErrors && Object.keys(errors).length > 0 ? (
            <PageAlert type="error" className="max-42">
              <>
                <h3 tabIndex={0} id="error-heading">
                  There has been an error
                </h3>
                <ul>
                  {Object.keys(errors).map((error, i: number) => (
                    <li key={i}>
                      <a href={`#${error}`}>{errors[error]}</a>
                    </li>
                  ))}
                </ul>
              </>
            </PageAlert>
          ) : (
            ""
          )}
          <AuFieldset className="fieldset-group">
            <AuFieldset>
              <div className="au-callout max-42">
                <p>
                  This service is for transferring registered gov.au domain(s) from one government organisation to another.
                </p>
                <p>
                  Note: use of this form is restricted to authorised representatives of Australian, state, territory, and local government organisations.
                </p>
              </div>
            </AuFieldset>
            <span>
              <br/>
              <AuLegend>
                <h3>1. Your details</h3>
              </AuLegend>
            </span>
            <TextField
                id="applicantName"
                hint="The person submitting the request"
                label="Name"
                required
                width="xl"
              />
              <TextField
                id="applicantEmail"
                hint="The contact email for the person submitting the request"
                label="Email address"
                required
                width="xl"
              />
              <TextField
                id="applicantPhone"
                hint="The contact number for the person submitting the request"
                label="Phone number"
                required
                width="xl"
              />
          </AuFieldset>
          <AuFieldset className="fieldset-group">
            <span>
              <AuLegend>
                <h3>2. Domain details</h3>
              </AuLegend>
            </span>
            <TextField
              as="textarea"
              id="domainName"
              label="Domain name(s) you would like to transfer"
              hint="For the transfer of multiple domain names from the same organisation, please enter one domain per line."
              width="xl"
              required
            />
            <SelectField
                id="transferAcquiringOrRelinquishing"
                label="Are you requesting on the transfer on behalf of:"
                options={[
                  { value: "", text: "Choose one" },
                  { value: "relinquishing", text: "The relinquishing organisation" },
                  { value: "acquiring", text: "The acquiring organisation" },
                ]}
              />
            <TextField
              hint="Name of the organisation that is relinquishing the domain(s)"
              id="relinquishingOrganisation"
              label="Relinquishing organisation"
              width="xl"
              required
            />
            <TextField
              hint="Name of the organisation that is acquiring the domain(s)"
              id="acquiringOrganisation"
              label="Acquiring organisation"
              width="xl"
              required
            />
            <TextField
              hint="Why are you applying to register this domain name?"
              id="statedPurpose"
              label="Purpose of the domain name"
              required
              width="xl"
            />
            <TextField
              hint="Why are you applying to register this domain name?"
              id="statedPurpose"
              label="Purpose of the domain name transfer"
              required
              width="xl"
            />
          </AuFieldset>
          <br/>
          <span>
            <AuLegend>
              <h3>3. WHOIS contacts</h3>
            </AuLegend>
          </span>
          <p>WHOIS contacts are available publicly. They are used to contact owners of websites.</p>
          <br/>
          <AuFieldset className="fieldset-group">
            <AuFormGroup id="whoIsRadioFormGroup">
              <AuRadio block name="whois-radio" label="Use Registrant and Technical contact details as per an existing domain" value="registrant-radio" id="1" defaultChecked={true} onChange={handleWhoIsChange} />
              <AuRadio block name="whois-radio" label="Create new Registrant and Technical contacts" value="create_new-radio" id="2"  onChange={handleWhoIsChange}/>
              {
                !whoIsContacts ? "" : 
                  <AuFormGroup id="whoIsExisting">
                    {/* {values.whoIsRadioC} */}
                    <TextField
                      id="duplicateContactDetails"
                      label="Duplicate contact details from the following domain"
                      required
                      width="xl"
                    />
                  </AuFormGroup>
              }
              {
                whoIsContacts ? "" : 
                  <AuFormGroup id="whoIsNew">
                    
                  <h4>Business registrant details</h4>
                  <TextField
                    id="registrantName"
                    label="Registrant name"
                    required
                    width="xl"
                  />
                  <TextField
                    id="registrantEmail"
                    label="Registrant email"
                    required
                    width="xl"
                  />
                  <TextField
                    id="registrantPhone"
                    label="Registrant phone"
                    required
                    width="xl"
                  />
                  <TextField
                    id="registrantCity"
                    label="Registrant city"
                    required
                    width="xl"
                  />
                  <TextField
                    id="registrantContactOrganisation"
                    label="Registrant organisation"
                    required
                    width="xl"
                  />
                  <SelectField
                    defaultValue={InitialValues.jurisdiction}
                    id="registrantState"
                    label="Registrant state or territory"
                    options={[
                      { value: "", text: "Choose one" },
                      { value: "ACT", text: "Australian Capital Territory" },
                      { value: "NSW", text: "New South Wales" },
                      { value: "NT", text: "Northern Territory" },
                      { value: "QLD", text: "Queensland" },
                      { value: "SA", text: "South Australia" },
                      { value: "TAS", text: "Tasmania" },
                      { value: "VIC", text: "Victoria" },
                      { value: "WA", text: "Western Australia" },
                    ]}
                  />
                  <h4>Technical contact details</h4>
                  <TextField
                    id="technicalName"
                    label="Technical contact name"
                    required
                    width="xl"
                  />
                  <TextField
                    id="technicalEmail"
                    label="Technical contact email"
                    required
                    width="xl"
                  />
                  <TextField
                    id="technicalPhone"
                    label="Technical contact phone"
                    required
                    width="xl"
                  />
                  <TextField
                    id="technicalCity"
                    label="Technical contact city"
                    required
                    width="xl"
                  />
                  <TextField
                    id="technicalOrganisation"
                    label="Technical organisation"
                    required
                    width="xl"
                  />
                  <SelectField
                  defaultValue={InitialValues.jurisdiction}
                  id="technicalState"
                  label="Technical contact state or territory"
                  options={[
                    { value: "", text: "Choose one" },
                    { value: "ACT", text: "Australian Capital Territory" },
                    { value: "NSW", text: "New South Wales" },
                    { value: "NT", text: "Northern Territory" },
                    { value: "QLD", text: "Queensland" },
                    { value: "SA", text: "South Australia" },
                    { value: "TAS", text: "Tasmania" },
                    { value: "VIC", text: "Victoria" },
                    { value: "WA", text: "Western Australia" },
                  ]}
                  />
                </AuFormGroup>
            }
            </AuFormGroup>
        </AuFieldset>
        <AuFieldset 
          className="fieldset-group"
        >
          <h3>
            <AuLegend>4. Authorising contact email</AuLegend>
          </h3>
          <TextField
            hint="The domain transfer request must be approved by the Registrant Contact of the organisation. If you are not sure who the correct contact is, do a .au Whois Lookup on the domain.
            A confirmation request email will be sent to this address when form is submitted."
            id="authorisingContactEmail"
            label="Authorising contact email"
            required
            width="xl"
          />
        </AuFieldset>
        <AuFieldset className="fieldset-group">
          <h3>
            <AuLegend>5. Send request to transfer domain</AuLegend>
          </h3>
          <p>
            The change request must be approved by the Registrant Contact of your organisation. If you are not sure who the correct contact is, do a <a href="https://whois.auda.org.au/">au. Whois Lookup</a> on the domain.
          </p>
          <p>
            A confirmation request email will be sent to this address when form is submitted.</p>
          <p>
            Please note that we will seek approval for the transfer from the relinquishing/acquiring organisation.
          </p>
          <AuFormGroup>
            <Aubtn as='secondary' disabled={saving}>
              <a href="/">
                Cancel
              </a>
            </Aubtn>
            <Aubtn type="submit" disabled={saving}>
              {saving ? "Submitting" : "Submit"}
            </Aubtn>
          </AuFormGroup>
        </AuFieldset>
      </Form>
      )}
    </Formik>
  );
};

export default domainTransferForm;
