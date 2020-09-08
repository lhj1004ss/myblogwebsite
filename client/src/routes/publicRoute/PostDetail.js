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
import { BsPencilSquare, BsChatDotsFill, BsEyeFill } from "react-icons/bs";
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
// initialstate post from reducer
// initialstate auth from reducer

const PostDetail = (req) => {
  const dispatch = useDispatch();
  // initialstate post from reducer
  const { postDetail, writerId, title, loading } = useSelector(
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
        {/* <Col className="col-md-3 mr-md-3">
          <Link to="/" className="btn btn-dark btn-block">
            Home
          </Link>
        </Col> */}
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

  const Body = (
    <>
      {userId === writerId ? EditBtn : HomeBtn}
      <Row className="border-bottom border-top border-dark p-3 mb-3 d-flex justify-content-between">
        {(() => {
          if (postDetail && postDetail.writer) {
            return (
              <Fragment>
                <div
                  style={{
                    fontSize: "2.5rem",
                    margin: "0 auto",
                  }}
                >
                  <span style={{ marginRight: "2rem" }}>
                    <Button color="info">
                      {postDetail.category.categoryName}
                    </Button>
                  </span>
                  {postDetail.title}
                </div>
                <div className="align-self-end">
                  {postDetail.writer.firstname}
                </div>
              </Fragment>
            );
          }
        })()}
      </Row>
      {postDetail && postDetail.comments ? (
        <Fragment>
          <div className="d-flex justify-content-end align-items-baseline small">
            <BsPencilSquare />
            &nbsp;
            <span> {postDetail.date}</span>
            &nbsp;&nbsp;
            <BsChatDotsFill />
            &nbsp;
            <span>{postDetail.comments.length}</span>
            &nbsp;&nbsp;
            <BsEyeFill />
            <span>{postDetail.views}</span>
          </div>
          <Row className="mb-3">
            <CKEditor
              editor={BalloonEditor}
              data={postDetail.contents}
              config={editorConfiguration}
              disabled="true"
            />
          </Row>
        </Fragment>
      ) : (
        <h1></h1>
      )}
    </>
  );

  return (
    <div>
      <Helmet title={`Post|${title}`} />
      {loading === true ? Loading : Body}
    </div>
  );
};

export default PostDetail;
