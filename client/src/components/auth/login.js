import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  NavLink,
  Form,
  FormGroup,
  Label,
  Alert,
  Input,
  Button,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from "../../redux/types";

const LoginModal = () => {
  const [modal, setModal] = useState(false);
  const [localMsg, setLocalMsg] = useState("");
  const [form, setValues] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { errorMsg } = useSelector((state) => state.auth);
  useEffect(() => {
    try {
      setLocalMsg(errorMsg);
    } catch (e) {
      console.log(e);
    }
  }, [errorMsg]);

  const handleToggle = () => {
    dispatch({
      type: CLEAR_ERROR_REQUEST,
    });
    setModal(!modal);
  };

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    const user = { email, password };
    console.log(user);
    dispatch({
      type: LOGIN_REQUEST,
      payload: user,
    });
  };
  return (
    <div>
      <NavLink onClick={handleToggle} href="#">
        Login
      </NavLink>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Login</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Please type your E-mail"
                onChange={onChange}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Please type your password"
                onChange={onChange}
              />
              {localMsg ? (
                <Alert style={{ margin: "1rem 0" }} color="warning">
                  {localMsg}
                </Alert>
              ) : null}

              <Button color="dark" style={{ marginTop: "1rem" }} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginModal;
