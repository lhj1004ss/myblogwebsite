import React, { Fragment } from "react";
import { Spinner, Row } from "reactstrap";

const Loading = (
  <Fragment>
    <Row className="d-flex justify-content-center m-5">
      <Spinner style={{ width: "5rem", height: "5rem" }} color="primary" />
      <Spinner style={{ width: "5rem", height: "5rem" }} color="secondary" />
      <Spinner style={{ width: "5rem", height: "5rem" }} color="success" />
    </Row>
  </Fragment>
);

export default Loading;
