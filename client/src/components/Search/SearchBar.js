import React, { Fragment, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { SEARCH_REQUEST } from "../../redux/types";
import {
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { GoSearch } from "react-icons/go";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ searchBy: "" });
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };
  const onSubmit = async (e) => {
    await e.preventDefault();
    const { searchBy } = form;
    dispatch({
      type: SEARCH_REQUEST,
      payload: searchBy,
    });
    console.log("search submit", searchBy);
    // reset value after search

    resetValue.current.value = "";
  };
  // reset value after search
  const resetValue = useRef(null);

  return (
    <Fragment>
      <Form onSubmit={onSubmit} className="col mt-2">
        {/* <Input
          name="searchBy"
          onChange={onChange}
          innerRef={resetValue}
        ></Input> */}

        <InputGroup>
          <Input
            name="searchBy"
            onChange={onChange}
            innerRef={resetValue}
            placeholder="Please type here"
          ></Input>{" "}
          <InputGroupAddon addonType="append">
            <InputGroupText>
              <GoSearch />
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    </Fragment>
  );
};

export default SearchBar;
