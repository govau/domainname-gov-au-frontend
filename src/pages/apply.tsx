import React from "react";
import SEO from "../components/seo";
import DefaultLayout from "../components/layouts/default-layout";
import { PageContext } from "../components/helpers/types";
import DomainApplicationForm from "../components/forms/domains/domainApplication";
import { AuHintText } from "../components/helpers/auds";

const IndexPage: React.FC<PageContext> = ({ pageContext, location }) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <div className="container-fluid au-body">
        <SEO
          title="Apply for a new gov.au domain | domainname.gov.au"
          description="Apply for a new gov.au domain."
        />
        <div className="row-tier">
          <h1>Apply for a new gov.au domain</h1>
        </div>
        <div className="row tier">
          <div className="col-md-9">
            <DomainApplicationForm></DomainApplicationForm>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default IndexPage;
