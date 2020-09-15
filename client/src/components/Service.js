import React, { Component } from "react";
import {
  RiLuggageCartLine,
  RiMoneyDollarCircleFill,
  RiRecycleFill,
} from "react-icons/ri";
import { BiHappyAlt } from "react-icons/bi";
import { Row, Col } from "reactstrap";

export default class ServicePage extends Component {
  state = {
    service: [
      {
        icon: <RiMoneyDollarCircleFill />,
        title: "Upload Post",
        detail: "Share Your Idea With Others",
      },

      {
        icon: <RiLuggageCartLine />,
        title: "Sign-In & Sign-Up",
        detail: "Be Part of a Member To Do More",
      },
      {
        icon: <RiRecycleFill />,
        title: "Comments",
        detail: "Leave Comments",
      },
      {
        icon: <RiRecycleFill />,
        title: "Profile Change",
        detail: "Change Your Profile",
      },
    ],
  };

  render() {
    return (
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
        <div style={{ background: "lightgray" }}>
          <h1 style={{ paddingTop: "2rem", textAlign: "center" }}>Services</h1>
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
    );
  }
}
