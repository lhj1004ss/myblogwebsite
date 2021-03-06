import React, { Fragment } from "react";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { Link } from "react-scroll";
import Service from "./Service";
import About from "./About";
import { Row } from "reactstrap";
import Loading from "./Loading/Loading";

const HomePage = () => {
  return (
    <Fragment>
      {Loading === true ? (
        Loading
      ) : (
        <Fragment>
          <Row className="homePage">
            <div
              style={{
                margin: "0 auto",
                marginTop: "18rem",
              }}
            >
              <h1
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: "4rem",
                }}
              >
                Welcome To Hyoje Blog
              </h1>
            </div>

            <Link
              activeClass="active"
              to="service"
              spy={true}
              smooth={true}
              offset={-60}
              duration={800}
            >
              <span className="font">
                <FaArrowAltCircleDown />
              </span>
            </Link>
          </Row>
          <Service />
          <About />
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomePage;
