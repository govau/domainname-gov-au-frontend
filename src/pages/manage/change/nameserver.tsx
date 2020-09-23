import React from "react";
import SEO from "../../../components/seo";
import DefaultLayout from "../../../components/layouts/default-layout";
import { PageContext } from "../../../components/helpers/types";
import DomainUpdateNameserverForm from "../../../components/forms/domains/domainUpdateNameserver";
import { AuHintText } from "../../../components/helpers/auds";

const IndexPage: React.FC<PageContext> = ({ pageContext, location }) => {
  //get MD content

  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <div className="container-fluid au-body">
        <SEO
          title="Change domain details | domainname.gov.au"
          description="Change the name servers for a gov.au domain name"
        />
        <h1>Change the name servers for a gov.au domain name</h1>

        <div class="row">
          <div class="col-md-9">
            <DomainUpdateNameserverForm></DomainUpdateNameserverForm>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default IndexPage;
