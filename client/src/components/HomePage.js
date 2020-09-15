import React from "react";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { Link, animateScroll as scroll } from "react-scroll";
function HomePage() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default HomePage;
