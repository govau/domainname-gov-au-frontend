import React from "react";
import SEO from "../../components/seo";
import DefaultLayout from "../../components/layouts/default-layout";
import { PageContext } from "../../components/helpers/types";
import DomainTransferForm from "../../components/forms/domains/domainTransfer";
import { AuHintText } from "../../components/helpers/auds";

const IndexPage: React.FC<PageContext> = ({ pageContext, location }) => {
  //get MD content

  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <div className="container-fluid au-body">
        <SEO
          title="Transfer gov.au domain | domainname.gov.au"
          description="Transfer ownership of gov.au domain name to another government agency."
        />
        <h1>Transfer ownership of gov.au domain name</h1>

        <div class="row">
          <div class="col-md-9">
            <DomainTransferForm></DomainTransferForm>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default IndexPage;
