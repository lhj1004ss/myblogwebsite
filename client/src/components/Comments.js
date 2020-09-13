import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Row, FormGroup, Input } from "reactstrap";
import {
  COMMENT_LOADING_REQUEST,
  COMMENT_UPLOADING_REQUEST,
} from "../redux/types";

// props.id,userName,userId
const Comments = ({ id, userId, userName }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ contents: "" });

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { contents } = form;
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please Login to leave comments");
    }
    const body = {
      contents,
      token,
      id,
      userId,
      userName,
    };

    console.log(body);
    dispatch({
      type: COMMENT_UPLOADING_REQUEST,
      payload: body,
    });
    resetValue.current.value = "";
    setForm("");
  };

  const resetValue = useRef(null);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form.contents);
  };

  useEffect(() => {
    dispatch({
      type: COMMENT_LOADING_REQUEST,
      payload: id,
    });
  }, [dispatch, id]);
  return (
    <>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Row className="p-2">
            <div className="font-weight-bold m-1">Reply </div>
            <div className="my-1" />
            <Input
              innerRef={resetValue}
              type="textarea"
              name="contents"
              id="contents"
              onChange={onChange}
              placeholder="Comment"
            />
            <Button
              color="primary"
              block
              className="mt-2 offset-md-10 col-md-2 "
            >
              Reply
            </Button>
          </Row>
        </FormGroup>
      </Form>
    </>
  );
};

export default Comments;
