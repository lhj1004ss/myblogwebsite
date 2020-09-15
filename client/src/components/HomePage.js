import React, { Fragment } from "react";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { Link, animateScroll as scroll } from "react-scroll";
import Service from "./Service";
import { Row } from "reactstrap";
function HomePage() {
  return (
    <Fragment>
      <Row className="homePage">
        <Link
          activeClass="active"
          to="service"
          spy="true"
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
    </Fragment>
  );
}

export default HomePage;
