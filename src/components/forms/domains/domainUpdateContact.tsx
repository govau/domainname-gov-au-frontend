/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState } from "react";
import { Formik, Form } from "formik";

import TextField from "../text-field";
import SelectField from "../drop-down";
import { Aubtn, AuFormGroup, AuFieldset, AuLegend } from "../../helpers/auds";
import PageAlert from "../../blocks/page-alert";
import { navigate } from "@reach/router";
import { InitialValues, Schema, FormData } from "./validate";

import fetch from 'node-fetch';

const domainUpdateContactForm: React.FC = () => {
  const [state, setState] = useState({
    isErrors: false,
    submitted: false,
    apiMessage: ""
  });

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

    const submitFormResult = await fetch( fetchUrl, { method: 'PATCH', headers: headers, body: JSON.stringify(formData) });

    if (submitFormResult.result === "error") {
      const apiMessage = submitFormResult.msg;
      handleAPIerror(apiMessage);
      setSaving(false);
      return;
    }

    // TODO Add submitted successful page specifically for domainUpdateContact
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
      validationSchema={Schema["patch"]}
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
            <span>
              <AuLegend>
                <h3>1. Your details</h3>
              </AuLegend>
            </span>
            <TextField
              id="applicantName"
              label="Applicant name"
              width="xl"
              required
            />
            <TextField
              id="applicantEmail"
              label="Account/registrant email address"
              hint="Please use the email address associated with this account (if known)"
              width="xl"
              required
            />
            <TextField
              id="applicantPhone"
              label="Applicant phone number"
              width="xl"
              required
            />
          </AuFieldset>

          <AuFieldset className="fieldset-group">
            <span>
              <AuLegend>
                <h3>2. Domain details</h3>
              </AuLegend>
            </span>
            <TextField
              id="domainName"
              label="Domain names(s)"
              hint="If you wish to modify multiple domain names with this request, please enter them one per line. Must end in .gov.au"
              width="xl"
              required
            />
          </AuFieldset>

          <AuFieldset className="fieldset-group">
            <span>
              <AuLegend>
                <h3>3. WHOIS contacts</h3>
              </AuLegend>
            </span>

            <p>WHOIS contacts are available publicly. They are used to contact website owners.</p>

            <p>Please enter any fields to be changed. Fields left blank will not be changed.</p>

            <h4>Business registrant details</h4>

            <TextField
              id="registrantName"
              label="Registrant name"
              width="xl"
            />
            <TextField
              id="registrantEmail"
              label="Registrant email address"
              width="xl"
            />
            <TextField
              id="registrantPhone"
              label="Registrant phone number"
              width="xl"
            />
            <TextField
              id="registrantCity"
              label="Registrant city"
              width="xl"
            />
            <SelectField
              id="registrantState"
              label="Registrant state or territory"
              options={[
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
              width="xl"
            />
            <TextField
              id="technicalEmail"
              label="Technical contact email address"
              width="xl"
            />
            <TextField
              id="technicalPhone"
              label="Technical contact phone number"
              required
              width="xl"
            />
            <TextField
              id="technicalCity"
              label="Technical contact city"
              width="xl"
            />
            <SelectField
              id="technicalState"
              label="Technical contact state or territory"
              options={[
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
          </AuFieldset>

          <AuFieldset className="fieldset-group">
            <h3>
              <AuLegend>4. Send request to update domain</AuLegend>
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
        </Form>
      )}
    </Formik>
  );
};

export default domainUpdateContactForm;
