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

  // const authLink = (
  //   return (
  //     <div>
  //       <NavItem>
  //         {userRole === "Owner" ? (
  //           <Form className="col mt-2">
  //             <Link
  //               to="/post"
  //               className="btn btn-success block text-dark px-3"
  //               onClick={addPost}
  //             >
  //               Post
  //             </Link>
  //           </Form>
  //         ) : (
  //           ""
  //         )}
  //       </NavItem>
  //       <NavItem className="d-flex justfy-content-center">
  //         <Form className="col mt-2">
  //           {user && user.name ? (
  //             <Link>
  //               <Button outline color="light" className="px-3" block>
  //                 <strong>{user ? `Hello ${user.name}` : ""}</strong>
  //               </Button>
  //             </Link>
  //           ) : (
  //             <Button outline color="light" className="px-3" block>
  //               <strong>No User available</strong>
  //             </Button>
  //           )}
  //         </Form>
  //       </NavItem>
  //       {/* logout button */}
  //       <NavItem>
  //         <Form className="col">
  //           <Link onClick={onLogout} to="#">
  //             <Button outline color="light" className="mt-2" block>
  //               Logout
  //             </Button>
  //           </Link>
  //         </Form>
  //       </NavItem>
  //     </div>
  //   );
  // );

  const authLink = (
    <Fragment>
      <NavItem>
        {userRole === "Owner" ? (
          <Form className="col mt-2">
            <Link
              to="/post"
              className="btn btn-success block text-white px-3"
              onClick={addPost}
            >
              Add Post
            </Link>
          </Form>
        ) : (
          ""
        )}
      </NavItem>
      <NavItem className="d-flex justify-content-center">
        <Form className="col mt-2">
          {user && user.name ? (
            <Link>
              <Button outline color="light" className="px-3" block>
                <strong>{user ? `Welcome ${user.name}` : ""}</strong>
              </Button>
            </Link>
          ) : (
            <Button outline color="light" className="px-3" block>
              <strong>No User</strong>
            </Button>
          )}
        </Form>
      </NavItem>
      <NavItem>
        <Form className="col">
          <Link onClick={onLogout} to="#" className="">
            <Button outline color="light" className="mt-2" block>
              Logout
            </Button>
          </Link>
        </Form>
      </NavItem>
    </Fragment>
  );

  const guestLink = (
    <Fragment>
      <NavItem>
        <Login />
      </NavItem>
      <NavItem>
        <Register />
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar expand="lg" className="sticky-top">
        <Container>
          <Link to="/" className=" text-decoration-none text-dark">
            Hyoje's Web Blog
          </Link>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
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
