import React from 'react';
import {
    Container,
    Row,
    Col
} from "reactstrap";

const devYear = new Date("2020").getFullYear();
  const thisYear = new Date().getFullYear();
  let year;
  devYear >= thisYear ? (year = devYear) : (year = `${devYear} - ${thisYear}`);

function Copyright() {
    return (
        <Row style={{ marginTop: 10 }}>
        {" "}
        <Col className="row-1" md={12}>
          {" "}
          <Container fluid={true}>
            {" "}
            <footer
              className="container-fluid"
              style={{
                color: "white",
                textAlign: "center",
                padding: "18px",
                fontSize: "10px",
                position: "relative",
              }}
            >
              {" "}
              &copy; All rights reserved belong to &nbsp;
              <a href="https://github.com/manhhust2810/" className="text-light">
                manhhust
              </a>
              &nbsp;<span className="text-warning">{year}</span>. Please
              reference the Terms of Use and the Supplemental Terms for specific
              information related to your country. <br /> Your use of this
              website constitutes acceptance of the Terms of Use, Supplemental
              Terms, Privacy Policy and Cookie Policy. Do Not Sell My Personal
              Information{" "}
            </footer>{" "}
          </Container>{" "}
        </Col>{" "}
      </Row>
    )
}

export default Copyright
