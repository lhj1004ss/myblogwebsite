import React from "react";
import { Row, Col } from "reactstrap";
function Footer() {
  return (
    <div
      className="footer"
      style={{
        textAlign: "center",
        background: "lightgray",
        color: "black",
        paddingTop: "1.5rem",
      }}
    >
      <Row sm="1" md="1" lg="1">
        <Col>
          <p>HYOJE LEE (Le)</p>
          <p>hyojelee1004ss@gmail.com</p>
          <p>Computer Engineering Technology 2018-2020</p>
          <p>Humber College</p>
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
