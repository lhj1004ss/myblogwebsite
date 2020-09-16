import React, { useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { POSTS_LOADING_REQUEST } from "../../redux/types";
import { Row, Alert, Button } from "reactstrap";
import { Helmet } from "react-helmet";
import Loading from "../../components/Loading/Loading";
import PostCard from "../../components/PostCard/PostCard";
import Header from "../../components/Header";
const PostCardList = () => {
  // post because I wrote post from index.js in reducers
  // posts from postReducerfile
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: POSTS_LOADING_REQUEST });
  }, [dispatch]);

  return (
    <div>
      <Helmet title="Hyoje Code Blog" />
      <Header />
      <Row>{posts ? <PostCard posts={posts} /> : Loading}</Row>
    </div>
  );
};

export default PostCardList;
