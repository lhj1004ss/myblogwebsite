import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Progress,
  Button,
} from "reactstrap";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Myinit from "../../components/editor/UploadFile";
import { POST_EDIT_UPLOADING_REQUEST } from "../../redux/types";

const PostEdit = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    title: "",
    contents: "",
    fileUrl: "",
  });
  const { postDetail } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { title, contents, fileUrl } = form;
    const token = localStorage.getItem("token");
    const id = postDetail._id;
    const body = { title, contents, fileUrl, token, id };
    console.log(body);
    dispatch({
      type: POST_EDIT_UPLOADING_REQUEST,
      payload: body,
    });
  };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setForm({
      title: postDetail.title,
      contents: postDetail.contents,
      fileUrl: postDetail.fileUrl,
    });
  }, [postDetail.title, postDetail.contents, postDetail.fileUrl]);

  const getDataFromCKEditor = (event, editor) => {
    const data = editor.getData();

    if (data && data.match("<img src=")) {
      const whereImg_start = data.indexOf("<img src=");
      console.log(whereImg_start);
      let whereImg_end = "";
      let ext_name_find = "";
      let result_Img_Url = "";

      const ext_name = ["jpeg", "png", "jpg", "gif"];

      for (let i = 0; i < ext_name.length; i++) {
        if (data.match(ext_name[i])) {
          console.log(data.indexOf(`${ext_name[i]}`));
          ext_name_find = ext_name[i];
          whereImg_end = data.indexOf(`${ext_name[i]}`);
        }
      }
      console.log(ext_name_find);
      console.log(whereImg_end);

      if (ext_name_find === "jpeg") {
        result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 4);
      } else {
        result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 3);
      }

      console.log(result_Img_Url, "result_Img_Url");
      setForm({
        ...form,
        fileUrl: result_Img_Url,
        contents: data,
      });
    } else {
      setForm({
        ...form,
        fileUrl: process.env.REACT_APP_BASIC_CARD_IMAGE_URL,
        contents: data,
      });
    }
  };

  return (
    <div>
      {isAuth ? (
        <Form className="mt-5" onSubmit={onSubmit}>
          <FormGroup className="mb-3">
            <Label for="title">Title</Label>
            <Input
              type="text"
              // to get original value
              defaultValue={postDetail.title}
              name="title"
              id="title"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="content">Content</Label>
            <CKEditor
              // to get original value at ckeditor
              data={postDetail.contents}
              editor={ClassicEditor}
              config={editorConfiguration}
              onInit={Myinit}
              onBlur={getDataFromCKEditor}
            />
            <Button
              color="dark"
              block
              className="mt-3 col-md-2 offset-md-10 mb-3"
            >
              Submit
            </Button>
          </FormGroup>
        </Form>
      ) : (
        <Col width={50} className="p-5 m-5">
          <Progress animated color="info" value={100} />
        </Col>
      )}
    </div>
  );
};
export default PostEdit;
