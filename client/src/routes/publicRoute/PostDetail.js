import React, { useEffect, Fragment } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import { useDispatch, useSelector } from "react-redux";
// helmet to change title of web  at top
import {} from "react-helmet";
import {
  USER_LOADING_REQUEST,
  POST_DETAIL_LOADING_REQUEST,
  POST_DELETE_REQUEST,
} from "../../redux/types";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";

const PostDetail = (req) => {
  const dispatch = useDispatch();
  // initialstate post from reducer
  const { PostDetail, writerId, title, loading } = useSelector(
    (state) => state.post
  );
  // initialstate auth from reducer
  const { userId, userFirstName, userLastName } = useSelector(
    (state) => state.auth
  );

  console.log(req);

  useEffect(() => {
    dispatch({
      type: POST_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id,
    });
    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem("token"),
    });
  }, []);

  const onDeletePost = () => {
    // only writer can delete post
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: {
        id: req.match.params.id,
        token: localStorage.getItem("token"),
      },
    });
  };

  const postEdit = (
    <Fragment>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-md-3 mr-md-3 ">
          <Link to="/" className="btn btn-primary btn-block">
            Home
          </Link>
        </Col>
        <Col className="col-md-3 mr-md-3 ">
          <Link
            to={`/post/${req.match.params.id}/edit`}
            className="btn btn-primary btn-block"
          >
            Edit
          </Link>
        </Col>
        <Col className="col-md-3 mr-md-3 ">
          <Button block onClick={onDeleteClick}>
            Delete
          </Button>
        </Col>
      </Row>
    </Fragment>
  );

  const HomeBtn = (
    <Fragment>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-sm-12 col-md-3">
          <Link to="/" className="btn btn-primary btn-block">
            Home
          </Link>
        </Col>
      </Row>
    </Fragment>
  );

  return (
    <div>
      <h1>post detail </h1>
    </div>
  );
};

export default PostDetail;
