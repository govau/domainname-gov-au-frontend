import React from "react";
import { AUHeader, Brand } from "../helpers/auds";

interface Props {
  siteTitle: string;
}

const Header: React.FC<Props> = ({ siteTitle }) => {
  return (
    <>
      <AUHeader dark>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <Brand
                title={
                  <>
                    {siteTitle} <span className="header__badge"> alpha</span>
                  </>
                }
                subline="Secure, reliable management of gov.au domain names"
                link="/"
                brandImage={"../../coat-of-arms.svg"}
                brandImageAlt="The Australian Government Coat of Arms"
              />
            </div>
          </div>
        </div>
      </AUHeader>
    </>
  );
};

export default Header;
