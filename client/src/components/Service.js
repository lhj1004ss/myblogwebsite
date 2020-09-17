import React, { Component, Fragment } from "react";
import { FaSignInAlt, FaComments } from "react-icons/fa";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { Row, Col } from "reactstrap";

export default class ServicePage extends Component {
  render() {
    return (
      <Fragment>
        <div
          className="service"
          id="service"
          style={{
            height: "40vh",
            margin: "0 auto",
            justifyContent: "center",
            alignItems: "center",
            background: "lightgray",
          }}
        >
          <div style={{ background: "lightgray" }} className="service-1">
            <h1 style={{ paddingTop: "2rem", textAlign: "center" }}>
              Services
            </h1>
            <hr />
            <Row
              xs="1"
              md="2"
              lg="4"
              className="d-flex align-items-center justify-content-center "
              style={{ margin: "0 auto" }}
            >
              <Col
                style={{
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: "3rem" }}>
                  <AiOutlineCloudUpload />
                </span>
                <h3>Upload Post</h3>
                <p>Share Your Idea With Others</p>
              </Col>{" "}
              <Col
                style={{
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: "3rem" }}>
                  <FaSignInAlt />
                </span>
                <h3>Sign-In & Sign-Up</h3>
                <p>Share Your Idea With Others</p>
              </Col>{" "}
              <Col
                style={{
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: "3rem" }}>
                  <FaComments />
                </span>
                <h3>Comments</h3>
                <p>Leave Comments</p>
              </Col>{" "}
              <Col
                style={{
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: "3rem" }}>
                  <ImProfile />
                </span>
                <h3>Profile Change</h3>
                <p>Change Your Profile</p>
              </Col>
            </Row>
          </div>
        </div>
      </Fragment>
    );
  }
}
