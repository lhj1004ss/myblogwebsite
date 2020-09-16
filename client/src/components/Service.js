import React, { Component, Fragment } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { AiOutlineCloudUpload, AiOutlineComment } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { Row, Col } from "reactstrap";

export default class ServicePage extends Component {
  state = {
    service: [
      {
        icon: <AiOutlineCloudUpload />,
        title: "Upload Post",
        detail: "Share Your Idea With Others",
      },

      {
        icon: <FaSignInAlt />,
        title: "Sign-In & Sign-Up",
        detail: "Be Part of a Member To Do More",
      },
      {
        icon: <AiOutlineComment />,
        title: "Comments",
        detail: "Leave Comments",
      },
      {
        icon: <ImProfile />,
        title: "Profile Change",
        detail: "Change Your Profile",
      },
    ],
  };

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
              {this.state.service.map((item, index) => {
                return (
                  <Col
                    key={index}
                    style={{
                      margin: "0 auto",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ textAlign: "center", alignItems: "center" }}>
                      <span style={{ fontSize: "2rem" }}>{item.icon}</span>
                      <h3 style={{ marginTop: "2rem" }}>{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      </Fragment>
    );
  }
}
