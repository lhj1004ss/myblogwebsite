import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { POSTS_LOADING_REQUEST } from "../../redux/types";
import { Row } from "reactstrap";
import { Helmet } from "react-helmet";
import Loading from "../../components/Loading/Loading";
import PostCard from "../../components/PostCard/PostCard";

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
      <Helmet title="Home" />
      <Row>{posts ? <PostCard posts={posts} /> : Loading}</Row>
    </div>
  );
};

export default PostCardList;
