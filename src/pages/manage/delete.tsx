import React from "react";
import SEO from "../../components/seo";
import DefaultLayout from "../../components/layouts/default-layout";
import { PageContext } from "../../components/helpers/types";
import DomainDeleteForm from "../../components/forms/domains/domainDelete";
import { AuHintText } from "../../components/helpers/auds";

const IndexPage: React.FC<PageContext> = ({ pageContext, location }) => {
  //get MD content

  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <div className="container-fluid au-body">
        <SEO
          title="Delete a domain name | domainname.gov.au"
          description="Delete a gov.au domain name."
        />
        <h1>Delete a gov.au domain name</h1>

        <div className="row">
          <div className="col-md-9">
            <DomainDeleteForm></DomainDeleteForm>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default IndexPage;
