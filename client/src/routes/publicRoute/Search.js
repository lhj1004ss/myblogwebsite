import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row } from "reactstrap";
import { SEARCH_REQUEST } from "../../redux/types";
import PostCard from "../../components/PostCard/PostCard";

const Search = () => {
  const dispatch = useDispatch();
  let { searchTerm } = useParams();
  const { searchResult } = useSelector((state) => state.post);
  console.log("search", searchResult);

  useEffect(() => {
    if (searchTerm) {
      dispatch({ type: SEARCH_REQUEST, payload: searchTerm });
    }
  }, [dispatch, searchTerm]);

  return (
    <div>
      <h3 className="mb-5">Search : {searchTerm} </h3>

      <Row>
        <PostCard posts={searchResult} />
      </Row>
    </div>
  );
};

export default Search;
