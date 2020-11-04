/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState } from "react";
import { Formik, Form } from "formik";
import TextField from "../text-field";
import { Aubtn, AuFormGroup, AuFieldset, AuLegend } from "../../helpers/auds";
import PageAlert from "../../blocks/page-alert";
import { navigate } from "@reach/router";
import { InitialValues, Schema, FormData } from "./validate";
import { AUcheckbox, AUradio } from "../../auds/react/control-input";
import fetch from 'node-fetch';
import CheckBoxField from "../checkbox";
import CheckboxGroup from "./components/checkbox-group";

const domainDeleteForm: React.FC = () => {
  const [state, setState] = useState({
    isErrors: false,
    submitted: false,
    apiMessage: "",
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

    const submitFormResult = await fetch( fetchUrl, { method: 'POST', headers: headers, body: JSON.stringify(formData) });

    if (submitFormResult.result === "error") {
      const apiMessage = submitFormResult.msg;
      handleAPIerror(apiMessage);
      setSaving(false);
      return;
    }

    // TODO Add submitted successful page for domainDelete
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
      validationSchema={Schema["delete"]}
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
              width="xl"
              required
            />
            <TextField
              id="applicantPhone"
              label="Phone number"
              width="xl"
              hint="For landlines please include area code."
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
              label="Domain name you would like to delete"
              hint="Must end in .gov.au"
              width="xl"
              required
            />
          </AuFieldset>

          <AuFieldset className="fieldset-group">
            <h3>
              <AuLegend>3. Terms and conditions</AuLegend>
            </h3>
            <p>
              When you submit this form, your details will be recorded and
              a confirmation request will be emailed to the applicant. By submitting this 
              form you confirm the following:
            </p>
            <ol>
              <li><b>The domain is not used by any website.</b></li>
              <li><b>The domain name does not have any sub-domains in use.</b></li>
              <li><b>The domain name is not a host name for any other domain names.</b></li>
              <li><b>The domain name does not host any active email accounts.</b></li>
              <li><b>The domain name does not host any in-use assets(such as scripts, images, 
                documents, etc.) elsewhere.</b></li>
            </ol>
            <br/>
            <AuFormGroup>
              <CheckBoxField
                id="deleteDomainTC"
                label="I agree to the terms and conditions."
                legend= ""
              >
              </CheckBoxField>
            </AuFormGroup>
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
          <i>
            Please note that auDA has proposed implementation rules for the direct registration 
            of domain names at the second level of .au (further information on Second Level .au 
            Domains and the .au Priority Allocation Process is available at 
            <a href="https://www.auda.org.au/policies/second-level-au-domains/">
            https://www.auda.org.au/policies/second-level-au-domains/</a>).
          </i>
          <i>
            Under these rules, if the coronialcouncil.vic.gov.au domain is deleted, the Department
            of Justice and Community Safety will relinquish its priority status rights to register, 
            or contend for, the exact match of this domain - coronialcouncil.au - or to block its 
            registration by other entities.
          </i>
        </Form>
      )}
    </Formik>
  );
};

export default domainDeleteForm;
