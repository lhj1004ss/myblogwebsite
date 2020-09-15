import React from "react";
import { Row, Col } from "reactstrap";

function Header() {
  return (
    <div id="header" className="mb-4" style={{ color: "white" }}>
      <Row>
        <Col md="6" sm="auto" className="text-center m-auto">
          <h1> Hyoje Web Blog</h1>
          <h2>Let's share idea</h2>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
