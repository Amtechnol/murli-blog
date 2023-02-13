import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./post.css";
import axios from "axios";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import pathObj from "../../utils/apiPath";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

// import apiPath from "../../utils/apiPath";

const Post = ({ post }) => {
  const [blogData, setBlogData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const getAllBlog = async () => {
    setIsLoading(true);
    const res = await axios.get(
      process.env.REACT_APP_API_PATH + pathObj.getAllBlog,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    if (res?.data) {
      setBlogData(res?.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllBlog();
  }, []);

  console.log("blogData", blogData);

  // console.log("ENV", process.env.REACT_APP_API_PATH + pathObj.getAllBlog);

  // const PF = "https://murli-server.up.railway.app/images/";

  console.log("loading", isLoading);

  return (
    <section>
      <div></div>
      <Row>
        <SkeletonTheme highlightColor="#e8ffd1">
          {isLoading ? (
            <>
              {Array(6)
                .fill("")
                .map((i) => {
                  return (
                    <Col md={4}>
                      <div className="post">
                        <Skeleton variant="rounded" height={180} />
                        <div className="postInfo">
                          <div className="postCats">
                            <span className="postCat">
                              <Skeleton variant="rounded" height={15} />
                            </span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="postTitle">
                              {" "}
                              <Skeleton
                                variant="rounded"
                                width={50}
                                height={15}
                              />
                            </span>

                            <span className="postDate"></span>
                          </div>

                          <div className="username-post d-flex align-items-center">
                            <strong className="me-2">
                              {" "}
                              <Skeleton
                                variant="rounded"
                                height={15}
                                width={30}
                              />
                            </strong>{" "}
                            <Skeleton
                              variant="rounded"
                              height={15}
                              width={100}
                            />
                          </div>
                        </div>
                        <p className="postDesc">
                          <Skeleton variant="rounded" height={20} />
                        </p>
                      </div>
                    </Col>
                  );
                })}
            </>
          ) : (
            <Fragment>
              {blogData.length > 0 &&
                blogData.map((item, i) => {
                  return (
                    <>
                      <Col md={4}>
                        <div className="post">
                          {item?.photo && (
                            <img className="postImg" src={item?.photo} alt="" />
                          )}
                          <div className="postInfo">
                            <div className="postCats">
                              {item?.categories &&
                                item?.categories.map((cat, i) => {
                                  return (
                                    <span className="postCat">
                                      <Link
                                        className="link"
                                        to="/posts?cat=Music"
                                      >
                                        {cat}
                                      </Link>
                                    </span>
                                  );
                                })}
                            </div>
                            <div className="d-flex justify-content-between">
                              <span className="postTitle">
                                <Link
                                  to={`/post/${item?._id}`}
                                  className="link"
                                >
                                  {item?.title}
                                </Link>
                              </span>

                              <span className="postDate">
                                {new Date(item?.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="username-post">
                              <strong className="me-2">Author:</strong>{" "}
                              <span>{item?.username}</span>
                            </div>
                          </div>
                          <p className="postDesc">{item?.desc}</p>
                        </div>
                      </Col>
                    </>
                  );
                })}
            </Fragment>
          )}
        </SkeletonTheme>
      </Row>
    </section>
  );
};

export default Post;
