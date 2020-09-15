import React, { useEffect, Fragment } from "react";
import Comments from "../../components/Comments";
import CKEditor from "@ckeditor/ckeditor5-react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
// helmet to change title of web  at top
import { Helmet } from "react-helmet";
import {
  USER_LOADING_REQUEST,
  POST_DETAIL_LOADING_REQUEST,
  POST_DELETE_REQUEST,
} from "../../redux/types";
import { Link } from "react-router-dom";
import { Row, Col, Container, Button } from "reactstrap";
import { BsPencilSquare, BsChatDotsFill, BsEyeFill } from "react-icons/bs";
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";

const PostDetail = (req) => {
  const dispatch = useDispatch();
  // initialstate post from reducer
  const { postDetail, writerId, title, loading } = useSelector(
    (state) => state.post
  );
  // initialstate auth from reducer
  const { userId, userFirstName } = useSelector((state) => state.auth);
  // comment from reducer index, comments from initial comment from reducer
  const { comments } = useSelector((state) => state.comment);
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
  }, [dispatch]);

  const onDeletePostClick = () => {
    console.log("clicked");
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
          <Link
            to={`/post/${req.match.params.id}/edit`}
            className="btn btn-dark btn-block"
          >
            Edit Post
          </Link>
        </Col>
        <Col className="col-md-3">
          <Button className="btn-block btn-dark" onClick={onDeletePostClick}>
            Delete Post
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
      <Row className="mt-5 border-bottom border-top border-dark p-3 mb-3 d-flex justify-content-between">
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
          <Row>
            <Container className="mb-3 border border-blue rounded">
              {Array.isArray(comments)
                ? comments.map(
                    ({ contents, writer, date, _id, writerName }) => (
                      <div key={_id}>
                        <Row className="justify-content-between p-2">
                          <div className="font-weight-bold">
                            {writerName ? writerName : writer}
                          </div>
                          <div className="text-small">
                            <span className="font-weight-bold">
                              {date.split(" ")[0]}
                            </span>
                            <span className="font-weight-light">
                              {" "}
                              {date.split(" ")[1]}
                            </span>
                          </div>
                        </Row>
                        <Row className="p-2">
                          <div>{contents}</div>
                        </Row>
                        <hr />
                      </div>
                    )
                  )
                : "Writer"}
              <Comments
                id={req.match.params.id}
                userId={userId}
                userName={userFirstName}
              />
            </Container>
          </Row>
        </Fragment>
      ) : (
        <h1>welcome</h1>
      )}
      {userId === writerId ? EditBtn : HomeBtn}
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
