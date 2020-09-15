import React, { Component, Fragment } from "react";
import {
  RiLuggageCartLine,
  RiMoneyDollarCircleFill,
  RiRecycleFill,
} from "react-icons/ri";
import { FaSignInAlt } from "react-icons/fa";
import { AiOutlineCloudUpload, AiOutlineComment } from "react-icons/ai";
import { ImProfile } from "react-icons/im";

import { Row, Col, Container } from "reactstrap";

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
                    style={{
                      margin: "0 auto",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ textAlign: "center", alignItems: "center" }}>
                      <span style={{ fontSize: "2rem" }}>{item.icon}</span>
                      <h3>{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
        <div>
          <Container style={{ margin: "0 auto" }} className="about">
            <h1 className="text-center mt-4 mb-5">About Me</h1>
            <hr />
            <Row xs="1" sm="2" md="2">
              <Col className="mb-2">
                <img
                  style={{ width: "100%", height: "550px" }}
                  className="profile"
                />
              </Col>
              <Col className="text-center">
                <h2>Hyoje Lee (Le)</h2>
                <hr />
                <p>
                  <h3> Troubleshooting:</h3> Ability to troubleshoot hardware,
                  software, and peripheral devices including: printers, network
                  issues, operating systems Programming
                  <hr />
                  <h3>Languages:</h3> React.js , Node.js, JavaScript, HTML, CSS,
                  C, Java, Proficient in writing code, testing, debugging, and
                  documentation
                  <hr />
                </p>
                <p>
                  <h3>Related Course</h3> : Programming Fundamental, Computer
                  hardware and Operating systems, Internet Programming, Unix
                  Scripting and The Internet, Unix Internal, Database with Java,
                  Mobile Programming, Algorithms and Data Structures in Java
                  <hr />
                </p>
                <h4>Computer Engineering Technology</h4>
                <h4>Advanced Diploma</h4>
                <h4>Humber College 2018 - 2020</h4>
              </Col>
            </Row>
          </Container>
        </div>
      </Fragment>
    );
  }
}
