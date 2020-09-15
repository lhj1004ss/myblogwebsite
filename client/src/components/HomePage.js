import React, { Fragment } from "react";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { Link, animateScroll as scroll } from "react-scroll";

function HomePage() {
  return (
    <Fragment>
      <div className="homePage">
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
      </div>
    </Fragment>
  );
}

export default HomePage;
