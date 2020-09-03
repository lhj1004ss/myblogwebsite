import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavbarToggler, Collapse } from "reactstrap";
import Login from "../components/auth/login";
import { useSelector, useDispatch } from "react-redux";

function Navi() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth, user, userRole } = useSelector((state) => state.auth);
  console.log("userRole", userRole);
  const dispatch = useDispatch();
  return (
    <div>
      <Navbar expand="lg" className="sticky-top">
        <Container>
          <Link to="/" className=" text-decoration-none text-dark">
            Home
          </Link>
          <NavbarToggler />
          <Collapse isOpen={true} navbar>
            <Nav className="ml-auto d-flex justify-content-around" navbar>
              {" "}
              {false ? <h1>authLink</h1> : <Login />}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navi;
