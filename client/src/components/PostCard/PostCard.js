import React, { Fragment } from "react";
import { BsChatSquareDotsFill, BsFillEyeFill } from "react-icons/bs";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

const PostCard = ({ posts }) => {
  return (
    <Fragment>
      {Array.isArray(posts)
        ? posts.map(({ _id, title, fileUrl, comments, views }) => {
            return (
              <div key={_id} className="col-md-3">
                <Link
                  to={`/post/${_id}`}
                  className="text-dark text-decoration-none"
                >
                  <Card className="mb-4">
                    <CardImg top alt="card img" src={fileUrl} />
                    <CardBody>
                      <CardTitle className="text-truncate d-flex justify-content-between">
                        <span className="text-truncate">{title} </span>
                        <span>
                          <span>
                            <BsChatSquareDotsFill /> &nbsp;
                          </span>
                          <span>{comments.length}</span>&nbsp;&nbsp;
                          <span>
                            <BsFillEyeFill />
                          </span>
                          &nbsp;
                          <span>{views}</span>
                        </span>
                      </CardTitle>
                    </CardBody>
                  </Card>
                </Link>
              </div>
            );
          })
        : ""}
    </Fragment>
  );
};

export default PostCard;
