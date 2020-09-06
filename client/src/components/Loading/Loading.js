import React from "react";
import { Spinner, Row } from "reactstrap";

const Loading = (
  <div>
    <Row className="d-flex justify-content-center m-5">
      <Spinner style={{ width: "3rem", height: "3rem" }} color="primary" />
      <Spinner style={{ width: "3rem", height: "3rem" }} color="secondary" />
      <Spinner style={{ width: "3rem", height: "3rem" }} color="success" />
      <Spinner style={{ width: "3rem", height: "3rem" }} color="danger" />
      <Spinner style={{ width: "3rem", height: "3rem" }} color="warning" />
      <Spinner style={{ width: "3rem", height: "3rem" }} color="info" />
      <Spinner style={{ width: "3rem", height: "3rem" }} color="dark" />
    </Row>
  </div>
);

export default Loading;
