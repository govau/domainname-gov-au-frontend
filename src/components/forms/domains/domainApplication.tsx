/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState } from "react";
import { Formik, Form } from "formik";
import TextField from "../text-field";
import SelectField from "../drop-down";
import { Aubtn, AuFormGroup, AuFieldset, AuLegend, AuSelect, AuRadio } from "../../helpers/auds";
import PageAlert from "../../blocks/page-alert";
import { navigate } from "@reach/router";
import { InitialValues, Schema, FormData } from "./validate";

import fetch from "node-fetch";

// TODO confirm if needed.
// import RadioField from "../radio";
// import { values } from "lodash";

const credentials = { 'backendService': process.env.REACT_APP_API_ADDRESS };

const domainApplicationForm: React.FC = () => {
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

    const headers = { 'Content-Type': 'application/json' };

    const submitFormResult = await fetch( credentials.backendService, { method: 'POST', headers: headers, body: JSON.stringify(formData) });

    if (submitFormResult.result === "error") {
      const apiMessage = submitFormResult.msg;
      handleAPIerror(apiMessage);
      setSaving(false);
      return;
    }

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
      validationSchema={Schema['post']}
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
          <AuFieldset>
            <p>
              The registration of gov.au domain names is restricted to Australian, state, territory, and local government entities.
            </p>
            <p>
              Applications must be authorised by the Registrant contact for your organisation.
            </p>
            <p>
              The Domain Administrator for your jurisdiction will assess domain name applications to ensure compliance with the gov.au <a href="../policies/govau-eligibility-and-allocation-policy">Eligibility and Allocation Policy</a>.
            </p>
          </AuFieldset>
          <br/>
          <AuFieldset>
            <div className="au-callout max-42">
              <p>
              This service only supports registration of gov.au domain names. For other domain names, including .com and .com.au, please use an <a href="https://www.auda.org.au/industry-information/registrars/">auDA accredited registrar</a>.
              </p>
            </div>
          </AuFieldset>
          <br/>
          <AuFieldset>
            <span>
              <AuLegend>
                <h3>1. Your Jurisdiction</h3>
              </AuLegend>
            </span>
            <SelectField
                id="jurisdiction"
                label="Select your jurisdiction"
                options={[
                  { value: "", text: "Choose one" },
                  { value: "FED", text: "Federal Government" },
                  { value: "ACT", text: "Australian Capital Territory" },
                  { value: "NSW", text: "New South Wales" },
                  { value: "QLD", text: "Queensland" },
                  { value: "SA", text: "South Australia" },
                  { value: "VIC", text: "Victoria" },
                  { value: "WA", text: "Western Australia" },
                ]}
              />
            <div className="au-callout max-42">
              <p>
                You should be familiar with the {values.jurisdiction === "FED" ? "gov.au" : values.jurisdiction} domain name policies and procedures before proceeding with this application.
              </p>
              <p>
                Please note that nt.gov.au and tas.gov.au domain names are not administered through this web site. Their contact details are available at <a href="/contact#tasmania">Tas</a> and <a href="/contact#northern-territory">NT</a>.  
              </p>
            </div>
          </AuFieldset>
          <br/>
          <AuFieldset className="fieldset-group">
            
            <AuFieldset className="fieldset-group">
              <span>
                <AuLegend>
                  <h3>2. Your details</h3>
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
                as="textarea"
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
                  <h3>3. Domain details</h3>
                </AuLegend>
              </span>
              <TextField
                id="domainName"
                label="Domain name you would like to register"
                hint="Do not include www. Must end in .gov.au. A seperate application form is required for each domain. Domain names must bear a direct semantic connection"
                width="xl"
                required
                dark
              />
              <TextField
                id="registrantOrganisation"
                label="Which organisation will be responsible for this domain name?"
                hint="Please provide information on the initiative that proposed domain will support. Domain names should be meaningful
                to the intended audience (refer to the gov.au Eligibility and Allocation Policy). The Registrant organisation must be an Australian, 
                state, territory or local government entity such as: a department or agency; 
                local council; a statutory authority; or other defined government body (refer to the gov.au Eligibility and Allocation Policy)."
                width="xl"
                required
              />
              <TextField
                id="statedPurpose"
                label="Purpose of the domain name"
                hint="Why are you applying to register this domain name?"
                width="xl"
                as="textarea" 
                required
              />
              <TextField
                id="nameServers"
                label="Name servers"
                hint="If known, please provide 2 or more name servers to be used for this domain. One per line. 
                Name servers can be added or removed after registration. Please preclude trailing dots"
                width="xl"
                as="textarea"
              />
            </AuFieldset>

            
              <br/>
              <span>
                <AuLegend>
                  <h3>4. WHOIS contacts</h3>
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
                <AuLegend>5. Authorising contact email</AuLegend>
              </h3>
              <TextField
                hint="The domain application must be approved by the Registrant Contact of the organisation. If you are not sure who the correct contact is, do a .au Whois Lookup on the domain.
                A confirmation request email will be sent to this address when form is submitted."
                id="authorisingContactEmail"
                label="Authorising contact email"
                required
                width="xl"
              />
            </AuFieldset>
            <AuFieldset className="fieldset-group">
              <h3>
                <AuLegend>6. Send application</AuLegend>
              </h3>
              <p>
                When you submit this form, your details will be recorded and
                a confirmation request will be emailed to the applicant.
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
          </AuFieldset>
          {/* <pre>{JSON.stringify(values,null,2)}</pre> */}
          {/* <pre>{JSON.stringify(errors,null,2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
};

export default domainApplicationForm;
