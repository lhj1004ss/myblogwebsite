import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_ERROR_REQUEST, REGISTER_REQUEST } from "../../redux/types";
import {
  NavLink,
  ModalHeader,
  Alert,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Button,
  Form,
} from "reactstrap";

function Register() {
  const [Modal, setModal] = useState(false);
  const [Form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [localMsg, setlocalMsg] = useState("");
  //auth from index file in reducer
  const { errorMsg } = useSelector((state) => state.auth);
  const [IsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch({
      type: CLEAR_ERROR_REQUEST,
    });
    setModal(!Modal);
  };
  useEffect(() => {
    try {
      setlocalMsg(errorMsg);
    } catch (e) {
      console.error(e);
    }
  }, [errorMsg]);
  const onChange = (e) => {
    setForm({
      ...Form,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password } = Form;
    const newUser = { firstname, lastname, password };
    console.log("newuser", newUser);
    // send new user to store by using dispatch
    dispatch({
      type: REGISTER_REQUEST,
      payload: newUser,
    });
  };

  return (
    <div>
      <NavLink onClick={handleToggle} href="#">
        Sign-Up
      </NavLink>
      <Modal isOpen={Modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Register</ModalHeader>
        <ModalBody>
          {localMsg ? <Alert color="warning">{localMsg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="firstname">
                First Name
                <Input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="Please type your firstname"
                  onChange={onChange}
                />
              </Label>
              <Label for="Lastname">
                Last Name
                <Input
                  type="text"
                  name="Lastname"
                  id="Lastname"
                  placeholder="Please type your Lastname"
                  onChange={onChange}
                />
              </Label>
              <Label for="email">
                E-mail
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Please type your E-mail"
                  onChange={onChange}
                />
              </Label>
              <Label for="password">
                Password
                <Input
                  type="text"
                  name="password"
                  id="password"
                  placeholder="Please type your password"
                  onChange={onChange}
                />
              </Label>
              <Button color="dark" classname="mt-2" block>
                Sign Up
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Register;
