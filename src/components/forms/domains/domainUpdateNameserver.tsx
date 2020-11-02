/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState } from "react";
import { Formik, Form } from "formik";
import TextField from "../text-field";
import { Aubtn, AuFormGroup, AuFieldset, AuLegend } from "../../helpers/auds";
import PageAlert from "../../blocks/page-alert";
import { navigate } from "@reach/router";
import { InitialValues, Schema, FormData } from "./validate";
import fetch from 'node-fetch';
import SelectField from "../drop-down";


const domainUpdateNameserverForm: React.FC = () => {
  const [state, setState] = useState({
    isErrors: false,
    submitted: false,
    apiMessage: ""
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

    const submitFormResult = await fetch( fetchUrl, { method: 'PATCH', headers: headers, body: JSON.stringify(formData) });

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
          <AuFieldset>
            <div className="au-callout max-42">
              <h4>Please note:</h4>
              <p>
                <ul>
                  <li>
                    The change request must be submitted by the Registrant or Technical Contact of the domain (refer to <a href="https://whois.auda.org.au/">.au Whois lookup</a>).
                  </li>
                  <li>
                    This service is for adding and removing name servers to a gov.au domain. If you would like to make changes to your DNS settings (for example TTL, A records, CNAME, MX records) you will need to contact your DNS service provider. 
                  </li>
                  <li>
                    Once the changes have been made we will confirm completion through the email that the request was made.
                  </li>
                  <li>
                    Changes that are scheduled for after-hours, the contact should be on hand to check and test the changes, so if necessary, a roll-back can be preformed. 
                  </li>
                </ul>
              </p>
            </div>
          </AuFieldset>
          <br/>
          <AuFieldset className="fieldset-group">
            <span>
              <AuLegend>
                <h3>1. Your details</h3>
              </AuLegend>
            </span>
            <TextField
              id="applicantName"
              label="Name"
              required
              width="xl"
            />
            <TextField
              id="applicantEmail"
              label="Email address"
              required
              width="xl"
            />
            <TextField
              id="applicantPhone"
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
              label="Domain name you would like to change"
              hint="Must end in .gov.au"
              id="domainName"
              required
              width="xl"
            />
            <p>
              With the removal and addition of the name servers, please ensure that the result contains at least 2 or more name servers. You can view the existing name servers by doing an <a href="https://whois.auda.org.au/">.au Whois lookup</a>. 
            </p>
            <p>  
              If the name servers are glue records, please also supply their IP addresses.
            </p>
          </AuFieldset>

          <AuFieldset className="fieldset-group">
            <span>
              <AuLegend>
                <h3>3. Name servers</h3>
              </AuLegend>
            </span>
            <TextField
              as="textarea"
              hint="Please provide the full set of name servers to be removed for this domain. 2 or more name servers are required. One name server per line. "
              id="removeNameServers"
              label="Remove name servers"
              width="xl"
            />
            <AuFieldset>
            </AuFieldset>
              <TextField
              as="textarea"
              hint="Please provide the full set of name servers to be used for this domain. 2 or more name servers are required. One name server per line. "
              id="addNameServers"
              label="Add name servers"
              width="xl"
            />
          </AuFieldset>
          <AuFieldset>
          <h3>
            <AuLegend>4. When would you like this change implemented?</AuLegend>
          </h3>
          <p>
            <div className="au-callout max-42">
                <p>
                  <ul>
                    <li>
                      <b>Standard Change</b>: Select this option for non-time sensitive name server changes that are ready to be implemented. We will endeavour to action this request within one business day.
                    </li>
                    <li>
                      <b>Scheduled Change</b>: Select this option if your name server change is required to be completed at a specific time. Please provide one business day notice and we will endeavour to action this request at the preferred time.
                    </li>
                    <li>
                    <b>Urgent/Emergency Change</b>: Select this option if critical services are impacted and changes to name servers are required to resolve the issue. Please submit this form and call us (mobile: 0437 653 861) to bring this to our attention. 
                    </li>
                  </ul>
                </p>
              </div>  
          </p>
          <br/>
              <AuFormGroup>
                <SelectField
                id="changeImplementedSchedule"
                label="When would you like this change implemented?"
                options={[
                  { value: "", text: "Choose one" },
                  { value: "standard", text: "Standard Change" },
                  { value: "scheduled", text: "Scheduled Change" },
                  { value: "urgent", text: "Urgent Change" },
                ]}
              />
              </AuFormGroup>
            </AuFieldset>
          <br/>
          <AuFieldset className="fieldset-group">
            <h3>
              <AuLegend>5. Send request to update domain</AuLegend>
            </h3>
            <p>
              When you submit this form, your details will be recorded and
              a confirmation request will be emailed to the applicant.
            </p>
            <AuFormGroup>
              <Aubtn as='secondary' disabled={saving}>
                <a href="/manage">
                  Cancel
                </a>
              </Aubtn>
              <Aubtn type="submit" disabled={saving}>
                {saving ? "Submitting" : "Submit"}
              </Aubtn>
            </AuFormGroup>
          </AuFieldset>
          <pre>{JSON.stringify(values,null,2)}</pre>
        </Form>
      )}
    </Formik>
  );
};

export default domainUpdateNameserverForm;
