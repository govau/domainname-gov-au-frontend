import React from "react";
import SEO from "../components/seo";
import DefaultLayout from "../components/layouts/default-layout";
import { PageContext } from "../components/helpers/types";
import PageAlert from "../components/blocks/page-alert";
// import { Redirect } from "@reach/router";

const IndexPage: React.FC<PageContext> = ({ pageContext, location }) => {
  //get MD content

  const renderPage = () => {

    const email =
      location.state && location.state.formData.applicantEmail ? location.state.formData.applicantEmail : "---";

    return (
      <DefaultLayout pageContext={pageContext} location={location}>
        <div className="container-fluid au-body">
          <SEO title="Submitted" />
          <PageAlert type="success" className="max-42">
            <>
              <h3>Request received</h3>
              <p>The domainname.gov.au team has received your request.</p>
              <p>Please check your email at <strong>{email}</strong> to confirm the request. Return to <a href="/">home</a>.</p>
            </>
          </PageAlert>
        </div>
      </DefaultLayout>
    );
  };

  return renderPage();
};

export default IndexPage;
