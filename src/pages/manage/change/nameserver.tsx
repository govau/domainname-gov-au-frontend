import React from "react";
import SEO from "../../../components/seo";
import DefaultLayout from "../../../components/layouts/default-layout";
import { PageContext } from "../../../components/helpers/types";
import DomainUpdateNameserverForm from "../../../components/forms/domains/domainUpdateNameserver";
import { AuHintText } from "../../../components/helpers/auds";

const IndexPage: React.FC<PageContext> = ({ pageContext, location }) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <div className="container-fluid au-body">
        <SEO
          title="Change domain details | domainname.gov.au"
          description="Change the name servers for a gov.au domain name"
        />
        <h1>Change the name servers for a gov.au domain name</h1>

        <div className="row tier">
          <div className="col-md-9">
            <DomainUpdateNameserverForm></DomainUpdateNameserverForm>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default IndexPage;
