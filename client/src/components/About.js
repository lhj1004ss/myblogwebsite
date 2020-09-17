import React from "react";
import { Row, Col, Container } from "reactstrap";

function About() {
  return (
    <Container
      style={{ margin: "0 auto", marginBottom: "2rem" }}
      className="about"
    >
      <h1 className="text-center mt-4 mb-5 about-header">About Me</h1>
      <hr />
      <Row xs="1" sm="2" md="2">
        <Col className="mt-5">
          <img
            style={{ width: "100%", height: "500px" }}
            className="profile"
            alt=""
          />
        </Col>
        <Col className="text-center">
          <h2>Hyoje Lee (Le)</h2>
          <hr />
          <div>
            <h3> Troubleshooting :</h3> Ability to troubleshoot hardware,
            software, and peripheral devices including: printers, network
            issues, operating systems Programming
            <hr />
            <h3>Languages :</h3> React.js , Node.js, JavaScript, HTML, CSS, C,
            Java, Proficient in writing code, testing, debugging, and
            documentation
            <hr />
          </div>
          <div>
            <h3>Related Courses :</h3>Programming Fundamental, Computer hardware
            and Operating systems, Internet Programming, Unix Scripting and The
            Internet, Unix Internal, Database with Java, Mobile Programming,
            Algorithms and Data Structures in Java
            <hr />
          </div>
          <div>
            <h4>Computer Engineering Technology</h4>
            <h4>Advanced Diploma</h4>
            <h4>Humber College 2018 - 2020</h4>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
