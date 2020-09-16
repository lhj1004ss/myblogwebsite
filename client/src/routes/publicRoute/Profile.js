import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Helmet from "react-helmet";
import {
  CardBody,
  Col,
  Card,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Button,
} from "reactstrap";
import {
  CLEAR_ERROR_REQUEST,
  PROFILE_EDIT_UPLOADING_REQUEST,
} from "../../redux/types";

const Profile = () => {
  const { userId, errorMsg, successMsg, previousMsg, shortMsg } = useSelector(
    (state) => state.auth
  );
  const { userFirstName } = useParams();
  const [form, setForm] = useState({
    // from user server api
    previousPassword: "",
    password: "",
    matchPassword: "",
  });
  const dispatch = useDispatch();

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    await e.preventDefault();
    const { previousPassword, password, matchPassword } = form;
    const token = localStorage.getItem("token");

    const body = {
      previousPassword,
      password,
      matchPassword,
      token,
      userId,
      userFirstName,
    };
    dispatch({
      type: CLEAR_ERROR_REQUEST,
    });
    dispatch({
      type: PROFILE_EDIT_UPLOADING_REQUEST,
      payload: body,
    });
  };

  return (
    <Fragment>
      <Helmet title={`Profile | ${userFirstName} Profile`} />
      <Col className="mt-5" sm="12" md={{ size: 6, offset: 3 }}>
        <Card>
          <CardHeader>
            <strong>Profile Change</strong>
          </CardHeader>
          <CardBody>
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <Label for="title">Current Password</Label>
                <Input
                  type="password"
                  name="previousPassword"
                  id="previousPassword"
                  className="form-control mb-2"
                  onChange={onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="title">New Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  onChange={onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="title">Confirmed Password</Label>
                <Input
                  type="password"
                  name="matchPassword"
                  id="matchPassword"
                  className="form-control mb-2"
                  onChange={onChange}
                />
                {shortMsg ? <Alert color="warning">{shortMsg}</Alert> : ""}
                {errorMsg ? <Alert color="warning">{errorMsg}</Alert> : ""}
                {previousMsg ? (
                  <Alert color="warning">{previousMsg}</Alert>
                ) : (
                  ""
                )}
                {successMsg ? <Alert color="primary">{successMsg}</Alert> : ""}
              </FormGroup>
              <Button color="dark" block className="mt-4 mb-4">
                Submit
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Fragment>
  );
};

export default Profile;
