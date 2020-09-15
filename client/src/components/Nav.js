import React, { useState, useEffect, useCallback, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavItem,
  Form,
  Button,
  Container,
  NavbarToggler,
  Collapse,
} from "reactstrap";
import Login from "../components/auth/login";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT_REQUEST } from "../redux/types";
import Register from "../components/auth/Register";
import SearchBar from "./Search/SearchBar";

function Navi() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth, user, userRole } = useSelector((state) => state.auth);
  console.log("userRole", userRole);

  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    setIsOpen(false);
  }, [user]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const addPost = () => {};

  const authLink = (
    <Fragment>
      <NavItem>
        {userRole === "Owner" ? (
          <Form className="col mt-2">
            <Link
              className="text-decoration-none font-weight-bold text-dark"
              to="/post"
              onClick={addPost}
            >
              Add Post
            </Link>
          </Form>
        ) : (
          ""
        )}
      </NavItem>
      <NavItem color="faded" light>
        <Form className="col mt-2">
          <Link
            className="text-decoration-none font-weight-bold text-dark"
            to="/blog"
          >
            Blog
          </Link>
        </Form>
      </NavItem>
      <NavItem className="d-flex justify-content-center">
        <Form className="col mt-2">
          {user && user.firstname ? (
            <Link
              to={`/user/${user.firstname}/profile`}
              className="text-decoration-none font-weight-bold text-dark"
            >
              {user ? `Hello, ${user.firstname}` : ""}
            </Link>
          ) : (
            <Button
              outline
              color="dark"
              className="px-3 text-decoration-none"
              block
            >
              <strong>No User</strong>
            </Button>
          )}
        </Form>
      </NavItem>
      <NavItem>
        <Form className="col mt-2">
          <Link
            onClick={onLogout}
            to="#"
            className="text-decoration-none font-weight-bold text-dark"
          >
            Logout
          </Link>
        </Form>
      </NavItem>
    </Fragment>
  );
  //className="text-decoration-none text-dark font-weight-bold"
  const guestLink = (
    <Fragment>
      <Form>
        <NavItem
          className="mt-2 mr-2 text-decoration-none text-dark font-weight-bold"
          color="faded"
          light
          color="dark"
        >
          <Link
            light
            className=" text-decoration-none font-weight-bold text-dark"
            light
            to="/blog"
          >
            Blog
          </Link>
        </NavItem>
      </Form>
      <Form>
        <NavItem className=" text-decoration-none font-weight-bold text-dark">
          <Login className="text-dark" />
        </NavItem>
      </Form>
      <NavItem className=" text-decoration-none text-dark font-weight-bold">
        <Register />
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar light expand="lg" className="sticky-top " navbar>
        <Container>
          <Link
            to="/"
            className=" text-decoration-none text-dark font-weight mt-2"
          >
            <strong>Hyoje Blog</strong>
          </Link>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <SearchBar isOpen={isOpen} />
            <Nav className="ml-auto d-felx justify-content-around" navbar>
              {isAuth ? authLink : guestLink}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navi;
