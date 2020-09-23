import React from "react";
import SEO from "../../../components/seo";
import DefaultLayout from "../../../components/layouts/default-layout";
import { PageContext } from "../../../components/helpers/types";
import DomainUpdateContactForm from "../../../components/forms/domains/domainUpdateContact";
import { AuHintText } from "../../../components/helpers/auds";

const IndexPage: React.FC<PageContext> = ({ pageContext, location }) => {
  //get MD content

  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <div className="container-fluid au-body">
        <SEO
          title="Change domain details | domainname.gov.au"
          description="Change the contact details for a gov.au domain name"
        />
        <h1>Change the contact details for a gov.au domain name</h1>

        <div class="row">
          <div class="col-md-9">
            <DomainUpdateContactForm></DomainUpdateContactForm>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default IndexPage;
