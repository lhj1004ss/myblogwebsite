import React, { useEffect, Fragment } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
// helmet to change title of web  at top
import { Helmet } from "react-helmet";
import {
  USER_LOADING_REQUEST,
  POST_DETAIL_LOADING_REQUEST,
  POST_DELETE_REQUEST,
  POST_DETAIL_LOADING_FAILURE,
} from "../../redux/types";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
// initialstate post from reducer
// initialstate auth from reducer

const PostDetail = (req) => {
  const dispatch = useDispatch();
  // initialstate post from reducer
  const { postDetail, creatorId, title, loading } = useSelector(
    (state) => state.post
  );
  // initialstate auth from reducer
  const { userId, userFirstName } = useSelector((state) => state.auth);
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

  const onDeletePostClick = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: {
        id: req.match.params.id,
        token: localStorage.getItem("token"),
      },
    });
  };

  const EditBtn = (
    <Fragment>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-md-3 mr-md-3">
          <Link to="/" className="btn btn-dark btn-block">
            Home
          </Link>
        </Col>
        <Col className="col-md-3 mr-md-3">
          <Link
            to={`/post/${req.match.params.id}}`}
            className="btn btn-dark btn-block"
          >
            Edit
          </Link>
        </Col>
        <Col className="col-md-3">
          <Button className="btn-block btn-dark" onClick={onDeletePostClick}>
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
          <Link to="/" className="btn btn-dark btn-block">
            Home
          </Link>
        </Col>
      </Row>
    </Fragment>
  );
  console.log(title);
  return <div>detail</div>;
};

export default PostDetail;
