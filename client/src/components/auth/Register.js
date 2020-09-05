import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_ERROR_REQUEST, REGISTER_REQUEST } from "../../redux/types";
import {
  NavLink,
  ModalHeader,
  Alert,
  Modal,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Button,
  Form,
} from "reactstrap";

function Register() {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
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
    setModal(!modal);
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
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password } = form;
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
      <Modal
        style={
          {
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            // textAlign: "center",
          }
        }
        isOpen={modal}
        toggle={handleToggle}
      >
        <ModalHeader
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
          toggle={handleToggle}
        >
          Sign-Up
        </ModalHeader>
        <ModalBody>
          {localMsg ? <Alert color="warning">{localMsg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="firstname">
                First Name
                <Input
                  style={{ width: "465px" }}
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="Please type your firstname"
                  onChange={onChange}
                />
              </Label>
              <br />
              <Label for="Lastname">
                Last Name
                <Input
                  style={{ width: "465px" }}
                  type="text"
                  name="Lastname"
                  id="Lastname"
                  placeholder="Please type your Lastname"
                  onChange={onChange}
                />
              </Label>
              <br />
              <Label for="email">
                E-mail
                <Input
                  style={{ width: "465px" }}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Please type your E-mail"
                  onChange={onChange}
                />
              </Label>{" "}
              <br />
              <Label for="password">
                Password
                <Input
                  style={{ width: "465px" }}
                  type="text"
                  name="password"
                  id="password"
                  placeholder="Please type your password"
                  onChange={onChange}
                />
              </Label>
              <br />
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
